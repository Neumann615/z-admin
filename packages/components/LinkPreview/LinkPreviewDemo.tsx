import {
  Card,
  Col,
  Form,
  Input,
  Row,
} from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { useT } from '../locale'
import { LinkPreview } from './LinkPreview'

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
  demoArea: {
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingLG,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export function LinkPreviewDemo() {
  const { styles } = useStyles()
  const t = useT()
  const [url, setUrl] = useState('https://cn.vitejs.dev/')

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.linkPreview.title')}</h2>
        <p>ZaLinkPreview</p>
      </div>

      <div className={styles.content}>
        <Card>
          <Row gutter={24}>
            {/* 左侧：表单配置 */}
            <Col span={12}>
              <Form layout="vertical">
                <Form.Item label={t('component.demo.linkPreview.url')}>
                  <Input
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder={t('component.demo.linkPreview.urlPlaceholder')}
                  />
                </Form.Item>
              </Form>
            </Col>

            {/* 右侧：演示区域 */}
            <Col span={12}>
              <div className={styles.demoArea}>
                <LinkPreview url={url}>
                  {t('component.demo.linkPreview.hoverPreview')}
                  {' '}
                  {url}
                </LinkPreview>
              </div>
            </Col>
          </Row>
        </Card>

        <Card title={t('component.demo.linkPreview.moreExamples')}>
          <Row gutter={16}>
            <Col span={6}>
              <LinkPreview url="https:zzzpupu.xin">
                RenoucZion
              </LinkPreview>
            </Col>
            <Col span={6}>
              <LinkPreview url="https://cn.vitejs.dev/">
                Vite.js
              </LinkPreview>
            </Col>
            <Col span={6}>
              <LinkPreview url="https://www.github.com">
                GitHub
              </LinkPreview>
            </Col>
            <Col span={6}>
              <LinkPreview url="https://element-plus.org/zh-CN/">
                Element Plus
              </LinkPreview>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}
