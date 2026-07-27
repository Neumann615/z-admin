/**
 * 环境判断工具函数
 * 提供运行环境、设备类型、浏览器信息等检测功能
 */

/**
 * 判断是否为浏览器环境
 * @returns true 表示浏览器环境，false 表示 Node.js 或其他环境
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 判断是否为 Node.js 环境
 * @returns true 表示 Node.js 环境，false 表示浏览器或其他环境
 */
export function isNode(): boolean {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return false
  }
  return typeof process !== 'undefined'
    && typeof process.versions !== 'undefined'
    && typeof process.versions.node !== 'undefined'
}

/**
 * 判断是否为微信小程序环境
 * @returns true 表示微信小程序环境
 */
export function isWechatMiniProgram(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('miniprogram') || (ua.includes('micromessenger') && (window as any).__wxjs_environment === 'miniprogram')
}

/**
 * 判断是否为微信浏览器
 * @returns true 表示微信内置浏览器
 */
export function isWechatBrowser(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger') && !isWechatMiniProgram()
}

/**
 * 判断是否为移动端设备
 * @returns true 表示移动端设备
 */
export function isMobile(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()
  const mobileRegex = /(android|iphone|ipad|ipod|blackberry|windows phone)/i

  if (mobileRegex.test(ua)) {
    return true
  }

  if (window.innerWidth <= 768) {
    return true
  }

  return false
}

/**
 * 判断是否为平板设备
 * @returns true 表示平板设备
 */
export function isTablet(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()

  if (ua.includes('ipad')) {
    return true
  }

  if (/(android)/i.test(ua) && window.innerWidth > 768 && window.innerWidth <= 1024) {
    return true
  }

  if (window.innerWidth > 768 && window.innerWidth <= 1024) {
    return true
  }

  return false
}

/**
 * 判断是否为桌面端设备
 * @returns true 表示桌面端设备
 */
export function isDesktop(): boolean {
  return !isMobile() && !isTablet()
}

/**
 * 判断是否为开发环境
 * @returns true 表示开发环境
 */
export function isDevelopment(): boolean {
  if (isNode()) {
    return (process as any).env.NODE_ENV === 'development' || (process as any).env.NODE_ENV === 'dev'
  }

  if (isBrowser()) {
    return window.location.hostname === 'localhost'
      || window.location.hostname === '127.0.0.1'
      || window.location.port !== ''
      || /\.dev$|\.local$/.test(window.location.hostname)
  }

  return false
}

/**
 * 判断是否为生产环境
 * @returns true 表示生产环境
 */
export function isProduction(): boolean {
  return !isDevelopment()
}

/**
 * 判断是否支持触摸事件
 * @returns true 表示支持触摸
 */
export function isTouchSupport(): boolean {
  if (!isBrowser())
    return false

  return 'ontouchstart' in window
    || navigator.maxTouchPoints > 0
    || typeof navigator !== 'undefined' && 'msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0
}

/**
 * 获取当前环境类型
 * @returns 环境类型字符串：'browser' | 'node' | 'wechat' | 'miniprogram'
 */
export function getEnvType(): 'browser' | 'node' | 'wechat' | 'miniprogram' {
  if (isWechatMiniProgram())
    return 'miniprogram'
  if (isWechatBrowser())
    return 'wechat'
  if (isBrowser())
    return 'browser'
  if (isNode())
    return 'node'
  return 'browser'
}

/**
 * 获取设备类型
 * @returns 设备类型字符串：'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (!isBrowser())
    return 'desktop'

  if (isMobile())
    return 'mobile'
  if (isTablet())
    return 'tablet'
  return 'desktop'
}

/**
 * 获取浏览器名称
 * @returns 浏览器名称：'chrome' | 'firefox' | 'safari' | 'edge' | 'ie' | 'unknown'
 */
export function getBrowserName(): 'chrome' | 'firefox' | 'safari' | 'edge' | 'ie' | 'unknown' {
  if (!isBrowser())
    return 'unknown'

  const ua = navigator.userAgent.toLowerCase()

  if (ua.includes('edg') && !ua.includes('chrome')) {
    return 'edge'
  }

  if (ua.includes('chrome') && !ua.includes('edg')) {
    return 'chrome'
  }

  if (ua.includes('firefox')) {
    return 'firefox'
  }

  if (ua.includes('safari') && !ua.includes('chrome')) {
    return 'safari'
  }

  if (ua.includes('msie') || ua.includes('trident')) {
    return 'ie'
  }

  return 'unknown'
}

/**
 * 判断是否为 iOS 系统
 * @returns true 表示 iOS 系统
 */
export function isIOS(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua)
}

/**
 * 判断是否为 Android 系统
 * @returns true 表示 Android 系统
 */
export function isAndroid(): boolean {
  if (!isBrowser())
    return false

  const ua = navigator.userAgent.toLowerCase()
  return /android/.test(ua) && !/(iphone|ipad|ipod)/.test(ua)
}
