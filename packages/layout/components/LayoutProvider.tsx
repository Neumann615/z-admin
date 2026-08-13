import type { LayoutConfig, MenuData } from '../types/config'
import { messages } from '@zealous-admin/locales/index'
import { ZaConfigProvider } from '@zealous-admin/components/index'
import { theme as antdTheme, App, ConfigProvider } from 'antd'
import { StyleProvider } from 'antd-style'
import zhCN from 'antd/locale/zh_CN'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  useAppStore,
  useI18nStore,
  useMenuStore,
  usePageStore,
  useThemeStore,
  useTopBarStore,
} from '../store/index'
import { useThemeByType } from '../themeMap'
import { findLabelByKey, resolveMenuLabels } from '../utils/i18n'
import { AppMessageProvider } from './AppMessageProvider'

// antd 语言包懒加载器（zh-CN 作为默认语言静态引入，其余按需加载）
const antdLocaleLoaders: Record<string, () => Promise<{ default: typeof zhCN }>> = {
  'en-US': () => import('antd/locale/en_US'),
}

interface AppLayoutProps {
  children: React.ReactNode
  menuData?: MenuData
  defaultSetting?: LayoutConfig
  cachedPages?: string[]
}

export function LayoutProvider({
  children,
  menuData,
  defaultSetting,
  cachedPages,
}: AppLayoutProps) {
  const themeStore = useThemeStore()
  const menuStore = useMenuStore()
  const appStore = useAppStore()
  const locale = useI18nStore(state => state.locale)

  // 监听系统深色/浅色模式
  const [systemDarkMode, setSystemDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  // antd 语言包（随 locale 懒加载切换）
  const [antdLocale, setAntdLocale] = useState<typeof zhCN>(zhCN)

  // 计算全局主题算法（仅 default 主题生效）
  const globalAlgorithm = useMemo(() => {
    const algorithmData = []
    if (
      themeStore.darkMode === '1'
      || (themeStore.darkMode === 'auto' && systemDarkMode)
    ) {
      algorithmData.push(antdTheme.darkAlgorithm)
    }
    return algorithmData
  }, [themeStore.darkMode, systemDarkMode])

  // 自定义主题配置（default 返回空对象，其他主题返回完整 ConfigProviderProps）
  const themeType = themeStore.themeType
  const isDefaultTheme = themeType === 'default'
  const customThemeProps = useThemeByType(themeType)

  // 最终 ConfigProvider 配置：default 沿用原有逻辑，其他主题透传
  const themeConfig = useMemo(() => {
    if (!isDefaultTheme) {
      return customThemeProps
    }
    return {
      theme: {
        algorithm: globalAlgorithm,
        token: { colorPrimary: themeStore.themeColor },
      },
    }
  }, [isDefaultTheme, customThemeProps, globalAlgorithm, themeStore.themeColor])

  // 哀悼模式 色弱模式
  useEffect(() => {
    if (themeStore.colorWeak) {
      document.documentElement.style.filter = 'invert(0.8) hue-rotate(180deg)'
    }
    else if (appStore.isEnableMourningMode) {
      document.documentElement.style.filter = 'grayscale(100%)'
    }
    else {
      document.documentElement.style.filter = ''
    }
  }, [themeStore.colorWeak, appStore.isEnableMourningMode])

  // 初始配置仅执行一次
  useEffect(() => {
    if (defaultSetting) {
      useAppStore.setState({ ...defaultSetting.app })
      useMenuStore.setState({ ...defaultSetting.menu })
      usePageStore.setState({ ...defaultSetting.page })
      useTopBarStore.setState({ ...defaultSetting.topBar })
      useThemeStore.setState({ ...defaultSetting.theme })
      if (defaultSetting.topBar.toolbar.i18n) {
        useI18nStore.setState({ ...defaultSetting.topBar.toolbar.i18n })
      }
    }
  }, [])

  // 按当前语言解析菜单名称（集中处理，下游 Menu/Search/Breadcrumb 自动同步）
  const resolvedMenuData = useMemo(
    () => resolveMenuLabels(menuData || [], messages, locale),
    [menuData, locale],
  )

  // menuData 变化时更新菜单数据（登录后 menus 从空变为有值时触发）
  useEffect(() => {
    console.log('za-menuData', resolvedMenuData)
    menuStore.setMainNavData(resolvedMenuData)
    if (!menuStore?.mainNavCurrentKeys?.length && resolvedMenuData?.length) {
      menuStore.setMainNavCurrentKeys([resolvedMenuData[0].key])
      menuStore.setMenuData(resolvedMenuData[0].children || [])
    }
    else if (resolvedMenuData?.length) {
      // 切换语言时按当前主导航重新解析次级菜单
      const currentMainKey = useMenuStore.getState().mainNavCurrentKeys?.[0]
      const currentMain = resolvedMenuData.find(item => item.key === currentMainKey)
      if (currentMain) {
        useMenuStore.getState().setMenuData(currentMain.children || [])
      }
    }
  }, [resolvedMenuData])

  // 语言/菜单变化时回填标签栏与面包屑的标题快照
  useEffect(() => {
    const topBarStore = useTopBarStore.getState()
    const homeTitle = messages[locale]?.['/'] ?? appStore.homePage.title

    const resolveTitle = (key: string): string => {
      if (key === '/')
        return homeTitle
      return findLabelByKey(resolvedMenuData, key.split('?')[0])
    }

    if (topBarStore.tabs?.length) {
      const tabs = topBarStore.tabs.map((tab: any) => {
        const title = resolveTitle(tab.tabId)
        if (!title || title === tab.title)
          return tab
        return {
          ...tab,
          title,
          menuData: tab.menuData ? { ...tab.menuData, label: title } : tab.menuData,
        }
      })
      topBarStore.setTabs(tabs)

      const nowTitle = resolveTitle(topBarStore.nowTab?.tabId)
      if (nowTitle && nowTitle !== topBarStore.nowTab?.title) {
        topBarStore.setNowTab({ ...topBarStore.nowTab, title: nowTitle })
      }
    }

    if (topBarStore.breadcrumbList?.length) {
      const breadcrumbList = topBarStore.breadcrumbList.map((item: any) => {
        const label = resolveTitle(item.key)
        return label && label !== item.label ? { ...item, label } : item
      })
      topBarStore.setBreadcrumbList(breadcrumbList)
    }
  }, [resolvedMenuData, locale, appStore.homePage.title])

  // locale 变化时：同步 html lang 属性 + 懒加载 antd 语言包
  useEffect(() => {
    document.documentElement.lang = locale
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

  // 同步外部传入的 cachedPages
  useEffect(() => {
    if (cachedPages) {
      usePageStore.getState().setCachedPages(cachedPages)
    }
  }, [cachedPages])

  // 监听系统深色模式
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <StyleProvider>
      <ConfigProvider
        locale={antdLocale}
        {...themeConfig}
      >
        <App>
          <AppMessageProvider>
            <ZaConfigProvider locale={locale}>
              <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </ZaConfigProvider>
          </AppMessageProvider>
        </App>
      </ConfigProvider>
    </StyleProvider>
  )
}
