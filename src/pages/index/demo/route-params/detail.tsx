import { Card, Descriptions } from 'antd'
import { createStyles } from 'antd-style'
import { useSearchParams } from 'react-router-dom'

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: token.colorBgBase,
  },
  header: {
    'backgroundColor': token.colorBgBase,
    'borderBottom': `1px solid ${token.colorBorderSecondary}`,
    'padding': `${token.paddingLG}px`,
    '& h2': {
      margin: 0,
      fontSize: token.fontSizeXL,
      fontWeight: token.fontWeightStrong,
      color: token.colorText,
    },
    '& p': {
      margin: '8px 0 0',
      fontSize: token.fontSizeSM,
      color: token.colorTextSecondary,
    },
  },
  content: {
    flex: 1,
    padding: `${token.paddingLG}px`,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: token.paddingLG,
  },
}))

export default function RouteParamsDetail() {
  const { styles } = useStyles()
  const [searchParams] = useSearchParams()

  const nickName = searchParams.get('nickName') || ''
  const email = searchParams.get('email') || ''

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>路由传参 A - 详情页</h2>
        <p>从 URL 参数中读取用户信息</p>
      </div>

      <div className={styles.content}>
        <Card title="URL 参数展示">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="昵称">
              {nickName}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">
              {email}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="当前 URL">
          <code style={{ wordBreak: 'break-all', fontSize: 14 }}>
            {window.location.href}
          </code>
        </Card>
      </div>
    </div>
  )
}
