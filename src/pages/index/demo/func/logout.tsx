import {
  LogoutOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { logoutAction, useAppStore, useReLoginStore } from '@zealous-admin/layout/index'
import { Alert, Button, Col, Row, Space, Typography } from 'antd'
import { createStyles, useTheme } from 'antd-style'
import { useState } from 'react'

const { Text, Paragraph } = Typography

const useStyles = createStyles(({ token, css }) => ({
  wrapper: css`
    padding: ${token.paddingLG}px;
    max-width: 960px;
    margin: 0 auto;
  `,

  headerBar: css`
    width: 3px;
    height: 14px;
    background: ${token.colorPrimary};
    border-radius: 2px;
  `,

  headerTitle: css`
    font-size: ${token.fontSizeLG}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
  `,

  headerDesc: css`
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSizeSM}px;
    margin-top: ${token.marginXS}px;
  `,

  modeOption: css`
    padding: ${token.paddingMD}px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
    height: 100%;

    &:hover {
      background-color: ${token.colorFillQuaternary};
    }
  `,

  modeOptionActive: css`
    border-color: ${token.colorBorder};
    background-color: ${token.colorFillQuaternary};
  `,

  modeLabel: css`
    font-size: ${token.fontSize}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
    display: block;
    margin-bottom: 2px;
  `,

  modeDesc: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
    line-height: 1.5;
  `,

  sectionLabel: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextTertiary};
    margin-bottom: ${token.marginSM}px;
    display: block;
  `,

  flowText: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
    line-height: 1.6;
    background: ${token.colorFillQuaternary};
    border-radius: ${token.borderRadius}px;
    padding: ${token.paddingSM}px ${token.paddingMD}px;
  `,
}))

export default function LogoutPage() {
  const { styles } = useStyles()
  const theme = useTheme()

  const expireMode = useAppStore(s => s.account.expireMode)
  const [triggered, setTriggered] = useState(false)

  const handleSimulate = () => {
    setTriggered(true)
    setTimeout(() => {
      if (expireMode === 'logout') {
        logoutAction()
      }
      else {
        useReLoginStore.getState().show()
      }
    }, 1500)
  }

  const handleSwitchMode = (mode: 'logout' | 'prompt') => {
    useAppStore.setState(s => ({
      account: { ...s.account, expireMode: mode },
    }))
  }

  const flowLabel = expireMode === 'logout'
    ? 'API 返回 401 → 延时 2s → logoutAction() 清空持久化 → 跳转 /login'
    : 'API 返回 401 → 延时 2s → ReLoginModal 弹窗 → 输入密码确认或取消退出'

  return (
    <div className={styles.wrapper}>
      <Space align="center" style={{ marginBottom: theme.marginMD }}>
        <div className={styles.headerBar} />
        <div className={styles.headerTitle}>退出登录模拟</div>
      </Space>
      <p className={styles.headerDesc}>
        模拟 401 令牌过期场景，测试两种过期处理模式的差异
      </p>

      {/* 模式选择 */}
      <div style={{ marginTop: theme.marginLG }}>
        <span className={styles.sectionLabel}>过期处理模式</span>
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12}>
            <div
              className={`${styles.modeOption} ${expireMode === 'logout' ? styles.modeOptionActive : ''}`}
              onClick={() => handleSwitchMode('logout')}
            >
              <Space direction="vertical" size={4}>
                <Text className={styles.modeLabel}>
                  <LogoutOutlined style={{ marginRight: 6, color: theme.colorTextSecondary }} />
                  直接退出
                </Text>
                <Text className={styles.modeDesc}>
                  收到 401 后延时 2s，清空持久化配置并重定向到登录页
                </Text>
              </Space>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div
              className={`${styles.modeOption} ${expireMode === 'prompt' ? styles.modeOptionActive : ''}`}
              onClick={() => handleSwitchMode('prompt')}
            >
              <Space direction="vertical" size={4}>
                <Text className={styles.modeLabel}>
                  <SwapOutlined style={{ marginRight: 6, color: theme.colorTextSecondary }} />
                  弹窗确认
                </Text>
                <Text className={styles.modeDesc}>
                  收到 401 后延时 2s，弹出 ReLoginModal 输入用户名密码重新登录
                </Text>
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {/* 流程说明 */}
      <div className={styles.flowText} style={{ marginTop: theme.margin }}>
        {flowLabel}
      </div>

      {/* 模拟触发 */}
      <div style={{ marginTop: theme.marginLG }}>
        <span className={styles.sectionLabel}>模拟触发</span>

        {triggered
          ? (
              <Alert
                type="info"
                message="正在模拟 401 过期..."
                description={
                  expireMode === 'logout'
                    ? '即将清空持久化数据并跳转到登录页'
                    : '即将弹出 ReLoginModal，请确认后重新登录或点击取消退出'
                }
                showIcon
                style={{ marginBottom: theme.marginSM }}
              />
            )
          : null}

        <Button
          icon={<LogoutOutlined />}
          onClick={handleSimulate}
          disabled={triggered}
        >
          模拟 401 过期退出
        </Button>

        <Paragraph
          type="secondary"
          style={{ marginTop: theme.marginSM, marginBottom: 0, fontSize: theme.fontSizeSM }}
        >
          此操作会真实触发布局框架中的退出/重登逻辑。可在配置面板「账户」区域切换过期处理模式。
        </Paragraph>
      </div>
    </div>
  )
}
