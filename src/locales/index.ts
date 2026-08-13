import type { I18nMessages } from '@zealous-admin/layout/index'
import enUS from './en-US'
import zhCN from './zh-CN'

// 示例应用：菜单多语言映射（统一由前端维护，作为菜单名称的单一数据源）
const messages: I18nMessages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default messages
