---
name: Zealous-admin
description: A precisely-calibrated admin framework with an invariant editorial-grid skeleton and 8 swappable visual themes — from precise default to playful cartoon, frosted glass, and neon hacker.
colors:
  geekblue-primary: "#2f54eb"
  geekblue-hover: "#597ef7"
  geekblue-active: "#1d39c4"
  geekblue-bg: "#f0f5ff"
  geekblue-border: "#adc6ff"
  neutral-bg-base: "#ffffff"
  neutral-bg-layout: "#f5f5f5"
  neutral-bg-elevated: "#ffffff"
  neutral-bg-container: "#ffffff"
  neutral-bg-fill: "#fafafa"
  neutral-text: "rgba(0, 0, 0, 0.88)"
  neutral-text-secondary: "rgba(0, 0, 0, 0.65)"
  neutral-text-tertiary: "rgba(0, 0, 0, 0.45)"
  neutral-text-quaternary: "rgba(0, 0, 0, 0.25)"
  neutral-border: "#d9d9d9"
  neutral-border-secondary: "#f0f0f0"
typography:
  hero:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "30px"
    fontWeight: 700
  page-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "26px"
    fontWeight: 700
  kpi-value:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "18px"
    fontWeight: 700
  section-heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 600
  card-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 600
  button:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5714
  body-secondary:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "13px"
    fontWeight: 400
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "12px"
    fontWeight: 400
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: "11px"
    fontWeight: 400
  code:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: "13px"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.geekblue-primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    height: "32px"
    padding: "4px 15px"
  button-primary-hover:
    backgroundColor: "{colors.geekblue-hover}"
  button-primary-active:
    backgroundColor: "{colors.geekblue-active}"
  button-default:
    backgroundColor: "{colors.neutral-bg-container}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.sm}"
    height: "32px"
    padding: "4px 15px"
  button-default-hover:
    textColor: "{colors.geekblue-primary}"
  card:
    backgroundColor: "{colors.neutral-bg-container}"
    rounded: "{rounded.lg}"
  input:
    backgroundColor: "{colors.neutral-bg-container}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "4px 11px"
---

# Design System: Zealous-admin

## Overview

**Creative North Star: "The Editorial Grid"**

Zealous-admin's visual system is built on the logic of a well-designed publication: every element sits on an invisible grid, every color assignment serves a structural role, and every spacing decision follows a predictable rhythm. There is no decoration without function. The interface recedes so the data comes forward.

The system speaks in Ant Design's token language, not its own proprietary palette — every design decision flows through `antd-style`'s `createStyles` and the ConfigProvider token map. This means the visual character can be reprogrammed entirely by swapping a theme type (MUI, Shadcn, Bootstrap, Cartoon, Hacker, Glass, Illustration) while the editorial skeleton — the grid, the hierarchy, the rhythm — stays intact.

The atmosphere is precise and restrained. Surfaces are flat at rest. Borders are thin (`1px`) and neutral. Spacing follows an 8px-base scale (`8 / 12 / 16 / 24 / 32`). Shadows appear only on elevated state (hover card, dropdown panel), and even then they are diffuse and structural — never theatrical. Typography uses the system font stack for zero-load, maximum-readability rendering. The only accent color is the chosen primary; its rarity on any given screen is the point.

**Key Characteristics:**
- Editorial-grid spatial logic: fixed rhythm, predictable placement, no floating or decorative elements
- Flat-by-default: surfaces are neutral fills, not lifted panels; depth is reserved for state change
- One-voice color: a single primary accent carries meaning; saturation and variety come from the data, not the chrome
- Theme-agnostic skeleton: the layout grid, spacing scale, and hierarchy survive any theme swap intact
- Typography-first: system fonts, one weight scale (400/500/600), content hierarchy expressed through size and color, not typeface variety

## Colors

> **Theme-variant.** The palette below is the `default` theme. The 7 custom themes (mui, shadcn, bootstrap, cartoon, illustration, glass, hacker) ship their own complete color token sets. See [Theme Variants](#theme-variants) for per-theme palettes. All color assignments in component code must use tokens, never hardcoded hex values.

The default palette pairs a cool indigo-blue primary with a precise neutral gray ramp. The primary accent (`geekblue`) is used sparingly — selected menu items, primary buttons, focus rings, and the active breadcrumb step. Its background tint (`geekblue-bg`) serves as hover fills and tag backgrounds. The neutral ramp covers five text roles (88% through 25% opacity on black) and four surface roles (base, layout, container, elevated), plus two border strengths.

### Primary
- **Geekblue Primary** (`#2f54eb`): The sole accent. Used on selected navigation items (background fill), primary buttons, focus rings, active links, and the ConfigProvider `colorPrimary` token. Its hover (`#597ef7`) and active (`#1d39c4`) states are derived from the antd color generation algorithm.
- **Geekblue Background** (`#f0f5ff`): The primary's tint. Used for table header fills (`colorFillAlter`), selected row backgrounds, and tag/chip fills.
- **Geekblue Border** (`#adc6ff`): The primary's border-strength variant. Used on hover card borders and input focus rings.

### Neutral
- **Base Background** (`#ffffff`): The page-level white. Applied to `colorBgBase` and inherited by containers, elevated panels, and the main content area.
- **Layout Background** (`#f5f5f5`): The canvas behind content cards. Applied to `colorBgLayout` — the subtle gray that separates the workspace from the chrome.
- **Container Background** (`#ffffff`): Card and modal backgrounds. Applied to `colorBgContainer`.
- **Fill Background** (`#fafafa`): Disabled and read-only surfaces. Applied to `colorFillQuaternary` and `colorFillAlter`.
- **Text Primary** (`rgba(0, 0, 0, 0.88)`): Body copy, headings, and active labels. Applied to `colorText`.
- **Text Secondary** (`rgba(0, 0, 0, 0.65)`): Descriptions, secondary labels, placeholder values. Applied to `colorTextSecondary`.
- **Text Tertiary** (`rgba(0, 0, 0, 0.45)`): Disabled text, timestamps, footnote-level content. Applied to `colorTextTertiary`.
- **Text Quaternary** (`rgba(0, 0, 0, 0.25)`): Watermark-level, barely-visible labels. Applied to `colorTextQuaternary`.
- **Border** (`#d9d9d9`): Active borders, input strokes, table cell dividers. Applied to `colorBorder`.
- **Border Secondary** (`#f0f0f0`): Subtle dividers, card borders, section separators. Applied to `colorBorderSecondary`.

### Named Rules
**The One Accent Rule.** The primary color appears on ≤10% of any given screen's pixel area. It marks selection, action, and focus — nothing more. If everything is blue, nothing is important.

## Typography

**Display Font:** System UI stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`)
**Body Font:** Same system stack
**Code Font:** `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`

**Character:** Native, zero-friction, optimized for screen reading at 14px body size. No decorative typography. The font stack is invisible by design — it's the platform default wherever the user is, which means zero download, instant render, and perfect OS-level hinting. The personality comes from the layout, not the typeface.

### Hierarchy
- **Hero / Login Title** (30px, 700 weight, `colorTextHeading`): The login page product name. Appears once, at the entry point.
- **Page Title** (26px, 700 weight, `colorTextHeading`): Dashboard headers and page-level titles. The largest type on any content screen; appears once per page.
- **KPI Value** (18px, 700 weight, `colorTextHeading`): Large statistical numbers on dashboard KPI cards. Used with `fontVariantNumeric: tabular-nums` for aligned digit rendering.
- **Section Heading** (16px, 600 weight, `colorText`): Card titles, modal headers, section labels. Drives scanability.
- **Card / Chart Title** (15px, 600 weight, `colorText`): Widget and chart titles inside dashboard cards. Also used for button text.
- **Body** (14px, 400 weight, 1.5714 line-height, `colorText`): Tables, forms, descriptions, and all content text. Max line length 75ch in prose contexts.
- **Secondary Body** (13px, 400 weight, `colorTextSecondary`): Table cell text, chart tooltips, form hints, timestamps, news tickers.
- **Label / Caption** (12px, 400 weight, `colorTextTertiary`): Chart axis labels, KPI metric labels, legend text, table column headers.
- **Micro Caption** (11px, 400 weight, `colorTextTertiary`): Chart axis ticks, breadth indicator labels, legend items. The smallest rendered text; never used for content-critical information.
- **Code** (13px, monospace stack): Inline code, keyboard shortcuts, technical identifiers.

### Named Rules
**The Three-Weight Rule.** The system uses exactly three font weights: 400 (body), 500 (medium emphasis), 600 (headings and strong). Never 300 (too thin on Windows) and never 700+ (too shouty). Ant Design's `fontWeightStrong` (600) is the ceiling.

## Layout

The system is built on a 5-mode layout engine with a single spatial grammar. All modes share the same 8px-base spacing scale and the same content-chrome separation logic.

**The grid.** Content areas use Ant Design's 24-column responsive grid (`Row` / `Col` with `gutter={[16, 16]}`). Dashboard cards span in multiples of 6 columns (6/8/12/24). System management pages use a single-column card layout with `app-container` wrapper.

**The chrome.** Five layout modes (`side`, `only-side`, `head`, `only-head`, `simple`) control where navigation lives. The active mode is a user preference persisted to localStorage, not a per-page decision. All modes share the same content area behavior: `flex: 1` with `overflow: auto`.

**Container behavior.** By default, content fills the available width. An optional centered mode (`isCenter: true`) constrains content to a configurable max-width (1200px–1600px) with a `colorBgBase` background on the outer gutters.

**Spacing rhythm.** The spacing scale (`4 / 8 / 12 / 16 / 24 / 32`) maps to Ant Design's `marginXXS` through `marginXXL` tokens. Card content padding is 16px (compact) or 24px (standard). Inter-card gaps are 16px.

**Responsive.** At widths below the mobile breakpoint, the layout collapses to a single-column mobile mode with a left Drawer for navigation (314px width). This is opt-in via `isEnableMobileAccess`.

**Header bar.** The top bar (`Header` component) renders a configurable stack of `TabBar` + `Toolbar`. Position is `static` (scrolls with content) by default; `fixed` and `sticky` variants are available.

## Elevation & Depth

**The Flat-By-Default Rule.** Surfaces sit flat at rest. The default background hierarchy uses tonal layering (base white → layout gray → container white → fill gray), not shadows, to distinguish surfaces. Shadows appear only as a response to state: card hover (`box-shadow: 0 2px 8px token.colorPrimaryBg`), dropdown open, modal overlay.

### Shadow Vocabulary
- **Elevated Card Hover** (`box-shadow: 0 2px 8px {colorPrimaryBg}`): Applied on `.statCard:hover` and `.chartCard:hover`. Subtle, primary-tinted, and diffused — signals clickability without lifting the surface aggressively.
- **Modal / Drawer** (Ant Design default `boxShadowSecondary`): `0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)`. Used for all overlay panels.
- **Dropdown / Popover** (Ant Design default `boxShadow`): `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`. Used for floating menus and tooltips.

### Depth Through Color
- Selected navigation items use `colorPrimary` as a solid background fill (not a shadow or outline), creating a non-spatial "this is active" signal that works in both light and dark modes.
- The login page uses a moving grid background with a gradient mask to create spatial depth without shadows.
- Dashboard stat cards use a `colorPrimaryBg` hover shadow — the shadow color matches the primary, creating a cohesive accent.

## Shapes

> **Theme-variant.** The radius values below are the `default` theme. Custom themes override them: `cartoon` uses 14–20px, `hacker` uses 0px everywhere, `glass` uses uniform 12px, `bootstrap` uses 4–6px. Always reference `token.borderRadius*` — never hardcode a radius value.

**The Soft Rectangle Rule.** All interactive surfaces use `borderRadius: 6` (the antd default). This is rounded enough to feel modern and approachable, sharp enough to feel precise and editorial. The login card and ConfigPanel use `borderRadius: 12` for the outer container — a deliberate softening for entry-point and configuration surfaces.

**Form language:**
- Buttons: `borderRadius: 6` (antd default), `height: 32` (default), `height: 40` (large), `height: 24` (small)
- Inputs: `borderRadius: 6`, `height: 32`, `1px solid colorBorder` stroke
- Cards: `borderRadius: 8` (antd `borderRadiusLG`), `1px solid colorBorderSecondary` border
- Modals: `borderRadius: 8`
- Table header cells: No border-radius, `colorFillAlter` background
- Menu items: `borderRadiusLG` on sub-menu items, `itemHeight: 48`, `collapsedWidth: 64`
- Tags / Chips: default antd tag radius with `2px` border radius on small tags
- Dashboard chart cards: `borderRadius: 6` with `1px solid colorBorderSecondary` at rest, `colorPrimaryBorder` + `colorPrimaryBg` shadow on hover

**The menu accent.** The active menu item uses `colorPrimary` as a solid background with `colorWhite` text. The default active indicator is a `dot` style (`menuActiveStyle: 'dot'`). Sub-menus use a `radius` fill style (`menuFillStyle: 'radius'`).

## Components

### Buttons
- **Shape:** `borderRadius: 6`, 32px default height, `4px 15px` horizontal padding
- **Primary:** Solid `colorPrimary` background, white text, `fontWeight: 400`. Hover shifts to `colorPrimaryHover`. Active shifts to `colorPrimaryActive`.
- **Default:** White background, `colorBorder` border, `colorText` text. Hover shifts text to `colorPrimary` and border to `colorPrimaryBorder`.
- **Text / Link:** No background, no border. `colorPrimary` text. Hover adds `colorPrimaryBg` background.
- **Danger:** Red variant of primary pattern. Used only on delete actions.
- **Ghost:** Transparent background with `colorPrimary` border and text. Used on dark-background sections.
- **Loading state:** Spinner replaces icon; button remains at fixed width to prevent layout shift.
- **Focus:** Ant Design default focus ring (`box-shadow: 0 0 0 2px colorPrimaryBg`).

### Cards
- **Corner Style:** `borderRadius: 8` (antd `borderRadiusLG`)
- **Background:** `colorBgContainer` (white)
- **Border:** `1px solid colorBorderSecondary` at rest
- **Hover:** Border shifts to `colorPrimaryBorder`, shadow appears (`0 2px 8px colorPrimaryBg`)
- **Internal Padding:** 16px (compact) to 24px (standard)
- **Dashboard cards** add `display: flex; flex-direction: column; overflow: hidden` for chart containment

### Inputs / Fields
- **Style:** `1px solid colorBorder` stroke, `borderRadius: 6`, 32px height, `colorBgContainer` fill
- **Hover:** Border shifts to `colorPrimaryBorder`
- **Focus:** Border shifts to `colorPrimary`, `box-shadow: 0 0 0 2px colorPrimaryBg`
- **Disabled:** `colorFillQuaternary` background, `colorTextQuaternary` text
- **Error:** `colorError` border, `colorError` text hint below
- **Password input:** Eye toggle icon switches between `EyeOutlined` (visible) and `EyeInvisibleOutlined`
- **TextArea:** Same token values, `rows` configurable

### Tables
- **Header:** `colorFillAlter` background, `fontWeight: 600`, 13px, `colorTextSecondary` text
- **Body:** Transparent background, 13px, `colorText`, `colorBorderSecondary` row dividers
- **Hover:** `colorFillQuaternary` row background
- **No outer border** — the `bordered` prop is omitted for a cleaner look
- **Pagination:** Standard antd pagination below the table

### Navigation
- **MainNav (top-level):** Vertical icon column (64px collapsed width). Selected item: `colorPrimary` solid background, white icon. Uses `border-inline-end: none` to remove the default antd menu border.
- **SubMenu (side):** Indented list below MainNav. `colorBgBase` background, `itemHeight: 48`. Selected item: `colorPrimary` background with `colorWhite` text. Sub-menu items use `borderRadiusLG` corners. Default active indicator: dot.
- **Mobile:** Navigation collapses into a left Drawer (314px) triggered by the hamburger in the Header.
- **Breadcrumb:** Configurable style (`default` or `modern`), rendered in the Toolbar above the tab bar. `isEnableMainNav` toggles the "Home" breadcrumb root.
- **TabBar:** Configurable style (`default`, `card`, `block`), width type (`auto`, `fixed`, `auto-min`, `auto-max`). Double-click behavior configurable (`refresh`, `close`, `fixed`, `max`, `open`). Icons toggleable.

### Search (Global)
- **Trigger:** `Cmd+K` / `Ctrl+K` keyboard shortcut or toolbar icon
- **Panel:** Modal overlay with instant search input. Results grouped by menu category. Chinese pinyin fuzzy matching via `pinyin-pro`.
- **Empty state:** "No results found" with suggestion to try a different keyword

### ConfigPanel (Signature Component)
The ConfigPanel is a modal-width settings drawer that exposes every layout, theme, navigation, and toolbar preference as interactive controls. It is the primary differentiator from other admin templates.
- **Layout:** 860px modal, two-column card grid
- **Theme section:** Color swatch grid (12 colors) with checkmark selection, segmented dark/light/auto toggle, color-weak switch
- **Navigation section:** 5-mode layout selector with miniature visual previews, accordion toggle, collapse toggle
- **Page section:** 5-transition animation selector with live CSS preview, progress bar toggle
- **TopBar section:** Tab bar enable/style/width/double-click, toolbar feature toggles, breadcrumb style
- **Footer:** "Copy Config" button exports the full `defaultSetting` object as TypeScript — the entire config can be pasted into source for permanent application

## Theme Variants

The system ships 8 theme types, switchable at runtime via the ConfigPanel or `randomStyle()`. The theme system operates entirely within antd's `ConfigProvider` — there are no CSS file swaps, font loads, or DOM class toggles. Every visual change flows through `theme.token` and `theme.components` overrides.

**Theme switching is a token-level operation.** Each custom theme ships a complete, self-contained token set. When a custom theme is active, the user's `colorPrimary` and `darkMode` selections are ignored — the theme owns its palette entirely.

### The Invariant Skeleton

These properties never change across theme switches. Every component, page, and layout must work correctly under all 8 themes without modification:

| Layer | Invariant |
|-------|-----------|
| Layout structure | 5 menu modes (side/only-side/head/only-head/simple), centered width range (1200–1600px), mobile Drawer (314px) |
| Spacing rhythm | 8px-base scale (`4/8/12/16/24/32`), card padding 16–24px, gutter 16px |
| Component hierarchy | TabBar → Toolbar → Content → Footer order, MainNav → SubMenu nesting |
| Typography scale | 30/26/18/16/15/14/13/12/11px, weights 400/500/600, system font stack |
| Animation types | 5 page transitions (slide/fade/fade-up/lightspeed/roll), progress bar |
| Global effects | Mourning mode (`grayscale(100%)`), color-weak mode (`invert(0.8) hue-rotate(180deg)`) — orthogonal to theme |

### Theme-Variant Properties

These change per theme. **Never hardcode any of these values in a component** — always use antd-style tokens so they resolve correctly under every theme:

| Property | Token source |
|----------|-------------|
| Color palette (primary, text, bg, border) | `token.colorPrimary`, `token.colorText*`, `token.colorBg*`, `token.colorBorder*` |
| Border radius | `token.borderRadius`, `token.borderRadiusLG/SM/XS` |
| Line width | `token.lineWidth`, `token.lineWidthBold` |
| Shadows | `token.boxShadow`, `token.boxShadowSecondary` |
| Control heights | `token.controlHeight`, `token.controlHeightSM/LG` |
| Font weight (buttons, strong text) | `token.fontWeightStrong` |

### Theme Catalog

#### default
**Technique:** Ant Design baseline. User-configurable `colorPrimary` (12 colors) + auto/manual dark mode. No custom component overrides. The reference theme — every other theme is defined as a delta from this one.

#### mui
**Technique:** Material Design elevation. Full palette (`#1976d2` primary), 3-layer `rgba(0,0,0,…)` shadows, buttons uppercase + `font-weight: 500`, inputs get Roboto font via CSS-in-JS classNames. Custom Material ripple wave effect via DOM manipulation. Text opacity scale (0.87/0.6/0.38/0.26).

#### shadcn
**Technique:** Neutral gray palette. Primary is near-black `#262626` / `#18181b`. White backgrounds, `#e4e4e7` / `#f5f5f5` borders. Subtle shadows (`0 1px 3px 0 rgba(0,0,0,0.1)`). Large radii: 10px general, 14px LG. High-contrast typographic hierarchy. No dark mode.

#### bootstrap
**Technique:** Gradient + inset 3D effects. Buttons: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))` + `inset 0 1px 0 rgba(255,255,255,0.15)` + `textShadow: 0 -1px 0 rgba(0,0,0,0.2)`. Active: pressed-in `box-shadow`. Progress bar 20px tall with gradient track. Wave effect disabled. Square corners (4px).

#### cartoon
**Technique:** Hard offset shadow + thick outline. Coral red `#FF6B6B` primary, charcoal `#2D3436` borders. Line width 3px everywhere. Shadow: `4px 4px 0 #2D3436` (NO blur). Large radii: 14px general, 20px LG. Buttons physically shift on hover/active (translate, not color change). Warm cream `#FFF9F0` base.

#### illustration
**Technique:** Same structural approach as cartoon (3px lines, `4px 4px 0` hard shadow, 12–16px radii) but with different palette: green `#52C41A` primary, pink `#FFF0F6` sider, amber `#FFE7BA` trigger. Buttons have no shadow (`primaryShadow: none`). More "storybook" than "cartoon."

#### glass
**Technique:** Frosted translucency. All backgrounds: `color-mix(in srgb, colorBgContainer 15%, transparent)`. Universal `backdrop-filter: blur(12px)`. Uniform 12px border-radius on everything. Inset highlights for glass edge effect. Fast animations (0.2/0.1/0.05s). Cards more opaque (40% bg mix). No dark mode.

#### hacker
**Technique:** Terminal/matrix. Neon green `#39ff14` on near-black `#030603`. Zero border radius everywhere. Line width 2px. Shadows are glow: `0 0 3px #39ff14, inset 0 0 10px #39ff14`. Uses `theme.darkAlgorithm` as base (the only theme that does). Compact controls (`controlHeight: 34`, `controlHeightSM: 26`). Body text gets `text-shadow: 0 0 5px color-mix(in srgb, currentColor 50%, transparent)`.

### Named Rules
**The Token-Only Rule.** Components must never hardcode color, radius, shadow, or line-width values. Always use `token.*` from `createStyles`. A component that looks correct under `default` but breaks under `cartoon` or `hacker` is a bug — not a theme limitation.

**The Skeleton Contract.** The layout grid, spacing rhythm, typographic scale, and component structure are the immutable skeleton. Themes change the paint, not the bones. New components must be tested under at least 3 themes (default + cartoon + hacker) to verify skeleton integrity.

## Do's and Don'ts

### Do:
- **Do** use `createStyles` from `antd-style` for every component's CSS. Never write bare `.css` files or inline `style` objects with hardcoded values.
- **Do** reference theme tokens (`token.colorPrimary`, `token.colorBgContainer`, `token.borderRadius`, etc.) for all visual properties. If a value isn't a token, it should be derived from one.
- **Do** use `useAppMessage()` for `message` and `modal` — never `App.useApp()` or static `message.info()`.
- **Do** use `useControlTab().openTab()` for programmatic navigation — never `navigate()` directly.
- **Do** keep card content at 16px internal padding, with 16px inter-card gaps via `Row gutter={[16, 16]}`.
- **Do** use the shared `useDashboardStyles` for dashboard pages. Custom chart colors should use `getUpDownColors()` for up/down semantics.
- **Do** use `Form.useForm()` with `rules` validation on all modal forms — never manual state management with unvalidated inputs.
- **Do** test new components under at least 3 themes (default + cartoon + hacker). A component that breaks under a different theme has a hardcoded value that should be a token.
- **Do** use `token.*` from `createStyles` for every visual property. If you're writing a hex code, px radius, or shadow string directly in a component, stop — it belongs in a token reference.

### Don't:
- **Don't** hardcode hex color values in component styles. Every color must flow through the antd-style token system so theme type switching works correctly.
- **Don't** use `bordered` on tables. The cleaner borderless style with `colorFillAlter` header background is the system default.
- **Don't** use `colorError` (red) for "up/gain" or `colorSuccess` (green) for "down/loss" in financial dashboards. Use the custom `upColor`/`downColor` from `getUpDownColors()`.
- **Don't** use `new Date().toISOString()` for database writes — MySQL strict mode rejects ISO 8601. Pass `new Date()` directly.
- **Don't** create new layout modes or modify the layout skeleton without going through the ConfigPanel preference system.
- **Don't** use any UI framework other than antd. The system is built on antd 6.x and all components must stay within that ecosystem.
