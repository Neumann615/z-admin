import { messages, type LayoutMessages } from '@zealous-admin/locales/index'
import { useI18nStore } from '../store/i18n'

/**
 * 文案翻译 hook
 * 根据当前 locale 从统一 locales 包中读取完整文案（layout 内置 + 应用侧菜单/业务文案），
 * key 不存在时回退到 zh-CN 文案，再回退到 key 本身
 */
export function useT() {
  const locale = useI18nStore(state => state.locale)
  const current = messages[locale] || messages['zh-CN']
  return (key: keyof LayoutMessages): string => current[key] ?? messages['zh-CN'][key] ?? key
}
