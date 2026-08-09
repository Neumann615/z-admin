# ZaSignaturePad 签名板

基于 `canvas` 实现的手写签名板，支持高 DPI 适配与中点连续法平滑笔迹，样式接入 antd 主题变量，随项目主题自动适配明暗模式。

## 代码演示

### 基础用法

```tsx
import { ZaSignaturePad } from '@zealous-admin/components'

<ZaSignaturePad />
```

### 配置画笔

```tsx
import { ZaSignaturePad } from '@zealous-admin/components'

<ZaSignaturePad
  width={600}
  height={360}
  penWidth={5}
  penColor="#1677ff"
  backgroundColor="#f5f5f5"
/>
```

`penColor` / `backgroundColor` 不传时分别默认使用主题基色与容器背景色，并自动去除带透明度颜色的 alpha，避免笔迹重叠处颜色变深。

### 命令式方法

通过 `ref` 可调用 `clear` / `getDataURL` / `download` / `isEmpty`：

```tsx
import { ZaSignaturePad } from '@zealous-admin/components'
import { useRef } from 'react'

const sigRef = useRef<SignaturePadRef>(null)

<ZaSignaturePad ref={sigRef} />

sigRef.current?.getDataURL() // string | null（无签名返回 null）
sigRef.current?.download()   // 下载 signature.png，无签名时返回 false
sigRef.current?.clear()      // 清空画布（重签）
sigRef.current?.isEmpty()    // boolean
```

> `SignaturePadRef` 类型定义在组件中，包含 `clear` / `getDataURL` / `download` / `isEmpty` 四个方法。

### 签名变化监听

```tsx
import { ZaSignaturePad } from '@zealous-admin/components'

<ZaSignaturePad
  onChange={(isEmpty) => {
    // 清空画布时 isEmpty 为 true，开始书写后为 false
  }}
/>
```

## API

### ZaSignaturePad Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 画布宽度（px） | `number` | `520` |
| height | 画布高度（px） | `number` | `280` |
| penColor | 画笔颜色，默认使用主题基色（自动去除透明度） | `string` | 主题基色 |
| backgroundColor | 画布背景色，默认使用容器背景色 | `string` | 容器背景色 |
| penWidth | 画笔粗细（px） | `number` | `3` |
| onChange | 签名状态变化回调 | `(isEmpty: boolean) => void` | - |
| className | 自定义类名 | `string` | - |

### SignaturePadRef

| 方法 | 说明 |
|------|------|
| `clear()` | 清空画布（重签） |
| `getDataURL(type?, quality?)` | 生成图片 dataURL（默认 PNG），无签名时返回 `null` |
| `download(fileName?, type?, quality?)` | 下载签名图片，无签名时返回 `false` |
| `isEmpty()` | 是否已有签名 |

## 演示组件

`ZaSignaturePadDemo` 提供了尺寸、画笔颜色 / 粗细、背景色等配置，以及重签、生成图片、下载图片、弹窗预览等演示，可直接体验不同效果。

```tsx
import { ZaSignaturePadDemo } from '@zealous-admin/components'

<ZaSignaturePadDemo />
```
