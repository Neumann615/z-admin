/**
 * 日期时间工具函数
 * 提供日期格式化、防抖节流、倒计时等功能
 */

/**
 * 日期格式化
 * @param date 日期对象或时间戳
 * @param format 格式化字符串，支持 YYYY, MM, DD, HH, mm, ss
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = typeof date === 'number' ? new Date(date) : date

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param options 选项：leading-是否在延迟开始前执行，trailing-是否在延迟结束后执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: { leading?: boolean, trailing?: boolean } = {},
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  let isLeadingCalled = false

  const { leading = false, trailing = !leading } = options

  return function (this: any, ...args: Parameters<T>) {
    const context = this

    if (timer === null && leading && !isLeadingCalled) {
      fn.apply(context, args)
      isLeadingCalled = true
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      if (trailing) {
        fn.apply(context, args)
      }
      timer = null
      isLeadingCalled = false
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param delay 节流时间（毫秒）
 * @param options 选项：leading-是否在延迟开始前执行，trailing-是否在延迟结束后执行
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: { leading?: boolean, trailing?: boolean } = {},
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastTime = 0
  const { leading = true, trailing = true } = options

  return function (this: any, ...args: Parameters<T>) {
    const context = this
    const now = Date.now()

    if (!lastTime && leading) {
      fn.apply(context, args)
      lastTime = now
      return
    }

    if (now - lastTime >= delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(context, args)
      lastTime = now
    }
    else if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        lastTime = Date.now()
        timer = null
      }, delay - (now - lastTime))
    }
  }
}

/**
 * 获取倒计时对象
 * @param targetTime 目标时间（Date对象或时间戳）
 * @returns 包含天、时、分、秒的对象
 */
export function getCountdown(targetTime: Date | number): { days: number, hours: number, minutes: number, seconds: number } {
  const target = typeof targetTime === 'number' ? targetTime : targetTime.getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

/**
 * 格式化倒计时
 * @param targetTime 目标时间
 * @param format 格式化字符串，支持 D, H, M, S
 * @returns 格式化后的倒计时字符串
 */
export function formatCountdown(targetTime: Date | number, format: string = 'D天H时M分S秒'): string {
  const { days, hours, minutes, seconds } = getCountdown(targetTime)

  return format
    .replace('D', String(days))
    .replace('H', String(hours).padStart(2, '0'))
    .replace('M', String(minutes).padStart(2, '0'))
    .replace('S', String(seconds).padStart(2, '0'))
}

/**
 * 获取时间戳（毫秒）
 * @param date 可选的日期对象，默认为当前时间
 * @returns 时间戳（毫秒）
 */
export function getTimestamp(date?: Date): number {
  return date ? date.getTime() : Date.now()
}

/**
 * 获取时间戳（秒）
 * @param date 可选的日期对象，默认为当前时间
 * @returns 时间戳（秒）
 */
export function getTimestampSeconds(date?: Date): number {
  return Math.floor(getTimestamp(date) / 1000)
}

/**
 * 判断是否为今天
 * @param date 日期对象或时间戳
 * @returns true 表示是今天
 */
export function isToday(date: Date | number): boolean {
  const d = typeof date === 'number' ? new Date(date) : date
  const today = new Date()

  return d.toDateString() === today.toDateString()
}

/**
 * 判断是否为昨天
 * @param date 日期对象或时间戳
 * @returns true 表示是昨天
 */
export function isYesterday(date: Date | number): boolean {
  const d = typeof date === 'number' ? new Date(date) : date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return d.toDateString() === yesterday.toDateString()
}

/**
 * 判断是否为本周
 * @param date 日期对象或时间戳
 * @returns true 表示是本周
 */
export function isThisWeek(date: Date | number): boolean {
  const d = typeof date === 'number' ? new Date(date) : date
  const now = new Date()

  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)

  return d >= startOfWeek && d < endOfWeek
}

/**
 * 判断是否为本月
 * @param date 日期对象或时间戳
 * @returns true 表示是本月
 */
export function isThisMonth(date: Date | number): boolean {
  const d = typeof date === 'number' ? new Date(date) : date
  const now = new Date()

  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

/**
 * 判断是否为今年
 * @param date 日期对象或时间戳
 * @returns true 表示是今年
 */
export function isThisYear(date: Date | number): boolean {
  const d = typeof date === 'number' ? new Date(date) : date
  const now = new Date()

  return d.getFullYear() === now.getFullYear()
}

/**
 * 计算两个日期之间的天数
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 天数差
 */
export function getDaysBetween(date1: Date | number, date2: Date | number): number {
  const d1 = typeof date1 === 'number' ? date1 : date1.getTime()
  const d2 = typeof date2 === 'number' ? date2 : date2.getTime()

  return Math.abs(Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)))
}

/**
 * 添加天数
 * @param date 原始日期
 * @param days 要添加的天数（负数表示减去）
 * @returns 新的日期对象
 */
export function addDays(date: Date | number, days: number): Date {
  const d = typeof date === 'number' ? new Date(date) : new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * 添加月份
 * @param date 原始日期
 * @param months 要添加的月份（负数表示减去）
 * @returns 新的日期对象
 */
export function addMonths(date: Date | number, months: number): Date {
  const d = typeof date === 'number' ? new Date(date) : new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

/**
 * 添加年份
 * @param date 原始日期
 * @param years 要添加的年份（负数表示减去）
 * @returns 新的日期对象
 */
export function addYears(date: Date | number, years: number): Date {
  const d = typeof date === 'number' ? new Date(date) : new Date(date)
  d.setFullYear(d.getFullYear() + years)
  return d
}

/**
 * 获取两个日期相差的年数
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 年数差
 */
export function getYearsBetween(startDate: Date | number, endDate: Date | number): number {
  const start = typeof startDate === 'number' ? new Date(startDate) : startDate
  const end = typeof endDate === 'number' ? new Date(endDate) : endDate

  let years = end.getFullYear() - start.getFullYear()

  if (end.getMonth() < start.getMonth()
    || (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())) {
    years--
  }

  return Math.abs(years)
}
