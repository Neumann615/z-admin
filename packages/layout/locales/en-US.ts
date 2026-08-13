import type { LayoutMessages } from './zh-CN'

// layout 包内置文案（英文）
const enUS: LayoutMessages = {
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
  'shortcuts.mainNav': 'Main Navigation',
  'shortcuts.prevMainNav': 'Activate previous main nav',
  'shortcuts.nextMainNav': 'Activate next main nav',
  'shortcuts.tabBar': 'Tab Bar',
  'shortcuts.prevTab': 'Switch to previous tab',
  'shortcuts.nextTab': 'Switch to next tab',
  'shortcuts.closeCurrentTab': 'Close current tab',
  'shortcuts.nthTab': 'Switch to the nth tab',
  'shortcuts.lastTab': 'Switch to the last tab',
  'shortcuts.page': 'Page',
  'shortcuts.maximize': 'Maximize',
  'shortcuts.exitMaximize': 'Exit maximize',

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
}

export default enUS
