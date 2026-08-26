import { ConfigProvider, Drawer, Watermark } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAntdLocale } from '../hooks/useAntdLocale'
import { useControlTab } from '../hooks/useControlTab'
import { useGlobalShortcuts } from '../hooks/useGlobalShortcuts'
import { useMobileDetect } from '../hooks/useMobileDetect'
import { useAppStore, useMenuStore, usePageStore, useTopBarStore, useWatermarkStore } from '../store/index'
import { Content } from './Content/Content'
import { Footer } from './Footer/Footer'
import { GlobalProgress } from './GlobalProgress/GlobalProgress'
import { MainNav } from './MainNav/MainNav'
import { Menu } from './Menu/Menu'
import { MobileBlock } from './MobileBlock/MobileBlock'
import { ReLoginModal } from './ReLoginModal/ReLoginModal'
import { Setting } from './Setting/Setting'
import { SystemInfoModal } from './UserInfo/SystemInfoModal'
import 'animate.css'
import './reset.css'

const useStyles = createStyles(({ token }) => ({
  // 侧边栏模式布局
  layoutContainerStyle: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  layoutSiderStyle: {
    width: 'auto',
    display: 'flex',
  },
  layoutMainStyle: {
    flex: 1,
    width: '1px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  // 顶部模式布局
  headContainer: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
  },
  headTop: {
    width: '100%',
    height: 'auto',
  },
  headContent: {
    flex: 1,
    height: '1px',
    display: 'flex',
  },
  headContentMenu: {
    width: 'auto',
    height: '100%',
    backgroundColor: token.colorBgContainer,
  },
  headContentMain: {
    height: '100%',
    flex: 1,
    width: '1px',
    display: 'flex',
    flexDirection: 'column',
  },
  onlyHeadContent: {
    flex: 1,
    height: '1px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  // 精简模式布局
  singleMain: {
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
  singleMainLeft: {
    width: 'auto',
    height: '100%',
    backgroundColor: token.colorBgContainer,
  },
  singleMainContent: {
    flex: 1,
    width: '1px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  // 外部居中布局
  outsideCenterBg: {
    width: '100%',
    height: '100vh',
    backgroundColor: token.colorBgBase,
    display: 'flex',
    justifyContent: 'center',
  },
  outsideCenterWrapper: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    boxSizing: 'border-box',
    borderLeft: `1px solid ${token.colorBorderSecondary}`,
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    transition: 'max-width 0.3s ease',
  },
  // 非居中时的中性容器：与 outsideCenterWrapper 保持相同层级，避免配置变化导致整体重挂载
  layoutInnerWrapper: {
    width: '100%',
    height: '100%',
    transition: 'max-width 0.3s ease',
  },
  // 移动端响应式布局
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    backgroundColor: token.colorBgBase,
  },
  mobileContent: {
    flex: 1,
    height: '1px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

export function Layout() {
  const { theme, styles } = useStyles()
  // 与 LayoutProvider 保持一致的 antd locale，避免嵌套 ConfigProvider 重置为英文
  const antdLocale = useAntdLocale()
  const { menuType, menuCurrentKeys, openKeys, mainNavCurrentKeys, mobileDrawerOpen, setMobileDrawerOpen } = useMenuStore()
  const isMobile = useMobileDetect()
  const globalProgressLoading = usePageStore(state => state.globalProgressLoading)
  const { layout: layoutConfig, name: appName, isEnableMobileAccess, isEnableWatermark, isEnableDynamicTitle } = useAppStore()
  const { content: watermarkContent, fontSize: watermarkFontSize, width: watermarkWidth, height: watermarkHeight, rotate: watermarkRotate, gap: watermarkGap, zIndex: watermarkZIndex } = useWatermarkStore()
  // 水印颜色：store 显式配置时优先，否则跟随主题 colorText（12% 透明度）
  const watermarkTextColor = theme.colorTextDisabled
  const { nowTab } = useTopBarStore()
  const { syncTabFromUrl } = useControlTab()
  const location = useLocation()
  useGlobalShortcuts()

  // 浏览器后退/前进时同步 tab 与面包屑
  useEffect(() => {
    syncTabFromUrl(location.pathname)
  }, [location.pathname])

  // 动态网站标题：启用后切换路由时映射到菜单名称，否则固定为应用名称
  useEffect(() => {
    if (isEnableDynamicTitle && nowTab?.title) {
      document.title = `${nowTab.title} - ${appName}`
    }
    else {
      document.title = appName
    }
  }, [isEnableDynamicTitle, nowTab?.title])

  function renderLayout() {
    if (isMobile && isEnableMobileAccess) {
      return renderMobileLayout()
    }
    if (menuType === 'side') {
      return (
        <div className={styles.layoutContainerStyle}>
          <div className={styles.layoutSiderStyle}>
            <MainNav />
            <Menu></Menu>
          </div>
          <div className={styles.layoutMainStyle}>
            <Content></Content>
            <Footer></Footer>
          </div>
        </div>
      )
    }
    else if (menuType === 'only-side') {
      return (
        <div className={styles.layoutContainerStyle}>
          <div className={styles.layoutSiderStyle}>
            <MainNav />
          </div>
          <div className={styles.layoutMainStyle}>
            <Content></Content>
            <Footer></Footer>
          </div>
        </div>
      )
    }
    else if (menuType === 'head') {
      return (
        <div className={styles.headContainer}>
          <div className={styles.headTop}>
            <MainNav />
          </div>
          <div className={styles.headContent}>
            <div className={styles.headContentMenu}>
              <Menu></Menu>
            </div>
            <div className={styles.headContentMain}>
              <Content></Content>
              <Footer></Footer>
            </div>
          </div>
        </div>
      )
    }
    else if (menuType === 'only-head') {
      return (
        <div className={styles.headContainer}>
          <div className={styles.headTop}>
            <MainNav />
          </div>
          <div className={styles.headContent}>
            <div className={styles.headContentMain}>
              <Content></Content>
              <Footer></Footer>
            </div>
          </div>
        </div>
      )
    }
    else if (menuType === 'simple') {
      return (
        <div className={styles.singleMain}>
          <div className={styles.singleMainLeft}>
            <Menu />
          </div>
          <div className={styles.singleMainContent}>
            <Content></Content>
            <Footer></Footer>
          </div>
        </div>
      )
    }
  }

  function renderMobileLayout() {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.mobileContent}>
          <Content />
          <Footer />
        </div>
        <Drawer
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          width={314}
          placement="left"
          closable={false}
          styles={{ body: { padding: 0, display: 'flex' }, header: { display: 'none' } }}
        >
          <MainNav />
          <Menu />
        </Drawer>
      </div>
    )
  }

  useEffect(() => {
    // console.log('z-menuCurrentKeys', menuCurrentKeys)
    // console.log('z-openKeys', openKeys)
    // console.log('z-mainNavCurrentKeys', mainNavCurrentKeys)
  }, [menuCurrentKeys, openKeys, mainNavCurrentKeys])

  const isOutsideCenter = layoutConfig.isCenter && layoutConfig.layoutScope === 'outside'

  const layoutContent = renderLayout()

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        components: {
          Menu: {
            itemBg: theme.colorBgBase,
            itemSelectedBg: theme.colorPrimary,
            itemSelectedColor: theme.colorWhite,
            subMenuItemBg: theme.colorBgBase,
            subMenuItemBorderRadius: theme.borderRadiusLG,
            itemHeight: 48,
            collapsedWidth: 64,
            dropdownWidth: 180,
          },
        },
      }}
    >
      <MobileBlock>
        {/* 固定层级结构：外层始终为居中容器，仅内层切换 className / style，避免布局配置变化导致整体重挂载；max-width 平滑过渡 */}
        <div className={styles.outsideCenterBg}>
          <div
            className={isOutsideCenter ? styles.outsideCenterWrapper : styles.layoutInnerWrapper}
            style={{
              width: '100%',
              maxWidth: isOutsideCenter ? layoutConfig.width : '100%',
            }}
          >
            {isEnableWatermark
              ? (
                  <Watermark
                    content={watermarkContent}
                    width={watermarkWidth}
                    height={watermarkHeight}
                    font={{ fontSize: watermarkFontSize, color: watermarkTextColor }}
                    rotate={watermarkRotate}
                    gap={watermarkGap as [number, number]}
                    zIndex={watermarkZIndex}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {layoutContent}
                  </Watermark>
                )
              : layoutContent}
          </div>
        </div>
        <Setting></Setting>
        <ReLoginModal />
        <SystemInfoModal />
        <GlobalProgress
          isAnimating={globalProgressLoading}
          key={location.key}
        >
        </GlobalProgress>
      </MobileBlock>
    </ConfigProvider>
  )
}