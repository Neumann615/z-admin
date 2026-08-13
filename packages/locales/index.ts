import enUS from './en-US'
import zhCN from './zh-CN'
import type { LayoutMessages } from './zh-CN'

/**
 * 国际化文案映射结构
 * 外层 key 为语言（如 'zh-CN'），内层 key 为文案 key，值为对应语言的文案
 */
export type I18nMessages = Record<string, Record<string, string>>

/**
 * 全部语言完整文案（layout 内置文案 + 应用侧菜单/业务文案）
 * 统一从这里读取，作为文案的唯一数据源
 */
export const messages: I18nMessages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export type { LayoutMessages }
