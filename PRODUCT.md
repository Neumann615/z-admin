# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **内部开发者/团队** — 需要快速搭建内部管理工具的后端或全栈开发者，使用 Zealous-admin 作为基础框架减少重复工作。
- **项目型公司/客户交付** — 面向甲方需求高度定制化的项目型公司，将 Zealous-admin 作为交付基座，根据客户需求做二次开发。

所有用户的共同场景：需要一个开箱即用、可深度定制的后台管理系统基座，而非从零搭建。

## Product Purpose

Zealous-admin 是一个 React 中后台管理系统框架。它让开发者通过配置而非编码来获得完整的后台布局、菜单、权限和主题系统，在保持 Ant Design 生态兼容性的同时提供远超 antd-pro 的布局灵活性和视觉定制能力。

成功的标志：开发者能在几分钟内从模板启动一个功能完整的管理后台，并通过可视化配置面板调整到符合项目需求的形态。

## Positioning

**高度可定制的布局系统。** 5 种布局模式（侧边栏/仅侧边/顶部/仅顶部/精简）+ 外部居中 + 移动端响应式，配合可视化配置面板实时切换。竞品模板通常只提供 1-2 种固定布局，且无法在不修改源码的情况下调整。

## Operating Context

- 后台管理系统场景：数据表格 CRUD、权限分配、菜单管理、字典维护
- 演示/展示场景：金融数据大屏、组件全景展示、风格实验室
- 开发者工作流：`pnpm dev` 启动前端（端口 3509），`service/` 目录启动 Hono 后端（端口 3001）
- 数据库：MySQL + Drizzle ORM，种子数据来自 `service/src/db/index.ts`

## Capabilities and Constraints

### 技术约束
- **Ant Design 6.x 体系** — 所有 UI 组件基于 antd，不引入其他 UI 框架
- **主题变量优先** — 所有样式必须通过 `antd-style` 的 `createStyles` + token 变量控制，禁止硬编码颜色/尺寸，确保切换主题类型时全局一致
- **pnpm monorepo 架构** — `packages/layout`（布局框架）、`packages/components`（共享组件）、`packages/theme`（主题 hooks）独立分包，可独立发布

### 关键能力
- 5 种布局模式 + 可视配置面板（ConfigPanel）
- JWT 认证 + 路由守卫 + 菜单-权限联动
- Tab 标签页导航 + 面包屑同步
- 多主题配色（8+ 种主题色） + 暗色/亮色/色弱模式
- 移动端响应式 + Drawer 导航
- MCP StreamableHTTP 集成（天气/位置查询）
- 种子数据驱动的菜单系统

### 未决事项
- 暂无国际化（i18n）实现，工具栏中预留了切换入口但未对接翻译文件
- 大屏演示页面（Dashboard 1/2/3）目前仅有模拟数据，未接入真实 API

## Brand Commitments

- 项目名称：Zealous-admin
- 技术标签：TypeScript · React 19 · Vite 8 · Antd 6 · Tailwind CSS
- 无强制品牌色或 Logo 约束，以 antd 主题 token 为准

## Evidence on Hand

- `src/pages/` — 全部业务页面实现
- `packages/layout/` — 布局框架完整源码
- `packages/components/` — 共享组件库
- `service/` — Hono 后端 API 服务
- `docs/` — VitePress 文档站点
- `CHANGELOG.md` — 开发历史记录
- 演示账号：admin/admin123、test/test123

## Product Principles

1. **配置优于编码** — 布局、主题、菜单等系统级能力应通过配置切换，而非修改源码
2. **主题变量是唯一真相来源** — 任何视觉决策都必须通过 antd-style token 表达，切换主题类型时不应出现破碎样式
3. **渐进复杂度** — 默认开箱即用（admin/admin123 登录即可体验），高级定制通过 ConfigPanel 逐步暴露
4. **生态兼容优先** — 保持与 antd 最新大版本的同步升级，不 fork 或 monkey-patch antd 内部实现
5. **交付友好** — 代码结构清晰、注释完善，确保项目型公司能高效二次开发并交付甲方

## Accessibility & Inclusion

- 色弱模式（`colorWeak`）已实现
- 暗色模式已实现
- 移动端响应式布局已实现（可选启用）
- 哀悼模式（灰度滤镜）已实现
