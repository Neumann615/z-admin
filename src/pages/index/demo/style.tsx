import {
  BgColorsOutlined,
  EyeOutlined,
  LayoutOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { useLayoutSetting } from '@zealous-admin/layout/index'
import { Button, Card, Col, Row, Typography } from 'antd'
import { createStyles } from 'antd-style'

const { Text } = Typography

const useStyles = createStyles(({ token, css }) => ({
  wrapper: css`
    width: 100%;
    height: 100%;
    background-color: ${token.colorBgBase};
    padding: ${token.paddingLG}px;
  `,
  container: css`
    padding: ${token.paddingLG}px;
    max-width: 1080px;
    margin: 0 auto;
  `,

  header: css`
    text-align: center;
    margin-bottom: ${token.marginXL}px;
  `,

  headerTag: css`
    margin-bottom: ${token.marginMD}px;
    padding: 4px 14px;
    border-radius: ${token.borderRadiusLG * 4}px;
    font-size: ${token.fontSizeSM}px;
  `,

  title: css`
    font-size: ${token.fontSizeHeading2}px;
    font-weight: ${token.fontWeightStrong};
    margin: 0 0 ${token.margin}px;
    color: ${token.colorTextHeading};
  `,

  description: css`
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSize}px;
    margin: 0 0 ${token.marginLG}px;
  `,

  iconBox: css`
    width: 44px;
    height: 44px;
    border-radius: ${token.borderRadiusLG}px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${token.margin}px;
    background-color: ${token.colorPrimaryBg};
    transition: background-color 0.3s;
  `,

  iconBoxIcon: css`
    color: ${token.colorPrimary};
    font-size: ${token.fontSizeXL}px;
  `,

  cardContent: css`
    line-height: 1.4;
  `,

  cardTitle: css`
    font-size: ${token.fontSizeHeading5}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
    margin-bottom: ${token.marginXS}px;
  `,

  cardDesc: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
  `,
}))

const FEATURES = [
  { icon: <BgColorsOutlined />, title: '多主题切换', desc: '支持多配色主题，多种色彩方案随意切换' },
  { icon: <MenuOutlined />, title: '菜单模式', desc: '侧边栏、顶部、精简等多种菜单布局模式' },
  { icon: <LayoutOutlined />, title: '灵活配置', desc: '面包屑、标签栏等细节可自由调整' },
  { icon: <EyeOutlined />, title: '视觉风格', desc: '亮色、暗色、紧凑等多种视觉样式' },
]

export default function Style() {
  const { styles } = useStyles()
  const { randomStyle } = useLayoutSetting()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>随机切换风格</h1>
          <p className={styles.description}>
            一键体验框架的所有视觉风格组合，包括主题配色、菜单模式、圆角样式等
          </p>
          <Button type="primary" size="large" onClick={randomStyle}>
            立即切换
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {FEATURES.map(f => (
            <Col key={f.title} xs={24} sm={12} lg={12}>
              <Card styles={{ body: { padding: 20 } }}>
                <div className={styles.cardContent}>
                  <div className={styles.iconBox}>
                    <span className={styles.iconBoxIcon}>{f.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <Text className={styles.cardDesc}>{f.desc}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
