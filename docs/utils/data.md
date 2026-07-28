# data 模块

数据操作工具函数，提供常用的数据处理、转换、验证等功能。

## 方法列表

### generateId

生成唯一 ID。

```ts
function generateId(prefix?: string, length?: number): string
```

**参数：**
- `prefix` - ID 前缀，默认为空
- `length` - ID 长度（不含前缀），默认为 16

**返回值：** 唯一 ID 字符串

**示例：**
```ts
import { generateId } from '@zealous-admin/utils'

generateId() // "aBcDeFgHiJkLmNoP"
generateId('user') // "user_aBcDeFgHiJkLmNoP"
generateId('item', 8) // "aBcDeFgH"
```

---

### groupBy

数组分组。

```ts
function groupBy<T>(
  array: T[],
  key: string | ((item: T) => string | number)
): Record<string, T[]>
```

**参数：**
- `array` - 要分组的数组
- `key` - 分组键（可以是字符串键名或函数）

**返回值：** 分组后的对象

**示例：**
```ts
import { groupBy } from '@zealous-admin/utils'

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
]

groupBy(users, 'role')
// {
//   admin: [{ name: 'Alice', role: 'admin' }, { name: 'Charlie', role: 'admin' }],
//   user: [{ name: 'Bob', role: 'user' }]
// }

// 使用函数
groupBy(users, item => item.name.length)
// { 5: [...], 7: [...] }
```

---

### deepClone

深拷贝对象。

```ts
function deepClone<T>(obj: T): T
```

**参数：**
- `obj` - 要拷贝的对象

**返回值：** 拷贝后的新对象

**示例：**
```ts
import { deepClone } from '@zealous-admin/utils'

const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] }
const cloned = deepClone(original)

cloned.b.c = 999
console.log(original.b.c) // 2 (原对象不受影响)
```

---

### merge

对象合并（深合并）。

```ts
function merge<T extends object>(
  target: T,
  ...sources: Record<string, any>[]
): T
```

**参数：**
- `target` - 目标对象
- `sources` - 源对象（可多个）

**返回值：** 合并后的对象

**示例：**
```ts
import { merge } from '@zealous-admin/utils'

const defaults = { a: 1, b: { c: 2, d: 3 } }
const overrides = { b: { c: 99 }, e: 5 }

merge(defaults, overrides)
// { a: 1, b: { c: 99, d: 3 }, e: 5 }
```

---

### unique

数组去重。

```ts
function unique<T>(array: T[], key?: string): T[]
```

**参数：**
- `array` - 要去重的数组
- `key` - 可选的去重键（用于对象数组）

**返回值：** 去重后的数组

**示例：**
```ts
import { unique } from '@zealous-admin/utils'

unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
]
unique(users, 'id') // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

---

### flatten

数组扁平化。

```ts
function flatten<T>(array: any[], depth?: number): T[]
```

**参数：**
- `array` - 要扁平化的数组
- `depth` - 扁平化深度，默认为无限深度

**返回值：** 扁平化后的数组

**示例：**
```ts
import { flatten } from '@zealous-admin/utils'

flatten([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
flatten([1, [2, [3, [4]]]], 1) // [1, 2, [3, [4]]]
flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
```

---

### find

根据条件查找数组元素。

```ts
function find<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): T | undefined
```

**参数：**
- `array` - 目标数组
- `predicate` - 条件函数

**返回值：** 找到的元素，未找到返回 undefined

**示例：**
```ts
import { find } from '@zealous-admin/utils'

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]

find(users, user => user.age > 28)
// { id: 2, name: 'Bob', age: 30 }
```

---

### pick

对象属性筛选。

```ts
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>
```

**参数：**
- `obj` - 目标对象
- `keys` - 要保留的属性键数组

**返回值：** 只包含指定属性的新对象

**示例：**
```ts
import { pick } from '@zealous-admin/utils'

const user = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }

pick(user, ['name', 'email'])
// { name: 'Alice', email: 'alice@example.com' }
```

---

### omit

对象属性排除。

```ts
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K>
```

**参数：**
- `obj` - 目标对象
- `keys` - 要排除的属性键数组

**返回值：** 排除指定属性后的新对象

**示例：**
```ts
import { omit } from '@zealous-admin/utils'

const user = { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }

omit(user, ['id', 'email'])
// { name: 'Alice', age: 25 }
```

---

### sortBy

数组排序（支持多字段）。

```ts
function sortBy<T>(
  array: T[],
  key: string,
  order?: 'asc' | 'desc'
): T[]
```

**参数：**
- `array` - 要排序的数组
- `key` - 排序字段（支持嵌套属性如 `'a.b.c'`）
- `order` - 排序顺序，`'asc'` 升序，`'desc'` 降序，默认为 `'asc'`

**返回值：** 排序后的数组

**示例：**
```ts
import { sortBy } from '@zealous-admin/utils'

const users = [
  { name: 'Charlie', age: 35 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
]

sortBy(users, 'age')
// [
//   { name: 'Alice', age: 25 },
//   { name: 'Bob', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]

sortBy(users, 'age', 'desc')
// [
//   { name: 'Charlie', age: 35 },
//   { name: 'Bob', age: 30 },
//   { name: 'Alice', age: 25 }
// ]

// 嵌套属性
const data = [
  { user: { score: 80 } },
  { user: { score: 95 } },
  { user: { score: 70 } },
]
sortBy(data, 'user.score')
```
