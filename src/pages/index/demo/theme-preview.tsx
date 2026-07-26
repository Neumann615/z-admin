import { useLayoutSetting, useThemeByType } from '@zealous-admin/layout/index'
import type { ThemeType } from '@zealous-admin/layout/index'
import {
  CheckCircleFilled,
  SkinOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, ConfigProvider, Row, Space, Tag, Typography } from 'antd'
import { createStyles, useTheme } from 'antd-style'

const { Text } = Typography

const THEMES: { key: ThemeType; label: string; desc: string }[] = [
  { key: 'default', label: 'Default', desc: '经典 Ant Design 风格，清爽克制' },
  { key: 'mui', label: 'MUI', desc: 'Material Design 体系，柔和层次' },
  { key: 'shadcn', label: 'Shadcn', desc: '现代极简，低对比边框驱动' },
  { key: 'bootstrap', label: 'Bootstrap', desc: '经典 BS 风格，高对比阴影' },
  { key: 'cartoon', label: 'Cartoon', desc: '卡通漫画风，粗描边偏移投影' },
  { key: 'illustration', label: 'Illustration', desc: '插画风格，温暖手绘质感' },
  { key: 'glass', label: 'Glass', desc: '玻璃拟态，毛玻璃通透层次' },
  { key: 'hacker', label: 'Hacker', desc: '黑客终端风，荧光绿黑底' },
]

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

  previewCard: css`
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-2px);
    }
  `,

  previewInner: css`
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,

  previewBar: css`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  `,

  previewBarDot: css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff5f56;
    & + & { background: #ffbd2e; }
    & + & + & { background: #27c93f; }
  `,

  previewRow: css`
    display: flex;
    gap: 8px;
  `,

  previewSidebar: css`
    width: 48px;
    height: 80px;
    border-radius: 4px;
    background: var(--preview-sidebar);
    flex-shrink: 0;
  `,

  previewMain: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  previewHeader: css`
    height: 16px;
    border-radius: 3px;
    background: var(--preview-header);
  `,

  previewBody: css`
    flex: 1;
    border-radius: 4px;
    background: var(--preview-body);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
  `,

  previewButton: css`
    height: 8px;
    border-radius: 2px;
    background: var(--preview-primary);
    flex: 1;
  `,

  previewBadge: css`
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: var(--preview-accent);
  `,

  themeName: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  `,

  themeLabel: css`
    font-size: ${token.fontSizeSM}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
  `,

  themeDesc: css`
    font-size: ${token.fontSizeSM - 1}px;
    color: ${token.colorTextTertiary};
    margin-top: 2px;
  `,

  activeDot: css`
    color: ${token.colorPrimary};
    font-size: 10px;
  `,
}))

function ThemeMiniPreview({ themeType }: { themeType: ThemeType }) {
  const themeConfig = useThemeByType(themeType)
  const token = useTheme()

  const isActive = false // will be set by parent via current theme

  return (
    <ConfigProvider {...themeConfig}>
      <div style={{
        // eslint-disable-next-line style/no-unknown-custom-properties
        '--preview-sidebar': token.colorFillSecondary,
        // eslint-disable-next-line style/no-unknown-custom-properties
        '--preview-header': token.colorFillTertiary,
        // eslint-disable-next-line style/no-unknown-custom-properties
        '--preview-body': token.colorBgElevated,
        // eslint-disable-next-line style/no-unknown-custom-properties
        '--preview-primary': token.colorPrimary,
        // eslint-disable-next-line style/no-unknown-custom-properties
        '--preview-accent': token.colorWarning,
      } as React.CSSProperties}
      >
        <ThemePreviewContent />
      </div>
    </ConfigProvider>
  )
}

function ThemePreviewContent() {
  const { styles } = useStyles()

  return (
    <div className={styles.previewInner}>
      <div className={styles.previewBar}>
        <div className={styles.previewBarDot} />
        <div className={styles.previewBarDot} />
        <div className={styles.previewBarDot} />
      </div>
      <div className={styles.previewRow}>
        <div className={styles.previewSidebar} />
        <div className={styles.previewMain}>
          <div className={styles.previewHeader} />
          <div className={styles.previewBody}>
            <div className={styles.previewButton} />
            <div className={styles.previewBadge} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemePreviewPage() {
  const { styles } = useStyles()
  const currentTheme = useTheme()
  const { updateSetting } = useLayoutSetting()

  const handleApply = (key: ThemeType) => {
    updateSetting({ 'theme.themeType': key })
  }

  return (
    <div className={styles.wrapper}>
      <Space align="center" style={{ marginBottom: currentTheme.marginMD }}>
        <div className={styles.headerBar} />
        <div className={styles.headerTitle}>主题预览</div>
      </Space>
      <p className={styles.headerDesc}>
        8 种主题风格同屏对比，点击"应用"即可切换当前主题
      </p>

      <Row gutter={[16, 16]} style={{ marginTop: currentTheme.marginLG }}>
        {THEMES.map(t => (
          <Col key={t.key} xs={24} sm={12} lg={6}>
            <Card
              hoverable
              className={styles.previewCard}
              styles={{ body: { padding: 0 } }}
            >
              <ThemeMiniPreview themeType={t.key} />
              <div style={{ padding: '0 12px 12px' }}>
                <div className={styles.themeName}>
                  <Text className={styles.themeLabel}>{t.label}</Text>
                  <Tag
                    color={currentTheme.colorPrimary}
                    style={{ fontSize: 10, lineHeight: '18px', padding: '0 6px', marginRight: 0 }}
                  >
                    <CheckCircleFilled style={{ marginRight: 3 }} />
                    当前
                  </Tag>
                </div>
                <Text className={styles.themeDesc}>{t.desc}</Text>
                <Button
                  size="small"
                  block
                  icon={<SkinOutlined />}
                  onClick={() => handleApply(t.key)}
                  style={{ marginTop: 8 }}
                >
                  应用
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
