// 类型定义
interface IdCardInfo {
  isValid: true
  rawId: string
  id18: string
  id15: string | null
  regionCode: string
  birthDate: string // YYYY-MM-DD
  year: number
  month: number
  day: number
  age: number
  zodiac: string // 中文星座名
  chineseZodiac: string // 中文生肖
  gender: 'M' | 'F'
  sequence: number
  checksum: string // 18位校验码（数字或X）
  rawChecksum: string | null // 原始输入的校验码，15位时为null
}

function getZodiac(month: number, day: number): string {
  // 如果日期为 1月1日-1月19日 → 摩羯座（跨年）
  if (month === 1 && day <= 19)
    return '摩羯座'

  // 星座起始日期（月,日），从水瓶座到摩羯座（不含跨年部分）
  const zodiacStart: Array<[number, number, string]> = [
    [1, 20, '水瓶座'],
    [2, 19, '双鱼座'],
    [3, 21, '白羊座'],
    [4, 20, '金牛座'],
    [5, 21, '双子座'],
    [6, 22, '巨蟹座'],
    [7, 23, '狮子座'],
    [8, 23, '处女座'],
    [9, 23, '天秤座'],
    [10, 24, '天蝎座'],
    [11, 23, '射手座'],
    [12, 22, '摩羯座'],
  ]

  // 查找第一个起始日期大于当前日期的星座，则当前日期属于前一个星座
  for (let i = 0; i < zodiacStart.length; i++) {
    const [m, d, name] = zodiacStart[i]
    if (month < m || (month === m && day < d)) {
      // 返回前一个星座的名称（i=0 时前一个是摩羯座）
      return i === 0 ? '摩羯座' : zodiacStart[i - 1][2]
    }
  }
  // 如果所有起始日期都小于等于当前日期，则为最后一个星座（摩羯座）
  return '摩羯座'
}

// 辅助：计算生肖（简化：以公历年份）
function getChineseZodiac(year: number): string {
  return ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'][(year - 4) % 12]
}

// 辅助：15位转18位
function convert15to18(id15: string): string | null {
  if (!/^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/.test(id15))
    return null
  const id17 = `${id15.slice(0, 6)}19${id15.slice(6)}`
  const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  for (let i = 0; i < 17; i++) sum += parseInt(id17[i], 10) * weight[i]
  return id17 + checkMap[sum % 11]
}

/**
 * 验证并提取身份证全部信息
 * @param idCard 身份证号码
 * @returns 有效时返回 IdCardInfo，无效返回 false
 */
export function validateAndExtractIdCard(idCard: string): IdCardInfo | false {
  if (typeof idCard !== 'string')
    return false
  const raw = idCard.trim().toUpperCase()
  if (!raw)
    return false

  // 正则（15位和18位）
  const regex15 = /^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/
  const regex18 = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/

  let id18: string | null = null
  let id15: string | null = null
  let isOriginal18 = false
  let isOriginal15 = false

  // 1. 18位身份证校验（完整）
  if (regex18.test(raw)) {
    isOriginal18 = true
    id18 = raw

    // 校验码验证
    const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < 17; i++) {
      const ch = id18[i]
      if (ch < '0' || ch > '9')
        return false
      sum += (ch.charCodeAt(0) - 48) * weight[i]
    }
    if (checkMap[sum % 11] !== id18[17])
      return false
  }
  // 2. 15位身份证校验（无校验码，仅检查格式和出生日期）
  else if (regex15.test(raw)) {
    isOriginal15 = true
    id15 = raw
    // 15位转18位仅用于生成 id18 字段（不参与校验），以便统一输出
    id18 = convert15to18(raw)
    if (!id18)
      return false

    // 直接校验15位的出生日期（无需校验码）
    const year = parseInt(`19${id15.slice(6, 8)}`, 10)
    const month = parseInt(id15.slice(8, 10), 10)
    const day = parseInt(id15.slice(10, 12), 10)
    const birthDateObj = new Date(year, month - 1, day)
    if (birthDateObj.getFullYear() !== year || birthDateObj.getMonth() + 1 !== month || birthDateObj.getDate() !== day) {
      return false
    }
  }
  else {
    return false
  }

  // 提取公共信息（id18 此时一定存在）
  if (!id18)
    return false

  const regionCode = id18.slice(0, 6)
  const year = parseInt(id18.slice(6, 10), 10)
  const month = parseInt(id18.slice(10, 12), 10)
  const day = parseInt(id18.slice(12, 14), 10)
  const sequence = parseInt(id18.slice(14, 17), 10)
  const checksum = id18[17]

  // 日期有效性二次确认（防止非法日期，如 2023-02-30）
  const birthDateObj = new Date(year, month - 1, day)
  if (birthDateObj.getFullYear() !== year || birthDateObj.getMonth() + 1 !== month || birthDateObj.getDate() !== day) {
    return false
  }

  // 年龄计算
  const today = new Date()
  let age = today.getFullYear() - year
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age--
  }

  return {
    isValid: true,
    rawId: raw,
    id18,
    id15: isOriginal15 ? id15 : null,
    regionCode,
    birthDate: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
    year,
    month,
    day,
    age,
    zodiac: getZodiac(month, day),
    chineseZodiac: getChineseZodiac(year),
    gender: sequence % 2 === 1 ? 'M' : 'F',
    sequence,
    checksum,
    rawChecksum: isOriginal18 ? id18[17] : null,
  }
}
