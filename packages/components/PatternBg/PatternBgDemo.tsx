import type { AnimationDirection, MaskDirection, PatternType } from './PatternBg'
import {
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
} from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { useT } from '../locale'
import { PatternBg } from './PatternBg'

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
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadiusLG,
    height: 500,
  },
  card: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    boxShadow: token.boxShadowSecondary,
    padding: token.paddingLG,
    textAlign: 'center',
  },
}))

export function PatternBgDemo() {
  const { styles } = useStyles()
  const t = useT()
  const patternOptions = [
    { label: t('component.demo.patternBg.pattern.grid'), value: 'grid' },
    { label: t('component.demo.patternBg.pattern.dot'), value: 'dot' },
  ]
  const animationOptions = [
    { label: t('component.demo.patternBg.animation.up'), value: 'up' },
    { label: t('component.demo.patternBg.animation.down'), value: 'down' },
    { label: t('component.demo.patternBg.animation.left'), value: 'left' },
    { label: t('component.demo.patternBg.animation.right'), value: 'right' },
    { label: t('component.demo.patternBg.animation.none'), value: 'none' },
  ]
  const maskOptions = [
    { label: t('component.demo.patternBg.mask.all'), value: 'all' },
    { label: t('component.demo.patternBg.mask.top'), value: 'top' },
    { label: t('component.demo.patternBg.mask.bottom'), value: 'bottom' },
    { label: t('component.demo.patternBg.mask.left'), value: 'left' },
    { label: t('component.demo.patternBg.mask.right'), value: 'right' },
    { label: t('component.demo.patternBg.mask.topBottom'), value: 'top-bottom' },
    { label: t('component.demo.patternBg.mask.leftRight'), value: 'left-right' },
    { label: t('component.demo.patternBg.mask.none'), value: 'none' },
  ]
  const [pattern, setPattern] = useState<PatternType>('grid')
  const [size, setSize] = useState(24)
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>('up')
  const [maskDirection, setMaskDirection] = useState<MaskDirection>('all')
  const [opacity, setOpacity] = useState(0.5)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.patternBg.title')}</h2>
        <p>ZaPatternBg</p>
      </div>

      <div className={styles.content}>
        <Card>
          <Form>
            <Row gutter={24}>
              <Col>
                <Form.Item label={t('component.demo.patternBg.patternType')}>
                  <Select
                    value={pattern}
                    onChange={v => setPattern(v)}
                    options={patternOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={t('component.demo.patternBg.size')}>
                  <InputNumber
                    value={size}
                    onChange={v => setSize(v || 24)}
                    min={8}
                    max={64}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={t('component.demo.patternBg.opacity')}>
                  <InputNumber
                    value={opacity}
                    onChange={v => setOpacity(v || 0.5)}
                    min={0}
                    max={1}
                    step={0.1}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={t('component.demo.patternBg.animationDirection')}>
                  <Select
                    value={animationDirection}
                    onChange={v => setAnimationDirection(v)}
                    options={animationOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={t('component.demo.patternBg.maskDirection')}>
                  <Select
                    value={maskDirection}
                    onChange={v => setMaskDirection(v)}
                    options={maskOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className={styles.demoArea}>
            <PatternBg
              pattern={pattern}
              size={size}
              animationDirection={animationDirection}
              maskDirection={maskDirection}
              opacity={opacity}
            >
            </PatternBg>
          </div>
        </Card>
      </div>
    </div>
  )
}