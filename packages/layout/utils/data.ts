import type {
  ExpireMode,
  LayoutScope,
  TabBarDblClickEventType,
  ThemeType,
} from '../types/config'
import {
  blue,
  cyan,
  geekblue,
  gold,
  green,
  lime,
  magenta,
  orange,
  purple,
  red,
  volcano,
  yellow,
} from '@ant-design/colors'

export const themeColorList = [
  // "#000",
  blue.primary,
  red.primary,
  volcano.primary,
  green.primary,
  orange.primary,
  yellow.primary,
  cyan.primary,
  geekblue.primary,
  purple.primary,
  magenta.primary,
  lime.primary,
  gold.primary,
]

// 选项列表统一使用 labelKey（i18n 文案 key），由消费方（如 ConfigPanel）用 useT 动态翻译
export const themeTypeList: Array<{ labelKey: string, value: ThemeType }> = [
  { labelKey: 'configPanel.common.default', value: 'default' },
  { labelKey: 'configPanel.themeType.illustration', value: 'illustration' },
  { labelKey: 'configPanel.themeType.cartoon', value: 'cartoon' },
  { labelKey: 'configPanel.themeType.shadcn', value: 'shadcn' },
  { labelKey: 'configPanel.themeType.hacker', value: 'hacker' },
  { labelKey: 'configPanel.themeType.mui', value: 'mui' },
  { labelKey: 'configPanel.themeType.bootstrap', value: 'bootstrap' },
  { labelKey: 'configPanel.themeType.glass', value: 'glass' },
]

export const menuFillStyleList = ['none', 'radius']

export const breadcrumbStyleList = [
  {
    labelKey: 'configPanel.common.default',
    value: 'default',
  },
  {
    labelKey: 'configPanel.toolbar.breadcrumbStyle.modern',
    value: 'modern',
  },
]

export const topBarPositionList = [
  {
    labelKey: 'configPanel.common.default',
    value: 'static',
  },
  {
    labelKey: 'configPanel.common.fixed',
    value: 'fixed',
  },
  {
    labelKey: 'configPanel.common.sticky',
    value: 'sticky',
  },
]

export const tabBarPositionList = [
  {
    labelKey: 'configPanel.common.default',
    value: 'static',
  },
  {
    labelKey: 'configPanel.common.fixed',
    value: 'fixed',
  },
  {
    labelKey: 'configPanel.common.sticky',
    value: 'sticky',
  },
]

export const tabBarStyleList = [
  {
    labelKey: 'configPanel.common.default',
    value: 'default',
  },
  {
    labelKey: 'configPanel.tabBar.style.card',
    value: 'card',
  },
  {
    labelKey: 'configPanel.tabBar.style.block',
    value: 'block',
  },
]

export const tabBarDblClickEventTypeList: Array<{
  labelKey: string
  value: TabBarDblClickEventType
}> = [
  {
    labelKey: 'configPanel.tabBar.dblClick.refresh',
    value: 'refresh',
  },
  {
    labelKey: 'configPanel.tabBar.dblClick.close',
    value: 'close',
  },
  {
    labelKey: 'configPanel.tabBar.dblClick.fixed',
    value: 'fixed',
  },
  {
    labelKey: 'configPanel.tabBar.dblClick.max',
    value: 'max',
  },
  {
    labelKey: 'configPanel.tabBar.dblClick.open',
    value: 'open',
  },
]

export const tabBarWidthTypeList = [
  {
    labelKey: 'configPanel.common.fixed',
    value: 'fixed',
  },
  {
    labelKey: 'configPanel.tabBar.widthType.auto',
    value: 'auto',
  },
  {
    labelKey: 'configPanel.tabBar.widthType.autoMin',
    value: 'auto-min',
  },
  {
    labelKey: 'configPanel.tabBar.widthType.autoMax',
    value: 'auto-max',
  },
]

export const expireModeList: Array<{ labelKey: string, value: ExpireMode }> = [
  {
    labelKey: 'configPanel.app.expireMode.logout',
    value: 'logout',
  },
  {
    labelKey: 'configPanel.app.expireMode.prompt',
    value: 'prompt',
  },
]

export const layoutScopeList: Array<{ labelKey: string, value: LayoutScope }> = [
  {
    labelKey: 'configPanel.app.layoutScope.inside',
    value: 'inside',
  },
  {
    labelKey: 'configPanel.app.layoutScope.outside',
    value: 'outside',
  },
]

export const menuActiveStyleList = ['none', 'arrow', 'line', 'dot']

export const storageTypeList = [
  {
    label: '本地存储',
    value: 'local',
  },
  {
    label: '会话存储',
    value: 'session',
  },
]

export const transitionTypeList = [
  {
    labelKey: 'configPanel.transition.fadeIn',
    value: 'fade-in',
    classNames: {
      appear: 'animate__animated',
      appearActive: 'animate__fadeIn',
      enter: 'animate__animated',
      enterActive: 'animate__fadeIn',
      exit: 'animate__animated',
      exitActive: 'animate__fadeOut',
    },
  },
  {
    labelKey: 'configPanel.transition.fadeUp',
    value: 'fade-up',
    classNames: {
      appear: 'animate__animated',
      appearActive: 'animate__fadeInUp',
      enter: 'animate__animated',
      enterActive: 'animate__fadeInUp',
      exit: 'animate__animated',
      exitActive: 'animate__fadeOutUp',
    },
  },
  {
    labelKey: 'configPanel.transition.fadeDown',
    value: 'fade-down',
    classNames: {
      appear: 'animate__animated',
      appearActive: 'animate__fadeInDown',
      enter: 'animate__animated',
      enterActive: 'animate__fadeInDown',
      exit: 'animate__animated',
      exitActive: 'animate__fadeOutDown',
    },
  },
  {
    labelKey: 'configPanel.transition.fadeLeft',
    value: 'fade-left',
    classNames: {
      appear: 'animate__animated',
      appearActive: 'animate__fadeInRight',
      enter: 'animate__animated',
      enterActive: 'animate__fadeInRight',
      exit: 'animate__animated',
      exitActive: 'animate__fadeOutLeft',
    },
  },
  {
    labelKey: 'configPanel.transition.fadeRight',
    value: 'fade-right',
    classNames: {
      appear: 'animate__animated',
      appearActive: 'animate__fadeInLeft',
      enter: 'animate__animated',
      enterActive: 'animate__fadeInLeft',
      exit: 'animate__animated',
      exitActive: 'animate__fadeOutRight',
    },
  },
]

const transitionTypeSet: any = {}
transitionTypeList.forEach((transition: any) => {
  transitionTypeSet[transition.value] = transition.classNames
})

export { transitionTypeSet }

export const menuTypeList = [
  {
    labelKey: 'configPanel.menuType.side',
    value: 'side',
  },
  {
    labelKey: 'configPanel.menuType.onlySide',
    value: 'only-side',
  },
  {
    labelKey: 'configPanel.menuType.head',
    value: 'head',
  },
  {
    labelKey: 'configPanel.menuType.onlyHead',
    value: 'only-head',
  },
  {
    labelKey: 'configPanel.menuType.simple',
    value: 'simple',
  },
]

export const menuData = []
