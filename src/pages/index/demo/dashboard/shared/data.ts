// ============================================================
// Dashboard 共享模拟数据
// ============================================================

// 工具函数
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
export const randomWalk = (prev: number, vol: number, min: number, max: number) => clamp(prev + (Math.random() - 0.5) * vol, min, max)

// 类型
export interface Stock {
  code: string
  name: string
  price: number
  prevClose: number
  volume: number
  lastTickUp: boolean | null
}

export interface IndexItem {
  name: string
  value: number
  prevClose: number
}

// 初始个股数据
export const INIT_STOCKS: Stock[] = [
  { code: '600519', name: '贵州茅台', price: 1680.50, prevClose: 1645.30, volume: 125.6, lastTickUp: null },
  { code: '000858', name: '五粮液', price: 158.30, prevClose: 152.62, volume: 98.3, lastTickUp: null },
  { code: '300750', name: '宁德时代', price: 268.45, prevClose: 273.00, volume: 76.8, lastTickUp: null },
  { code: '002594', name: '比亚迪', price: 318.20, prevClose: 309.30, volume: 65.2, lastTickUp: null },
  { code: '601318', name: '中国平安', price: 42.15, prevClose: 41.30, volume: 58.9, lastTickUp: null },
  { code: '600036', name: '招商银行', price: 35.68, prevClose: 36.10, volume: 52.1, lastTickUp: null },
  { code: '000001', name: '平安银行', price: 12.35, prevClose: 12.07, volume: 48.7, lastTickUp: null },
  { code: '002415', name: '海康威视', price: 36.50, prevClose: 37.65, volume: 42.3, lastTickUp: null },
  { code: '688981', name: '中芯国际', price: 56.78, prevClose: 54.44, volume: 38.6, lastTickUp: null },
  { code: '300059', name: '东方财富', price: 17.82, prevClose: 17.26, volume: 35.4, lastTickUp: null },
]

// 指数初始数据
export const INIT_INDICES: IndexItem[] = [
  { name: '上证指数', value: 3285.63, prevClose: 3243.45 },
  { name: '深证成指', value: 11863.52, prevClose: 11886.97 },
  { name: '创业板指', value: 2456.78, prevClose: 2437.86 },
  { name: '沪深300', value: 3980.15, prevClose: 3974.48 },
]

// 板块资金流向
export const INIT_SECTORS = [
  { name: '新能源', value: 125.8 },
  { name: '半导体', value: 98.3 },
  { name: '医药生物', value: 76.5 },
  { name: '食品饮料', value: 65.2 },
  { name: '银行', value: 58.7 },
  { name: '军工', value: 52.1 },
  { name: '房地产', value: -34.6 },
  { name: '传媒', value: -28.3 },
]

// 行业涨跌幅
export const INIT_INDUSTRIES = [
  { name: '电池', change: 4.32 },
  { name: '光伏', change: 3.85 },
  { name: '半导体', change: 2.91 },
  { name: '白酒', change: 1.76 },
  { name: '医药', change: 0.82 },
  { name: '银行', change: -0.35 },
  { name: '地产', change: -1.12 },
  { name: '传媒', change: -1.88 },
  { name: '煤炭', change: -2.45 },
  { name: '石油', change: -3.02 },
]

// 新闻快讯
export const NEWS = [
  '央行今日开展2000亿元MLF操作，利率维持不变',
  '北向资金今日净流入58.3亿元，连续5日加仓A股',
  '证监会：进一步优化并购重组审核机制，提高市场效率',
  '工信部：加快新能源汽车产业发展，推动关键技术攻关',
  '统计局：三季度GDP同比增长5.2%，经济持续恢复向好',
  '财政部：1-9月全国一般公共预算收入同比增长6.8%',
  '发改委：推进新型基础设施建设，扩大有效投资',
  '商务部：前8月服务进出口总额同比增长8.4%',
]

// 趋势数据
export const TREND_TIMES = ['09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00']
export const TREND_INIT = [
  [3262, 11880, 2440],
  [3271, 11890, 2445],
  [3268, 11875, 2442],
  [3278, 11870, 2450],
  [3280, 11860, 2452],
  [3275, 11855, 2455],
  [3282, 11862, 2458],
  [3285, 11865, 2456],
  [3285.63, 11863.52, 2456.78],
]

export const INDEX_NAMES = ['上证指数', '深证成指', '创业板指']
