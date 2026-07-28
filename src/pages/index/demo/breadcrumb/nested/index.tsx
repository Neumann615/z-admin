import { useControlTab } from '@zealous-admin/layout/index'
import { Button, Card, Space, Typography } from 'antd'

const { Paragraph, Text } = Typography

export default function BreadcrumbNested() {
  const { openTab } = useControlTab()

  const handleGoDetail = () => {
    openTab({
      key: '/demo/breadcrumb/nested/detail',
      label: '详情-层级导航',
    })
  }

  return (
    <div className="app-container">
      <Card>
        <Typography>
          <Typography.Title level={4}>面包屑 - 层级跳转</Typography.Title>
          <Paragraph>
            目标路径是当前路径的子路径，面包屑会
            {' '}
            <Text strong>追加一项</Text>
          </Paragraph>
        </Typography>
        <Space>
          <Button type="primary" onClick={handleGoDetail}>
            跳转详情（层级追加）
          </Button>
        </Space>
      </Card>
    </div>
  )
}
