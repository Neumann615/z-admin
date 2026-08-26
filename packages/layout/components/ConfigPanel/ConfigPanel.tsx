import type { ExpireMode, MenuType, ThemeType, ToolbarOrderItem } from '../../types/config'
import type { DragEndEvent } from '@dnd-kit/react'
import {
  BgColorsOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  MoonOutlined,
  ReloadOutlined,
  SearchOutlined,
  SunOutlined,
  SyncOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { useInterval, useUnmount } from 'ahooks'
import { App, Button, Card, Col, Input, Modal, Radio, Row, Segmented, Select, Slider, Switch, Tooltip } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useRef, useState } from 'react'
// @ts-ignore
import { CSSTransition } from 'react-transition-group'
import _defaultSetting from '../../defaultSetting'
import { useT } from '../../hooks/useT'
import {
  useAppStore,
  useMenuStore,
  usePageStore,
  useThemeStore,
  useTopBarStore,
} from '../../store/index'
import {
  breadcrumbStyleList,
  expireModeList,
  layoutScopeList,
  menuTypeList,
  mergeAttribute,
  tabBarDblClickEventTypeList,
  tabBarStyleList,
  tabBarWidthTypeList,
  themeColorList,
  themeTypeList,
  topBarPositionList,
  transitionTypeList,
} from '../../utils/index'

const useStyles = createStyles(({ token, css }) => {
  return {
    configContainer: css`
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: ${token.colorBgContainerDisabled};
    `,
    configContent: css`
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px;
      display: flex;
      gap: 8px;
    `,
    configColumn: css`
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `,
    configItem: css`
      line-height: 24px;
      min-height: 24px;
    `,
    cardContent: css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `,
    moduleTitle: css`
      font-size: 13px;
      font-weight: 500;
      color: ${token.colorText};
      margin-bottom: 8px;
    `,
    moduleLable: css`
      font-size: 13px;
      font-weight: 500;
      color: ${token.colorText};
    `,
    menuType: css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    `,
    themeItem: css`
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
    `,
    checkedColor: css`
      width: 24px;
      height: 16px;
      border-radius: 50%;
      transform: rotate(-30deg);
      box-sizing: border-box;
      transition: all 0.25s;
    `,
    unCheckedColor: css`
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transition: all 0.25s;
    `,
    checkedIcon: css`
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      border: 4px solid ${token.colorPrimaryBorder};
      border-radius: ${token.borderRadius}px;
      transition: all 0.25s;
    `,
    unCheckedIcon: css`
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      pointer-events: none;
      transition: all 0.25s;
    `,
    transitionContainer: css`
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${token.boxShadow};
      box-sizing: border-box;
      position: relative;
      padding: 8px;
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
    `,
    transitionContent: css`
      width: 100%;
      height: 100%;
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorPrimaryBg};
    `,
    layoutContainer: css`
      width: 100%;
      height: 74px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${token.boxShadow};
      box-sizing: border-box;
      padding: 12px;
      border-radius: ${token.borderRadius}px;
      position: relative;
      cursor: pointer;
    `,
    layoutContent: css`
      width: 100%;
      height: 100%;
      border-radius: ${token.borderRadiusSM}px;
      overflow: hidden;
    `,
    appModuleContainer: css`
      width: 100%;
      border: 1px solid ${token.colorBorderSecondary};
      box-sizing: border-box;
      padding: 12px;
      padding-top: 38px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      border-radius: ${token.borderRadius}px;
    `,
    appModuleTitle: css`
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 4px 12px;
      display: flex;
      font-size: 14px;
      font-weight: 500;
      color: ${token.colorTextHeading};
      background-color: ${token.colorBgContainerDisabled};
      border-bottom-right-radius: ${token.borderRadius}px;
    `,
    resetModal: css`
      .ant-modal-body {
        padding: 0px;
        max-height: 80vh;
        overflow-y: auto;
      }
      .ant-modal-header {
        padding: 12px;
        margin-bottom: 0;
      }
      .ant-modal-container {
        padding: 0px;
      }
      .ant-card-head {
        padding: 0px 12px;
        background-color: ${token.colorBgElevated};
        color: ${token.colorTextSecondary};
        font-size: 14px;
        font-weight: 500;
        min-height: 36px;
      }
      .ant-card-body {
        padding: 10px 12px;
      }
    `,
    customHeader: css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: ${token.colorTextHeading};
      }
      p {
        margin: 0;
        font-size: 13px;
        color: ${token.colorTextDescription};
      }
    `,
    customHeaderLeft: css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
    customHeaderTip: css`
      font-size: 16px;
      color: ${token.colorError};
      cursor: help;
    `,
    customHeaderActions: css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
    toolbarPreview: css`
      margin-top: 8px;
      padding: 0 ${token.paddingSM}px;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgBase};
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 54px;
      box-sizing: border-box;
    `,
    toolbarPreviewLeft: css`
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
    `,
    toolbarPreviewRight: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      user-select: none;
    `,
    toolbarPreviewItem: css`
      cursor: grab;
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
    toolbarPreviewBreadcrumb: css`
      font-size: 14px;
      color: ${token.colorTextSecondary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    toolbarPreviewDisabled: css`
      opacity: 0.35;
    `,
  }
})

interface ConfigPanelProps {
  isDev?: boolean
  open: boolean
  onClose: () => void
}

interface ToolbarPreviewItemProps {
  id: string
  index: number
  icon: React.ReactNode
  disabled: boolean
  styles: any
}

// 工具栏预览单项：通过 useSortable 注册拖拽排序能力（与 TabBar 同一套 @dnd-kit/react）
function ToolbarPreviewItem({ id, index, icon, disabled, styles }: ToolbarPreviewItemProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: 'toolbar-preview',
  })

  return (
    <div
      ref={ref}
      className={`${styles.toolbarPreviewItem} ${disabled ? styles.toolbarPreviewDisabled : ''}`}
      style={{ opacity: isDragging ? 0.7 : undefined }}
    >
      {icon}
    </div>
  )
}

export function ConfigPanel({ open, onClose, isDev = true }: ConfigPanelProps) {
  const { message } = App.useApp()
  const t = useT()
  const appStore = useAppStore()
  const menuStore = useMenuStore()
  const themeStore = useThemeStore()
  const pageStore = usePageStore()
  const topBarStore = useTopBarStore()
  const { styles, theme } = useStyles()

  const mergeTopBar = (storeTopBar: any) => {
    const merged = mergeAttribute(_defaultSetting.topBar, storeTopBar)
    merged.toolbar = {
      ..._defaultSetting.topBar.toolbar,
      ...storeTopBar.toolbar,
    }
    return merged
  }

  const handleCopyConfig = async () => {
    const configString = `import type { LayoutConfig } from './types/config'

const defaultSetting: LayoutConfig = ${JSON.stringify(defaultSetting, null, 2)}

export default defaultSetting`
    try {
      await navigator.clipboard.writeText(configString)
      message.success(t('configPanel.copied'))
    }
    catch {
      const textArea = document.createElement('textarea')
      textArea.value = configString
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      message.success(t('configPanel.copied'))
    }
  }

  const [defaultSetting, setDefaultSetting] = useState({
    app: mergeAttribute(_defaultSetting.app, appStore),
    theme: mergeAttribute(_defaultSetting.theme, themeStore),
    menu: mergeAttribute(_defaultSetting.menu, menuStore),
    page: mergeAttribute(_defaultSetting.page, pageStore),
    topBar: mergeTopBar(topBarStore),
  })
  const [isTransition, setIsTransition] = useState(false)
  const transitionRef1 = useRef<HTMLDivElement>(null)
  const transitionRef2 = useRef<HTMLDivElement>(null)
  const transitionRef3 = useRef<HTMLDivElement>(null)
  const transitionRef4 = useRef<HTMLDivElement>(null)
  const transitionRef5 = useRef<HTMLDivElement>(null)
  const transitionRefs = [
    transitionRef1,
    transitionRef2,
    transitionRef3,
    transitionRef4,
    transitionRef5,
  ]

  useEffect(() => {
    useAppStore.setState(defaultSetting.app)
    useThemeStore.setState(defaultSetting.theme)
    useMenuStore.setState(defaultSetting.menu)
    usePageStore.setState(defaultSetting.page)
    useTopBarStore.setState(defaultSetting.topBar)
  }, [defaultSetting])

  useEffect(() => {
    if (open) {
      setDefaultSetting({
        app: mergeAttribute(_defaultSetting.app, appStore),
        theme: mergeAttribute(_defaultSetting.theme, themeStore),
        menu: mergeAttribute(_defaultSetting.menu, menuStore),
        page: mergeAttribute(_defaultSetting.page, pageStore),
        topBar: mergeTopBar(topBarStore),
      })
    }
  }, [open])

  const clearInterval = useInterval(
    () => {
      setIsTransition(!isTransition)
    },
    3000,
    { immediate: true },
  )

  useUnmount(() => {
    clearInterval()
  })

  function renderLayout(type: MenuType) {
    if (type === 'side') {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', gap: 4 }}>
          <div
            style={{
              width: '20%',
              height: '100%',
              backgroundColor: theme.colorPrimary,
            }}
          >
          </div>
          <div
            style={{
              width: '20%',
              height: '100%',
              backgroundColor: theme.colorPrimaryBgHover,
            }}
          >
          </div>
          <div
            style={{
              flex: 1,
              height: '100%',
              border: `2px dashed ${theme.colorPrimaryBorder}`,
              backgroundColor: theme.colorPrimaryBg,
            }}
          >
          </div>
        </div>
      )
    }
    else if (type === 'only-side') {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', gap: 4 }}>
          <div
            style={{
              width: '20%',
              height: '100%',
              backgroundColor: theme.colorPrimary,
            }}
          >
          </div>
          <div
            style={{
              flex: 1,
              height: '100%',
              border: `2px dashed ${theme.colorPrimaryBorder}`,
              backgroundColor: theme.colorPrimaryBg,
            }}
          >
          </div>
        </div>
      )
    }
    else if (type === 'head') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: 4,
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '23%',
              backgroundColor: theme.colorPrimary,
            }}
          >
          </div>
          <div style={{ flex: 1, height: '1px', display: 'flex', gap: 4 }}>
            <div
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: theme.colorPrimaryBgHover,
              }}
            >
            </div>
            <div
              style={{
                flex: 1,
                height: '100%',
                border: `2px dashed ${theme.colorPrimaryBorder}`,
                backgroundColor: theme.colorPrimaryBg,
              }}
            >
            </div>
          </div>
        </div>
      )
    }
    else if (type === 'only-head') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: 4,
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '23%',
              backgroundColor: theme.colorPrimary,
            }}
          >
          </div>
          <div
            style={{
              flex: 1,
              height: '1px',
              width: '100%',
              border: `2px dashed ${theme.colorPrimaryBorder}`,
              backgroundColor: theme.colorPrimaryBg,
            }}
          >
          </div>
        </div>
      )
    }
    else if (type === 'simple') {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', gap: 4 }}>
          <div
            style={{
              width: '20%',
              height: '100%',
              backgroundColor: theme.colorPrimaryBgHover,
            }}
          >
          </div>
          <div
            style={{
              flex: 1,
              height: '100%',
              border: `2px dashed ${theme.colorPrimaryBorder}`,
              backgroundColor: theme.colorPrimaryBg,
            }}
          >
          </div>
        </div>
      )
    }
  }

  const isCustomTheme = defaultSetting.theme.themeType !== 'default'

  const renderThemeConfig = () => (
    <Card key="theme" title={t('configPanel.theme')}>
      <div className={styles.cardContent}>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.themeType')}
          </Col>
          <Col>
            <Select
              size="small"
              value={defaultSetting.theme.themeType}
              onChange={(v: ThemeType) => {
                setDefaultSetting({
                  ...defaultSetting,
                  theme: { ...defaultSetting.theme, themeType: v },
                })
              }}
              options={themeTypeList.map(item => ({ label: t(item.labelKey), value: item.value }))}
              style={{ width: 140 }}
            >
            </Select>
          </Col>
        </Row>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            opacity: isCustomTheme ? 0.4 : 1,
            pointerEvents: isCustomTheme ? 'none' : 'auto',
          }}
        >
          {themeColorList.map((color: string | undefined) => {
            return (
              <div
                key={color}
                onClick={() => {
                  setDefaultSetting({
                    ...defaultSetting,
                    theme: { ...defaultSetting.theme, themeColor: color },
                  })
                }}
                className={styles.themeItem}
              >
                <div
                  className={
                    defaultSetting.theme.themeColor === color
                      ? styles.checkedColor
                      : styles.unCheckedColor
                  }
                  style={{ backgroundColor: color }}
                >
                </div>
                <div
                  className={
                    defaultSetting.theme.themeColor === color
                      ? styles.checkedIcon
                      : styles.unCheckedIcon
                  }
                >
                </div>
              </div>
            )
          })}
        </div>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.colorScheme')}
          </Col>
          <Col>
            <Segmented
              size="small"
              options={[
                { value: '0', icon: <SunOutlined /> },
                { value: '1', icon: <MoonOutlined /> },
                { value: 'auto', icon: <SyncOutlined /> },
              ]}
              value={defaultSetting.theme.darkMode}
              disabled={isCustomTheme}
              onChange={(v: string) => {
                setDefaultSetting({
                  ...defaultSetting,
                  theme: {
                    ...defaultSetting.theme,
                    darkMode: v,
                  },
                })
              }}
            />
          </Col>
        </Row>

        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.colorWeak')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.theme.colorWeak}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  theme: { ...defaultSetting.theme, colorWeak: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
      </div>
    </Card>
  )

  const renderTransitionConfig = () => (
    <Card key="transition" title={t('configPanel.page')}>
      <div className={styles.cardContent}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}
        >
          {transitionTypeList.map((transition: any, index: number) => {
            return (
              <Tooltip title={t(transition.labelKey)} key={index}>
                <div
                  className={styles.transitionContainer}
                  onClick={() => {
                    setDefaultSetting({
                      ...defaultSetting,
                      page: {
                        ...defaultSetting.page,
                        transitionType: transition.value,
                      },
                    })
                  }}
                >
                  <CSSTransition
                    nodeRef={transitionRefs[index]}
                    timeout={800}
                    in={isTransition}
                    unmountOnExit
                    classNames={transition.classNames}
                  >
                    <div
                      className={styles.transitionContent}
                      ref={transitionRefs[index]}
                    >
                    </div>
                  </CSSTransition>
                  {defaultSetting.page.transitionType === transition.value
                    ? (
                        <div className={styles.checkedIcon}></div>
                      )
                    : null}
                </div>
              </Tooltip>
            )
          })}
        </div>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.page.loadProgress')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.page.isEnablePageLoadProgress}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  page: {
                    ...defaultSetting.page,
                    isEnablePageLoadProgress: v,
                  },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
      </div>
    </Card>
  )

  const renderMenuTypeConfig = () => (
    <Card key="menuType" title={t('configPanel.menu')}>
      <div className={styles.cardContent}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {menuTypeList.map((item: any, index: number) => {
            return (
              <Tooltip title={t(item.labelKey)} key={index}>
                <div
                  className={styles.layoutContainer}
                  onClick={() => {
                    setDefaultSetting({
                      ...defaultSetting,
                      menu: { ...defaultSetting.menu, menuType: item.value },
                    })
                  }}
                >
                  {defaultSetting.menu.menuType === item.value
                    ? (
                        <div className={styles.checkedIcon}></div>
                      )
                    : null}
                  <div className={styles.layoutContent}>
                    {renderLayout(item.value)}
                  </div>
                </div>
              </Tooltip>
            )
          })}
        </div>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.menu.accordion')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.menu.subMenuUniqueOpened}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  menu: { ...defaultSetting.menu, subMenuUniqueOpened: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.menu.collapseBtn')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.menu.isEnableSubMenuCollapse}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  menu: { ...defaultSetting.menu, isEnableSubMenuCollapse: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.menu.subCollapse')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.menu.subMenuCollapse}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  menu: { ...defaultSetting.menu, subMenuCollapse: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
      </div>
    </Card>
  )

  const renderTopBarConfig = () => (
    <Card key="topBar" title={t('configPanel.topBar')}>
      <div className={styles.cardContent}>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.tabBar')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.topBar.tabBar.isEnableTabBar}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    tabBar: { ...defaultSetting.topBar.tabBar, isEnableTabBar: v },
                  },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.toolbar')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.topBar.toolbar.isEnableToolbar}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    toolbar: { ...defaultSetting.topBar.toolbar, isEnableToolbar: v },
                  },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.topBar.swap')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.topBar.order[0] === 'TabBar'}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    order: v ? ['TabBar', 'Toolbar'] : ['Toolbar', 'TabBar'],
                  },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.topBar.position')}
          </Col>
          <Col>
            <Radio.Group
              size="small"
              value={defaultSetting.topBar.position}
              onChange={(v: any) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    position: v.target.value,
                  },
                })
              }}
            >
              {topBarPositionList.map((item) => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    {t(item.labelKey)}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </Card>
  )

  const toolbarFuncItems: { key: string, label: string, icon: React.ReactNode }[] = [
    { key: 'isEnableSearch', label: t('configPanel.common.search'), icon: <SearchOutlined /> },
    { key: 'isEnableI18n', label: t('configPanel.toolbar.i18n'), icon: <TranslationOutlined /> },
    { key: 'isEnablePageReload', label: t('configPanel.toolbar.reload'), icon: <ReloadOutlined /> },
    { key: 'isEnableFullscreen', label: t('configPanel.toolbar.fullscreen'), icon: <FullscreenOutlined /> },
    { key: 'isEnableTheme', label: t('configPanel.toolbar.theme'), icon: <BgColorsOutlined /> },
  ]

  // 预览项元数据：与 toolbarOrder 中的项一一对应
  const toolbarPreviewMeta: Record<ToolbarOrderItem, { icon: React.ReactNode, enabled: boolean }> = {
    Breadcrumb: {
      icon: <SearchOutlined />,
      enabled: defaultSetting.topBar.toolbar.breadcrumb.isEnableBreadcrumb,
    },
    Search: {
      icon: <SearchOutlined />,
      enabled: defaultSetting.topBar.toolbar.isEnableSearch,
    },
    I18n: {
      icon: <TranslationOutlined />,
      enabled: defaultSetting.topBar.toolbar.i18n.isEnableI18n,
    },
    PageReload: {
      icon: <ReloadOutlined />,
      enabled: defaultSetting.topBar.toolbar.isEnablePageReload,
    },
    Fullscreen: {
      icon: <FullscreenOutlined />,
      enabled: defaultSetting.topBar.toolbar.isEnableFullscreen,
    },
    Theme: {
      icon: <BgColorsOutlined />,
      enabled: defaultSetting.topBar.toolbar.isEnableTheme,
    },
  }

  const toolbarOrder: ToolbarOrderItem[] = defaultSetting.topBar.toolbar.toolbarOrder
    || _defaultSetting.topBar.toolbar.toolbarOrder

  const moveToolbarOrder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex)
      return
    const arr = [...toolbarOrder]
    const [moved] = arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, moved)
    setDefaultSetting({
      ...defaultSetting,
      topBar: {
        ...defaultSetting.topBar,
        toolbar: {
          ...defaultSetting.topBar.toolbar,
          toolbarOrder: arr,
        },
      },
    })
  }

  const renderToolbarPreview = () => {
    const breadcrumbEnabled = toolbarPreviewMeta.Breadcrumb.enabled
    const rightItems = toolbarOrder.filter(item => item !== 'Breadcrumb')

    return (
      <DragDropProvider
        onDragEnd={(event: DragEndEvent) => {
          if (event.canceled)
            return
          const { source } = event.operation
          if (!isSortable(source))
            return
          const { index, initialIndex } = source
          if (index !== initialIndex) {
            moveToolbarOrder(initialIndex, index)
          }
        }}
      >
        <div className={styles.toolbarPreview}>
          <div className={styles.toolbarPreviewLeft}>
            {breadcrumbEnabled && (
              <div className={styles.toolbarPreviewBreadcrumb}>
                {t('configPanel.toolbar.breadcrumb')}
              </div>
            )}
          </div>
          <div className={styles.toolbarPreviewRight}>
            {rightItems.map((item, index) => (
              <ToolbarPreviewItem
                key={item}
                id={item}
                index={index}
                icon={toolbarPreviewMeta[item].icon}
                disabled={!toolbarPreviewMeta[item].enabled}
                styles={styles}
              />
            ))}
          </div>
        </div>
      </DragDropProvider>
    )
  }

  const renderToolbarFuncConfig = () => {
    return (
      <Card key="toolbarFunc" title={t('configPanel.toolbar')}>
        <div className={styles.cardContent}>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.toolbar.breadcrumb')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.topBar.toolbar.breadcrumb.isEnableBreadcrumb}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    topBar: {
                      ...defaultSetting.topBar,
                      toolbar: {
                        ...defaultSetting.topBar.toolbar,
                        breadcrumb: {
                          ...defaultSetting.topBar.toolbar.breadcrumb,
                          isEnableBreadcrumb: v,
                        },
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.toolbar.breadcrumbStyle')}
            </Col>
            <Col>
              <Radio.Group
                size="small"
                value={defaultSetting.topBar.toolbar.breadcrumb.style}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    topBar: {
                      ...defaultSetting.topBar,
                      toolbar: {
                        ...defaultSetting.topBar.toolbar,
                        breadcrumb: {
                          ...defaultSetting.topBar.toolbar.breadcrumb,
                          style: v.target.value,
                        },
                      },
                    },
                  })
                }}
              >
                {breadcrumbStyleList.map((item) => {
                  return (
                    <Radio.Button key={item.value} value={item.value}>
                      {t(item.labelKey)}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.toolbar.showHome')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.topBar.toolbar.breadcrumb.isEnableMainNav}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    topBar: {
                      ...defaultSetting.topBar,
                      toolbar: {
                        ...defaultSetting.topBar.toolbar,
                        breadcrumb: {
                          ...defaultSetting.topBar.toolbar.breadcrumb,
                          isEnableMainNav: v,
                        },
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          {toolbarFuncItems.map(item => (
            <Row key={item.key} align="middle" className={styles.configItem}>
              <Col flex={1} className={styles.moduleLable}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {item.icon}
                  {item.label}
                </span>
              </Col>
              <Col>
                <Switch
                  size="small"
                  defaultChecked={item.key === 'isEnableI18n'
                    ? defaultSetting.topBar.toolbar.i18n.isEnableI18n
                    : defaultSetting.topBar.toolbar[item.key]}
                  onChange={(v: boolean) => {
                    if (item.key === 'isEnableI18n') {
                      setDefaultSetting({
                        ...defaultSetting,
                        topBar: {
                          ...defaultSetting.topBar,
                          toolbar: {
                            ...defaultSetting.topBar.toolbar,
                            i18n: {
                              ...defaultSetting.topBar.toolbar.i18n,
                              isEnableI18n: v,
                            },
                          },
                        },
                      })
                    }
                    else {
                      setDefaultSetting({
                        ...defaultSetting,
                        topBar: {
                          ...defaultSetting.topBar,
                          toolbar: {
                            ...defaultSetting.topBar.toolbar,
                            [item.key]: v,
                          },
                        },
                      })
                    }
                  }}
                />
              </Col>
            </Row>
          ))}
          {renderToolbarPreview()}
        </div>
      </Card>
    )
  }

  const renderTabBarConfig = () => (
    <Card key="tabBar" title={t('configPanel.tabBar')}>
      <div className={styles.cardContent}>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.tabBar.style')}
          </Col>
          <Col>
            <Radio.Group
              size="small"
              value={defaultSetting.topBar.tabBar.style}
              onChange={(v: any) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    tabBar: {
                      ...defaultSetting.topBar.tabBar,
                      style: v.target.value,
                    },
                  },
                })
              }}
            >
              {tabBarStyleList.map((item) => {
                return (
                  <Radio.Button key={item.value} value={item.value}>
                    {t(item.labelKey)}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.tabBar.showIcon')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.topBar.tabBar.showIcon}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    tabBar: {
                      ...defaultSetting.topBar.tabBar,
                      showIcon: v,
                    },
                  },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.tabBar.dblClick')}
          </Col>
          <Col>
            <Select
              size="small"
              defaultValue={defaultSetting.topBar.tabBar.dblClickEvent}
              onChange={(v: string) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    tabBar: {
                      ...defaultSetting.topBar.tabBar,
                      dblClickEvent: v,
                    },
                  },
                })
              }}
              style={{ width: 140 }}
              options={tabBarDblClickEventTypeList.map(item => ({ label: t(item.labelKey), value: item.value }))}
            >
            </Select>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.tabBar.widthType')}
          </Col>
          <Col>
            <Select
              size="small"
              defaultValue={defaultSetting.topBar.tabBar.widthType}
              onChange={(v: string) => {
                setDefaultSetting({
                  ...defaultSetting,
                  topBar: {
                    ...defaultSetting.topBar,
                    tabBar: {
                      ...defaultSetting.topBar.tabBar,
                      widthType: v,
                    },
                  },
                })
              }}
              style={{ width: 140 }}
              options={tabBarWidthTypeList.map(item => ({ label: t(item.labelKey), value: item.value }))}
            >
            </Select>
            {defaultSetting.topBar.tabBar.widthType !== 'auto' && (
              <Slider
                min={125}
                max={200}
                defaultValue={defaultSetting.topBar.tabBar.width}
                onChange={(v: number) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    topBar: {
                      ...defaultSetting.topBar,
                      tabBar: {
                        ...defaultSetting.topBar.tabBar,
                        width: v,
                      },
                    },
                  })
                }}
                style={{ width: 120 }}
              >
              </Slider>
            )}
          </Col>
        </Row>
      </div>
    </Card>
  )

  const renderAppConfig = () => (
    <Card key="app" title={t('configPanel.app')}>
      <div className={styles.cardContent}>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.app.mobileAccess')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.app.isEnableMobileAccess}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  app: { ...defaultSetting.app, isEnableMobileAccess: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.app.dynamicTitle')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.app.isEnableDynamicTitle}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  app: { ...defaultSetting.app, isEnableDynamicTitle: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.app.mourning')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.app.isEnableMourningMode}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  app: { ...defaultSetting.app, isEnableMourningMode: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <Row align="middle" className={styles.configItem}>
          <Col flex={1} className={styles.moduleLable}>
            {t('configPanel.app.watermark')}
          </Col>
          <Col>
            <Switch
              size="small"
              defaultChecked={defaultSetting.app.isEnableWatermark}
              onChange={(v: boolean) => {
                setDefaultSetting({
                  ...defaultSetting,
                  app: { ...defaultSetting.app, isEnableWatermark: v },
                })
              }}
            >
            </Switch>
          </Col>
        </Row>
        <div className={styles.appModuleContainer}>
          <div className={styles.appModuleTitle}>{t('configPanel.app.account')}</div>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.permission')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.app.account.isEnablePermission}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      account: {
                        ...defaultSetting.app.account,
                        isEnablePermission: v,
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.expireMode')}
            </Col>
            <Col>
              <Select
                size="small"
                defaultValue={defaultSetting.app.account.expireMode}
                onChange={(v: ExpireMode) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      account: { ...defaultSetting.app.account, expireMode: v },
                    },
                  })
                }}
                options={expireModeList.map(item => ({ label: t(item.labelKey), value: item.value }))}
              >
              </Select>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.multiAccount')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.app.account.isEnableMultiAccount}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      account: {
                        ...defaultSetting.app.account,
                        isEnableMultiAccount: v,
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
        </div>
        <div className={styles.appModuleContainer}>
          <div className={styles.appModuleTitle}>{t('configPanel.app.homePage')}</div>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.common.enable')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.app.homePage.isEnableHomePage}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      homePage: {
                        ...defaultSetting.app.homePage,
                        isEnableHomePage: v,
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.common.title')}
            </Col>
            <Col>
              <Input
                size="small"
                defaultValue={defaultSetting.app.homePage.title}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      homePage: {
                        ...defaultSetting.app.homePage,
                        title: v.target.value,
                      },
                    },
                  })
                }}
              >
              </Input>
            </Col>
          </Row>
        </div>
        <div className={styles.appModuleContainer}>
          <div className={styles.appModuleTitle}>{t('configPanel.app.layout')}</div>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.center')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.app.layout.isCenter}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      layout: {
                        ...defaultSetting.app.layout,
                        isCenter: v,
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.layoutScope')}
            </Col>
            <Col>
              <Radio.Group
                size="small"
                defaultValue={defaultSetting.app.layout.layoutScope}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      layout: {
                        ...defaultSetting.app.layout,
                        layoutScope: v.target.value,
                      },
                    },
                  })
                }}
              >
                {layoutScopeList.map((item) => {
                  return (
                    <Radio.Button key={item.value} value={item.value}>
                      {t(item.labelKey)}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.centerWidth')}
            </Col>
            <Col>
              <Slider
                min={1200}
                max={1600}
                defaultValue={defaultSetting.app.layout.width}
                onChange={(v: number) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      layout: {
                        ...defaultSetting.app.layout,
                        width: v,
                      },
                    },
                  })
                }}
                style={{ width: 160 }}
              >
              </Slider>
            </Col>
          </Row>
        </div>
        <div className={styles.appModuleContainer}>
          <div className={styles.appModuleTitle}>{t('configPanel.app.copyright')}</div>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.common.enable')}
            </Col>
            <Col>
              <Switch
                size="small"
                defaultChecked={defaultSetting.app.copyright.isEnableCopyright}
                onChange={(v: boolean) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      copyright: {
                        ...defaultSetting.app.copyright,
                        isEnableCopyright: v,
                      },
                    },
                  })
                }}
              >
              </Switch>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.date')}
            </Col>
            <Col>
              <Input
                size="small"
                defaultValue={defaultSetting.app.copyright.date}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      copyright: {
                        ...defaultSetting.app.copyright,
                        date: v.target.value,
                      },
                    },
                  })
                }}
              >
              </Input>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.company')}
            </Col>
            <Col>
              <Input
                size="small"
                defaultValue={defaultSetting.app.copyright.company}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      copyright: {
                        ...defaultSetting.app.copyright,
                        company: v.target.value,
                      },
                    },
                  })
                }}
              >
              </Input>
            </Col>
          </Row>
          <Row align="middle" className={styles.configItem}>
            <Col flex={1} className={styles.moduleLable}>
              {t('configPanel.app.website')}
            </Col>
            <Col>
              <Input
                size="small"
                defaultValue={defaultSetting.app.copyright.website}
                onChange={(v: any) => {
                  setDefaultSetting({
                    ...defaultSetting,
                    app: {
                      ...defaultSetting.app,
                      copyright: {
                        ...defaultSetting.app.copyright,
                        website: v.target.value,
                      },
                    },
                  })
                }}
              >
              </Input>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  )

  const configModules = isDev
    ? [
        { key: 'theme', render: renderThemeConfig, column: '1' },
        { key: 'toolbarFunc', render: renderToolbarFuncConfig, column: '1' },
        { key: 'transition', render: renderTransitionConfig, column: '1' },
        { key: 'tabBar', render: renderTabBarConfig, column: '2' },
        { key: 'topBar', render: renderTopBarConfig, column: '2' },
        { key: 'menuType', render: renderMenuTypeConfig, column: '2' },
        { key: 'app', render: renderAppConfig, column: '3' },
      ]
    : [
        { key: 'theme', render: renderThemeConfig, column: '1' },
        { key: 'tabBar', render: renderTabBarConfig, column: '1' },
        { key: 'menuType', render: renderMenuTypeConfig, column: '2' },
        { key: 'transition', render: renderTransitionConfig, column: '2' },
        { key: 'toolbarFunc', render: renderToolbarFuncConfig, column: '3' },
        { key: 'topBar', render: renderTopBarConfig, column: '3' },
      ]

  const columnModules1 = configModules.filter(m => m.column === '1')
  const columnModules2 = configModules.filter(m => m.column === '2')
  const columnModules3 = configModules.filter(m => m.column === '3')

  return (
    <Modal
      rootClassName={styles.resetModal}
      getContainer={() => document.getElementById('root') as HTMLElement}
      width={1080}
      centered
      closable={false}
      footer={null}
      onCancel={onClose}
      open={open}
      title={(
        <div className={styles.customHeader}>
          <div className={styles.customHeaderLeft}>
            <h3>{t(isDev ? 'configPanel.title.dev' : 'configPanel.title.user')}</h3>
            {isDev && (
              <p>{t('configPanel.tip.production')}</p>
            )}
          </div>
          <div className={styles.customHeaderActions}>
            {isDev
              ? (
                  <>
                    <Tooltip title={t('configPanel.tip.copy')}>
                      <ExclamationCircleOutlined className={styles.customHeaderTip} />
                    </Tooltip>
                    <Button icon={<CopyOutlined />} type="primary" onClick={handleCopyConfig}>
                      {t('configPanel.copy')}
                    </Button>
                  </>
                )
              : (
                  <Button type="primary">{t('configPanel.reset')}</Button>
                )}
          </div>
        </div>
      )}
    >
      <div className={styles.configContainer}>
        <div className={styles.configContent}>
          <div className={styles.configColumn}>
            {columnModules1.map(module => module.render())}
          </div>
          <div className={styles.configColumn}>
            {columnModules2.map(module => module.render())}
          </div>
          <div className={styles.configColumn}>
            {columnModules3.map(module => module.render())}
          </div>
        </div>
      </div>
    </Modal>
  )
}