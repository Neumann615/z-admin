# 介绍

zealous-admin 是一个基于 **React 19 + Vite 8 + Ant Design 6** 构建的现代化后台管理系统模板。采用 pnpm monorepo 架构，将核心功能拆分为多个独立包。

## 核心特性

- **🎨 8 套主题** — default 支持亮色/暗色/主题色自由切换；7 种定制主题一键应用
- **📐 5 种布局** — side / only-side / head / only-head / simple + 移动端响应式
- **🔧 50+ 配置项** — 可视化配置面板，复制配置导出为 TypeScript 代码
- **🏷️ 多标签页** — 拖拽排序、右键菜单、固定标签、图标激活态切换
- **🧠 页面 KeepAlive** — 双层渲染架构，缓存页保持组件状态不丢失
- **🗄️ 内置后端** — Express + SQLite，RBAC 完整 CRUD

## 核心包

| 包名 | 说明 |
|------|------|
| `@zealous-admin/layout` | 布局核心：21 个组件、7 个 Store、7 个 Hooks、HTTP 实例、用户/权限体系 |
| `@zealous-admin/theme` | 8 套主题配置 |
| `@zealous-admin/components` | 12 个业务组件：图标选择器、富文本编辑器、签名板、Iframe、链接预览、Markdown 等 |
| `@zealous-admin/utils` | 通用工具函数：data / env / file / parse / time 五大模块 |

## 技术栈

| 技术 | 版本 |
|------|------|
| React | 19.x |
| Vite | 8.x |
| TypeScript | 5.x |
| Ant Design | 6.x |
| Zustand | 5.x |
| React Router | 7.x |
| pnpm | 11.x |

## 浏览器支持

现代浏览器（Chrome、Firefox、Safari、Edge），不支持 IE。
