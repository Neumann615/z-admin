# env 模块

环境判断工具函数，提供运行环境、设备类型、浏览器信息等检测功能。

## 方法列表

### isBrowser

判断是否为浏览器环境。

```ts
function isBrowser(): boolean
```

**返回值：** `true` 表示浏览器环境，`false` 表示 Node.js 或其他环境

**示例：**
```ts
import { isBrowser } from '@zealous-admin/utils'

if (isBrowser()) {
  console.log('运行在浏览器中')
}
```

---

### isNode

判断是否为 Node.js 环境。

```ts
function isNode(): boolean
```

**返回值：** `true` 表示 Node.js 环境

**示例：**
```ts
import { isNode } from '@zealous-admin/utils'

if (isNode()) {
  console.log('运行在 Node.js 中')
}
```

---

### isWechatMiniProgram

判断是否为微信小程序环境。

```ts
function isWechatMiniProgram(): boolean
```

**返回值：** `true` 表示微信小程序环境

---

### isWechatBrowser

判断是否为微信浏览器。

```ts
function isWechatBrowser(): boolean
```

**返回值：** `true` 表示微信内置浏览器

---

### isMobile

判断是否为移动端设备。

```ts
function isMobile(): boolean
```

**返回值：** `true` 表示移动端设备（屏幕宽度 ≤ 768px 或 UA 匹配移动端）

---

### isTablet

判断是否为平板设备。

```ts
function isTablet(): boolean
```

**返回值：** `true` 表示平板设备（屏幕宽度 769-1024px）

---

### isDesktop

判断是否为桌面端设备。

```ts
function isDesktop(): boolean
```

**返回值：** `true` 表示桌面端设备

---

### isDevelopment

判断是否为开发环境。

```ts
function isDevelopment(): boolean
```

**返回值：** `true` 表示开发环境

**判断逻辑：**
- Node.js: `NODE_ENV === 'development'` 或 `'dev'`
- 浏览器: `localhost` / `127.0.0.1` / 非标准端口 / `.dev` / `.local` 域名

---

### isProduction

判断是否为生产环境。

```ts
function isProduction(): boolean
```

**返回值：** `true` 表示生产环境

---

### isTouchSupport

判断是否支持触摸事件。

```ts
function isTouchSupport(): boolean
```

**返回值：** `true` 表示支持触摸

---

### getEnvType

获取当前环境类型。

```ts
function getEnvType(): 'browser' | 'node' | 'wechat' | 'miniprogram'
```

**返回值：** 环境类型字符串

---

### getDeviceType

获取设备类型。

```ts
function getDeviceType(): 'mobile' | 'tablet' | 'desktop'
```

**返回值：** 设备类型字符串

**示例：**
```ts
import { getDeviceType } from '@zealous-admin/utils'

const device = getDeviceType()
if (device === 'mobile') {
  // 移动端逻辑
}
```

---

### getBrowserName

获取浏览器名称。

```ts
function getBrowserName(): 'chrome' | 'firefox' | 'safari' | 'edge' | 'ie' | 'unknown'
```

**返回值：** 浏览器名称

---

### isIOS

判断是否为 iOS 系统。

```ts
function isIOS(): boolean
```

**返回值：** `true` 表示 iOS 系统

---

### isAndroid

判断是否为 Android 系统。

```ts
function isAndroid(): boolean
```

**返回值：** `true` 表示 Android 系统
