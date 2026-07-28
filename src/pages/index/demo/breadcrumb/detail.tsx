import { useControlTab } from '@zealous-admin/layout/index'
import { Button, Card, Space, Typography } from 'antd'

const { Paragraph, Text } = Typography

export default function BreadcrumbDetail() {
  const { openTab } = useControlTab()

  return (
    <div className="app-container">
      <Card>
        <Typography>
          <Typography.Title level={4}>平级详情页</Typography.Title>
          <Paragraph>
            目标路径不是子路径，面包屑
            {' '}
            <Text strong>替换最后一项</Text>
          </Paragraph>
        </Typography>
        <Space>
          <Button onClick={() => openTab({ key: '/demo/breadcrumb/flat', label: '平级跳转', icon: '' })}>
            返回平级页
          </Button>
        </Space>
      </Card>
    </div>
  )
}
