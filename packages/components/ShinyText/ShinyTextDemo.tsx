import { Card, Col, ColorPicker, Form, Input, InputNumber, Row, Select } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useState } from 'react'
import { useT } from '../locale'
import { ShinyText } from './ShinyText'

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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingLG,
    minHeight: 200,
  },
}))

export function ShinyTextDemo() {
  const { styles } = useStyles()
  const t = useT()
  const [text, setText] = useState(() => t('component.demo.shinyText.defaultText'))
  const [fontSize, setFontSize] = useState(36)
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium')
  const [shinyColor, setShinyColor] = useState<string | undefined>(undefined)
  const [textColor, setTextColor] = useState<string | undefined>(undefined)
  const [renderKey, setRenderKey] = useState(0)

  // 语言切换时重置默认文案
  useEffect(() => {
    setText(t('component.demo.shinyText.defaultText'))
  }, [t])

  const forceUpdate = () => setRenderKey(prev => prev + 1)

  const speedOptions = [
    { label: t('component.demo.common.speedFast'), value: 'fast' },
    { label: t('component.demo.common.speedMedium'), value: 'medium' },
    { label: t('component.demo.common.speedSlow'), value: 'slow' },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.shinyText.title')}</h2>
        <p>ZaShinyText</p>
      </div>

      <div className={styles.content}>
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label={t('component.demo.common.textContent')}>
                  <Input
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('component.demo.common.fontSize')}>
                  <InputNumber
                    value={fontSize}
                    onChange={(v) => {
                      setFontSize(v || 24)
                      forceUpdate()
                    }}
                    min={12}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('component.demo.common.animationSpeed')}>
                  <Select
                    value={speed}
                    onChange={(v) => {
                      setSpeed(v)
                      forceUpdate()
                    }}
                    options={speedOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.shinyText.textColor')}>
                  <ColorPicker
                    value={textColor}
                    onChange={(c) => {
                      setTextColor(c.toHexString())
                      forceUpdate()
                    }}
                    showText
                    allowClear
                    onClear={() => {
                      setTextColor(undefined)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.shinyText.shinyColor')}>
                  <ColorPicker
                    value={shinyColor}
                    onChange={(c) => {
                      setShinyColor(c.toHexString())
                      forceUpdate()
                    }}
                    showText
                    allowClear
                    onClear={() => {
                      setShinyColor(undefined)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className={styles.demoArea}>
            <ShinyText
              key={renderKey}
              text={text}
              fontSize={fontSize}
              speed={speed}
              shinyColor={shinyColor}
              textColor={textColor}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
