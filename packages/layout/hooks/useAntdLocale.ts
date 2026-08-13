import zhCN from 'antd/locale/zh_CN'
import { useEffect, useState } from 'react'
import { useI18nStore } from '../store/i18n'

// antd 语言包懒加载器（zh-CN 作为默认语言静态引入，其余按需加载）
const antdLocaleLoaders: Record<string, () => Promise<{ default: typeof zhCN }>> = {
  'en-US': () => import('antd/locale/en_US'),
}

/**
 * 随当前语言自动切换的 antd locale（懒加载，zh-CN 同步切换、其余异步加载）
 * LayoutProvider 与 Layout 共用，确保嵌套 ConfigProvider 不重置 locale
 */
export function useAntdLocale() {
  const locale = useI18nStore(state => state.locale)
  const [antdLocale, setAntdLocale] = useState<typeof zhCN>(zhCN)

  useEffect(() => {
    if (locale === 'zh-CN') {
      setAntdLocale(zhCN)
      return
    }
    let cancelled = false
    antdLocaleLoaders[locale]?.().then((mod) => {
      if (!cancelled)
        setAntdLocale(mod.default)
    })
    return () => {
      cancelled = true
    }
  }, [locale])

  return antdLocale
}
