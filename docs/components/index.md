# 组件总览

`@zealous-admin/components` 提供了 10 个开箱即用的业务组件，涵盖图标选择、文字动效、交互验证、外链嵌入等场景。

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
| [ZaShinyText](/components/z-shiny-text) | 流光/光泽文字动效 |
| [ZaSliderCaptcha](/components/z-slider-captcha) | 滑块验证码（3 种模式） |
| [ZaSparklesText](/components/z-sparkles-text) | 闪烁粒子文字动效 |

## 安装使用

```bash
pnpm add @zealous-admin/components
```

```tsx
import { ZaMarquee, ZaShinyText, ZaIframe } from '@zealous-admin/components'
```

所有组件都依赖 `react`、`react-dom`、`antd`、`antd-style` 作为 peer dependencies。
