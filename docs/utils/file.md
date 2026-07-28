# file 模块

文件处理工具函数，提供文件大小格式化、Base64 转换、文件类型判断等功能。

## 方法列表

### formatFileSize

文件大小单位换算。

```ts
function formatFileSize(bytes: number, decimals?: number): string
```

**参数：**
- `bytes` - 文件大小（字节）
- `decimals` - 小数位数，默认为 2

**返回值：** 格式化后的文件大小字符串

**示例：**
```ts
import { formatFileSize } from '@zealous-admin/utils'

formatFileSize(0) // "0 B"
formatFileSize(1024) // "1 KB"
formatFileSize(1048576) // "1 MB"
formatFileSize(1234567, 1) // "1.2 MB"
```

---

### fileToBase64

将文件转换为 Base64 字符串。

```ts
function fileToBase64(file: File): Promise<string>
```

**参数：**
- `file` - File 对象

**返回值：** Promise 解析为 Base64 字符串

**示例：**
```ts
import { fileToBase64 } from '@zealous-admin/utils'

const file = input.files[0]
const base64 = await fileToBase64(file)
console.log(base64) // "data:image/png;base64,..."
```

---

### base64ToBlob

将 Base64 字符串转换为 Blob 对象。

```ts
function base64ToBlob(base64: string): Blob
```

**参数：**
- `base64` - Base64 字符串

**返回值：** Blob 对象

---

### base64ToFile

将 Base64 字符串转换为 File 对象。

```ts
function base64ToFile(base64: string, filename: string): File
```

**参数：**
- `base64` - Base64 字符串
- `filename` - 文件名

**返回值：** File 对象

---

### getFileExtension

获取文件扩展名。

```ts
function getFileExtension(filename: string): string
```

**参数：**
- `filename` - 文件名

**返回值：** 扩展名（不含点），如果没有扩展名返回空字符串

**示例：**
```ts
import { getFileExtension } from '@zealous-admin/utils'

getFileExtension('image.png') // "png"
getFileExtension('document.PDF') // "pdf"
getFileExtension('no-extension') // ""
```

---

### getMimeType

获取文件的 MIME 类型。

```ts
function getMimeType(filename: string): string
```

**参数：**
- `filename` - 文件名或扩展名

**返回值：** MIME 类型，无法识别返回 `'application/octet-stream'`

**示例：**
```ts
import { getMimeType } from '@zealous-admin/utils'

getMimeType('image.png') // "image/png"
getMimeType('pdf') // "application/pdf"
```

---

### isImage

判断文件是否为图片类型。

```ts
function isImage(filename: string | File): boolean
```

**参数：**
- `filename` - 文件名或 File 对象

**返回值：** `true` 表示是图片

**支持的格式：** jpg, jpeg, png, gif, bmp, svg, webp, ico

---

### isVideo

判断文件是否为视频类型。

```ts
function isVideo(filename: string | File): boolean
```

**返回值：** `true` 表示是视频

**支持的格式：** mp4, webm, avi, mov, flv, wmv

---

### isAudio

判断文件是否为音频类型。

```ts
function isAudio(filename: string | File): boolean
```

**返回值：** `true` 表示是音频

**支持的格式：** mp3, wav, ogg, flac, aac, m4a

---

### isDocument

判断文件是否为文档类型。

```ts
function isDocument(filename: string | File): boolean
```

**返回值：** `true` 表示是文档

**支持的格式：** txt, html, css, js, json, xml, pdf, doc, docx, xls, xlsx, ppt, pptx

---

### isArchive

判断文件是否为压缩包类型。

```ts
function isArchive(filename: string | File): boolean
```

**返回值：** `true` 表示是压缩包

**支持的格式：** zip, rar, 7z, tar, gz, bz2

---

### createDownloadUrl

生成下载链接并触发下载。

```ts
function createDownloadUrl(blob: Blob, filename: string): string
```

**参数：**
- `blob` - Blob 对象
- `filename` - 文件名

**返回值：** 下载链接 URL

---

### downloadBase64Image

下载 Base64 图片。

```ts
function downloadBase64Image(base64: string, filename: string): void
```

**参数：**
- `base64` - Base64 图片字符串
- `filename` - 文件名

**示例：**
```ts
import { downloadBase64Image } from '@zealous-admin/utils'

downloadBase64Image(base64String, 'image.png')
```

---

### isFileSizeValid

限制文件大小。

```ts
function isFileSizeValid(file: File, maxSize: number): boolean
```

**参数：**
- `file` - File 对象
- `maxSize` - 最大大小（字节）

**返回值：** `true` 表示文件大小符合要求

**示例：**
```ts
import { isFileSizeValid } from '@zealous-admin/utils'

// 限制 5MB
if (!isFileSizeValid(file, 5 * 1024 * 1024)) {
  alert('文件不能超过 5MB')
}
```

---

### isFileTypeValid

限制文件类型。

```ts
function isFileTypeValid(file: File, allowedTypes: string[]): boolean
```

**参数：**
- `file` - File 对象
- `allowedTypes` - 允许的文件类型数组（可以是扩展名或 MIME 类型）

**返回值：** `true` 表示文件类型符合要求

**示例：**
```ts
import { isFileTypeValid } from '@zealous-admin/utils'

// 只允许图片
if (!isFileTypeValid(file, ['jpg', 'png', 'gif'])) {
  alert('只支持 jpg、png、gif 格式')
}

// 也支持 MIME 类型
isFileTypeValid(file, ['image/*', 'application/pdf'])
```
