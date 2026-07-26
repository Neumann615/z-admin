import * as THREE from 'three'

// ============================================================
// Lambert 等角圆锥投影 (适合中国中纬度东西伸展的版图)
// 标准纬线 25°N / 47°N, 原点 35°N 105°E
// ============================================================
export function buildLambertProjector() {
  const DEG = Math.PI / 180
  const φ1 = 25 * DEG
  const φ2 = 47 * DEG
  const φ0 = 35 * DEG
  const λ0 = 105 * DEG

  const n = Math.log(Math.cos(φ1) / Math.cos(φ2))
    / Math.log(Math.tan(Math.PI / 4 + φ2 / 2) / Math.tan(Math.PI / 4 + φ1 / 2))
  const F = (Math.cos(φ1) * Math.tan(Math.PI / 4 + φ1 / 2) ** n) / n
  const ρ0 = F / Math.tan(Math.PI / 4 + φ0 / 2) ** n

  return (lng: number, lat: number): [number, number] => {
    const φ = lat * DEG
    const λ = lng * DEG
    const ρ = F / Math.tan(Math.PI / 4 + φ / 2) ** n
    const x = ρ * Math.sin(n * (λ - λ0))
    const y = ρ0 - ρ * Math.cos(n * (λ - λ0))
    return [x, y]
  }
}

// ============================================================
// 热力图颜色: 基于主题色, 从暗(低值)到亮(高值)
// ============================================================
export function heatColor(t: number, baseColor: THREE.Color): number {
  const c = new THREE.Color(baseColor)
  const hsl = { h: 0, s: 0, l: 0 }
  c.getHSL(hsl)
  c.setHSL(hsl.h, 0.45, 0.07 + t * 0.23)
  return c.getHex()
}

export function heatColorHex(t: number, baseColor: THREE.Color): string {
  return new THREE.Color(heatColor(t, baseColor)).getStyle()
}

// ============================================================
// GeoJSON 特征类型
// ============================================================
export interface FeatureData {
  name: string
  adcode: string
  polygons: Array<{ outer: Array<[number, number]>, holes: Array<Array<[number, number]>> }>
}

// ============================================================
// 省份 GDP 模拟数据 (亿元)
// ============================================================
export const PROVINCE_GDP: Record<string, number> = {
  广东省: 124369,
  江苏省: 116364,
  山东省: 87435,
  浙江省: 77715,
  河南省: 61345,
  四川省: 53851,
  湖北省: 50013,
  福建省: 48810,
  湖南省: 46063,
  上海市: 43215,
  安徽省: 43005,
  河北省: 40391,
  北京市: 40269,
  陕西省: 32772,
  江西省: 32074,
  重庆市: 29129,
  辽宁省: 28975,
  云南省: 28954,
  广西壮族自治区: 26301,
  山西省: 23000,
  内蒙古自治区: 20500,
  贵州省: 20164,
  新疆维吾尔自治区: 17742,
  天津市: 16311,
  黑龙江省: 15884,
  吉林省: 13200,
  甘肃省: 11201,
  海南省: 6475,
  宁夏回族自治区: 5069,
  青海省: 3615,
  西藏自治区: 2139,
  香港特别行政区: 28000,
  澳门特别行政区: 2500,
  台湾省: 48000,
}

// ============================================================
// 辅助函数
// ============================================================
export function shortName(name: string) {
  return name
    .replace('特别行政区', '')
    .replace('壮族自治区', '')
    .replace('回族自治区', '')
    .replace('维吾尔自治区', '')
    .replace('自治区', '')
    .replace('省', '')
    .replace('市', '')
}

export function fmtVal(v: number) {
  return v >= 10000 ? `${(v / 10000).toFixed(2)}万亿` : `${v}亿`
}
