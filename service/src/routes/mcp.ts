import type { IncomingMessage } from 'node:http'
import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { Router } from 'express'
import { z } from 'zod'

const router = Router()

// 请求级别的 IP 存储，Express 路由层写入，MCP tool handler 读取
const clientIpStore = new AsyncLocalStorage<string>()

// ==================== 内部工具函数 ====================

async function getLocationByIp(ip: string) {
  const services = [
    `http://ip-api.com/json/${ip}?lang=zh-CN`,
    `http://ip-api.com/json/?lang=zh-CN`,
  ]

  for (const url of services) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
      if (!res.ok)
        continue
      const data = await res.json() as any
      if (data.status === 'success' && data.lat && data.lon) {
        return {
          city: data.city || '未知',
          region: data.regionName || '',
          country: data.country || '',
          lat: data.lat,
          lon: data.lon,
          timezone: data.timezone || 'Asia/Shanghai',
        }
      }
    }
    catch { continue }
  }
  return null
}

async function getWeatherByCoords(lat: number, lon: number) {
  try {
    const url = `https://wttr.in/${lat},${lon}?format=j1&lang=zh`
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok)
      return null
    const data = await res.json() as any
    const current = data.current_condition?.[0]
    const forecast = data.weather ?? []
    return {
      current: {
        temp_C: current?.temp_C,
        feelsLike_C: current?.FeelsLikeC,
        humidity: current?.humidity,
        weatherDesc: current?.weatherDesc?.[0]?.value,
        windDir: current?.winddir16Point,
        windSpeed_Kmph: current?.windspeedKmph,
      },
      forecast: forecast.slice(0, 3).map((d: any) => ({
        date: d.date,
        maxTemp_C: d.maxtempC,
        minTemp_C: d.mintempC,
        sunrise: d.astronomy?.[0]?.sunrise,
        sunset: d.astronomy?.[0]?.sunset,
      })),
    }
  }
  catch {
    return null
  }
}

/** 从 AsyncLocalStorage 或 Express request 中提取客户端 IP */
function getClientIp(): string {
  return clientIpStore.getStore() || ''
}

/** 从 Express request 解析 IP */
function resolveIp(req: IncomingMessage): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.headers['x-real-ip'] as string
    || req.socket.remoteAddress
    || ''
}

// ==================== MCP Server（stateless 单例） ====================

function createMcp() {
  const server = new McpServer({
    name: 'admin-mcp',
    version: '1.0.0',
  })

  // --- get_location ---
  server.tool(
    'get_location',
    '获取当前用户的地理位置（基于 IP），返回城市、坐标、时区',
    {},
    async () => {
      const ip = getClientIp()
      const location = await getLocationByIp(ip)
      if (!location) {
        console.log(`[MCP] get_location ❌ 失败 — IP: ${ip}`)
        return { content: [{ type: 'text', text: '无法获取位置信息' }] }
      }
      console.log(`[MCP] get_location ✅ — IP: ${ip}, 城市: ${location.city}, 坐标: (${location.lat}, ${location.lon})`)
      return {
        content: [{
          type: 'text',
          text: `wxx-mcp返回:${location.city}，${location.region}，${location.country}（${location.lat}, ${location.lon}）时区 ${location.timezone}`,
        }],
      }
    },
  )

  // --- get_weather ---
  server.tool(
    'get_weather',
    '获取当前天气和未来天气预报，不传坐标则自动通过 IP 定位',
    {
      lat: z.number().min(-90).max(90).optional().describe('纬度，不传则自动定位'),
      lon: z.number().min(-180).max(180).optional().describe('经度，不传则自动定位'),
    },
    async ({ lat, lon }) => {
      if (lat === undefined || lon === undefined) {
        const ip = getClientIp()
        const loc = await getLocationByIp(ip)
        if (!loc) {
          return { content: [{ type: 'text', text: '无法自动定位，请手动传入 lat 和 lon' }] }
        }
        lat = loc.lat
        lon = loc.lon
      }

      const weather = await getWeatherByCoords(lat!, lon!)
      if (!weather) {
        console.log(`[MCP] get_weather ❌ 失败 — 坐标: (${lat}, ${lon})`)
        return { content: [{ type: 'text', text: '获取天气失败' }] }
      }

      console.log(`[MCP] get_weather ✅ — 坐标: (${lat}, ${lon}), 当前: ${weather.current.temp_C}°C, 预报: ${weather.forecast.length}天`)

      const c = weather.current
      const f = weather.forecast
      const lines = [
        '## 🌤️ 当前天气',
        '',
        `- 🌡️ 温度：**${c.temp_C}°C**（体感 ${c.feelsLike_C}°C）`,
        `- 💧 湿度：${c.humidity}%`,
        `- 🌬️ 风向风速：${c.windDir} ${c.windSpeed_Kmph} km/h`,
        `- 📝 天气：${c.weatherDesc}`,
        '',
      ]
      if (f.length) {
        lines.push('wxx-mcp返回:', '')
        lines.push('## 📅 预报', '')
        f.forEach((d: any) => {
          lines.push(`- **${d.date}**：最高 ${d.maxTemp_C}°C / 最低 ${d.minTemp_C}°C`)
        })
      }
      return { content: [{ type: 'text', text: lines.join('\n') }] }
    },
  )

  return server
}

// ==================== 路由 ====================

// stateful 模式：transport 内部自动管理 session，可安全复用
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
})
const mcpServer = createMcp()
await mcpServer.connect(transport)

/** 从请求中提取 IP 并写入 AsyncLocalStorage，确保 MCP tool handler 能正确获取 */
function withClientIp(req: IncomingMessage, fn: () => Promise<void>): Promise<void> {
  return clientIpStore.run(resolveIp(req), fn)
}

/** 确保 Accept 头包含 MCP StreamableHTTP 要求的 MIME 类型（nginx/代理可能剥离）。
 *  @hono/node-server 从 rawHeaders 读取，所以必须同时修改 rawHeaders 和 headers */
function fixMcpHeaders(req: IncomingMessage) {
  const required = req.method === 'GET'
    ? 'text/event-stream'
    : 'application/json, text/event-stream'

  // 修改 headers 对象
  req.headers.accept = required

  // 修改 rawHeaders（@hono/node-server 实际读取的数据源）
  const raw = req.rawHeaders
  let found = false
  for (let i = 0; i < raw.length; i += 2) {
    if (raw[i].toLowerCase() === 'accept') {
      raw[i + 1] = required
      found = true
      break
    }
  }
  if (!found) {
    raw.push('Accept', required)
  }
}

router.post('/mcp', async (req, res) => {
  fixMcpHeaders(req)
  console.log(`[MCP] ${req.method} 请求 — IP: ${resolveIp(req)}, Session: ${(req.headers['mcp-session-id'] as string)?.slice(0, 8) || 'new'}`)
  await withClientIp(req, () => transport.handleRequest(req, res, req.body))
})

router.get('/mcp', async (req, res) => {
  fixMcpHeaders(req)
  console.log(`[MCP] ${req.method} 初始化 — IP: ${resolveIp(req)}`)
  await withClientIp(req, () => transport.handleRequest(req, res))
})

router.delete('/mcp', async (req, res) => {
  fixMcpHeaders(req)
  console.log(`[MCP] ${req.method} 终止会话 — IP: ${resolveIp(req)}`)
  await withClientIp(req, () => transport.handleRequest(req, res))
})

// 健康检查
router.get('/mcp/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.0.0' })
})

export default router
