# ZaRichTextEditor 富文本编辑器

基于 `quill` 实现的轻量级富文本编辑器，样式已接入 antd 主题变量，随项目主题自动适配明暗模式。

## 代码演示

### 基础用法

受控模式，通过 `value` / `onChange` 管理内容。

```tsx
import { useState } from 'react'
import { ZaRichTextEditor } from '@zealous-admin/components'

export default function App() {
  const [html, setHtml] = useState('<p>你好，<strong>世界</strong>！</p>')

  return (
    <ZaRichTextEditor
      value={html}
      onChange={setHtml}
    />
  )
}
```

### 非受控用法

通过 `defaultValue` 设置初始内容，无需受控。

```tsx
import { ZaRichTextEditor } from '@zealous-admin/components'

<ZaRichTextEditor
  defaultValue="<p>初始内容</p>"
  placeholder="请输入内容..."
/>
```

### 自定义工具栏

通过 `toolbar` 传入自定义配置，传 `null` 可隐藏工具栏。

```tsx
import { ZaRichTextEditor } from '@zealous-admin/components'

<ZaRichTextEditor
  toolbar={[
    ['bold', 'italic', 'underline'],
    [{ header: [1, 2, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ]}
/>
```

也可以在 `defaultToolbar` 基础上扩展：

```tsx
import { ZaRichTextEditor, ZaRichTextEditorDefaultToolbar } from '@zealous-admin/components'

const toolbar = [
  ...ZaRichTextEditorDefaultToolbar,
  ['video'],
]

<ZaRichTextEditor toolbar={toolbar} />
```

### 自动填满父容器

`height` 传 `'auto'` 时编辑器自动填满父容器高度（父容器需有确定高度），内容超出时在编辑区内部滚动。

```tsx
import { ZaRichTextEditor } from '@zealous-admin/components'

<div style={{ height: 400 }}>
  <ZaRichTextEditor height="auto" />
</div>
```

### 只读模式

```tsx
import { ZaRichTextEditor } from '@zealous-admin/components'

<ZaRichTextEditor value="<p>只读内容</p>" readOnly />
```

## API

### ZaRichTextEditor Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 受控内容（HTML 字符串） | `string` | - |
| defaultValue | 非受控模式初始内容（HTML 字符串） | `string` | - |
| onChange | 内容变化回调（仅用户编辑时触发） | `(html: string) => void` | - |
| placeholder | 占位提示文案 | `string` | `'请输入内容...'` |
| height | 编辑区高度：数字为最小高度（px），`'auto'` 自动填满父容器（需父容器有确定高度） | `number \| 'auto'` | `300` |
| readOnly | 是否只读（只读时隐藏工具栏） | `boolean` | `false` |
| toolbar | 工具栏配置，传 `null` 隐藏工具栏；变化时自动重建编辑器（内容会保留） | `ToolbarConfig \| null` | 默认工具栏 |
| className | 自定义类名 | `string` | - |

> `ToolbarConfig` 类型由 `quill` 提供（`Array<string[] \| Array<string \| Record<string, unknown>>>`），
> 同时支持从 `@zealous-admin/components` 直接引用 `defaultToolbar` 作为扩展基础。

## 演示组件

`ZaRichTextEditorDemo` 提供了工具栏切换、高度、占位符、只读等配置演示，可直接体验不同效果。

```tsx
import { ZaRichTextEditorDemo } from '@zealous-admin/components'

<ZaRichTextEditorDemo />
```
