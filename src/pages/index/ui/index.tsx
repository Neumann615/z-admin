import {
  BellOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FileTextOutlined,
  GlobalOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LockOutlined,
  MessageOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import {
  Affix,
  Alert,
  Anchor,
  App,
  AutoComplete,
  Avatar,
  Badge,
  BorderBeam,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  ColorPicker,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  FloatButton,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Masonry,
  Mentions,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  Rate,
  Result,
  Row,
  Segmented,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Splitter,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  TimePicker,
  Tooltip,
  Tour,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
  Watermark,
} from 'antd'
import { createStyles } from 'antd-style'
import { useRef, useState } from 'react'

const { Title, Text, Link: TypographyLink, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

// ==================== 样式 ====================
const useStyles = createStyles(({ token, css }) => ({
  wrapper: css`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: ${token.colorBgLayout};
    min-height: 100%;
  `,
  pageHeader: css`
    text-align: center;
    margin-bottom: 8px;
  `,
  pageTitle: css`
    font-size: 28px;
    font-weight: 700;
    color: ${token.colorTextHeading};
    margin: 0 0 4px;
  `,
  pageDesc: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    margin: 0;
  `,
  sectionCard: css`
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 600;
      color: ${token.colorTextHeading};
    }
  `,
  componentRow: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  `,
  componentLabel: css`
    font-size: 12px;
    color: ${token.colorTextQuaternary};
    min-width: 80px;
    text-align: right;
    padding-right: 8px;
    flex-shrink: 0;
  `,
  componentBlock: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  demoBlock: css`
    padding: 16px;
    border: 1px dashed ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  `,
  demoTitle: css`
    font-size: 13px;
    font-weight: 500;
    color: ${token.colorTextSecondary};
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  avatarGroup: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  smallTable: css`
    max-width: 600px;
  `,
  layoutDemo: css`
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    overflow: hidden;
    .demo-header {
      height: 48px;
      background: ${token.colorPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 500;
    }
    .demo-body {
      display: flex;
      min-height: 120px;
    }
    .demo-sider {
      width: 100px;
      background: ${token.colorPrimaryBg};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${token.colorPrimary};
      font-size: 12px;
      flex-shrink: 0;
    }
    .demo-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${token.colorBgContainer};
      font-size: 12px;
      color: ${token.colorTextSecondary};
    }
    .demo-footer {
      height: 36px;
      background: ${token.colorFillSecondary};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: ${token.colorTextQuaternary};
    }
  `,
  tagRow: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  `,
  timelineBox: css`
    max-width: 360px;
  `,
  // 反馈类演示需要的一些额外样式
  alertList: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  carouselSlide: css`
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border-radius: ${token.borderRadius}px;
  `,
  skeletonDemo: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  progressRow: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
  `,
}))

// ==================== 模拟数据 ====================
const CASCADER_OPTIONS = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      { value: 'chaoyang', label: '朝阳区' },
      { value: 'haidian', label: '海淀区' },
      { value: 'dongcheng', label: '东城区' },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      { value: 'pudong', label: '浦东新区' },
      { value: 'jingan', label: '静安区' },
    ],
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'shenzhen',
        label: '深圳',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' },
        ],
      },
      { value: 'guangzhou', label: '广州' },
    ],
  },
]

const TREE_DATA = [
  {
    title: '根节点 1',
    key: '0-0',
    value: '0-0',
    children: [
      { title: '叶子 1-1', key: '0-0-1', value: '0-0-1' },
      { title: '叶子 1-2', key: '0-0-2', value: '0-0-2' },
      {
        title: '子节点 1-3',
        key: '0-0-3',
        value: '0-0-3',
        children: [
          { title: '叶子 1-3-1', key: '0-0-3-1', value: '0-0-3-1' },
          { title: '叶子 1-3-2', key: '0-0-3-2', value: '0-0-3-2' },
        ],
      },
    ],
  },
  {
    title: '根节点 2',
    key: '0-1',
    value: '0-1',
    children: [
      { title: '叶子 2-1', key: '0-1-1', value: '0-1-1' },
    ],
  },
]

const TRANSFER_DATA = Array.from({ length: 15 }, (_, i) => ({
  key: `${i}`,
  title: `选项 ${i + 1}`,
  description: `这是选项 ${i + 1} 的描述`,
}))

const TABLE_COLUMNS = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 60 },
  { title: '城市', dataIndex: 'city', key: 'city', width: 100 },
  { title: '标签', dataIndex: 'tag', key: 'tag', render: (t: string) => <Tag color="blue">{t}</Tag> },
  {
    title: '操作',
    key: 'action',
    width: 140,
    render: () => (
      <Space size="small">
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
      </Space>
    ),
  },
]

const TABLE_DATA = [
  { key: '1', name: '张三', age: 28, city: '北京', tag: '开发' },
  { key: '2', name: '李四', age: 32, city: '上海', tag: '设计' },
  { key: '3', name: '王五', age: 25, city: '深圳', tag: '产品' },
  { key: '4', name: '赵六', age: 30, city: '杭州', tag: '测试' },
]

const LIST_DATA = [
  { title: '通知标题 1', description: '这是一条通知的描述内容', avatar: <Avatar icon={<BellOutlined />} /> },
  { title: '通知标题 2', description: '系统更新已完成，请查看变更日志', avatar: <Avatar icon={<SettingOutlined />} /> },
  { title: '通知标题 3', description: '您有一条新的消息待查看', avatar: <Avatar icon={<MessageOutlined />} /> },
]

const MENU_ITEMS = [
  { key: '1', icon: <HomeOutlined />, label: '首页' },
  { key: '2', icon: <UserOutlined />, label: '用户管理' },
  {
    key: 'sub',
    icon: <SettingOutlined />,
    label: '系统设置',
    children: [
      { key: '3', icon: <LockOutlined />, label: '权限管理' },
      { key: '4', icon: <GlobalOutlined />, label: '国际化' },
      { key: '5', icon: <EyeOutlined />, label: '外观设置' },
    ],
  },
  { key: '6', icon: <FileTextOutlined />, label: '日志' },
]

const TIMELINE_ITEMS = [
  { color: 'green', content: '创建项目 2024-01-01' },
  { color: 'green', content: '完成需求分析 2024-01-15' },
  { color: 'blue', content: '进入开发阶段 2024-02-01' },
  { color: 'orange', content: '第一轮测试 2024-03-01' },
  { color: 'red', content: '修复已知问题 2024-03-15' },
]

const STEPS_ITEMS = [
  { title: '步骤一', content: '这是第一步的描述' },
  { title: '步骤二', content: '这是第二步的描述', subTitle: '进行中' },
  { title: '步骤三', content: '这是第三步的描述' },
  { title: '步骤四', content: '这是最后一步的描述' },
]

const DESCRIPTIONS_ITEMS = [
  { label: '用户名', children: 'Zealous' },
  { label: '手机号', children: '138****8888' },
  { label: '邮箱', children: 'admin@example.com' },
  { label: '部门', children: '技术部' },
  { label: '角色', children: <Tag color="blue">管理员</Tag> },
  { label: '状态', children: <Badge status="processing" text="在线" /> },
]

// ==================== 页面组件 ====================
export default function UI() {
  const { styles, theme: token } = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1'])
  const contentRef = useRef<HTMLDivElement>(null)

  const { message, notification } = App.useApp()

  return (
    <div className={styles.wrapper} ref={contentRef}>
      {/* ==================== 页面标题 ==================== */}
      <div className={`${styles.pageHeader} page-header`}>
        <h1 className={styles.pageTitle}>Ant Design 组件全景展示</h1>
        <p className={styles.pageDesc}>
          涵盖 Ant Design 6.x 全部组件，在配置面板中切换主题类型即可直观对比各风格效果
        </p>
      </div>

      {/* ==================== 一、通用组件 General ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">🔘 通用 General</span>}>
        {/* Buttons */}
        <div className={`${styles.demoBlock} buttons-section`}>
          <div className={styles.demoTitle}>Button 按钮</div>
          <div className={styles.componentRow}>
            <Button type="primary" icon={<PlusOutlined />}>Primary</Button>
            <Button type="default">Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
            <Button danger>Danger</Button>
            <Button type="primary" ghost>Ghost</Button>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" disabled>Disabled</Button>
            <Button type="primary" size="large">Large</Button>
            <Button type="primary" size="small">Small</Button>
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            <Button type="primary" shape="round">Round</Button>
            <Button type="primary" block style={{ maxWidth: 200 }}>Block</Button>
          </div>
        </div>

        {/* FloatButton */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>FloatButton 悬浮按钮</div>
          <div style={{ position: 'relative', height: 80 }}>
            <FloatButton icon={<CameraOutlined />} style={{ position: 'relative', inset: 'auto' }} />
            <FloatButton icon={<MessageOutlined />} type="primary" style={{ position: 'relative', inset: 'auto', marginLeft: 12 }} />
            <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ position: 'relative', inset: 'auto', marginLeft: 12 }} />
          </div>
        </div>

        {/* Typography */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Typography 排版</div>
          <Title level={1}>H1 标题 (level=1)</Title>
          <Title level={2}>H2 标题 (level=2)</Title>
          <Title level={3}>H3 标题 (level=3)</Title>
          <Title level={4}>H4 标题 (level=4)</Title>
          <Title level={5}>H5 标题 (level=5)</Title>
          <div className={styles.componentRow}>
            <Text type="secondary">次要文本 secondary</Text>
            <Text type="success">成功文本 success</Text>
            <Text type="warning">警告文本 warning</Text>
            <Text type="danger">危险文本 danger</Text>
            <Text mark>标记文本 mark</Text>
            <Text code>code 代码文本</Text>
            <Text keyboard>⌘K keyboard</Text>
            <Text delete>删除线文本</Text>
            <Text underline>下划线文本</Text>
            <Text strong>加粗文本</Text>
            <Text italic>斜体文本</Text>
          </div>
          <Paragraph>
            这是一段段落文本 (Paragraph)，用于展示长文本的排版效果。可以包含
            <TypographyLink href="#" target="_blank">超链接 (Link)</TypographyLink>
            ，
            以及
            <Text code>行内代码</Text>
            等元素。
          </Paragraph>
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
            这是一段可展开的段落文本，当内容超过指定行数时会自动折叠。点击展开可以查看完整内容。
            这段文字足够长来触发折叠效果，让用户可以通过点击来切换显示完整内容或省略状态。
          </Paragraph>
          <Paragraph copyable>这是一段可复制的文本段落 (copyable)。</Paragraph>
        </div>
      </Card>

      {/* ==================== 二、布局组件 Layout ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">📐 布局 Layout</span>}>
        {/* Divider */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Divider 分割线</div>
          <Text>上方内容</Text>
          <Divider />
          <Text>下方内容 —— 水平分割线 (horizontal)</Text>
          <Divider titlePlacement="left">居左文字</Divider>
          <Text>内容区域</Text>
          <Divider titlePlacement="right">居右文字</Divider>
          <Text>内容区域</Text>
          <Divider titlePlacement="center" plain>居中普通文字 (plain)</Divider>
          <Text>内容区域</Text>
          <Divider dashed>虚线分割 (dashed)</Divider>
          <Text>内容区域</Text>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Text>左侧</Text>
            <Divider orientation="vertical" style={{ height: 24 }} />
            <Text>中间</Text>
            <Divider orientation="vertical" style={{ height: 24 }} />
            <Text>右侧 —— 垂直分割线 (vertical)</Text>
          </div>
        </div>

        {/* Flex */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Flex 弹性布局</div>
          <Flex gap="small" wrap="wrap">
            <Button type="primary">Flex 1</Button>
            <Button>Flex 2</Button>
            <Button>Flex 3</Button>
            <Button>Flex 4</Button>
          </Flex>
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 8 }} />
          <Flex justify="space-between" align="center">
            <Text>justify: space-between</Text>
            <Button type="primary">对齐</Button>
          </Flex>
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 8 }} />
          <Flex vertical gap="small">
            <Text>vertical 纵向排列</Text>
            <Button size="small">Item 1</Button>
            <Button size="small">Item 2</Button>
          </Flex>
        </div>

        {/* Grid */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Grid 栅格 (Row / Col)</div>
          <Row gutter={[16, 16]}>
            <Col span={6}><div style={{ background: token.colorPrimaryBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=6</div></Col>
            <Col span={6}><div style={{ background: token.colorPrimaryBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=6</div></Col>
            <Col span={6}><div style={{ background: token.colorPrimaryBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=6</div></Col>
            <Col span={6}><div style={{ background: token.colorPrimaryBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=6</div></Col>
          </Row>
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 8 }} />
          <Row gutter={[16, 16]}>
            <Col span={8}><div style={{ background: token.colorInfoBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=8</div></Col>
            <Col span={8}><div style={{ background: token.colorInfoBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=8</div></Col>
            <Col span={8}><div style={{ background: token.colorInfoBg, padding: '12px 0', textAlign: 'center', borderRadius: token.borderRadius }}>span=8</div></Col>
          </Row>
        </div>

        {/* Layout */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Layout 布局容器</div>
          <div className={styles.layoutDemo}>
            <div className="demo-header">Header</div>
            <div className="demo-body">
              <div className="demo-sider">Sider</div>
              <div className="demo-content">Content</div>
            </div>
            <div className="demo-footer">Footer</div>
          </div>
        </div>

        {/* Space */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Space 间距</div>
          <Space orientation="vertical" size="middle">
            <Space>
              <Button>small gap</Button>
              <Button>Item 2</Button>
              <Button>Item 3</Button>
            </Space>
            <Space size="large">
              <Button type="primary">large gap</Button>
              <Button type="primary">Item 2</Button>
            </Space>
            <Space wrap>
              {Array.from({ length: 12 }, (_, i) => <Tag key={i}>
                标签
                {i + 1} </Tag>)}
            </Space>
          </Space>
        </div>

        {/* Splitter */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Splitter 分割面板</div>
          <div style={{ height: 150, border: `1px solid ${token.colorBorderSecondary}`, borderRadius: token.borderRadius }}>
            <Splitter style={{ height: '100%' }}>
              <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Text>面板 A (可拖拽)</Text>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: token.colorFillQuaternary }}>
                  <Text>面板 B</Text>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>

        {/* Masonry */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Masonry 瀑布流</div>
          <Masonry
            columns={4}
            gutter={12}
            items={
              [token.colorPrimary, token.colorSuccess, token.colorWarning, token.colorError, token.colorInfo, token.colorPrimaryBg, token.colorSuccessBg, token.colorWarningBg].map((color, i) => ({
                key: `${i}`,
                height: i % 3 === 0 ? 96 : i % 3 === 1 ? 64 : 48,
                data: color,
              }))
            }
            itemRender={(itemInfo) => {
              const color = itemInfo.data as string
              const index = itemInfo.index
              return (
                <div
                  style={{
                    background: color,
                    borderRadius: token.borderRadius,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 12,
                    padding: 12,
                  }}
                >
                  Item
                  {' '}
                  {index + 1}
                </div>
              )
            }}
          />
        </div>

        {/* BorderBeam */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>BorderBeam 边框光束</div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <BorderBeam>
                <div style={{
                  padding: 32,
                  textAlign: 'center',
                  background: token.colorBgContainer,
                  borderRadius: token.borderRadius,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                >
                  <Text strong>边框光束效果</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>悬停查看动画</Text>
                </div>
              </BorderBeam>
            </Col>
            <Col span={8}>
              <BorderBeam color={[{ color: token.colorPrimary, percent: 0 }, { color: token.colorSuccess, percent: 100 }]} duration={6}>
                <div style={{
                  padding: 32,
                  textAlign: 'center',
                  background: token.colorBgContainer,
                  borderRadius: token.borderRadius,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                >
                  <Text strong>自定义颜色</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>Primary → Success 渐变</Text>
                </div>
              </BorderBeam>
            </Col>
            <Col span={8}>
              <BorderBeam size={120}>
                <div style={{
                  padding: 32,
                  textAlign: 'center',
                  background: token.colorBgContainer,
                  borderRadius: token.borderRadius * 2,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                >
                  <Text strong>大圆角光束</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>自定义光束大小</Text>
                </div>
              </BorderBeam>
            </Col>
          </Row>
        </div>
      </Card>

      {/* ==================== 三、导航组件 Navigation ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">🧭 导航 Navigation</span>}>
        {/* Anchor */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Anchor 锚点</div>
          <div style={{ display: 'flex', gap: 40 }}>
            <Anchor
              affix={false}
              items={[
                { key: 'general', href: '#general', title: '通用组件' },
                { key: 'layout', href: '#layout', title: '布局组件' },
                { key: 'nav', href: '#nav', title: '导航组件' },
                { key: 'data-entry', href: '#data-entry', title: '数据录入' },
                { key: 'data-display', href: '#data-display', title: '数据展示' },
                { key: 'feedback', href: '#feedback', title: '反馈组件' },
              ]}
            />
            <div style={{ height: 150, overflow: 'auto', flex: 1, border: `1px solid ${token.colorBorderSecondary}`, borderRadius: token.borderRadius, padding: 12 }}>
              <div id="general"><Title level={5}>通用组件</Title></div>
              <div id="layout"><Title level={5}>布局组件</Title></div>
              <div id="nav"><Title level={5}>导航组件</Title></div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Breadcrumb 面包屑</div>
          <Breadcrumb
            items={[
              { title: <>
                <HomeOutlined />
                {' '}
                首页
                       </> },
              { title: <>
                <UserOutlined />
                {' '}
                系统管理
                       </> },
              { title: '组件展示' },
            ]}
          />
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 8 }} />
          <Breadcrumb
            separator=">"
            items={[
              { title: '首页' },
              { title: '页面' },
              { title: '当前页', menu: { items: [{ key: '1', label: '页面A' }, { key: '2', label: '页面B' }] } },
            ]}
          />
        </div>

        {/* Dropdown */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Dropdown 下拉菜单</div>
          <div className={styles.componentRow}>
            <Dropdown menu={{ items: MENU_ITEMS.map(item => ({ key: item.key, label: item.label, icon: item.icon })) }}>
              <Button>
                Hover 下拉
                <EllipsisOutlined />
              </Button>
            </Dropdown>
            <Dropdown menu={{ items: [{ key: 'edit', label: '编辑', icon: <EditOutlined /> }, { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true }] }} trigger={['click']}>
              <Button type="primary">Click 下拉</Button>
            </Dropdown>
            <Dropdown menu={{ items: [{ key: '1', label: '选项一' }, { key: '2', label: '选项二' }, { key: '3', label: '选项三' }] }}>
              <Button>
                下拉按钮
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>

        {/* Menu */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Menu 导航菜单</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ width: 200, border: `1px solid ${token.colorBorderSecondary}`, borderRadius: token.borderRadius }}>
              <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                onClick={({ key }) => setSelectedKeys([key])}
                items={MENU_ITEMS}
                style={{ border: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Menu
                mode="horizontal"
                selectedKeys={['1']}
                items={MENU_ITEMS.slice(0, 4)}
                style={{ marginBottom: 12 }}
              />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Pagination 分页</div>
          <Space orientation="vertical" size="middle">
            <Pagination defaultCurrent={1} total={50} showSizeChanger={false} />
            <Pagination defaultCurrent={1} total={500} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} />
            <Pagination simple defaultCurrent={2} total={50} />
            <Pagination size="small" defaultCurrent={1} total={50} />
          </Space>
        </div>

        {/* Steps */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Steps 步骤条</div>
          <Steps current={1} items={STEPS_ITEMS.slice(0, 3)} />
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 12 }} />
          <Steps current={2} size="small" items={STEPS_ITEMS} />
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 12 }} />
          <Steps current={1} orientation="vertical" size="small" items={STEPS_ITEMS.slice(0, 3)} />
        </div>
      </Card>

      {/* ==================== 四、数据录入 Data Entry ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">⌨️ 数据录入 Data Entry</span>}>
        <Form layout="vertical" initialValues={{ remember: true }}>
          {/* Input 系列 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>Input 输入框系列</div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Input 普通输入框">
                  <Input placeholder="请输入内容" prefix={<UserOutlined />} suffix={<CopyOutlined />} allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Input.Password 密码框">
                  <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Input.Search 搜索框">
                  <Input.Search placeholder="搜索..." enterButton={<SearchOutlined />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Input.TextArea 文本域">
                  <Input.TextArea placeholder="请输入多行文本" rows={2} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Mentions 提及">
                  <Mentions
                    placeholder="输入 @ 提及用户"
                    options={[
                      { value: 'zhangsan', label: '张三' },
                      { value: 'lisi', label: '李四' },
                      { value: 'wangwu', label: '王五' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Select 系列 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>Select 选择器系列</div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Select 选择器">
                  <Select placeholder="请选择" allowClear showSearch>
                    <Option value="apple">苹果</Option>
                    <Option value="banana">香蕉</Option>
                    <Option value="orange">橘子</Option>
                    <Option value="grape">葡萄</Option>
                    <Option value="watermelon">西瓜</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Select 多选 (mode=multiple)">
                  <Select mode="multiple" placeholder="多选" allowClear>
                    <Option value="react">React</Option>
                    <Option value="vue">Vue</Option>
                    <Option value="angular">Angular</Option>
                    <Option value="svelte">Svelte</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Select 标签 (mode=tags)">
                  <Select mode="tags" placeholder="输入标签" allowClear>
                    <Option value="frontend">前端</Option>
                    <Option value="backend">后端</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="TreeSelect 树选择">
                  <TreeSelect
                    placeholder="请选择"
                    treeData={TREE_DATA}
                    allowClear
                    treeDefaultExpandAll
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Cascader 级联选择">
                  <Cascader options={CASCADER_OPTIONS} placeholder="请选择地区" allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="AutoComplete 自动完成">
                  <AutoComplete
                    placeholder="输入搜索..."
                    options={[
                      { value: '北京' },
                      { value: '上海' },
                      { value: '深圳' },
                      { value: '杭州' },
                      { value: '广州' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* 日期/时间选择器 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>日期 & 时间选择器</div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="DatePicker 日期选择">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DatePicker 月份">
                  <DatePicker picker="month" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DatePicker 周">
                  <DatePicker picker="week" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="RangePicker 日期范围">
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="TimePicker 时间选择">
                  <TimePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="TimePicker.RangePicker 时间范围">
                  <TimePicker.RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* 数值输入 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>数值 & 开关</div>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item label="InputNumber 数字输入">
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={50}
                    prefix="¥"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Slider 滑动输入条">
                  <Slider defaultValue={30} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Slider 范围">
                  <Slider range defaultValue={[20, 60]} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Rate 评分">
                  <Rate defaultValue={3} allowHalf />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* 选择类 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>选择控件</div>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item label="Checkbox 多选框">
                  <Checkbox.Group options={[
                    { label: '选项A', value: 'A' },
                    { label: '选项B', value: 'B' },
                    { label: '选项C', value: 'C' },
                  ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Radio 单选框">
                  <Radio.Group defaultValue="a">
                    <Radio.Button value="a">选项A</Radio.Button>
                    <Radio.Button value="b">选项B</Radio.Button>
                    <Radio.Button value="c">选项C</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Radio 普通样式">
                  <Radio.Group defaultValue="x">
                    <Radio value="x">选项X</Radio>
                    <Radio value="y">选项Y</Radio>
                    <Radio value="z">选项Z</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Form.Item label="Switch 开关">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Switch defaultChecked />
                      <Switch />
                      <Switch defaultChecked size="small" />
                      <Switch size="small" loading />
                    </div>
                  </Form.Item>
                  <Form.Item label="Segmented 分段">
                    <Segmented options={['日', '周', '月', '年']} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>

          {/* 其他录入 */}
          <div className={styles.demoBlock}>
            <div className={styles.demoTitle}>其他录入组件</div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="ColorPicker 颜色选择器">
                  <ColorPicker showText allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Upload 上传">
                  <Upload
                    listType="picture-card"
                    maxCount={4}
                    beforeUpload={() => false}
                  >
                    <div>
                      <CloudUploadOutlined style={{ fontSize: 20 }} />
                      <div style={{ marginTop: 8 }}>上传</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Transfer 穿梭框">
                  <Transfer
                    dataSource={TRANSFER_DATA.slice(0, 6)}
                    targetKeys={['1', '2']}
                    render={item => item.title}
                    styles={{ section: { width: 180, height: 160 } }}
                    style={{ justifyContent: 'center' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Card>

      {/* ==================== 五、数据展示 Data Display ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">📊 数据展示 Data Display</span>}>
        {/* Avatar + Badge */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Avatar 头像 & Badge 徽标</div>
          <div className={styles.componentRow}>
            <div className={styles.avatarGroup}>
              <Avatar size="large" icon={<UserOutlined />} />
              <Avatar size="default" style={{ background: token.colorSuccess }}>Z</Avatar>
              <Avatar size="small" style={{ background: token.colorWarning }}>A</Avatar>
              <Avatar size={48} src="https://api.dicebear.com/9.x/initials/svg?seed=Felix" />
              <Avatar.Group>
                <Avatar style={{ background: token.colorPrimary }}>U1</Avatar>
                <Avatar style={{ background: token.colorSuccess }}>U2</Avatar>
                <Avatar style={{ background: token.colorWarning }}>U3</Avatar>
              </Avatar.Group>
            </div>
            <Divider orientation="vertical" style={{ height: 32 }} />
            <div className={styles.avatarGroup}>
              <Badge count={5}><Avatar icon={<UserOutlined />} /></Badge>
              <Badge count={0} showZero><Avatar icon={<BellOutlined />} /></Badge>
              <Badge dot><Avatar icon={<MessageOutlined />} /></Badge>
              <Badge count={99} overflowCount={99}><Button>消息</Button></Badge>
              <Badge status="success" text="在线" />
              <Badge status="error" text="离线" />
              <Badge status="processing" text="处理中" />
              <Badge status="warning" text="警告" />
              <Badge status="default" text="默认" />
            </div>
          </div>
        </div>

        {/* Tag */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Tag 标签</div>
          <div className={styles.tagRow}>
            <Tag>默认</Tag>
            <Tag color="blue">Blue</Tag>
            <Tag color="green">Green</Tag>
            <Tag color="red">Red</Tag>
            <Tag color="orange">Orange</Tag>
            <Tag color="purple">Purple</Tag>
            <Tag color="cyan">Cyan</Tag>
            <Tag color="magenta">Magenta</Tag>
            <Tag color="gold">Gold</Tag>
            <Tag color="lime">Lime</Tag>
            <Tag color="geekblue">GeekBlue</Tag>
            <Tag color="volcano">Volcano</Tag>
            <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>
            <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>
            <Tag icon={<WarningOutlined />} color="warning">警告</Tag>
            <Tag closable onClose={() => {}}>可关闭</Tag>
            <Tag.CheckableTag checked>可选 (已选)</Tag.CheckableTag>
            <Tag.CheckableTag checked={false}>可选 (未选)</Tag.CheckableTag>
          </div>
        </div>

        {/* Card + Statistic */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Card 卡片 & Statistic 统计数值</div>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card hoverable size="small">
                <Statistic title="活跃用户" value={112893} prefix={<UserOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable size="small">
                <Statistic title="今日收入" value={56890} precision={2} prefix="¥" styles={{ content: { color: token.colorSuccess } }} suffix={<ArrowUpOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable size="small">
                <Statistic title="订单数" value={3821} prefix={<ShoppingCartOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable size="small">
                <Statistic title="满意度" value={98.5} suffix="%" precision={1} styles={{ content: { color: token.colorPrimary } }} prefix={<SmileOutlined />} />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Tabs */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Tabs 标签页</div>
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: '1', label: '标签页 1', children: <Text>这是第一个标签页的内容。可以切换查看不同面板。</Text> },
              { key: '2', label: '标签页 2', children: <Text>
                第二个标签页内容，带有 Badge
                <Badge count={3} style={{ marginLeft: 8 }} />
                                                    </Text> },
              { key: '3', label: '标签页 3', children: <Text>第三个标签页内容。</Text> },
              { key: '4', label: '禁用', disabled: true, children: null },
            ]}
          />
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 12 }} />
          <Tabs
            type="card"
            items={[
              { key: 'a', label: '卡片式', children: <Text>卡片式标签页</Text> },
              { key: 'b', label: '标签页B', children: <Text>内容B</Text> },
            ]}
          />
        </div>

        {/* Table */}
        <div className={`${styles.demoBlock} table-section`}>
          <div className={styles.demoTitle}>Table 表格</div>
          <div className={styles.smallTable}>
            <Table
              columns={TABLE_COLUMNS}
              dataSource={TABLE_DATA}
              pagination={false}
              size="middle"
              bordered
            />
          </div>
        </div>

        {/* List */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>List 列表</div>
          <List
            dataSource={LIST_DATA}
            size="small"
            bordered
            renderItem={item => (
              <List.Item
                actions={[
                  <Button type="link" size="small" key="edit" icon={<EditOutlined />}>编辑</Button>,
                  <Button type="link" size="small" key="del" danger icon={<DeleteOutlined />}>删除</Button>,
                ]}
              >
                <List.Item.Meta avatar={item.avatar} title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </div>

        {/* Collapse */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Collapse 折叠面板</div>
          <Collapse
            defaultActiveKey={['1']}
            items={[
              {
                key: '1',
                label: '折叠面板 1 — 基础设置',
                children: <Text>这是第一面板的内容。折叠面板可以节省页面空间。</Text>,
              },
              {
                key: '2',
                label: '折叠面板 2 — 高级配置',
                children: (
                  <>
                    <Text>这是第二面板的内容，带有更多配置选项。</Text>
                    <div style={{ marginTop: 8 }}>
                      <Switch defaultChecked style={{ marginRight: 8 }} />
                      <Text>启用高级模式</Text>
                    </div>
                  </>
                ),
              },
              {
                key: '3',
                label: '折叠面板 3 — 关于',
                children: <Paragraph>这是第三面板的内容，展示了段落文本在折叠面板中的显示效果。</Paragraph>,
              },
            ]}
          />
        </div>

        {/* Timeline */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Timeline 时间轴</div>
          <div className={styles.timelineBox}>
            <Timeline items={TIMELINE_ITEMS} />
          </div>
        </div>

        {/* Tree */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Tree 树形控件</div>
          <Tree
            defaultExpandedKeys={['0-0', '0-0-3']}
            defaultCheckedKeys={['0-0-1']}
            checkable
            treeData={TREE_DATA}
          />
        </div>

        {/* Calendar */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Calendar 日历</div>
          <Calendar fullscreen={false} />
        </div>

        {/* Carousel */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Carousel 走马灯</div>
          <Carousel autoplay style={{ maxWidth: 500 }}>
            <div><div className={styles.carouselSlide} style={{ background: token.colorPrimary }}>Slide 1</div></div>
            <div><div className={styles.carouselSlide} style={{ background: token.colorSuccess }}>Slide 2</div></div>
            <div><div className={styles.carouselSlide} style={{ background: token.colorWarning }}>Slide 3</div></div>
          </Carousel>
        </div>

        {/* Descriptions */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Descriptions 描述列表</div>
          <Descriptions
            bordered
            size="small"
            column={3}
            items={DESCRIPTIONS_ITEMS}
          />
        </div>

        {/* Image + QRCode */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Image 图片 & QRCode 二维码 & Empty 空状态</div>
          <Flex gap="large" align="center" wrap="wrap">
            <Image
              width={120}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              placeholder
            />
            <Image
              width={120}
              src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
            />
            <QRCode value="https://ant.design/" size={100} />
            <QRCode value="https://ant.design/" size={100} status="loading" />
            <Empty description="暂无数据" />
            <Empty description="加载中">
              <Button type="primary">创建</Button>
            </Empty>
          </Flex>
        </div>

        {/* Tooltip + Popover + Popconfirm */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Tooltip 文字提示 & Popover 气泡卡片 & Popconfirm 确认框</div>
          <Flex gap="small" wrap="wrap">
            <Tooltip title="这是提示文字 (tooltip)">
              <Button>Tooltip 悬停</Button>
            </Tooltip>
            <Tooltip title="带有颜色的提示" color={token.colorPrimary}>
              <Button type="primary">彩色 Tooltip</Button>
            </Tooltip>
            <Popover
              title="气泡标题"
              content={<div>
                <Text>气泡卡片内容，可放任意内容</Text>
                <br />
                <Button size="small" style={{ marginTop: 8 }}>操作按钮</Button>
              </div>}
            >
              <Button>Popover 气泡</Button>
            </Popover>
            <Popover
              title="确认删除？"
              content={
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button size="small">取消</Button>
                  <Button size="small" type="primary" danger>确认</Button>
                </div>
              }
              trigger="click"
            >
              <Button danger>自定义 Popconfirm</Button>
            </Popover>
            <Popconfirm
              title="确定要删除这条记录吗？"
              description="删除后不可恢复"
              onConfirm={() => message.success('已删除')}
              okText="确定"
              cancelText="取消"
            >
              <Button danger icon={<DeleteOutlined />}>Popconfirm 删除</Button>
            </Popconfirm>
          </Flex>
        </div>
      </Card>

      {/* ==================== 六、反馈组件 Feedback ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">💬 反馈 Feedback</span>}>
        {/* Alert */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Alert 警告提示</div>
          <div className={styles.alertList}>
            <Alert title="Success 成功提示" type="success" showIcon closable />
            <Alert title="Info 信息提示" type="info" showIcon description="这是详细描述信息，可以补充更多说明内容。" closable />
            <Alert title="Warning 警告提示" type="warning" showIcon />
            <Alert title="Error 错误提示" type="error" showIcon description="发生了一个错误，请检查后重试。" />
            <Alert
              title="自定义操作"
              type="info"
              showIcon
              action={<Button size="small" type="primary">立即处理</Button>}
              closable
            />
            <Alert title="无图标" type="success" />
            <Alert title="顶部横幅 (banner)" type="info" banner />
          </div>
        </div>

        {/* Progress */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Progress 进度条</div>
          <div className={styles.progressRow}>
            <Progress percent={30} />
            <Progress percent={50} status="active" />
            <Progress percent={70} status="exception" />
            <Progress percent={100} />
            <Progress percent={75} type="circle" />
            <Progress percent={60} type="dashboard" />
            <Flex gap="small">
              <Progress percent={100} steps={3} />
              <Progress percent={66} steps={3} status="exception" />
              <Progress percent={33} steps={3} status="active" />
            </Flex>
            <Progress percent={50} type="line" size={[300, 20]} strokeColor={{ '0%': token.colorPrimary, '100%': token.colorSuccess }} />
          </div>
        </div>

        {/* Spin + Skeleton */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Spin 加载中 & Skeleton 骨架屏</div>
          <Flex gap="large" align="flex-start" wrap="wrap">
            <Spin description="加载中...">
              <div style={{ padding: 24, background: token.colorFillQuaternary, borderRadius: token.borderRadius, width: 160, textAlign: 'center' }}>
                <Text>内容区域</Text>
              </div>
            </Spin>
            <div style={{ padding: 24, background: token.colorFillQuaternary, borderRadius: token.borderRadius, width: 160, display: 'flex', justifyContent: 'center' }}>
              <Spin size="large" />
            </div>
            <div style={{ padding: 24, background: token.colorFillQuaternary, borderRadius: token.borderRadius, width: 160, display: 'flex', justifyContent: 'center' }}>
              <Spin size="small" />
            </div>
            <div className={styles.skeletonDemo} style={{ flex: 1, minWidth: 250 }}>
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active avatar paragraph={{ rows: 2 }} />
              <Skeleton.Button active size="large" />
              <Skeleton.Input active />
            </div>
          </Flex>
        </div>

        {/* Result */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Result 结果</div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Result
                status="success"
                title="操作成功"
                subTitle="预计两小时后生效，请耐心等待"
                extra={[<Button type="primary" key="back">返回首页</Button>, <Button key="detail">查看详情</Button>]}
              />
            </Col>
            <Col span={12}>
              <Result
                status="error"
                title="操作失败"
                subTitle="请检查并修改以下信息后重试"
                extra={<Button type="primary">返回修改</Button>}
              />
            </Col>
          </Row>
        </div>

        {/* Watermark */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Watermark 水印</div>
          <Watermark content="Ant Design">
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: token.colorFillQuaternary, borderRadius: token.borderRadius }}>
              <Text type="secondary">此区域受水印保护</Text>
            </div>
          </Watermark>
          <Divider orientation="vertical" style={{ visibility: 'hidden', display: 'block', height: 8 }} />
          <Watermark
            content={['机密文档', 'Ant Design']}
            gap={[100, 100]}
            font={{ color: token.colorWarning, fontSize: 14 }}
          >
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: token.colorFillQuaternary, borderRadius: token.borderRadius }}>
              <Text type="secondary">多行水印 + 自定义颜色</Text>
            </div>
          </Watermark>
        </div>

        {/* 动态反馈：Modal / Drawer / Notification / Message */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>动态反馈：Modal 对话框 / Drawer 抽屉 / Notification 通知 / Message 消息</div>
          <Flex gap="small" wrap="wrap">
            <Button type="primary" onClick={() => setModalOpen(true)}>
              打开 Modal
            </Button>
            <Button onClick={() => setDrawerOpen(true)}>
              打开 Drawer
            </Button>
            <Button
              onClick={() =>
                notification.open({
                  message: '通知标题',
                  description: '这是一条全局通知消息，会在屏幕右上角显示。',
                  icon: <InfoCircleOutlined style={{ color: token.colorPrimary }} />,
                  placement: 'topRight',
                  duration: 4.5,
                  btn: <Button size="small" type="primary">查看详情</Button>,
                })}
            >
              弹出 Notification
            </Button>
            <Button onClick={() => message.success('操作成功！这是一条成功消息')}>
              Message 成功
            </Button>
            <Button onClick={() => message.error('操作失败！请重试')}>
              Message 错误
            </Button>
            <Button onClick={() => message.info('这是一条普通信息')}>
              Message 信息
            </Button>
            <Button onClick={() => message.warning('这是一条警告信息')}>
              Message 警告
            </Button>
            <Button
              onClick={() => {
                setLoading(true)
                setTimeout(setLoading, 2000, false)
              }}
            >
              Message 加载中
            </Button>
            {loading ? (message.loading('正在加载...', 2), null) : null}
          </Flex>

          {/* Modal */}
          <Modal
            title="对话框 Modal"
            open={modalOpen}
            onOk={() => { setModalOpen(false); message.success('已确认') }}
            onCancel={() => setModalOpen(false)}
            okText="确认"
            cancelText="取消"
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <Button
                  type="primary"
                  danger
                  onClick={() => { setModalOpen(false); message.info('自定义操作') }}
                >
                  自定义按钮
                </Button>
                <OkBtn />
              </>
            )}
          >
            <Descriptions column={2} size="small" bordered style={{ marginBottom: 16 }}>
              <Descriptions.Item label="项目">示例项目</Descriptions.Item>
              <Descriptions.Item label="状态"><Badge status="processing" text="进行中" /></Descriptions.Item>
              <Descriptions.Item label="创建人">张三</Descriptions.Item>
              <Descriptions.Item label="时间">2024-01-15</Descriptions.Item>
            </Descriptions>
            <Paragraph>
              对话框内容区域，可以放置任意组件。支持自定义 footer。
            </Paragraph>
            <DatePicker style={{ width: '100%', marginTop: 8 }} placeholder="选择日期" />
          </Modal>

          {/* Drawer */}
          <Drawer
            title="抽屉 Drawer"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            extra={
              <Space>
                <Button onClick={() => setDrawerOpen(false)}>取消</Button>
                <Button type="primary" onClick={() => { setDrawerOpen(false); message.success('保存成功') }}>保存</Button>
              </Space>
            }
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                <Input placeholder="请输入名称" prefix={<EditOutlined />} />
              </Form.Item>
              <Form.Item label="类型">
                <Select placeholder="请选择类型">
                  <Option value="1">类型一</Option>
                  <Option value="2">类型二</Option>
                  <Option value="3">类型三</Option>
                </Select>
              </Form.Item>
              <Form.Item label="日期">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="备注">
                <Input.TextArea placeholder="请输入备注" rows={3} />
              </Form.Item>
              <Form.Item label="启用">
                <Switch defaultChecked />
              </Form.Item>
            </Form>
          </Drawer>
        </div>
      </Card>

      {/* ==================== 七、其他组件 Other ==================== */}
      <Card className={styles.sectionCard} title={<span className="section-title">🔧 其他 Other</span>}>
        {/* Affix */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Affix 固钉</div>
          <div style={{ height: 120, overflow: 'auto', border: `1px solid ${token.colorBorderSecondary}`, borderRadius: token.borderRadius, padding: '0 16px' }}>
            <div style={{ height: 200, paddingTop: 20 }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>向下滚动查看 Affix 效果 →</Text>
              <Affix offsetTop={10} target={() => document.querySelector(`.${styles.wrapper.split(' ')[0]}`) as HTMLElement}>
                <Button type="primary" size="small">Affix 固钉 (滚动时固定)</Button>
              </Affix>
              <div style={{ marginTop: 16 }}>
                <Text>此处内容可以滚动，Affix 按钮会固定在顶部。</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Tour */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>Tour 漫游引导</div>
          <Space>
            <Button type="primary" onClick={() => setTourOpen(true)} icon={<EyeOutlined />}>
              启动 Tour 引导
            </Button>
            <Text type="secondary">点击后右上角会出现引导步骤</Text>
          </Space>
          <Tour
            open={tourOpen}
            onClose={() => setTourOpen(false)}
            steps={[
              { title: '页面标题', description: '这里展示了页面的标题信息', cover: null, target: null },
              { title: '按钮区域', description: '各种类型的按钮展示', cover: null, target: null },
              { title: '数据表格', description: '表格展示区，支持排序和筛选', cover: null, target: null },
            ]}
          />
        </div>

        {/* ConfigProvider + theme */}
        <div className={styles.demoBlock}>
          <div className={styles.demoTitle}>ConfigProvider + theme 主题配置</div>
          <Text type="secondary">
            当前页面由外层
            {' '}
            <Text code>{'<ConfigProvider>'}</Text>
            {' '}
            包裹，
            主题 Token 例如
            {' '}
            <Text code>
              colorPrimary=
              {token.colorPrimary}
            </Text>
            、
            <Text code>
              borderRadius=
              {token.borderRadius}
            </Text>
            。
            切换右侧配置面板主题类型即可查看不同风格对所有组件的影响。
          </Text>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Primary', color: token.colorPrimary },
              { label: 'Success', color: token.colorSuccess },
              { label: 'Warning', color: token.colorWarning },
              { label: 'Error', color: token.colorError },
              { label: 'Info', color: token.colorInfo },
            ].map(item => (
              <Tag key={item.label} color={item.color}>
                {item.label}
                :
                {' '}
                {item.color}
              </Tag>
            ))}
          </div>
        </div>
      </Card>

      {/* BackTop */}
      <FloatButton.BackTop target={() => contentRef.current?.closest('.ant-layout-content') as HTMLElement || window} />

      {/* 页面底部署名 */}
      <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
        <Text type="secondary">
          Ant Design 6.x 全组件展示 · 切换主题类型查看效果 · Theme:
          {' '}
          {token.colorPrimary}
        </Text>
      </div>
    </div>
  )
}

// 补充 ArrowUpOutlined (如果不存在则用已有图标替代)
function ArrowUpOutlined() {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" style={{ verticalAlign: '-0.125em' }}>
      <path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
    </svg>
  )
}