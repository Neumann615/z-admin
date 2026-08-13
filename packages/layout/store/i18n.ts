import type { I18nMessages } from '../utils/i18n'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import defaultSetting from '../defaultSetting'

// 根据浏览器语言推断初始 locale（优先精确匹配，其次语言前缀匹配）
function detectLocale(): string {
  const supported = defaultSetting.i18n.locales.map(item => item.locale)
  const nav = (typeof navigator !== 'undefined' && navigator.language) || defaultSetting.i18n.defaultLocale
  if (supported.includes(nav))
    return nav
  const prefix = nav.split('-')[0]
  const matched = supported.find(locale => locale.split('-')[0] === prefix)
  return matched || defaultSetting.i18n.defaultLocale
}

export const useI18nStore = create(
  persist(
    (set: any) => ({
      ...defaultSetting.i18n,
      // 当前语言（持久化）
      locale: detectLocale(),
      // 用户应用侧注入的菜单/业务文案映射（不持久化）
      messages: {} as I18nMessages,
      setLocale: (locale: string) => set(() => ({ locale })),
      setMessages: (messages: I18nMessages) => set(() => ({ messages })),
    }),
    {
      name: `${defaultSetting.app.storagePrefix}i18n`,
      storage: defaultSetting.app.isEnableMemory
        ? createJSONStorage(() =>
            defaultSetting.app.storageType === 'local'
              ? localStorage
              : sessionStorage,
          )
        : undefined,
      // 仅持久化 locale，messages 与配置项无需持久化
      partialize: (state: any) => ({ locale: state.locale }),
    },
  ),
)
