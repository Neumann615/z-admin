import type { ReactNode } from 'react'
import { messages } from '@zealous-admin/locales/index'
import { createContext, useCallback, useContext, useMemo } from 'react'

/** 未包裹 Provider 时的默认语言 */
const DEFAULT_LOCALE = 'zh-CN'

interface LocaleContextValue {
  locale: string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
})

export interface ZaConfigProviderProps {
  /** 当前语言，如 'zh-CN' / 'en-US'，缺省回退到 'zh-CN' */
  locale?: string
  children?: ReactNode
}

/**
 * components 包的语言注入 Provider。
 * 底层组件无法直接读取应用/布局层的 i18n store（循环依赖风险），
 * 由上层（如 layout 的 LayoutProvider）读取自身 locale 后统一注入，
 * 组件库内部所有文案（主组件 + demo）随 locale 自动切换。
 */
export function ZaConfigProvider({ locale, children }: ZaConfigProviderProps) {
  const value = useMemo(() => ({ locale: locale || DEFAULT_LOCALE }), [locale])
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

/**
 * 组件库文案翻译 hook
 * 从 Context 读取当前 locale，从统一 locales 包读取完整文案，
 * key 不存在时回退到 zh-CN 文案，再回退到 key 本身
 */
export function useT() {
  const { locale } = useContext(LocaleContext)
  const current = messages[locale] || messages['zh-CN']
  return useCallback(
    (key: string): string => current[key] ?? messages['zh-CN'][key] ?? key,
    [locale],
  )
}
