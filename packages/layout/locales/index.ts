import type { LayoutMessages } from './zh-CN'
import { useI18nStore } from '../store/i18n'
import enUS from './en-US'
import zhCN from './zh-CN'

// layout 包内置文案映射（仅覆盖 layout 自身文案，菜单/业务文案由用户应用注入）
export const layoutMessages: Record<string, LayoutMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

/**
 * layout 内置文案翻译 hook
 * 根据当前 locale 返回 t(key)，key 不存在时回退到 zh-CN 文案，再回退到 key 本身
 */
export function useT() {
  const locale = useI18nStore(state => state.locale)
  const messages = layoutMessages[locale] || zhCN
  return (key: keyof LayoutMessages): string => messages[key] ?? zhCN[key] ?? key
}

export type { LayoutMessages }
