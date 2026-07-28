# ZaIframe

Iframe 外链嵌入组件，自动撑满容器 + 加载状态提示。

## 使用

```tsx
import { ZaIframe } from '@zealous-admin/components'

<ZaIframe name="Ant Design" url="https://ant.design" />
```

## Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `name` | `string` | ✅ | 显示名称 |
| `url` | `string` | ✅ | 嵌入地址 |

## 注意事项

- 组件会自动撑满父容器，建议外层包裹 `<div className="app-container" style={{ height: '100%' }}>`
- 部分网站设置了 `X-Frame-Options` 禁止 iframe 嵌入（如 GitHub、Google），这是网站安全策略限制
