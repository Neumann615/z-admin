import type { DarkMode, ToolbarOrderItem } from '../../types/config'
import {
  BgColorsOutlined,
  EyeOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  SyncOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { useFullscreen } from 'ahooks'
import { Col, Dropdown, Row } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useMobileDetect } from '../../hooks/useMobileDetect'
import { useT } from '../../hooks/useT'
import { useI18nStore } from '../../store/i18n'
import { useMenuStore } from '../../store/menu'
import { usePageStore } from '../../store/page'
import { useThemeStore } from '../../store/theme'
import { useTopBarStore } from '../../store/topBar'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { Search } from '../Search/Search'
import './view-transition.css'

const useStyles = createStyles(({ token, css }) => ({
  headerModule: {
    boxSizing: 'border-box',
    padding: `0 ${token.paddingSM}px`,
    backgroundColor: token.colorBgBase,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    height: 54,
  },
  Toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    userSelect: 'none',
  },
  ToolbarItem: css`
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.3s;
    color: ${token.colorText};
    font-size: 18px;

    :hover {
      transition: all 0.3s;
      background-color: ${token.colorFillContentHover};
    }
  `,
  themeSetting: css`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  themeSettingSpot: css`
    background-color: ${token.colorPrimary};
    width: 6px;
    height: 6px;
    border-radius: 50%;
  `,
}))

export function Toolbar() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)
  const themeStore = useThemeStore()
  const topBarStore = useTopBarStore()
  const { styles } = useStyles()
  const t = useT()
  const { locale, locales, setLocale } = useI18nStore()
  const darkBtnRef = useRef<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [systemDarkMode, setSystemDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const isMobile = useMobileDetect()
  const { mobileDrawerOpen, setMobileDrawerOpen } = useMenuStore()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen) {
        const target = event.target as Node
        const isOutside
          = !darkBtnRef.current?.contains(target)
            && !document.querySelector('.ant-dropdown')?.contains(target)

        if (isOutside) {
          setDropdownOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const getCurrentActualMode = (): 'dark' | 'light' => {
    if (themeStore.darkMode === '1')
      return 'dark'
    if (themeStore.darkMode === '0')
      return 'light'
    return systemDarkMode ? 'dark' : 'light'
  }

  const getTargetActualMode = (targetMode: DarkMode): 'dark' | 'light' => {
    if (targetMode === '1')
      return 'dark'
    if (targetMode === '0')
      return 'light'
    return systemDarkMode ? 'dark' : 'light'
  }

  function toggleDarkMode(v: DarkMode, e: React.MouseEvent) {
    const currentMode = getCurrentActualMode()
    const targetMode = getTargetActualMode(v)

    if (currentMode === targetMode) {
      useThemeStore.setState({ darkMode: v })
      return
    }

    if (!darkBtnRef.current || !window.document.startViewTransition) {
      useThemeStore.setState({ darkMode: v })
      return
    }

    const x = e.clientX
    const y = e.clientY
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = window.document.startViewTransition(() => {
      // eslint-disable-next-line react/dom-no-flush-sync
      flushSync(() => {
        useThemeStore.setState({ darkMode: v })
      })
    })

    transition.ready.then(() => {
      const isToDark = targetMode === 'dark'

      document.documentElement.classList.remove('dark-on-top', 'light-on-top')
      if (isToDark) {
        document.documentElement.classList.add('dark-on-top')
        document.documentElement.animate(
          {
            clipPath: [`circle(${maxRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
          },
          {
            duration: 600,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-old(root)',
          },
        )
      }
      else {
        document.documentElement.classList.add('light-on-top')
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 600,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      }
    })
  }

  const themeMenu: any = useMemo(() => {
    return [
      {
        icon: <SyncOutlined />,
        label: (
          <div className={styles.themeSetting}>
            <div>{t('toolbar.followSystem')}</div>
            {themeStore.darkMode === 'auto' ? <div className={styles.themeSettingSpot}></div> : null}
          </div>
        ),
        onClick: (e: any) => toggleDarkMode('auto', e.domEvent),
        key: 'auto',
      },
      {
        icon: <SunOutlined />,
        label: (
          <div className={styles.themeSetting}>
            <div>{t('toolbar.lightTheme')}</div>
            {themeStore.darkMode === '0' ? <div className={styles.themeSettingSpot}></div> : null}
          </div>
        ),
        onClick: (e: any) => toggleDarkMode('0', e.domEvent),
        key: 'light',
      },
      {
        icon: <MoonOutlined />,
        label: (
          <div className={styles.themeSetting}>
            <div>{t('toolbar.darkTheme')}</div>
            {themeStore.darkMode === '1' ? <div className={styles.themeSettingSpot}></div> : null}
          </div>
        ),
        onClick: (e: any) => toggleDarkMode('1', e.domEvent),
        key: 'dark',
      },
      {
        type: 'divider',
      },
      {
        icon: <EyeOutlined />,
        label: (
          <div className={styles.themeSetting}>
            <div>{t('toolbar.colorWeak')}</div>
            {themeStore.colorWeak ? <div className={styles.themeSettingSpot}></div> : null}
          </div>
        ),
        onClick: () => {
          useThemeStore.setState({ colorWeak: !themeStore.colorWeak })
        },
      },
    ]
  }, [themeStore])

  // 语言切换菜单（选项来自 i18n.locales 配置）
  const i18nMenu: any = useMemo(() => {
    return locales.map((item: any) => ({
      icon: <TranslationOutlined />,
      label: (
        <div className={styles.themeSetting}>
          <div>{item.label}</div>
          {locale === item.locale ? <div className={styles.themeSettingSpot}></div> : null}
        </div>
      ),
      onClick: () => setLocale(item.locale),
      key: item.locale,
    }))
  }, [locales, locale, styles])

  const toolbar = topBarStore.toolbar

  // 按 toolbarOrder 顺序渲染右侧功能项
  const toolbarItemMap: Record<Exclude<ToolbarOrderItem, 'Breadcrumb'>, React.ReactNode> = {
    Search: toolbar.isEnableSearch
      ? (
          <div key="Search" style={{ marginRight: 8 }}>
            <Search />
          </div>
        )
      : null,
    I18n: toolbar.i18n.isEnableI18n
      ? (
          <Dropdown key="I18n" menu={{ items: i18nMenu }}>
            <div className={styles.ToolbarItem}>
              <TranslationOutlined />
            </div>
          </Dropdown>
        )
      : null,
    PageReload: toolbar.isEnablePageReload
      ? (
          <div key="PageReload" className={styles.ToolbarItem} onClick={() => usePageStore.getState().refreshPage()}>
            <SyncOutlined />
          </div>
        )
      : null,
    Fullscreen: toolbar.isEnableFullscreen
      ? (
          <div key="Fullscreen" className={styles.ToolbarItem} onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </div>
        )
      : null,
    Theme: toolbar.isEnableTheme
      ? (
          <Dropdown
            key="Theme"
            menu={{ items: themeMenu }}
            open={dropdownOpen}
            trigger={[]}
          >
            <div
              className={styles.ToolbarItem}
              ref={darkBtnRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <BgColorsOutlined />
            </div>
          </Dropdown>
        )
      : null,
  }

  const toolbarOrder: ToolbarOrderItem[] = toolbar.toolbarOrder
    || ['Breadcrumb', 'Search', 'I18n', 'PageReload', 'Fullscreen', 'Theme']

  return toolbar.isEnableToolbar
    ? (
        <Row align="middle" className={styles.headerModule}>
          <Col span={16}>
            {isMobile
              ? <div className={styles.ToolbarItem}>
                  {
                    mobileDrawerOpen
                      ? <MenuFoldOutlined onClick={() => setMobileDrawerOpen(false)} />
                      : <MenuUnfoldOutlined onClick={() => setMobileDrawerOpen(true)} />
                  }
                </div>
              : <Breadcrumb />}
          </Col>
          <Col span={8}>
            <div className={styles.Toolbar}>
              {toolbarOrder
                .filter(item => item !== 'Breadcrumb')
                .map(item => toolbarItemMap[item as Exclude<ToolbarOrderItem, 'Breadcrumb'>])}
            </div>
          </Col>
        </Row>
      )
    : null
}