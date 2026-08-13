import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import defaultSetting from '../defaultSetting'

// 根据浏览器语言推断初始 locale（优先精确匹配，其次语言前缀匹配）
function detectLocale(): string {
  const i18nConfig = defaultSetting.topBar.toolbar.i18n
  const supported = i18nConfig.locales.map(item => item.locale)
  const nav = (typeof navigator !== 'undefined' && navigator.language) || i18nConfig.defaultLocale
  if (supported.includes(nav))
    return nav
  const prefix = nav.split('-')[0]
  const matched = supported.find(locale => locale.split('-')[0] === prefix)
  return matched || i18nConfig.defaultLocale
}

export const useI18nStore = create(
  persist(
    (set: any) => ({
      ...defaultSetting.topBar.toolbar.i18n,
      // 当前语言（持久化）
      locale: detectLocale(),
      setLocale: (locale: string) => set(() => ({ locale })),
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
      // 仅持久化 locale，其余配置项无需持久化
      partialize: (state: any) => ({ locale: state.locale }),
    },
  ),
)
