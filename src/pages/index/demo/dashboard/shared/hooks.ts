import type { IndexItem, Stock } from './data'
import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { clamp, INDEX_NAMES, INIT_INDICES, INIT_INDUSTRIES, INIT_SECTORS, INIT_STOCKS, NEWS, randomWalk, TREND_INIT, TREND_TIMES } from './data'

// ============================================================
// ECharts 实例管理
// ============================================================
export function useChart(el: HTMLDivElement | null): echarts.ECharts | null {
  if (!el)
    return null
  return echarts.getInstanceByDom(el) || echarts.init(el)
}

// ============================================================
// 实时时钟
// ============================================================
export function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

// ============================================================
// 新闻滚动
// ============================================================
export function useNewsScroll() {
  const [newsIdx, setNewsIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setNewsIdx(i => (i + 1) % NEWS.length), 4000)
    return () => clearInterval(t)
  }, [])
  return { newsIdx, newsList: NEWS }
}

// ============================================================
// 核心: 动态数据模拟 (每 1.5 秒一个 tick)
// 返回所有需要实时更新的状态
// ============================================================
export function useDashboardData() {
  const [stocks, setStocks] = useState<Stock[]>(INIT_STOCKS)
  const [indices, setIndices] = useState<IndexItem[]>(INIT_INDICES)
  const [sentiment, setSentiment] = useState(68)
  const [sectors, setSectors] = useState(INIT_SECTORS)
  const [industries, setIndustries] = useState(INIT_INDUSTRIES)
  const [breadth, setBreadth] = useState({ up: 2380, down: 2150, flat: 168 })

  // 趋势数据滑动窗口
  const trendRef = useRef({
    times: [...TREND_TIMES],
    data: TREND_INIT.map(arr => [...arr]),
  })
  const [trendTick, setTrendTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      // 1. 个股价格随机游走
      setStocks(prev => prev.map((s) => {
        const vol = s.price * 0.006
        const newPrice = randomWalk(s.price, vol, s.price * 0.92, s.price * 1.08)
        const newVolume = clamp(s.volume + (Math.random() - 0.4) * 5, 5, 300)
        return { ...s, price: newPrice, volume: newVolume, lastTickUp: newPrice >= s.price }
      }))

      // 2. 指数随机游走
      setIndices(prev => prev.map((idx) => {
        const vol = idx.value * 0.003
        return { ...idx, value: randomWalk(idx.value, vol, idx.value * 0.97, idx.value * 1.03) }
      }))

      // 3. 恐慌贪婪指数
      setSentiment(prev => clamp(prev + (Math.random() - 0.5) * 6, 5, 95))

      // 4. 板块资金流向
      setSectors(prev => prev.map(sec => ({
        ...sec,
        value: clamp(sec.value + (Math.random() - 0.5) * 15, -80, 180),
      })))

      // 5. 行业涨跌幅
      setIndustries(prev => prev.map(ind => ({
        ...ind,
        change: clamp(ind.change + (Math.random() - 0.5) * 0.8, -6, 6),
      })))

      // 6. 涨跌家数
      setBreadth((prev) => {
        const shift = Math.floor((Math.random() - 0.5) * 80)
        return {
          up: clamp(prev.up + shift, 800, 3800),
          down: clamp(prev.down - shift, 800, 3800),
          flat: clamp(prev.flat + Math.floor((Math.random() - 0.5) * 20), 80, 300),
        }
      })

      // 7. 追加趋势数据 (滑动窗口保留 20 点)
      const tr = trendRef.current
      const last = tr.data[tr.data.length - 1]
      const newPoint = last.map(v => randomWalk(v, v * 0.004, v * 0.98, v * 1.02))
      const [h, m] = tr.times[tr.times.length - 1].split(':').map(Number)
      let nm = m + 1
      let nh = h
      if (nm >= 60) { nm -= 60; nh += 1 }
      if (nh >= 16) { nh = 15; nm = 0 }
      tr.times.push(`${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`)
      tr.data.push(newPoint)
      if (tr.times.length > 20) {
        tr.times.shift()
        tr.data.shift()
      }
      setTrendTick(v => v + 1)
    }, 1500)
    return () => clearInterval(t)
  }, [])

  return {
    stocks,
    indices,
    sentiment,
    sectors,
    industries,
    breadth,
    trendRef,
    trendTick,
  }
}

// ============================================================
// 派生数据: KPI 卡片
// ============================================================
export function useIndexCards(indices: IndexItem[]) {
  return indices.map((idx) => {
    const change = idx.value - idx.prevClose
    const changePercent = (change / idx.prevClose) * 100
    return { ...idx, change, changePercent, up: change >= 0 }
  })
}

// ============================================================
// 派生数据: 个股表格行
// ============================================================
export function useStockRows(stocks: Stock[]) {
  return stocks.map((s, i) => {
    const change = s.price - s.prevClose
    const changePercent = (change / s.prevClose) * 100
    return { ...s, key: i, change, changePercent, up: change >= 0 }
  })
}

// ============================================================
// ECharts Resize + Cleanup
// ============================================================
export function useChartResize(...refs: React.RefObject<HTMLDivElement | null>[]) {
  useEffect(() => {
    const handleResize = () => {
      refs.forEach((ref) => {
        if (ref.current)
          echarts.getInstanceByDom(ref.current)?.resize()
      })
    }
    // 延迟 resize 确保 flex 容器尺寸已计算完成
    const raf = requestAnimationFrame(() => requestAnimationFrame(handleResize))
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      refs.forEach((ref) => {
        if (ref.current)
          echarts.getInstanceByDom(ref.current)?.dispose()
      })
    }
  }, [])
}

// re-export 常量供外部使用
export { INDEX_NAMES, NEWS, TREND_TIMES }
