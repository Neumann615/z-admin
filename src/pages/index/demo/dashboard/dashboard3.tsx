import type { FeatureData } from './shared/mapUtils'
import {
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons'
import { useMaximize } from '@zealous-admin/layout/index'
import { sortBy } from '@zealous-admin/utils/index'
import {
  Badge,
  Button,
  Col,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  INDEX_NAMES,
  NEWS,
  useChart,
  useChartResize,
  useClock,
  useDashboardData,
  useIndexCards,
  useNewsScroll,
  useStockRows,
} from './shared/hooks'
import {
  buildLambertProjector,

  fmtVal,
  heatColor,
  heatColorHex,
  PROVINCE_GDP,
  shortName,
} from './shared/mapUtils'
import { getUpDownColors, useDashboardStyles } from './shared/styles'

const { Text } = Typography

// ============================================================
// 样式 (dashboard3 独有的地图相关样式)
// ============================================================
// 注意: 地图样式已在 useDashboardStyles 中不包含, 这里仅使用内联 style
// ============================================================

// ============================================================
// 组件
// ============================================================
export default function Dashboard3() {
  const { styles, theme } = useDashboardStyles()
  const { enterMaximize } = useMaximize()
  const { upColor, downColor } = getUpDownColors(theme)

  // 动态数据
  const { stocks, indices, sentiment, sectors, industries, breadth, trendRef, trendTick } = useDashboardData()
  const now = useClock()
  const { newsIdx } = useNewsScroll()

  // 派生数据
  const indexCards = useIndexCards(indices)
  const stockRows = useStockRows(stocks)

  // ECharts DOM refs
  const trendEl = useRef<HTMLDivElement>(null)
  const pieEl = useRef<HTMLDivElement>(null)
  const gaugeEl = useRef<HTMLDivElement>(null)
  const barEl = useRef<HTMLDivElement>(null)
  const stockDistEl = useRef<HTMLDivElement>(null)

  // Three.js map refs
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapTooltip, setMapTooltip] = useState<{ name: string, value: number, x: number, y: number } | null>(null)
  const [mapLevel, setMapLevel] = useState<'national' | 'provincial'>('national')
  const [mapCurrentName, setMapCurrentName] = useState('')
  const [mapLegend, setMapLegend] = useState({ min: 0, max: 100 })
  const renderGeoRef = useRef<(adcode: string, name?: string) => void>(() => {})
  const levelRef = useRef<'national' | 'provincial'>('national')
  const currentAdcodeRef = useRef('100000')
  const currentNameRef = useRef('')

  useEffect(() => { levelRef.current = mapLevel }, [mapLevel])

  // ---- ECharts: 指数走势 ----
  useEffect(() => {
    const chart = useChart(trendEl.current)
    if (!chart)
      return
    const tr = trendRef.current
    const base = tr.data[0]
    chart.setOption({
      grid: { left: 50, right: 20, top: 20, bottom: 40 },
      tooltip: { trigger: 'axis', valueFormatter: (v: number) => `${v.toFixed(2)}%` },
      legend: { data: INDEX_NAMES, bottom: 0, textStyle: { color: theme.colorTextSecondary, fontSize: 11 } },
      xAxis: { type: 'category', data: tr.times, boundaryGap: false, axisLine: { lineStyle: { color: theme.colorBorderSecondary } }, axisLabel: { color: theme.colorTextTertiary, fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { formatter: '{value}%', color: theme.colorTextTertiary, fontSize: 10 }, splitLine: { lineStyle: { color: theme.colorBorderSecondary } } },
      series: INDEX_NAMES.map((name, i) => ({ name, type: 'line', data: tr.data.map(d => +((d[i] - base[i]) / base[i] * 100).toFixed(2)), smooth: true, symbol: 'none', lineStyle: { width: 2 }, areaStyle: i === 0 ? { opacity: 0.06 } : undefined })),
      color: [theme.colorPrimary, theme.colorWarning, theme.colorSuccess],
    })
  }, [trendTick, theme])

  // ---- ECharts: 板块资金流向 ----
  useEffect(() => {
    const chart = useChart(pieEl.current)
    if (!chart)
      return
    const inflow = sectors.filter(d => d.value > 0)
    const outflow = sectors.filter(d => d.value < 0).map(d => ({ ...d, value: Math.abs(d.value) }))
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}亿' },
      legend: { orient: 'vertical', right: 0, top: 'middle', textStyle: { color: theme.colorTextSecondary, fontSize: 10 }, itemWidth: 8, itemHeight: 8 },
      series: [
        { name: '净流入', type: 'pie', radius: ['38%', '58%'], center: ['32%', '50%'], label: { show: false }, emphasis: { label: { show: true, color: theme.colorTextHeading, fontSize: 11 } }, data: inflow },
        { name: '净流出', type: 'pie', radius: ['62%', '78%'], center: ['32%', '50%'], label: { show: false }, emphasis: { label: { show: true, color: theme.colorTextHeading, fontSize: 11 } }, data: outflow },
      ],
      color: [theme.colorPrimary, theme.colorSuccess, theme.colorWarning, theme.purple, theme.cyan, theme.geekblue, theme.colorError, theme.volcano],
    })
  }, [sectors, theme])

  // ---- ECharts: 恐慌贪婪指数 ----
  useEffect(() => {
    const chart = useChart(gaugeEl.current)
    if (!chart)
      return
    const v = Math.round(sentiment)
    const label = v >= 75 ? '极度贪婪' : v >= 55 ? '贪婪' : v >= 45 ? '中性' : v >= 25 ? '恐慌' : '极度恐慌'
    chart.setOption({
      series: [{
        type: 'gauge',
        min: 0,
        max: 100,
        radius: '92%',
        progress: { show: true, width: 12 },
        axisLine: { lineStyle: { width: 12, color: [[0.25, theme.colorSuccess], [0.5, theme.colorWarning], [0.75, '#FF9966'], [1, theme.colorError]] } },
        pointer: { width: 4, length: '58%', itemStyle: { color: theme.colorTextHeading } },
        axisTick: { show: false },
        splitLine: { length: 8, lineStyle: { color: theme.colorBorderSecondary } },
        axisLabel: { distance: 14, color: theme.colorTextTertiary, fontSize: 9 },
        detail: { valueAnimation: true, formatter: '{value}', fontSize: 28, fontWeight: 700, color: theme.colorTextHeading, offsetCenter: [0, '28%'] },
        title: { offsetCenter: [0, '52%'], fontSize: 12, color: theme.colorTextSecondary },
        data: [{ value: v, name: label }],
      }],
    })
  }, [sentiment, theme])

  // ---- ECharts: 行业涨跌幅 ----
  useEffect(() => {
    const chart = useChart(barEl.current)
    if (!chart)
      return
    const sorted = sortBy(industries, 'change', 'asc')
    chart.setOption({
      grid: { left: 55, right: 45, top: 10, bottom: 24 },
      tooltip: { formatter: '{b}: {c}%' },
      xAxis: { type: 'value', axisLabel: { formatter: '{value}%', color: theme.colorTextTertiary, fontSize: 10 }, splitLine: { lineStyle: { color: theme.colorBorderSecondary } } },
      yAxis: { type: 'category', data: sorted.map(i => i.name), axisLine: { lineStyle: { color: theme.colorBorderSecondary } }, axisLabel: { color: theme.colorTextSecondary, fontSize: 11 } },
      series: [{ type: 'bar', barWidth: '55%', data: sorted.map(i => ({ value: +i.change.toFixed(2), itemStyle: { color: i.change >= 0 ? upColor : downColor, borderRadius: [0, 3, 3, 0] } })), label: { show: true, position: 'right', formatter: (p: any) => `${p.value}%`, fontSize: 10, color: theme.colorTextSecondary } }],
    })
  }, [industries, theme, upColor, downColor])

  // ---- ECharts: 各股分布 ----
  useEffect(() => {
    const chart = useChart(stockDistEl.current)
    if (!chart)
      return
    const categoryMap: Record<string, number> = { 强势上涨: 0, 温和上涨: 0, 震荡整理: 0, 温和下跌: 0, 强势下跌: 0 }
    stocks.forEach((stock) => {
      const changePercent = ((stock.price - stock.prevClose) / stock.prevClose) * 100
      if (changePercent >= 3)
        categoryMap['强势上涨']++
      else if (changePercent >= 1)
        categoryMap['温和上涨']++
      else if (changePercent >= -1)
        categoryMap['震荡整理']++
      else if (changePercent >= -3)
        categoryMap['温和下跌']++
      else categoryMap['强势下跌']++
    })
    const data = Object.entries(categoryMap).filter(([, value]) => value > 0).map(([name, value]) => ({ name, value }))
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}只 ({d}%)' },
      legend: { orient: 'horizontal', bottom: 0, left: 'center', textStyle: { color: theme.colorTextSecondary, fontSize: 11 } },
      series: [{
        name: '各股分布',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: theme.colorBgElevated, borderWidth: 2 },
        label: { show: true, position: 'outer', formatter: '{b}\n{c}只', fontSize: 11, color: theme.colorTextSecondary },
        emphasis: { label: { show: true, fontSize: 13, fontWeight: 'bold', color: theme.colorTextHeading } },
        data,
      }],
      color: [upColor, '#FF7875', theme.colorWarning, '#95DE64', downColor],
    })
  }, [stocks, theme, upColor, downColor])

  // ---- Three.js: 3D 中国地图 ----
  useEffect(() => {
    const container = mapContainerRef.current
    if (!container)
      return
    const W = container.clientWidth
    const H = container.clientHeight
    let cleanup = false

    const bgColor = new THREE.Color(theme.colorBgElevated)
    const borderColor = new THREE.Color(theme.colorBorderSecondary).getHex()
    const hoverColor = new THREE.Color(theme.colorPrimary).getHex()
    const baseColor = new THREE.Color(theme.colorPrimary)

    const scene = new THREE.Scene()
    scene.background = bgColor
    scene.add(new THREE.AmbientLight(0x8899AA, 0.6))
    const dl = new THREE.DirectionalLight(0xFFFFFF, 0.75); dl.position.set(5, 12, 8); scene.add(dl)
    const dl2 = new THREE.DirectionalLight(0x8899CC, 0.25); dl2.position.set(-3, 5, -4); scene.add(dl2)

    const cam = new THREE.PerspectiveCamera(32, W / H, 0.1, 50)
    cam.position.set(0, 14, 0); cam.up.set(0, 0, 1); cam.lookAt(0, 0, 0)

    const rdr = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rdr.setSize(W, H); rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(rdr.domElement)

    const controls = new OrbitControls(cam, rdr.domElement)
    controls.enableDamping = true; controls.dampingFactor = 0.08
    controls.enableRotate = false; controls.target.set(0, 0, 0)
    controls.minZoom = 0.4; controls.maxZoom = 8; controls.update()

    const root = new THREE.Group(); scene.add(root)
    const allMeshes: THREE.Mesh[] = []
    const hoveredRef = { current: null as THREE.Mesh | null }
    const raycaster = new THREE.Raycaster(); const mouse = new THREE.Vector2()

    function clearGroup(g: THREE.Group) {
      while (g.children.length > 0) {
        const child = g.children[0]; g.remove(child)
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
          child.geometry?.dispose()
          const mat = child.material
          if (mat instanceof THREE.Material)
            mat.dispose()
          else if (Array.isArray(mat))
            mat.forEach(m => m.dispose())
        }
      }
    }

    function renderGeo(adcode: string, name?: string) {
      currentAdcodeRef.current = adcode
      currentNameRef.current = name || ''
      const url = `/geo/${adcode}_full.json`

      fetch(url).then(r => r.json()).then((geo: any) => {
        if (cleanup)
          return
        const features: FeatureData[] = geo.features
          .filter((f: any) => f.properties?.name)
          .map((f: any) => {
            const geoms = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates
            return { name: f.properties.name, adcode: f.properties.adcode?.toString() || '', polygons: geoms.map((rg: any[]) => ({ outer: rg[0], holes: rg.slice(1) })) }
          })
        if (features.length === 0)
          return

        const project = buildLambertProjector()
        let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity
        features.forEach(f => f.polygons.forEach(poly => poly.outer.forEach(([lng, lat]) => {
          const [x, y] = project(lng, lat)
          if (x < minX)
            minX = x; if (x > maxX)
            maxX = x
          if (y < minY)
            minY = y; if (y > maxY)
            maxY = y
        })))
        const dw = maxX - minX || 1; const dh = maxY - minY || 1
        const scale = 7.0 / Math.max(dw, dh)
        const cx = (minX + maxX) / 2 * scale; const cy = (minY + maxY) / 2 * scale
        const toXY = (lng: number, lat: number): [number, number] => {
          const [x, y] = project(lng, lat); return [cx - x * scale, cy - y * scale]
        }

        const isNational = adcode === '100000'
        const dataMap: Record<string, number> = {}
        let minVal = Infinity; let maxVal = -Infinity
        if (isNational) {
          features.forEach((f) => {
            const v = PROVINCE_GDP[f.name] ?? 0; dataMap[f.name] = v; if (v < minVal)
              minVal = v; if (v > maxVal)
              maxVal = v
          })
        }
        else {
          features.forEach((f) => {
            const v = Math.round(Math.random() * 9000 + 500); dataMap[f.name] = v; if (v < minVal)
              minVal = v; if (v > maxVal)
              maxVal = v
          })
        }

        clearGroup(root); allMeshes.length = 0
        if (hoveredRef.current) { hoveredRef.current = null; setMapTooltip(null) }

        const EXTRUDE_DEPTH = 0.18
        features.forEach((feat) => {
          const value = dataMap[feat.name] ?? 0
          const t = maxVal > minVal ? (value - minVal) / (maxVal - minVal) : 0.5
          const color = heatColor(t, baseColor)
          feat.polygons.forEach((polyData) => {
            const outer = polyData.outer
            if (outer.length < 3)
              return
            try {
              const shape = new THREE.Shape()
              const [sx, sy] = toXY(outer[0][0], outer[0][1])
              shape.moveTo(sx, sy)
              for (let i = 1; i < outer.length; i++) { const [x, y] = toXY(outer[i][0], outer[i][1]); shape.lineTo(x, y) }
              shape.closePath()
              polyData.holes.forEach((hole) => {
                if (hole.length < 3)
                  return
                const hp = new THREE.Path()
                const [hx, hy] = toXY(hole[0][0], hole[0][1]); hp.moveTo(hx, hy)
                for (let i = 1; i < hole.length; i++) { const [x, y] = toXY(hole[i][0], hole[i][1]); hp.lineTo(x, y) }
                hp.closePath(); shape.holes.push(hp)
              })
              const geom = new THREE.ExtrudeGeometry(shape, { depth: EXTRUDE_DEPTH, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 })
              geom.rotateX(-Math.PI / 2); geom.translate(0, -EXTRUDE_DEPTH, 0)
              const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1 })
              const mesh = new THREE.Mesh(geom, mat)
              mesh.userData = { name: feat.name, adcode: feat.adcode, value, originalColor: color }
              root.add(mesh); allMeshes.push(mesh)
              const edges = new THREE.EdgesGeometry(geom, 15)
              root.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: borderColor, transparent: true, opacity: 0.5, depthTest: true })))
            }
            catch { /* skip */ }
          })
        })

        cam.position.set(0, 14, 0); cam.up.set(0, 0, 1); cam.lookAt(0, 0, 0)
        controls.target.set(0, 0, 0); controls.update()
        setMapLegend({ min: minVal, max: maxVal })
        if (isNational) { setMapLevel('national'); setMapCurrentName('') }
        else { setMapLevel('provincial'); setMapCurrentName(name || '') }
      }).catch(err => console.warn('Geo fetch failed:', err))
    }

    renderGeoRef.current = renderGeo

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, cam)
      const intersects = raycaster.intersectObjects(allMeshes, false)
      if (hoveredRef.current) {
        const p = hoveredRef.current
        ;(p.material as THREE.MeshStandardMaterial).color.setHex(p.userData.originalColor)
        ;(p.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000)
        hoveredRef.current = null; setMapTooltip(null)
      }
      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh
        if (obj.userData.name) {
          ;(obj.material as THREE.MeshStandardMaterial).color.setHex(hoverColor)
          ;(obj.material as THREE.MeshStandardMaterial).emissive.setHex(new THREE.Color(hoverColor).multiplyScalar(0.3).getHex())
          hoveredRef.current = obj
          setMapTooltip({ name: obj.userData.name, value: obj.userData.value, x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
      }
    }
    container.addEventListener('mousemove', onMouseMove)

    let mouseDownPos: { x: number, y: number } | null = null
    const onMouseDown = (e: MouseEvent) => { mouseDownPos = { x: e.clientX, y: e.clientY } }
    const onMouseUp = (e: MouseEvent) => {
      if (!mouseDownPos)
        return
      const dx = e.clientX - mouseDownPos.x; const dy = e.clientY - mouseDownPos.y
      mouseDownPos = null
      if (Math.sqrt(dx * dx + dy * dy) > 5)
        return
      if (levelRef.current !== 'national')
        return
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1; mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, cam)
      const intersects = raycaster.intersectObjects(allMeshes, false)
      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh
        const adcode = obj.userData.adcode
        if (adcode && adcode !== '100000')
          renderGeo(adcode, obj.userData.name)
      }
    }
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseup', onMouseUp)

    function anim() {
      if (cleanup)
        return; requestAnimationFrame(anim); controls.update(); rdr.render(scene, cam)
    }
    anim()
    renderGeo(currentAdcodeRef.current, currentNameRef.current)

    const onResize = () => { const w = container.clientWidth; const h = container.clientHeight; cam.aspect = w / h; cam.updateProjectionMatrix(); rdr.setSize(w, h) }
    window.addEventListener('resize', onResize)

    return () => {
      cleanup = true; controls.dispose(); window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mouseup', onMouseUp)
      clearGroup(root); rdr.dispose()
      if (container.contains(rdr.domElement))
        container.removeChild(rdr.domElement)
    }
  }, [theme])

  // Resize & Cleanup
  useChartResize(trendEl, pieEl, gaugeEl, barEl, stockDistEl)

  const timeStr = `${now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' })} ${now.toLocaleTimeString('zh-CN', { hour12: false })}`

  const handleMapBack = () => renderGeoRef.current('100000')

  const columns = [
    { title: '代码', dataIndex: 'code', key: 'code', width: 90 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 120, render: (v: number, r: any) => (
      <Space size={4}>
        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{v.toFixed(2)}</span>
        {r.lastTickUp === true && <span style={{ color: upColor, fontSize: 9 }}>▲</span>}
        {r.lastTickUp === false && <span style={{ color: downColor, fontSize: 9 }}>▼</span>}
      </Space>
    ) },
    { title: '涨跌额', dataIndex: 'change', key: 'change', width: 90, render: (v: number, r: any) => (
      <span className={r.up ? styles.textUp : styles.textDown}>
        {v > 0 ? '+' : ''}
        {v.toFixed(2)}
      </span>
    ) },
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 90, render: (v: number, r: any) => (
      <span className={r.up ? styles.textUp : styles.textDown}>
        {v > 0 ? '+' : ''}
        {v.toFixed(2)}
        %
      </span>
    ) },
    { title: '成交量(万手)', dataIndex: 'volume', key: 'volume', width: 110, render: (v: number) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{v.toFixed(1)}</span> },
    { title: '方向', dataIndex: 'up', key: 'up', width: 60, render: (up: boolean) => up ? <Tag color="red" style={{ margin: 0 }}>涨</Tag> : <Tag color="green" style={{ margin: 0 }}>跌</Tag> },
  ]

  return (
    <div className={styles.wrapper} onDoubleClick={enterMaximize}>
      <div className={styles.container}>
        {/* 顶部标题栏 */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>金融数据大屏</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <Badge status="processing" />
              <span style={{ color: theme.colorTextSecondary, fontSize: 12 }}>模拟实时交易 · 数据每 1.5 秒刷新</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div className={styles.breadthItem}>
              <span className={styles.breadthLabel}>上涨</span>
              <span className={styles.breadthValueUp}>{breadth.up}</span>
            </div>
            <div className={styles.breadthItem}>
              <span className={styles.breadthLabel}>下跌</span>
              <span className={styles.breadthValueDown}>{breadth.down}</span>
            </div>
            <div className={styles.breadthItem}>
              <span className={styles.breadthLabel}>平盘</span>
              <span className={styles.breadthValueFlat}>{breadth.flat}</span>
            </div>
            <span className={styles.headerTime}>{timeStr}</span>
          </div>
        </div>

        {/* KPI 指标卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {indexCards.map((item, i) => (
            <Col xs={12} sm={12} md={6} key={i}>
              <div className={styles.statCard}>
                <Text style={{ color: theme.colorTextSecondary, fontSize: 13 }}>{item.name}</Text>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
                  <Statistic value={item.value} precision={2} valueStyle={{ color: theme.colorTextHeading, fontSize: 26, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }} />
                  <Space size={4}>
                    {item.up ? <CaretUpOutlined style={{ color: upColor }} /> : <CaretDownOutlined style={{ color: downColor }} />}
                    <span style={{ color: item.up ? upColor : downColor, fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                      {item.change > 0 ? '+' : ''}
                      {item.change.toFixed(2)}
                    </span>
                    <span style={{ color: item.up ? upColor : downColor, fontSize: 13, marginLeft: 2, fontVariantNumeric: 'tabular-nums' }}>
                      {item.changePercent > 0 ? '+' : ''}
                      {item.changePercent.toFixed(2)}
                      %
                    </span>
                  </Space>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* 图表区域 1: 各股分布 + 3D 中国地图 + 右侧图表 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={7}>
            <div className={styles.chartCard} style={{ height: 502 }}>
              <div className={styles.chartTitle}>各股分布</div>
              <div ref={stockDistEl} style={{ width: '100%', flex: 1, minHeight: 0 }} />
            </div>
          </Col>
          <Col xs={24} lg={10}>
            <div className={styles.chartCard} style={{ height: 502, padding: 0 }}>
              <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 0 }}>
                <div ref={mapContainerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
                {mapLevel === 'provincial' && (
                  <Button style={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }} onClick={handleMapBack} size="small">← 返回全国</Button>
                )}
                <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: `${theme.colorBgElevated}DD`, padding: '4px 12px', borderRadius: theme.borderRadius, fontSize: 13, fontWeight: 600, color: theme.colorTextSecondary, border: `1px solid ${theme.colorBorderSecondary}` }}>
                  {mapLevel === 'national' ? '全国 GDP 热力图' : `${shortName(mapCurrentName)} · 区县分布`}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: theme.colorTextSecondary, background: `${theme.colorBgElevated}DD`, padding: '6px 12px', borderRadius: theme.borderRadius, border: `1px solid ${theme.colorBorderSecondary}`, fontVariantNumeric: 'tabular-nums' }}>
                  <span>{fmtVal(mapLegend.min)}</span>
                  <div style={{ width: 120, height: 8, borderRadius: 4, background: `linear-gradient(to right, ${heatColorHex(0, new THREE.Color(theme.colorPrimary))}, ${heatColorHex(1, new THREE.Color(theme.colorPrimary))})` }} />
                  <span>{fmtVal(mapLegend.max)}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 10, fontSize: 11, color: theme.colorTextTertiary, background: `${theme.colorBgElevated}AA`, padding: '4px 10px', borderRadius: theme.borderRadius }}>
                  {mapLevel === 'national' ? '🖱 点击省份下钻 · 拖拽缩放' : '拖拽缩放'}
                </div>
                {mapTooltip && (
                  <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, background: theme.colorBgElevated, color: theme.colorText, padding: '6px 12px', borderRadius: theme.borderRadius, fontSize: 13, fontWeight: 600, border: `1px solid ${theme.colorPrimaryBorder}`, whiteSpace: 'nowrap', transform: 'translate(-50%, -130%)', boxShadow: theme.boxShadowSecondary, left: mapTooltip.x, top: mapTooltip.y }}>
                    {shortName(mapTooltip.name)}
                    <span style={{ marginLeft: 8, color: theme.colorPrimary, fontWeight: 700 }}>{fmtVal(mapTooltip.value)}</span>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} lg={7}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 502 }}>
              <div className={styles.chartCard} style={{ flex: 1, minHeight: 0 }}>
                <div className={styles.chartTitle}>板块资金流向 (亿元)</div>
                <div ref={pieEl} style={{ width: '100%', flex: 1, minHeight: 0 }} />
              </div>
              <div className={styles.chartCard} style={{ flex: 1, minHeight: 0 }}>
                <div className={styles.chartTitle}>恐慌贪婪指数</div>
                <div ref={gaugeEl} style={{ width: '100%', flex: 1, minHeight: 0 }} />
              </div>
            </div>
          </Col>
        </Row>

        {/* 图表区域 2: 指数走势 + 行业排行 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={12}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>指数走势 (归一化涨跌幅 %)</div>
              <div ref={trendEl} style={{ width: '100%', height: 280 }} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>行业涨跌幅排行</div>
              <div ref={barEl} style={{ width: '100%', height: 280 }} />
            </div>
          </Col>
        </Row>

        {/* 热门股票表格 */}
        <div className={styles.chartCard} style={{ marginBottom: 12 }}>
          <div className={styles.sectionTitle}>热门个股实时行情</div>
          <div className={styles.tableWrapper}>
            <Table columns={columns} dataSource={stockRows} pagination={false} size="small" />
          </div>
        </div>

        {/* 底部消息滚动条 */}
        <div className={styles.ticker}>
          <span style={{ color: theme.colorPrimary, marginRight: 12 }}>📢 市场快讯</span>
          <span key={newsIdx} className={styles.newsFade}>{NEWS[newsIdx]}</span>
        </div>
      </div>
    </div>
  )
}
