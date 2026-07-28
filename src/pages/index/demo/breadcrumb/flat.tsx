import { useControlTab } from '@zealous-admin/layout/index'
import { Button, Card, Space, Typography } from 'antd'

const { Paragraph, Text } = Typography

export default function BreadcrumbFlat() {
  const { openTab } = useControlTab()

  const handleGoDetail = () => {
    openTab({
      key: '/demo/breadcrumb/detail',
      label: '详情-平级导航',
    })
  }

  return (
    <div className="app-container">
      <Card>
        <Typography>
          <Typography.Title level={4}>面包屑 - 平级跳转</Typography.Title>
          <Paragraph>
            目标路径不是子路径，面包屑
            {' '}
            <Text strong>替换最后一项</Text>
          </Paragraph>
        </Typography>
        <Space>
          <Button type="primary" onClick={handleGoDetail}>
            跳转详情（平级替换）
          </Button>
        </Space>
      </Card>
    </div>
  )
}
