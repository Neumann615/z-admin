import {
  ApartmentOutlined,
  BgColorsOutlined,
  BlockOutlined,
  BookOutlined,
  GithubOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { ZaSparklesText } from '@zealous-admin/components/index'
import { Logo, useAppStore } from '@zealous-admin/layout/index'
import { BorderBeam, Button, Card, Col, Row, Space, Typography } from 'antd'
import { createStyles } from 'antd-style'

const { Title, Paragraph, Text } = Typography

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    max-width: 960px;
    margin: 0 auto;
    padding: ${token.paddingSM}px ${token.paddingLG}px;
  `,

  hero: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0 0;
  `,

  heroText: css`
    display: flex;
    flex-direction: column;
  `,

  appName: css`
    font-size: ${token.fontSizeXL}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorTextHeading};
    margin: 0;
    line-height: 1.3;
  `,

  tagline: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextTertiary};
    margin: 0;
  `,

  welcomeCard: css`
    margin-top: ${token.marginSM}px;
    position: relative;
  `,

  techStack: css`
    display: block;
    font-size: ${token.fontSizeSM}px;
    font-weight: ${token.fontWeightStrong};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${token.marginSM}px;
  `,

  desc: css`
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSize}px;
    line-height: 1.6;
  `,

  section: css`
    margin-top: ${token.marginLG}px;
  `,

  sectionHeader: css`
    display: flex;
    align-items: center;
    gap: ${token.marginXS}px;
    margin-bottom: ${token.marginSM}px;
  `,

  sectionBar: css`
    width: 3px;
    height: 16px;
    background: ${token.colorPrimary};
    border-radius: 2px;
  `,

  sectionTitle: css`
    font-size: ${token.fontSize}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
  `,

  featureCard: css`
    display: flex;
    align-items: flex-start;
    gap: ${token.marginSM}px;
    height: 100%;
  `,

  featureIconBox: css`
    width: 36px;
    height: 36px;
    border-radius: ${token.borderRadius}px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${token.fontSizeXL}px;
    color: ${token.colorPrimary};
    background: ${token.colorPrimaryBg};
    flex-shrink: 0;
  `,

  featureContent: css`
    flex: 1;
    min-width: 0;
  `,

  featureTitle: css`
    font-size: ${token.fontSizeSM}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
    display: block;
    margin-bottom: 2px;
  `,

  featureDesc: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
    line-height: 1.5;
  `,

  scenarioTitle: css`
    font-size: ${token.fontSizeSM}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorText};
    display: block;
    margin-bottom: 2px;
  `,

  scenarioDesc: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
    line-height: 1.5;
    margin: 0;
  `,
}))

const FEATURES = [
  {
    icon: <BgColorsOutlined />,
    title: '8 种主题',
    desc: 'Default / MUI / Shadcn / Bootstrap 等，一键切换视觉风格',
  },
  {
    icon: <ApartmentOutlined />,
    title: '5 种布局',
    desc: 'Side / Only-Side / Head / Only-Head / Simple，灵活适配',
  },
  {
    icon: <BlockOutlined />,
    title: '丰富组件',
    desc: '图标选择器、流光文字、滑块验证、Markdown 等 10+ 组件',
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: 'RBAC 权限',
    desc: '用户 / 角色 / 菜单三合一，路由与 API 双重控制',
  },
]

const SCENARIOS = [
  { title: '小型公司', desc: '后端人员快速转型全栈，一套框架覆盖常见管理需求' },
  { title: '中小型公司', desc: '提高交付效率，减轻前端团队重复造轮子压力' },
  { title: '项目型公司', desc: '灵活适配甲方定制化需求，布局 / 主题 / 权限可深度配置' },
  { title: '产品型公司', desc: '完善的文档和类型定义，为长期迭代提供可靠基础设施' },
]

export default function HomePage() {
  const { styles } = useStyles()
  const appStore = useAppStore()

  const githubUrl = appStore.copyright?.website || 'https://github.com/Neumann615/zealous-admin'

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <Logo size={28} />
        <div className={styles.heroText}>
          <h1 className={styles.appName}>{appStore.name || 'Zealous-admin'}</h1>
          <p className={styles.tagline}>开箱即用的 React 中后台管理系统框架</p>
        </div>
      </div>

      {/* Welcome Card */}
      <BorderBeam lineWidth={3}>
        <Card className={styles.welcomeCard}>
          <Text type="secondary" className={styles.techStack}>
            TypeScript · React 19 · Vite 8 · Ant Design 6 · antd-style · Zustand
          </Text>
          <Title level={2} style={{ marginBottom: 8 }}>
            欢迎使用
            {' '}
            <ZaSparklesText text="Zealous-admin" fontSize={36} />
          </Title>
          <Paragraph className={styles.desc} style={{ marginBottom: 16 }}>
            提供 8 种主题、5 种布局、KeepAlive 缓存、RBAC 权限、MCP 集成等核心能力，
            帮助团队快速交付高质量的管理后台应用。
          </Paragraph>
          <Space size="middle">
            <Button type="primary" icon={<BookOutlined />} onClick={() => window.open('/docs/', '_blank')}>
              开发文档
            </Button>
            <Button icon={<GithubOutlined />} onClick={() => window.open(githubUrl, '_blank')}>
              代码仓库
            </Button>
          </Space>
        </Card>
      </BorderBeam>

      {/* 功能特性 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBar} />
          <Text className={styles.sectionTitle}>功能特性</Text>
        </div>
        <Row gutter={[16, 12]}>
          {FEATURES.map(f => (
            <Col key={f.title} xs={24} sm={12} lg={12}>
              <Card hoverable style={{ height: '100%' }} styles={{ body: { padding: 16 } }}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIconBox}>{f.icon}</div>
                  <div className={styles.featureContent}>
                    <Text className={styles.featureTitle}>{f.title}</Text>
                    <Text className={styles.featureDesc}>{f.desc}</Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 应用场景 */}
      <div className={styles.section} style={{ marginBottom: 16 }}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBar} />
          <Text className={styles.sectionTitle}>应用场景</Text>
        </div>
        <Row gutter={[12, 8]}>
          {SCENARIOS.map(s => (
            <Col key={s.title} xs={24} sm={12} lg={6}>
              <Card style={{ height: '100%' }} styles={{ body: { padding: 16 } }}>
                <Text className={styles.scenarioTitle}>{s.title}</Text>
                <Text className={styles.scenarioDesc}>{s.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </div>
  )
}
