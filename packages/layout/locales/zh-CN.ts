// layout 包内置文案（简体中文）
const zhCN = {
  // 工具栏-主题菜单
  'toolbar.followSystem': '跟随系统',
  'toolbar.lightTheme': '浅色主题',
  'toolbar.darkTheme': '暗黑主题',
  'toolbar.colorWeak': '色弱模式',

  // 标签栏-右键菜单 / 下拉操作
  'tabBar.reload': '重新加载',
  'tabBar.pin': '固定',
  'tabBar.unpin': '取消固定',
  'tabBar.maximize': '最大化',
  'tabBar.closeTab': '关闭标签页',
  'tabBar.closeOtherTabs': '关闭其他标签页',
  'tabBar.closeLeftTabs': '关闭左侧标签页',
  'tabBar.closeRightTabs': '关闭右侧标签页',
  'tabBar.search': '搜索',

  // 搜索
  'search.trigger': '搜索',
  'search.placeholder': '支持标题、URL模糊查询',
  'search.empty': '输入你要搜索的导航',
  'search.noResult': '没有找到你想要的',
  'search.switch': '切换',
  'search.jump': '跳转',
  'search.close': '关闭',

  // 用户信息
  'userInfo.profile': '用户信息',
  'userInfo.preferences': '偏好设置',
  'userInfo.shortcuts': '快捷键',
  'userInfo.loggingOut': '退出中...',
  'userInfo.logout': '退出登录',
  'userInfo.logoutFailed': '退出失败，请重试',
  'userInfo.notLoggedIn': '未登录',

  // 个人资料弹窗
  'profile.passwordChanged': '密码修改成功，请重新登录',
  'profile.defaultRole': '普通用户',
  'profile.accountNormal': '账号正常',
  'profile.accountDisabled': '已禁用',
  'profile.lastLogin': '最后登录',
  'profile.title': '个人资料',
  'profile.username': '用户名',
  'profile.nickname': '昵称',
  'profile.email': '邮箱',
  'profile.accountStatus': '账号状态',
  'profile.statusEnabled': '启用',
  'profile.statusDisabled': '禁用',
  'profile.role': '角色',
  'profile.lastLoginTime': '最后登录时间',
  'profile.changePassword': '修改密码',
  'profile.oldPassword': '旧密码',
  'profile.oldPasswordRequired': '请输入旧密码',
  'profile.oldPasswordPlaceholder': '请输入当前密码',
  'profile.newPassword': '新密码',
  'profile.newPasswordRequired': '请输入新密码',
  'profile.passwordLength': '密码长度为 6-20 位',
  'profile.passwordSame': '新密码不能与旧密码相同',
  'profile.newPasswordPlaceholder': '6-20 位新密码',
  'profile.confirmPassword': '确认新密码',
  'profile.confirmPasswordRequired': '请再次输入新密码',
  'profile.passwordMismatch': '两次输入的密码不一致',
  'profile.confirmPasswordPlaceholder': '请再次输入新密码',
  'profile.submit': '确认修改',
  'profile.tip': '修改成功后需重新登录，请妥善保管新密码',

  // 快捷键弹窗
  'shortcuts.title': '快捷键',
  'shortcuts.global': '全局',
  'shortcuts.viewSystemInfo': '查看系统信息',
  'shortcuts.openSearch': '唤起导航搜索',
  'shortcuts.mainNav': '主导航',
  'shortcuts.prevMainNav': '激活上一个主导航',
  'shortcuts.nextMainNav': '激活下一个主导航',
  'shortcuts.tabBar': '标签栏',
  'shortcuts.prevTab': '切换到上一个标签页',
  'shortcuts.nextTab': '切换到下一个标签页',
  'shortcuts.closeCurrentTab': '关闭当前标签页',
  'shortcuts.nthTab': '切换到第 n 个标签页',
  'shortcuts.lastTab': '切换到最后一个标签页',
  'shortcuts.page': '页面',
  'shortcuts.maximize': '最大化',
  'shortcuts.exitMaximize': '退出最大化',

  // 重新登录弹窗
  'reLogin.title': '登录已过期',
  'reLogin.okText': '重新登录',
  'reLogin.cancelText': '退出',
  'reLogin.tip': '你的登录凭证已失效，请重新输入用户名和密码',
  'reLogin.usernameRequired': '请输入用户名',
  'reLogin.username': '用户名',
  'reLogin.passwordRequired': '请输入密码',
  'reLogin.passwordMin': '密码不能小于3位',
  'reLogin.password': '密码',

  // 移动端拦截
  'mobile.block': '抱歉，本网站不支持移动设备访问，请切换到桌面设备',
}

export default zhCN
export type LayoutMessages = typeof zhCN
