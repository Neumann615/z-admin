# 组件总览

`@zealous-admin/components` 提供了 12 个开箱即用的业务组件，涵盖图标选择、文字动效、交互验证、富文本编辑、签名板、外链嵌入等场景。

## 组件列表

| 组件 | 说明 |
|------|------|
| [ZaIcon](/components/z-icon) | 动态图标渲染器，支持 32 个图标库 |
| [ZaIconPicker](/components/z-icon) | 图标选择器，带侧边栏、搜索、网格浏览 |
| [ZaIframe](/components/z-iframe) | Iframe 外链嵌入，自动撑满 + 加载状态 |
| [ZaLinkPreview](/components/z-link-preview) | 链接预览悬浮卡片 |
| [ZaMarkdown](/components/z-markdown) | Markdown 渲染组件 |
| [ZaMarquee](/components/z-marquee) | 跑马灯/无限滚动 |
| [ZaPatternBg](/components/z-pattern-bg) | 图案背景（grid/dot 两种图案） |
| [ZaRichTextEditor](/components/z-rich-text-editor) | Quill 富文本编辑器（接入 antd 主题） |
| [ZaShinyText](/components/z-shiny-text) | 流光/光泽文字动效 |
| [ZaSignaturePad](/components/z-signature-pad) | canvas 手写签名板，支持重签 / 生成 / 下载图片 |
| [ZaSliderCaptcha](/components/z-slider-captcha) | 滑块验证码（3 种模式） |
| [ZaSparklesText](/components/z-sparkles-text) | 闪烁粒子文字动效 |

## 安装使用

```bash
pnpm add @zealous-admin/components
```

```tsx
import { ZaIframe, ZaMarquee, ZaShinyText } from '@zealous-admin/components'
```

所有组件都依赖 `react`、`react-dom`、`antd`、`antd-style` 作为 peer dependencies。

## 国际化

components 包内置国际化支持，组件内部文案（如滑块验证码、富文本编辑器、图标选择器及各 Demo 页）随语言自动切换。

### ZaConfigProvider（语言注入）

底层组件无法直接读取应用层的 i18n store（避免循环依赖），需由上层通过 `ZaConfigProvider` 统一注入当前语言：

```tsx
import { ZaConfigProvider } from '@zealous-admin/components'

<ZaConfigProvider locale="en-US">
  <App />
</ZaConfigProvider>
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| locale | 当前语言（如 `'zh-CN'` / `'en-US'`） | `string` | `'zh-CN'` |

> 使用 `@zealous-admin/layout` 时无需手动注入，`LayoutProvider` 内部已通过 `ZaConfigProvider locale={locale}` 自动完成。

### useT（文案翻译）

组件外部也可直接使用 `useT` hook 读取文案：

```tsx
import { useT } from '@zealous-admin/components'

function MyComponent() {
  const t = useT()
  return <span>{t('tabBar.closeTab')}</span>
}
```

`useT` 从 `@zealous-admin/locales` 读取完整文案，key 不存在时回退到 `zh-CN` 文案，再回退到 key 本身。
