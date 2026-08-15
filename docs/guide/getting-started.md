# 快速开始

本指南将帮助你在本地启动 zealous-admin 开发环境，并了解核心包的基本用法。

## 环境要求

- [Node.js](https://nodejs.org/) >= 24.15.0
- [pnpm](https://pnpm.io/) >= 11.8.0

## 安装

```bash
# 克隆项目
git clone https://github.com/Neumann615/zealous-admin.git
cd zealous-admin

# 安装依赖
pnpm install
```

## 启动开发

```bash
# 前端开发服务器（端口 3509）
pnpm dev

# 后端服务（端口 3001）
cd service && pnpm dev
```

项目前端默认运行在 `http://localhost:3509`，后端 API 在 `http://localhost:3001`。

## 基础用法

### 布局系统

```tsx
import { Layout, LayoutProvider } from '@zealous-admin/layout'

const menuData = [
  { id: '1', key: '/dashboard', label: '仪表盘', icon: 'ai:DashboardOutlined' },
]

const config = {
  app: { name: 'zealous-admin', logo: '/logo.svg' },
  theme: { themeType: 'default', themeColor: '#1677ff' },
  menu: { menuType: 'side' },
  topBar: { tabBar: { isEnableTabBar: true } },
}

function App() {
  return (
    <LayoutProvider menuData={menuData} defaultSetting={config}>
      <Layout />
    </LayoutProvider>
  )
}
```

### 登录/登出

```tsx
import { useLogin, useLogout, useUserStore } from '@zealous-admin/layout'

function LoginPage() {
  const { login } = useLogin()
  const handleLogin = async () => {
    await login({ username: 'admin', password: 'admin123' })
  }
}

function Header() {
  const { logout } = useLogout()
  const userInfo = useUserStore(state => state.userInfo)
  return (
    <div>
      <span>{userInfo.nickName}</span>
      <button onClick={logout}>退出登录</button>
    </div>
  )
}
```

### 组件使用

```tsx
import { ZaMarquee, ZaShinyText, ZaSparklesText } from '@zealous-admin/components'

<ZaMarquee pauseOnHover gradient>
  <span>重要通知：系统将于今晚进行维护升级</span>
</ZaMarquee>

<ZaShinyText text="zealous-admin" speed="fast" />
<ZaSparklesText text="欢迎回来" shapes={['star', 'four-point-star']} />
```

### 国际化

layout 内置完整国际化能力：`useI18nStore` 管理语言状态，文案统一从 `@zealous-admin/locales` 读取，antd 语言包与组件库随语言自动联动。

```tsx
import { useI18nStore, useT } from '@zealous-admin/layout'

function Component() {
  const t = useT()
  const locale = useI18nStore(state => state.locale)
  const setLocale = useI18nStore(state => state.setLocale)

  return (
    <div>
      <span>{t('tabBar.closeTab')}</span>
      <button onClick={() => setLocale('en-US')}>English</button>
    </div>
  )
}
```

默认支持 `zh-CN` / `en-US` 两种语言，可通过 `topBar.toolbar.i18n.locales` 扩展；业务文案通过 `@zealous-admin/locales` 包的 `messages` 统一维护。

### 工具函数

```tsx
import { debounce, deepClone, formatDate, groupBy, sortBy } from '@zealous-admin/utils'

const copy = deepClone(original)
const sorted = sortBy(list, 'createdAt', 'desc')
const grouped = groupBy(items, 'category')
const debouncedSearch = debounce((keyword) => { /* 搜索逻辑 */ }, 300)
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

## 下一步

- [组件文档](/components/) - 了解所有可用组件及其 API
- [布局配置](/layout/layout-config) - 完整的配置选项
- [主题系统](/theme/) - 8 套内置主题
- [工具函数](/utils/) - 通用工具函数库
