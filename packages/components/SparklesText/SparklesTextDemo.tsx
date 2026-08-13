import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useState } from 'react'
import { useT } from '../locale'
import { SparklesText } from './SparklesText'

type SparkleShape = 'star' | 'four-point-star' | 'flower'
type AnimationSpeed = 'fast' | 'medium' | 'slow'

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

export function SparklesTextDemo() {
  const { styles } = useStyles()
  const t = useT()
  const [text, setText] = useState(() => t('component.demo.sparklesText.defaultText'))
  const [fontSize, setFontSize] = useState(36)
  const [shapes, setShapes] = useState<SparkleShape[]>(['four-point-star'])
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('fast')
  const [renderKey, setRenderKey] = useState(0)

  // 语言切换时重置默认文案
  useEffect(() => {
    setText(t('component.demo.sparklesText.defaultText'))
  }, [t])

  const forceUpdate = () => setRenderKey(prev => prev + 1)

  const shapeOptions = [
    { label: t('component.demo.sparklesText.shape.fourPointStar'), value: 'four-point-star' },
    { label: t('component.demo.sparklesText.shape.star'), value: 'star' },
    { label: t('component.demo.sparklesText.shape.flower'), value: 'flower' },
  ]

  const speedOptions = [
    { label: t('component.demo.common.speedFast'), value: 'fast' },
    { label: t('component.demo.common.speedMedium'), value: 'medium' },
    { label: t('component.demo.common.speedSlow'), value: 'slow' },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.sparklesText.title')}</h2>
        <p>ZaSparklesText</p>
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
                      setFontSize(v || 30)
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
                    value={animationSpeed}
                    onChange={(v) => {
                      setAnimationSpeed(v)
                      forceUpdate()
                    }}
                    options={speedOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('component.demo.sparklesText.shapeType')}>
                  <Checkbox.Group
                    options={shapeOptions}
                    value={shapes}
                    onChange={(values) => {
                      setShapes(values as SparkleShape[])
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className={styles.demoArea}>
            <SparklesText
              key={renderKey}
              text={text}
              fontSize={fontSize}
              shapes={shapes}
              animationSpeed={animationSpeed}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
