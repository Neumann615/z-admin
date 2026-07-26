import {
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons'
import { useMaximize } from '@zealous-admin/layout/index'
import {
  Badge,
  Col,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useRef } from 'react'
import {
  INDEX_NAMES,
  useChart,
  useChartResize,
  useClock,
  useDashboardData,
  useIndexCards,
  useNewsScroll,
  useStockRows,
} from './shared/hooks'
import { getUpDownColors, useDashboardStyles } from './shared/styles'

const { Text } = Typography

// ============================================================
// 组件
// ============================================================
export default function Dashboard1() {
  const { styles, theme } = useDashboardStyles()
  const { enterMaximize } = useMaximize()
  const { upColor, downColor } = getUpDownColors(theme)

  // 动态数据
  const { stocks, indices, sentiment, sectors, industries, breadth, trendRef, trendTick } = useDashboardData()
  const now = useClock()
  const { newsIdx, newsList } = useNewsScroll()

  // 派生数据
  const indexCards = useIndexCards(indices)
  const stockRows = useStockRows(stocks)

  // ECharts DOM refs
  const trendEl = useRef<HTMLDivElement>(null)
  const pieEl = useRef<HTMLDivElement>(null)
  const gaugeEl = useRef<HTMLDivElement>(null)
  const barEl = useRef<HTMLDivElement>(null)
  const scatterEl = useRef<HTMLDivElement>(null)

  // ---- ECharts: 指数走势 ----
  useEffect(() => {
    const chart = useChart(trendEl.current)
    if (!chart) return
    const tr = trendRef.current
    const base = tr.data[0]
    chart.setOption({
      grid: { left: 50, right: 20, top: 20, bottom: 40 },
      tooltip: { trigger: 'axis', valueFormatter: (v: number) => `${v.toFixed(2)}%` },
      legend: { data: INDEX_NAMES, bottom: 0, textStyle: { color: theme.colorTextSecondary, fontSize: 11 } },
      xAxis: {
        type: 'category', data: tr.times, boundaryGap: false,
        axisLine: { lineStyle: { color: theme.colorBorderSecondary } },
        axisLabel: { color: theme.colorTextTertiary, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}%', color: theme.colorTextTertiary, fontSize: 10 },
        splitLine: { lineStyle: { color: theme.colorBorderSecondary } },
      },
      series: INDEX_NAMES.map((name, i) => ({
        name, type: 'line',
        data: tr.data.map(d => +((d[i] - base[i]) / base[i] * 100).toFixed(2)),
        smooth: true, symbol: 'none', lineStyle: { width: 2 },
        areaStyle: i === 0 ? { opacity: 0.06 } : undefined,
      })),
      color: [theme.colorPrimary, theme.colorWarning, theme.colorSuccess],
    })
  }, [trendTick, theme])

  // ---- ECharts: 板块资金流向 ----
  useEffect(() => {
    const chart = useChart(pieEl.current)
    if (!chart) return
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
    if (!chart) return
    const v = Math.round(sentiment)
    const label = v >= 75 ? '极度贪婪' : v >= 55 ? '贪婪' : v >= 45 ? '中性' : v >= 25 ? '恐慌' : '极度恐慌'
    chart.setOption({
      series: [{
        type: 'gauge', min: 0, max: 100, radius: '92%',
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
    if (!chart) return
    const sorted = [...industries].sort((a, b) => a.change - b.change)
    chart.setOption({
      grid: { left: 55, right: 45, top: 10, bottom: 24 },
      tooltip: { formatter: '{b}: {c}%' },
      xAxis: { type: 'value', axisLabel: { formatter: '{value}%', color: theme.colorTextTertiary, fontSize: 10 }, splitLine: { lineStyle: { color: theme.colorBorderSecondary } } },
      yAxis: { type: 'category', data: sorted.map(i => i.name), axisLine: { lineStyle: { color: theme.colorBorderSecondary } }, axisLabel: { color: theme.colorTextSecondary, fontSize: 11 } },
      series: [{
        type: 'bar', barWidth: '55%',
        data: sorted.map(i => ({ value: +i.change.toFixed(2), itemStyle: { color: i.change >= 0 ? upColor : downColor, borderRadius: [0, 3, 3, 0] } })),
        label: { show: true, position: 'right', formatter: (p: any) => `${p.value}%`, fontSize: 10, color: theme.colorTextSecondary },
      }],
    })
  }, [industries, theme, upColor, downColor])

  // ---- ECharts: 个股分布散点图 ----
  useEffect(() => {
    const chart = useChart(scatterEl.current)
    if (!chart) return
    chart.setOption({
      grid: { left: 48, right: 20, top: 20, bottom: 38 },
      tooltip: { formatter: (p: any) => `${p.data[3]} (${p.data[4]})<br/>价格: ¥${p.data[1].toFixed(2)}<br/>涨跌: ${p.data[0].toFixed(2)}%<br/>成交: ${p.data[2].toFixed(1)}万手` },
      xAxis: { type: 'value', name: '涨跌幅(%)', nameTextStyle: { color: theme.colorTextTertiary, fontSize: 10 }, axisLabel: { formatter: '{value}%', color: theme.colorTextTertiary, fontSize: 10 }, splitLine: { lineStyle: { color: theme.colorBorderSecondary } } },
      yAxis: { type: 'value', name: '价格(元)', nameTextStyle: { color: theme.colorTextTertiary, fontSize: 10 }, axisLabel: { color: theme.colorTextTertiary, fontSize: 10 }, splitLine: { lineStyle: { color: theme.colorBorderSecondary } } },
      series: [{
        type: 'scatter',
        data: stocks.map((s) => {
          const changePercent = ((s.price - s.prevClose) / s.prevClose) * 100
          return { value: [+changePercent.toFixed(2), +s.price.toFixed(2), s.volume, s.name, s.code], itemStyle: { color: changePercent >= 0 ? upColor : downColor, opacity: 0.72 } }
        }),
        symbolSize: (val: number[]) => Math.max(8, Math.sqrt(val[2]) * 2.8),
      }],
    })
  }, [stocks, theme, upColor, downColor])

  // Resize & Cleanup
  useChartResize(trendEl, pieEl, gaugeEl, barEl, scatterEl)

  // 时间格式化
  const timeStr = `${now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' })} ${now.toLocaleTimeString('zh-CN', { hour12: false })}`

  // 表格列
  const columns = [
    { title: '代码', dataIndex: 'code', key: 'code', width: 90 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 120, render: (v: number, r: any) => (
      <Space size={4}>
        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{v.toFixed(2)}</span>
        {r.lastTickUp === true && <span style={{ color: upColor, fontSize: 9 }}>▲</span>}
        {r.lastTickUp === false && <span style={{ color: downColor, fontSize: 9 }}>▼</span>}
      </Space>
    )},
    { title: '涨跌额', dataIndex: 'change', key: 'change', width: 90, render: (v: number, r: any) => (
      <span className={r.up ? styles.textUp : styles.textDown}>{v > 0 ? '+' : ''}{v.toFixed(2)}</span>
    )},
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 90, render: (v: number, r: any) => (
      <span className={r.up ? styles.textUp : styles.textDown}>{v > 0 ? '+' : ''}{v.toFixed(2)}%</span>
    )},
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
                    <span style={{ color: item.up ? upColor : downColor, fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{item.change > 0 ? '+' : ''}{item.change.toFixed(2)}</span>
                    <span style={{ color: item.up ? upColor : downColor, fontSize: 13, marginLeft: 2, fontVariantNumeric: 'tabular-nums' }}>{item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                  </Space>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* 图表区域 1: 走势 + 资金流向 + 情绪指数 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={14}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>指数走势 (归一化涨跌幅 %)</div>
              <div ref={trendEl} style={{ width: '100%', height: 280 }} />
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <div className={styles.chartCard} style={{ height: '100%' }}>
              <div className={styles.chartTitle}>板块资金流向 (亿元)</div>
              <div ref={pieEl} style={{ width: '100%', height: 280 }} />
            </div>
          </Col>
          <Col xs={24} lg={4}>
            <div className={styles.chartCard} style={{ height: '100%' }}>
              <div className={styles.chartTitle}>恐慌贪婪指数</div>
              <div ref={gaugeEl} style={{ width: '100%', height: 280 }} />
            </div>
          </Col>
        </Row>

        {/* 图表区域 2: 行业排行 + 个股分布 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} lg={12}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>行业涨跌幅排行</div>
              <div ref={barEl} style={{ width: '100%', height: 260 }} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>个股分布 (涨跌幅 × 价格, 气泡=成交量)</div>
              <div ref={scatterEl} style={{ width: '100%', height: 260 }} />
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
          <span key={newsIdx} className={styles.newsFade}>{newsList[newsIdx]}</span>
        </div>
      </div>
    </div>
  )
}
