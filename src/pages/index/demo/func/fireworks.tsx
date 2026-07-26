import { useFireworks } from '@zealous-admin/layout/index'
import { Button, Card, Space } from 'antd'

export default function fireworks() {
  const { throwCards } = useFireworks()
  return (
    <div className={'app-container'}>
      <Card title="彩带庆祝效果">
        <Space wrap>
          <Button type="primary" onClick={() => throwCards()}>庆祝彩带</Button>
        </Space>
      </Card>
    </div>
  )
}