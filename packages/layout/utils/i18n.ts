import type { MenuData, MenuItem } from '../types/config'

/**
 * 国际化文案映射结构
 * 外层 key 为语言（如 'zh-CN'），内层 key 为菜单路径（MenuItem.key），值为对应语言的菜单名称
 * 由用户应用侧维护并通过 LayoutProvider 的 messages prop 注入
 */
export type I18nMessages = Record<string, Record<string, string>>

/**
 * 根据当前语言解析菜单名称，返回深拷贝后的新菜单树（不修改原数据）
 * 命中映射则替换 label，未命中则保留原 label 作为兜底
 */
export function resolveMenuLabels(
  menuData: MenuData,
  messages: I18nMessages | undefined,
  locale: string,
): MenuData {
  if (!menuData?.length)
    return menuData || []
  const dict = messages?.[locale]
  // 无对应语言映射时直接返回原数据，避免无意义的深拷贝
  if (!dict)
    return menuData

  const resolve = (items: MenuData): MenuData =>
    items.map((item: MenuItem) => {
      const next: MenuItem = {
        ...item,
        label: dict[item.key] ?? item.label,
      }
      if (item.children?.length) {
        next.children = resolve(item.children)
      }
      return next
    })

  return resolve(menuData)
}

/** 在菜单树中根据 key 查找对应的 label，未找到返回空字符串 */
export function findLabelByKey(menuData: MenuData, key: string): string {
  if (!menuData?.length)
    return ''
  for (const item of menuData) {
    if (item.key === key)
      return item.label
    if (item.children?.length) {
      const found = findLabelByKey(item.children, key)
      if (found)
        return found
    }
  }
  return ''
}
