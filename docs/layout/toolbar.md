# 工具栏（Toolbar）

工具栏位于页面顶栏区域，提供常用功能的快捷入口。工具栏的项目可通过配置自由组合和排序。

## 启用工具栏

```tsx
const config: LayoutConfig = {
  topBar: {
    toolbar: {
      isEnableToolbar: true,
    },
  },
}
```

## 工具栏项目

工具栏支持 6 种内置工具项，默认排序为：

```tsx
toolbarOrder: ['Breadcrumb', 'Search', 'I18n', 'PageReload', 'Fullscreen', 'Theme']
```

### 1. Breadcrumb（面包屑导航）

默认显示。详见 [面包屑文档](/layout/breadcrumb)。

### 2. Search（全局搜索）

```tsx
isEnableSearch: true
```

提供全局搜索功能入口，可用于搜索菜单、页面或数据。

### 3. I18n（语言切换）

```tsx
const config: LayoutConfig = {
  topBar: {
    toolbar: {
      i18n: {
        isEnableI18n: true, // 启用语言切换
        defaultLocale: 'zh-CN', // 默认语言
        locales: [
          { locale: 'zh-CN', label: '简体中文' },
          { locale: 'en-US', label: 'English' },
        ],
      },
    },
  },
}
```

提供语言切换按钮，切换后自动联动：

- **antd 组件语言包** — 通过 `useAntdLocale` 懒加载切换（zh-CN 同步、其余异步）
- **菜单/标签页/面包屑** — 按当前语言重新解析菜单名称
- **components 组件库** — 通过 `ZaConfigProvider` 注入语言，组件内部文案同步翻译
- **`html lang` 属性** — 同步更新

当前语言由 `useI18nStore` 统一管理，初始值按浏览器语言自动推断并持久化，也可通过 `useI18nStore.getState().setLocale('en-US')` 命令式切换。

### 4. PageReload（页面刷新）

```tsx
isEnablePageReload: true
```

一键刷新当前页面内容，不刷新浏览器窗口。

### 5. Fullscreen（全屏切换）

```tsx
isEnableFullscreen: true
```

进入/退出浏览器全屏模式的切换按钮。

### 6. Theme（主题切换）

```tsx
isEnableTheme: true
```

快捷切换亮色/暗色/自动模式的按钮，点击会触发视图过渡动画。

## 独立开关

每个工具项都有独立的启用开关。即使 `isEnableToolbar` 为 `true`，也可以单独禁用某个工具项（将其对应开关设为 `false`）。

## 拖拽排序

工具栏区域支持拖拽重排。通过 `@dnd-kit/react` 实现，用户可以在设置面板中拖拽调整工具项的顺序，或在顶栏区域直接拖拽调整标签栏和工具栏的上下排列。
