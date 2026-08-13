# time 模块

日期时间工具函数，提供日期格式化、防抖节流、倒计时等功能。

## 方法列表

### formatDate

日期格式化。

```ts
function formatDate(
  date: Date | number,
  format?: string
): string
```

**参数：**
- `date` - 日期对象或时间戳
- `format` - 格式化字符串，支持 `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`，默认为 `'YYYY-MM-DD HH:mm:ss'`

**返回值：** 格式化后的日期字符串

**示例：**
```ts
import { formatDate } from '@zealous-admin/utils'

formatDate(new Date()) // "2024-01-15 14:30:45"
formatDate(new Date(), 'YYYY-MM-DD') // "2024-01-15"
formatDate(new Date(), 'YYYY年MM月DD日') // "2024年01月15日"
formatDate(1705312245000) // "2024-01-15 14:30:45"
```

---

### debounce

防抖函数。

```ts
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: { leading?: boolean, trailing?: boolean }
): (...args: Parameters<T>) => void
```

**参数：**
- `fn` - 要执行的函数
- `delay` - 延迟时间（毫秒）
- `options` - 选项
  - `leading` - 是否在延迟开始前执行，默认 `false`
  - `trailing` - 是否在延迟结束后执行，默认 `true`

**返回值：** 防抖后的函数

**示例：**
```ts
import { debounce } from '@zealous-admin/utils'

// 搜索输入防抖
const handleSearch = debounce((keyword) => {
  console.log('搜索:', keyword)
}, 300)

input.addEventListener('input', (e) => {
  handleSearch(e.target.value)
})

// 立即执行一次
const handleClick = debounce(() => {
  console.log('点击')
}, 300, { leading: true, trailing: false })
```

---

### throttle

节流函数。

```ts
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: { leading?: boolean, trailing?: boolean }
): (...args: Parameters<T>) => void
```

**参数：**
- `fn` - 要执行的函数
- `delay` - 节流时间（毫秒）
- `options` - 选项
  - `leading` - 是否在延迟开始前执行，默认 `true`
  - `trailing` - 是否在延迟结束后执行，默认 `true`

**返回值：** 节流后的函数

**示例：**
```ts
import { throttle } from '@zealous-admin/utils'

// 滚动事件节流
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY)
}, 200)

window.addEventListener('scroll', handleScroll)

// 窗口 resize 节流
const handleResize = throttle(() => {
  console.log('窗口大小:', window.innerWidth)
}, 300)

window.addEventListener('resize', handleResize)
```

---

### getCountdown

获取倒计时对象。

```ts
function getCountdown(targetTime: Date | number): {
  days: number
  hours: number
  minutes: number
  seconds: number
}
```

**参数：**
- `targetTime` - 目标时间（Date 对象或时间戳）

**返回值：** 包含天、时、分、秒的对象

**示例：**
```ts
import { getCountdown } from '@zealous-admin/utils'

const target = new Date('2024-12-31')
const countdown = getCountdown(target)

console.log(countdown)
// { days: 350, hours: 10, minutes: 30, seconds: 45 }
```

---

### formatCountdown

格式化倒计时。

```ts
function formatCountdown(
  targetTime: Date | number,
  format?: string
): string
```

**参数：**
- `targetTime` - 目标时间
- `format` - 格式化字符串，支持 `D`, `H`, `M`, `S`，默认为 `'D天H时M分S秒'`

**返回值：** 格式化后的倒计时字符串

**示例：**
```ts
import { formatCountdown } from '@zealous-admin/utils'

const target = new Date('2024-12-31')

formatCountdown(target) // "350天10时30分45秒"
formatCountdown(target, 'D天 H:M:S') // "350天 10:30:45"
formatCountdown(target, '还剩 D 天') // "还剩 350 天"
```

---

### getTimestamp

获取时间戳（毫秒）。

```ts
function getTimestamp(date?: Date): number
```

**参数：**
- `date` - 可选的日期对象，默认为当前时间

**返回值：** 时间戳（毫秒）

---

### getTimestampSeconds

获取时间戳（秒）。

```ts
function getTimestampSeconds(date?: Date): number
```

**参数：**
- `date` - 可选的日期对象，默认为当前时间

**返回值：** 时间戳（秒）

---

### isToday

判断是否为今天。

```ts
function isToday(date: Date | number): boolean
```

**示例：**
```ts
import { isToday } from '@zealous-admin/utils'

isToday(new Date()) // true
isToday(Date.now()) // true
```

---

### isYesterday

判断是否为昨天。

```ts
function isYesterday(date: Date | number): boolean
```

---

### isThisWeek

判断是否为本周。

```ts
function isThisWeek(date: Date | number): boolean
```

---

### isThisMonth

判断是否为本月。

```ts
function isThisMonth(date: Date | number): boolean
```

---

### isThisYear

判断是否为今年。

```ts
function isThisYear(date: Date | number): boolean
```

---

### getDaysBetween

计算两个日期之间的天数。

```ts
function getDaysBetween(date1: Date | number, date2: Date | number): number
```

**参数：**
- `date1` - 第一个日期
- `date2` - 第二个日期

**返回值：** 天数差（绝对值）

**示例：**
```ts
import { getDaysBetween } from '@zealous-admin/utils'

getDaysBetween(new Date('2024-01-01'), new Date('2024-01-15')) // 14
```

---

### addDays

添加天数。

```ts
function addDays(date: Date | number, days: number): Date
```

**参数：**
- `date` - 原始日期
- `days` - 要添加的天数（负数表示减去）

**返回值：** 新的日期对象

**示例：**
```ts
import { addDays } from '@zealous-admin/utils'

addDays(new Date('2024-01-15'), 7) // 2024-01-22
addDays(new Date('2024-01-15'), -7) // 2024-01-08
```

---

### addMonths

添加月份。

```ts
function addMonths(date: Date | number, months: number): Date
```

**参数：**
- `date` - 原始日期
- `months` - 要添加的月份（负数表示减去）

**返回值：** 新的日期对象

---

### addYears

添加年份。

```ts
function addYears(date: Date | number, years: number): Date
```

**参数：**
- `date` - 原始日期
- `years` - 要添加的年份（负数表示减去）

**返回值：** 新的日期对象

---

### getYearsBetween

获取两个日期相差的年数。

```ts
function getYearsBetween(
  startDate: Date | number,
  endDate: Date | number
): number
```

**参数：**
- `startDate` - 开始日期
- `endDate` - 结束日期

**返回值：** 年数差（绝对值）

**示例：**
```ts
import { getYearsBetween } from '@zealous-admin/utils'

getYearsBetween(new Date('2020-01-01'), new Date('2024-06-15')) // 4
```
