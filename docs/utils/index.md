# 工具函数

`@zealous-admin/utils` 提供通用工具函数，分为 data / env / file / parse / time 五大模块，零外部依赖。

## 安装

```bash
pnpm add @zealous-admin/utils
```

```tsx
import { deepClone, debounce, formatDate } from '@zealous-admin/utils'
```

## 模块总览

| 模块 | 说明 | 文档链接 |
|------|------|----------|
| **data** | 数据操作工具：深拷贝、分组、排序、去重、扁平化等 | [查看详情](/utils/data) |
| **env** | 环境检测工具：浏览器/Node.js 判断、设备类型、系统检测等 | [查看详情](/utils/env) |
| **file** | 文件处理工具：大小格式化、Base64 转换、类型判断等 | [查看详情](/utils/file) |
| **parse** | 解析工具：身份证验证和信息提取 | [查看详情](/utils/parse) |
| **time** | 日期时间工具：格式化、防抖节流、倒计时、日期计算等 | [查看详情](/utils/time) |

## 快速示例

### data 模块

```tsx
import { deepClone, groupBy, sortBy, merge, unique } from '@zealous-admin/utils'

const copy = deepClone(original)
const grouped = groupBy(users, 'role')
const sorted = sortBy(items, 'createdAt', 'desc')
const merged = merge(defaultConfig, userConfig)
const uniqueList = unique(array, 'id')
```

### env 模块

```tsx
import { isMobile, isDevelopment, getDeviceType } from '@zealous-admin/utils'

if (isMobile()) {
  // 移动端逻辑
}

if (isDevelopment()) {
  console.log('开发环境')
}

const device = getDeviceType() // 'mobile' | 'tablet' | 'desktop'
```

### file 模块

```tsx
import { formatFileSize, fileToBase64, isImage } from '@zealous-admin/utils'

formatFileSize(1048576) // "1 MB"
const base64 = await fileToBase64(file)
if (isImage(file)) {
  // 图片处理
}
```

### parse 模块

```tsx
import { validateAndExtractIdCard } from '@zealous-admin/utils'

const result = validateAndExtractIdCard('110101199001011234')
if (result) {
  console.log(result.birthDate) // "1990-01-01"
  console.log(result.age) // 34
  console.log(result.gender) // "M"
  console.log(result.zodiac) // "摩羯座"
}
```

### time 模块

```tsx
import { formatDate, debounce, throttle, addDays } from '@zealous-admin/utils'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

const debouncedSearch = debounce((keyword) => { /* 搜索 */ }, 300)
const throttledResize = throttle(() => { /* resize */ }, 200)

const nextWeek = addDays(new Date(), 7)
```
