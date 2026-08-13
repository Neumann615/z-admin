# parse 模块

解析工具函数，提供身份证号码验证和信息提取功能。

## 方法列表

### validateAndExtractIdCard

验证并提取身份证全部信息。

```ts
function validateAndExtractIdCard(idCard: string): IdCardInfo | false
```

**参数：**
- `idCard` - 身份证号码（支持 15 位和 18 位）

**返回值：** 有效时返回 `IdCardInfo` 对象，无效返回 `false`

**返回类型：**
```ts
interface IdCardInfo {
  isValid: true
  rawId: string // 原始输入的身份证号
  id18: string // 18位身份证号
  id15: string | null // 15位身份证号（如果输入是15位）
  regionCode: string // 地区代码（前6位）
  birthDate: string // 出生日期 YYYY-MM-DD
  year: number // 出生年份
  month: number // 出生月份
  day: number // 出生日期
  age: number // 年龄
  zodiac: string // 星座
  chineseZodiac: string // 生肖
  gender: 'M' | 'F' // 性别（M: 男, F: 女）
  sequence: number // 顺序码（第15-17位）
  checksum: string // 18位校验码
  rawChecksum: string | null // 原始输入的校验码
}
```

**示例：**
```ts
import { validateAndExtractIdCard } from '@zealous-admin/utils'

const result = validateAndExtractIdCard('110101199001011234')

if (result) {
  console.log(result.birthDate) // "1990-01-01"
  console.log(result.age) // 34
  console.log(result.gender) // "M"
  console.log(result.zodiac) // "摩羯座"
  console.log(result.chineseZodiac) // "马"
  console.log(result.regionCode) // "110101"
}
```

**功能说明：**
- 支持 15 位和 18 位身份证验证
- 自动进行校验码验证（18位）
- 15 位身份证自动转换为 18 位
- 提取出生日期、年龄、性别、星座、生肖等信息
- 验证地区代码和日期有效性
