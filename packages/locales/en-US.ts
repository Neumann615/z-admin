import type { LayoutMessages } from './zh-CN'

// ==================== layout 内置文案（英文） ====================
const layoutMessages: LayoutMessages = {
  // Toolbar - theme menu
  'toolbar.followSystem': 'Follow System',
  'toolbar.lightTheme': 'Light Theme',
  'toolbar.darkTheme': 'Dark Theme',
  'toolbar.colorWeak': 'Color Weak Mode',

  // TabBar - context menu / dropdown actions
  'tabBar.reload': 'Reload',
  'tabBar.pin': 'Pin',
  'tabBar.unpin': 'Unpin',
  'tabBar.maximize': 'Maximize',
  'tabBar.closeTab': 'Close Tab',
  'tabBar.closeOtherTabs': 'Close Other Tabs',
  'tabBar.closeLeftTabs': 'Close Left Tabs',
  'tabBar.closeRightTabs': 'Close Right Tabs',
  'tabBar.search': 'Search',

  // Search
  'search.trigger': 'Search',
  'search.placeholder': 'Search by title or URL',
  'search.empty': 'Type to search navigation',
  'search.noResult': 'No results found',
  'search.switch': 'Switch',
  'search.jump': 'Open',
  'search.close': 'Close',

  // User info
  'userInfo.profile': 'Profile',
  'userInfo.preferences': 'Preferences',
  'userInfo.shortcuts': 'Shortcuts',
  'userInfo.feedback': 'Feedback',
  'userInfo.loggingOut': 'Logging out...',
  'userInfo.logout': 'Log Out',
  'userInfo.logoutFailed': 'Logout failed, please retry',
  'userInfo.notLoggedIn': 'Not Logged In',

  // Profile modal
  'profile.passwordChanged': 'Password changed, please log in again',
  'profile.defaultRole': 'User',
  'profile.accountNormal': 'Account Active',
  'profile.accountDisabled': 'Disabled',
  'profile.lastLogin': 'Last Login',
  'profile.title': 'Profile',
  'profile.username': 'Username',
  'profile.nickname': 'Nickname',
  'profile.email': 'Email',
  'profile.accountStatus': 'Account Status',
  'profile.statusEnabled': 'Enabled',
  'profile.statusDisabled': 'Disabled',
  'profile.role': 'Role',
  'profile.lastLoginTime': 'Last Login Time',
  'profile.changePassword': 'Change Password',
  'profile.oldPassword': 'Old Password',
  'profile.oldPasswordRequired': 'Please enter old password',
  'profile.oldPasswordPlaceholder': 'Enter current password',
  'profile.newPassword': 'New Password',
  'profile.newPasswordRequired': 'Please enter new password',
  'profile.passwordLength': 'Password must be 6-20 characters',
  'profile.passwordSame': 'New password cannot be the same as old password',
  'profile.newPasswordPlaceholder': '6-20 characters new password',
  'profile.confirmPassword': 'Confirm New Password',
  'profile.confirmPasswordRequired': 'Please enter new password again',
  'profile.passwordMismatch': 'The two passwords do not match',
  'profile.confirmPasswordPlaceholder': 'Enter new password again',
  'profile.submit': 'Confirm',
  'profile.tip': 'You need to log in again after the change. Please keep your new password safe.',

  // Shortcuts modal
  'shortcuts.title': 'Shortcuts',
  'shortcuts.global': 'Global',
  'shortcuts.viewSystemInfo': 'View system info',
  'shortcuts.openSearch': 'Open navigation search',
  'shortcuts.tabBar': 'Tab Bar',
  'shortcuts.prevTab': 'Switch to previous tab',
  'shortcuts.nextTab': 'Switch to next tab',
  'shortcuts.closeCurrentTab': 'Close current tab',
  'shortcuts.nthTab': 'Switch to the nth tab',
  'shortcuts.lastTab': 'Switch to the last tab',
  'shortcuts.page': 'Page',
  'shortcuts.maximize': 'Maximize',
  'shortcuts.exitMaximize': 'Exit maximize',

  // System info modal
  'systemInfo.browser': 'Browser',
  'systemInfo.os': 'Operating System',
  'systemInfo.language': 'Language',
  'systemInfo.resolution': 'Screen Resolution',
  'systemInfo.viewport': 'Viewport Size',
  'systemInfo.url': 'Current URL',
  'systemInfo.unknown': 'Unknown',

  // Feedback modal
  'feedback.title': 'Feedback',
  'feedback.captureTip': 'Screenshots help us understand the issue better. Click the button below to capture your current screen.',
  'feedback.captureButton': 'Capture Screen',
  'feedback.capturing': 'Capturing...',
  'feedback.captureFailed': 'Capture failed, please retry',
  'feedback.delete': 'Delete Screenshot',
  'feedback.descriptionRequired': 'Please fill in the description',
  'feedback.submit': 'Submit',
  'feedback.submitSuccess': 'Feedback submitted (simulated)',

  // Re-login modal
  'reLogin.title': 'Session Expired',
  'reLogin.okText': 'Re-login',
  'reLogin.cancelText': 'Log Out',
  'reLogin.tip': 'Your credentials have expired. Please re-enter your username and password.',
  'reLogin.usernameRequired': 'Please enter username',
  'reLogin.username': 'Username',
  'reLogin.passwordRequired': 'Please enter password',
  'reLogin.passwordMin': 'Password must be at least 3 characters',
  'reLogin.password': 'Password',

  // Mobile block
  'mobile.block': 'Sorry, this site does not support mobile devices. Please switch to a desktop device.',

  // Config panel (ConfigPanel)
  'configPanel.title.dev': 'App Config',
  'configPanel.title.user': 'Preferences',
  'configPanel.tip.production': 'This module is automatically disabled in production, keeping only user preferences.',
  'configPanel.tip.copy': 'Adjustments take effect temporarily only. To apply them to the project, click "Copy Config" and paste them into packages/layout/defaultSettings.ts.',
  'configPanel.copy': 'Copy Config',
  'configPanel.copied': 'Config copied to clipboard',
  'configPanel.reset': 'Reset',
  // Common reusable texts
  'configPanel.common.default': 'Default',
  'configPanel.common.fixed': 'Fixed',
  'configPanel.common.sticky': 'Sticky',
  'configPanel.common.enable': 'Enable',
  'configPanel.common.title': 'Title',
  'configPanel.common.search': 'Search',
  // Theme
  'configPanel.theme': 'Theme',
  'configPanel.themeType': 'Theme Type',
  'configPanel.colorScheme': 'Color Scheme',
  'configPanel.colorWeak': 'Color Weak Mode',
  'configPanel.themeType.illustration': 'Illustration',
  'configPanel.themeType.cartoon': 'Cartoon',
  'configPanel.themeType.shadcn': 'Shadcn',
  'configPanel.themeType.mui': 'MUI',
  'configPanel.themeType.bootstrap': 'Bootstrap',
  'configPanel.themeType.hacker': 'Hacker',
  'configPanel.themeType.glass': 'Glass',
  // Page
  'configPanel.page': 'Page',
  'configPanel.page.loadProgress': 'Page Loading Progress',
  'configPanel.transition.fadeIn': 'Fade In',
  'configPanel.transition.fadeUp': 'Fade Up',
  'configPanel.transition.fadeDown': 'Fade Down',
  'configPanel.transition.fadeLeft': 'Fade Left',
  'configPanel.transition.fadeRight': 'Fade Right',
  // Navigation menu
  'configPanel.menu': 'Navigation Menu',
  'configPanel.menu.accordion': 'Submenu Accordion Mode',
  'configPanel.menu.collapseBtn': 'Enable Submenu Collapse Button',
  'configPanel.menu.subCollapse': 'Submenu Collapse',
  'configPanel.menuType.side': 'Sidebar Mode',
  'configPanel.menuType.onlySide': 'Compact Sidebar Mode',
  'configPanel.menuType.head': 'Header Mode',
  'configPanel.menuType.onlyHead': 'Compact Header Mode',
  'configPanel.menuType.simple': 'Simple Mode (without main nav)',
  // Top bar
  'configPanel.topBar': 'Top Bar',
  'configPanel.topBar.swap': 'Display Order',
  'configPanel.topBar.position': 'Position',
  // Toolbar
  'configPanel.toolbar': 'Toolbar',
  'configPanel.toolbar.breadcrumb': 'Breadcrumb',
  'configPanel.toolbar.breadcrumbStyle': 'Breadcrumb Style',
  'configPanel.toolbar.breadcrumbStyle.modern': 'Modern',
  'configPanel.toolbar.showHome': 'Show Home',
  'configPanel.toolbar.i18n': 'Internationalization',
  'configPanel.toolbar.reload': 'Page Reload',
  'configPanel.toolbar.fullscreen': 'Fullscreen',
  'configPanel.toolbar.theme': 'Theme Color',
  // Tab bar
  'configPanel.tabBar': 'Tab Bar',
  'configPanel.tabBar.style': 'Style',
  'configPanel.tabBar.style.card': 'Card',
  'configPanel.tabBar.style.block': 'Block',
  'configPanel.tabBar.showIcon': 'Show Icons',
  'configPanel.tabBar.dblClick': 'Double-click Tab',
  'configPanel.tabBar.dblClick.refresh': 'Refresh',
  'configPanel.tabBar.dblClick.close': 'Close',
  'configPanel.tabBar.dblClick.fixed': 'Pin/Unpin',
  'configPanel.tabBar.dblClick.max': 'Maximize',
  'configPanel.tabBar.dblClick.open': 'Open in New Window',
  'configPanel.tabBar.widthType': 'Tab Width',
  'configPanel.tabBar.widthType.auto': 'Auto',
  'configPanel.tabBar.widthType.autoMin': 'Auto (min width)',
  'configPanel.tabBar.widthType.autoMax': 'Auto (max width)',
  // App
  'configPanel.app': 'App',
  'configPanel.app.mobileAccess': 'Mobile Access',
  'configPanel.app.dynamicTitle': 'Dynamic Title',
  'configPanel.app.mourning': 'Mourning Mode',
  'configPanel.app.watermark': 'Watermark',
  'configPanel.app.account': 'Account',
  'configPanel.app.permission': 'Permission Verification',
  'configPanel.app.expireMode': 'Expire Mode',
  'configPanel.app.expireMode.logout': 'Redirect to Login',
  'configPanel.app.expireMode.prompt': 'Popup Login Window',
  'configPanel.app.multiAccount': 'Multi-account',
  'configPanel.app.homePage': 'Home Page',
  'configPanel.app.layout': 'Layout',
  'configPanel.app.center': 'Centered',
  'configPanel.app.layoutScope': 'Scope',
  'configPanel.app.layoutScope.inside': 'Inside',
  'configPanel.app.layoutScope.outside': 'Outside',
  'configPanel.app.centerWidth': 'Center Width',
  'configPanel.app.copyright': 'Copyright',
  'configPanel.app.date': 'Date',
  'configPanel.app.company': 'Company',
  'configPanel.app.website': 'Website',
}

// ==================== 应用侧文案：菜单多语言映射（英文） ====================
const menuMessages = {
  '/': 'Home',
  '/demo': 'Demo',
  '/demo/style': 'Style Lab',
  '/demo/nav': 'Multi-level Nav',
  '/demo/nav/nav1': 'Nav 1',
  '/demo/nav/nav2': 'Nav 2',
  '/demo/nav/nav2/nav2-1': 'Nav 2-1',
  '/demo/nav/nav2/nav2-2': 'Nav 2-2',
  '/demo/nav/nav2/nav2-2/nav2-2-1': 'Nav 2-2-1',
  '/demo/nav/nav2/nav2-2/nav2-2-2': 'Nav 2-2-2',
  '/demo/components': 'Components',
  '/demo/components/sparkles-text': 'Sparkles Text',
  '/demo/components/slider-captcha': 'Slider Captcha',
  '/demo/components/link-preview': 'Link Preview',
  '/demo/components/shiny-text': 'Shiny Text',
  '/demo/components/marquee': 'Marquee',
  '/demo/components/icon-picker': 'Icon Picker',
  '/demo/components/markdown': 'Markdown Preview',
  '/demo/components/rich-text-editor': 'Rich Text Editor',
  '/demo/components/pattern-bg': 'Pattern Background',
  '/demo/components/iframe': 'Iframe',
  '/demo/components/signature-pad': 'Signature Pad',
  '/demo/func': 'Features',
  '/demo/func/maximize-page': 'Page Maximize',
  '/demo/func/logout': 'Session Expired',
  '/demo/func/fireworks': 'Celebration Effect',
  '/demo/link': 'External Links',
  '/demo/link/me': 'Personal Home',
  '/demo/link/react': 'React',
  '/demo/link/vite': 'Vite',
  '/demo/breadcrumb': 'Breadcrumb',
  '/demo/breadcrumb/flat': 'Flat Nav',
  '/demo/breadcrumb/nested': 'Nested Nav',
  '/demo/center-layout': 'Center Layout',
  '/demo/center-layout/layout-in': 'Inner Center',
  '/demo/center-layout/layout-out': 'Outer Center',
  '/demo/route-params': 'Route Params',
  '/demo/keepalive': 'Page KeepAlive',
  '/demo/menu-active': 'Nav Icon Active',
  '/demo/menu-active/menu-active-children': 'Child Icon Active',
  '/demo/menu-active/menu-active-parent': 'Parent Icon Active',
  '/demo/menu-active/menu-active-parent/menu-active-parent-test': 'Test Page',
  '/demo/dashboard': 'Dashboard',
  '/demo/dashboard/dashboard1': 'Dashboard Demo 1',
  '/demo/dashboard/dashboard2': 'Dashboard Demo 2',
  '/demo/dashboard/dashboard3': 'Dashboard Demo 3',
  '/system': 'System',
  '/system/admin': 'User Management',
  '/system/role': 'Role Management',
  '/system/menu': 'Menu Management',
  '/system/dict': 'Dictionary Management',
  '/ui': 'UI',
}

// ==================== components 包文案（主组件 + demo，英文） ====================
const componentMessages: Record<string, string> = {
  // ---- Signature Pad ----
  'component.signaturePad.signRequired': 'Please complete the signature first',
  'component.signaturePad.placeholder': 'Please sign here',

  // ---- Rich Text Editor ----
  'component.richTextEditor.placeholder': 'Please enter content...',
  'component.richTextEditor.toolbar.bold': 'Bold',
  'component.richTextEditor.toolbar.italic': 'Italic',
  'component.richTextEditor.toolbar.underline': 'Underline',
  'component.richTextEditor.toolbar.strike': 'Strikethrough',
  'component.richTextEditor.toolbar.blockquote': 'Blockquote',
  'component.richTextEditor.toolbar.codeBlock': 'Code Block',
  'component.richTextEditor.toolbar.link': 'Insert Link',
  'component.richTextEditor.toolbar.image': 'Insert Image',
  'component.richTextEditor.toolbar.video': 'Insert Video',
  'component.richTextEditor.toolbar.clean': 'Clear Formatting',
  'component.richTextEditor.toolbar.header': 'Heading',
  'component.richTextEditor.toolbar.list': 'List',
  'component.richTextEditor.toolbar.align': 'Align',
  'component.richTextEditor.toolbar.color': 'Text Color',
  'component.richTextEditor.toolbar.background': 'Background Color',
  'component.richTextEditor.toolbar.direction': 'Text Direction',
  'component.richTextEditor.toolbar.indent': 'Indent',
  'component.richTextEditor.toolbar.script': 'Super/Subscript',
  'component.richTextEditor.toolbar.font': 'Font',
  'component.richTextEditor.toolbar.size': 'Font Size',

  // ---- Slider Captcha ----
  'component.sliderCaptcha.tip.default': 'Hold the slider and drag it to the right end',
  'component.sliderCaptcha.tip.moving': 'Hold the slider and drag it to the right end',
  'component.sliderCaptcha.tip.error': 'Verification failed, please try again',
  'component.sliderCaptcha.tip.success': 'Verified',
  'component.sliderCaptcha.verifyFailed': 'Verification failed',

  // ---- Icon Picker ----
  'component.iconPicker.placeholder': 'Please select an icon',
  'component.iconPicker.searchPlaceholder': 'Search icons',
  'component.iconPicker.icons': 'icons',

  // ---- Demo common ----
  'component.demo.common.textContent': 'Text Content',
  'component.demo.common.fontSize': 'Font Size (px)',
  'component.demo.common.animationSpeed': 'Animation Speed',
  'component.demo.common.speedFast': 'Fast',
  'component.demo.common.speedMedium': 'Medium',
  'component.demo.common.speedSlow': 'Slow',
  'component.demo.common.width': 'Width (px)',
  'component.demo.common.height': 'Height (px)',
  'component.demo.common.placeholderLabel': 'Placeholder',

  // ---- Shiny Text demo ----
  'component.demo.shinyText.title': 'Shiny Text',
  'component.demo.shinyText.defaultText': 'Zealous-admin is a great admin dashboard template',
  'component.demo.shinyText.textColor': 'Text Color',
  'component.demo.shinyText.shinyColor': 'Shiny Color',

  // ---- Sparkles Text demo ----
  'component.demo.sparklesText.title': 'Sparkles Text',
  'component.demo.sparklesText.defaultText': 'Zealous-admin is a great admin dashboard template',
  'component.demo.sparklesText.shapeType': 'Shape Type',
  'component.demo.sparklesText.shape.fourPointStar': 'Four Point Star',
  'component.demo.sparklesText.shape.star': 'Star',
  'component.demo.sparklesText.shape.flower': 'Flower',

  // ---- Slider Captcha demo ----
  'component.demo.sliderCaptcha.title': 'Slider Captcha',
  'component.demo.sliderCaptcha.type': 'Captcha Type',
  'component.demo.sliderCaptcha.type.slider': 'Slider Captcha',
  'component.demo.sliderCaptcha.type.embed': 'Puzzle Captcha',
  'component.demo.sliderCaptcha.type.float': 'Triggered Puzzle Captcha',
  'component.demo.sliderCaptcha.bgWidth': 'Background Width (px)',
  'component.demo.sliderCaptcha.bgHeight': 'Background Height (px)',
  'component.demo.sliderCaptcha.defaultTip': 'Default Tip',
  'component.demo.sliderCaptcha.successTip': 'Success Tip',
  'component.demo.sliderCaptcha.errorTip': 'Error Tip',
  'component.demo.sliderCaptcha.defaultTipText': 'Hold the slider and drag it to the right end',
  'component.demo.sliderCaptcha.successTipText': 'Verified',
  'component.demo.sliderCaptcha.errorTipText': 'Verification failed, please try again',
  'component.demo.sliderCaptcha.verifySuccess': '{type} verified successfully',
  'component.demo.sliderCaptcha.verifyError': '{type} verification failed, please try again',

  // ---- Signature Pad demo ----
  'component.demo.signaturePad.title': 'Signature Pad',
  'component.demo.signaturePad.generated': 'Signature image generated',
  'component.demo.signaturePad.penWidth': 'Pen Width (px)',
  'component.demo.signaturePad.penColor': 'Pen Color',
  'component.demo.signaturePad.bgColor': 'Background Color',
  'component.demo.signaturePad.reSign': 'Re-sign',
  'component.demo.signaturePad.generate': 'Generate Image',
  'component.demo.signaturePad.download': 'Download Image',
  'component.demo.signaturePad.previewTitle': 'Signature Preview',
  'component.demo.signaturePad.close': 'Close',

  // ---- Marquee demo ----
  'component.demo.marquee.title': 'Marquee',
  'component.demo.marquee.direction.horizontal': 'Horizontal',
  'component.demo.marquee.direction.vertical': 'Vertical',
  'component.demo.marquee.duration': 'Duration (seconds)',
  'component.demo.marquee.gap': 'Item Gap (px)',
  'component.demo.marquee.repeat': 'Repeat Count',
  'component.demo.marquee.direction': 'Direction',
  'component.demo.marquee.reverse': 'Reverse Direction',
  'component.demo.marquee.pauseOnHover': 'Pause on Hover',
  'component.demo.marquee.gradient': 'Gradient Overlay',
  'component.demo.marquee.specialDemo': 'Special Example',
  'component.demo.marquee.review1': 'The design style of this component library is very modern, the API design is clear and easy to understand, and the documentation is detailed, making it quick to get started. The team has had a great overall experience, significantly improving development efficiency. Recommended to all frontend developers.',
  'component.demo.marquee.review2': 'The component quality is high and performance optimization is well done, maintaining a smooth user experience even in complex scenarios. Especially the table and form components, which are powerful and easy to customize, making them very suitable for enterprise application development.',
  'component.demo.marquee.review3': 'I really like the design system of this component library. The theme customization is powerful and easy to adapt to our product style. Switching between dark and light modes is smooth, animations are refined, and the user experience is excellent.',
  'component.demo.marquee.review4': 'Team collaboration efficiency has improved a lot. The components are highly reusable, greatly reducing repetitive development work. The code structure is clear and easy to maintain, and new members can get up to speed quickly. It is a very mature component library.',
  'component.demo.marquee.review5': 'Technical support responds promptly, the community is active, and solutions to problems can be found quickly. The release cadence is stable and bug fixes are timely. It is a trustworthy open source project.',
  'component.demo.marquee.review6': 'The TypeScript type definitions are very complete, providing a great development experience and reducing many type errors. IntelliSense is accurate and type safety is guaranteed. Highly recommended for TypeScript projects.',
  'component.demo.marquee.review7': 'Mobile adaptation is done well. The responsive design makes our application perform great on various devices. Whether on phones, tablets, or desktops, it provides a consistent user experience.',
  'component.demo.marquee.review8': 'The accessibility of the components is excellent and complies with WCAG standards, fully supporting our accessibility needs. Keyboard navigation and screen reader support are complete. It is a responsible component library.',

  // ---- Pattern Background demo ----
  'component.demo.patternBg.title': 'Pattern Background',
  'component.demo.patternBg.patternType': 'Pattern Type',
  'component.demo.patternBg.pattern.grid': 'Grid',
  'component.demo.patternBg.pattern.dot': 'Dot',
  'component.demo.patternBg.size': 'Pattern Size (px)',
  'component.demo.patternBg.opacity': 'Opacity',
  'component.demo.patternBg.animationDirection': 'Animation Direction',
  'component.demo.patternBg.animation.up': 'Up',
  'component.demo.patternBg.animation.down': 'Down',
  'component.demo.patternBg.animation.left': 'Left',
  'component.demo.patternBg.animation.right': 'Right',
  'component.demo.patternBg.animation.none': 'None',
  'component.demo.patternBg.maskDirection': 'Mask Direction',
  'component.demo.patternBg.mask.all': 'All',
  'component.demo.patternBg.mask.top': 'Top',
  'component.demo.patternBg.mask.bottom': 'Bottom',
  'component.demo.patternBg.mask.left': 'Left',
  'component.demo.patternBg.mask.right': 'Right',
  'component.demo.patternBg.mask.topBottom': 'Top & Bottom',
  'component.demo.patternBg.mask.leftRight': 'Left & Right',
  'component.demo.patternBg.mask.none': 'None',

  // ---- Rich Text Editor demo ----
  'component.demo.richTextEditor.title': 'Rich Text Editor',
  'component.demo.richTextEditor.toolbar': 'Toolbar',
  'component.demo.richTextEditor.toolbarMode.full': 'Full Toolbar',
  'component.demo.richTextEditor.toolbarMode.simple': 'Simple Toolbar',
  'component.demo.richTextEditor.toolbarMode.none': 'Hidden Toolbar',
  'component.demo.richTextEditor.height': 'Editor Height',
  'component.demo.richTextEditor.height.auto': 'Auto-fill parent container',
  'component.demo.richTextEditor.readOnly': 'Read-only Mode',
  'component.demo.richTextEditor.htmlSource': 'HTML Source',
  'component.demo.richTextEditor.renderEffect': 'Rendered Output',
  'component.demo.richTextEditor.initialContent': `<h2>Welcome to the Rich Text Editor</h2>
<p>A lightweight editor based on <strong>Quill</strong>, with styles wired into <strong>antd theme tokens</strong>, automatically adapting to <em>light and dark modes</em>.</p>
<p>Supports common formats such as <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s>.</p>
<h3>Lists and Alignment</h3>
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
</ul>
<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
</ol>
<p style="text-align: center">This paragraph is centered.</p>
<blockquote>Good tools should make complex things simple.</blockquote>
<pre class="ql-syntax" spellcheck="false">import Quill from 'quill'

const editor = new Quill('#editor', { theme: 'snow' })</pre>
<p>You can insert a <a href="https://quilljs.com" target="_blank">link</a> and images. Try editing the content above and watch the output below update in real time.</p>`,

  // ---- Icon Picker demo ----
  'component.demo.iconPicker.title': 'Icon Picker',
  'component.demo.iconPicker.library': 'Icon Library',
  'component.demo.iconPicker.libraryPlaceholder': 'Please select an icon library',
  'component.demo.iconPicker.clearable': 'Clearable',
  'component.demo.iconPicker.selectIcon': 'Select Icon',
  'component.demo.iconPicker.selectedValue': 'Selected Value:',

  // ---- Link Preview demo ----
  'component.demo.linkPreview.title': 'Link Preview',
  'component.demo.linkPreview.url': 'URL',
  'component.demo.linkPreview.urlPlaceholder': 'Please enter a URL',
  'component.demo.linkPreview.hoverPreview': 'Hover to preview:',
  'component.demo.linkPreview.moreExamples': 'More Examples',

  // ---- Iframe demo ----
  'component.demo.iframe.title': 'Iframe Embed',
  'component.demo.iframe.site.home': 'Personal Homepage',

  // ---- Markdown demo ----
  'component.demo.markdown.title': 'Markdown',
  'component.demo.markdown.chars': 'characters',
  'component.demo.markdown.placeholder': 'Type Markdown content here...',
  'component.demo.markdown.preview': 'Preview',
  'component.demo.markdown.sample': `# Welcome to the Markdown Editor

## Text Styles

This is a plain text paragraph containing **bold**, *italic*, ~~strikethrough~~, \`inline code\`, and a [hyperlink](https://github.com).

## Code Block

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`
}
\`\`\`

## Table

| Feature | Support | Notes |
|---------|---------|-------|
| GFM | ✅ | Full support |
| Syntax Highlight | ✅ | Prism |
| Task List | ✅ | GFM extension |

## Blockquote

> This is a blockquote
> It can span multiple lines

## Lists

1. Ordered list item one
2. Ordered list item two
   - Nested unordered list
   - Nested unordered list

- [x] Completed task
- [ ] Pending task`,
}

// 合并后的完整文案（layout 内置 + 应用侧 + components 包）
const enUS = { ...layoutMessages, ...menuMessages, ...componentMessages }

export default enUS
