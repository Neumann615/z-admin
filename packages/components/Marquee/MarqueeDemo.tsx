import { Avatar, Card, Col, Form, InputNumber, Row, Select, Switch } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { useT } from '../locale'
import { Marquee } from './Marquee'

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
    gap: `${token.paddingLG}px`,
  },
  demoArea: {
    flex: 1,
    maxHeight: '600px',
    overflow: 'hidden',
  },
  reviewCard: {
    padding: token.paddingSM,
    borderRadius: token.borderRadiusLG,
    width: 265,
    flexShrink: 0,
    backgroundColor: token.colorBgElevated,
    border: `1px solid ${token.colorBorderSecondary}`,
    boxSizing: 'border-box',
    height: 160,
  },
  reviewCardHover: {
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
  avatar: {
    width: 32,
    height: 32,
  },
  userName: {
    fontSize: token.fontSizeHeading5,
    fontWeight: token.fontWeightStrong,
    color: token.colorTextBase,
  },
  reviewContent: {
    fontSize: token.fontSize,
    color: token.colorTextSecondary,
    marginTop: token.marginXS,
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  specialDemo: {
    width: '80%',
    margin: '0 auto',
    height: 380,
    overflow: 'hidden',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: `${token.borderRadiusLG}px`,
    position: 'relative',
  },
  gradientOverlayVertical: {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to bottom, transparent 0%, transparent 30%, ${token.colorBgContainer} 100%)`,
  },
}))

export function MarqueeDemo() {
  const { styles } = useStyles()
  const t = useT()
  const directionOptions = [
    { label: t('component.demo.marquee.direction.horizontal'), value: 'horizontal' },
    { label: t('component.demo.marquee.direction.vertical'), value: 'vertical' },
  ]
  const reviews = [
    { name: 'w***@qq.com', content: t('component.demo.marquee.review1') },
    { name: 'z***@163.com', content: t('component.demo.marquee.review2') },
    { name: 'l***@gmail.com', content: t('component.demo.marquee.review3') },
    { name: 'm***@126.com', content: t('component.demo.marquee.review4') },
    { name: 'k***@aliyun.com', content: t('component.demo.marquee.review5') },
    { name: 's***@msn.com', content: t('component.demo.marquee.review6') },
    { name: 'h***@qq.com', content: t('component.demo.marquee.review7') },
    { name: 'g***@hotmail.com', content: t('component.demo.marquee.review8') },
  ]
  const [duration, setDuration] = useState(30)
  const [gap, setGap] = useState(16)
  const [repeat, setRepeat] = useState(2)
  const [reverse, setReverse] = useState(false)
  const [pauseOnHover, setPauseOnHover] = useState(false)
  const [gradient, setGradient] = useState(true)
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal')
  const [renderKey, setRenderKey] = useState(0)

  const forceUpdate = () => setRenderKey(prev => prev + 1)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.marquee.title')}</h2>
        <p>ZaMarquee</p>
      </div>

      <div className={styles.content}>
        <Card>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.duration')}>
                  <InputNumber
                    value={duration}
                    onChange={(v) => {
                      setDuration(v || 30)
                      forceUpdate()
                    }}
                    min={5}
                    max={120}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.gap')}>
                  <InputNumber
                    value={gap}
                    onChange={(v) => {
                      setGap(v || 16)
                      forceUpdate()
                    }}
                    min={8}
                    max={40}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.repeat')}>
                  <InputNumber
                    value={repeat}
                    onChange={(v) => {
                      setRepeat(v || 2)
                      forceUpdate()
                    }}
                    min={2}
                    max={5}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.direction')}>
                  <Select
                    value={direction}
                    onChange={(v) => {
                      setDirection(v)
                      forceUpdate()
                    }}
                    options={directionOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.reverse')}>
                  <Switch
                    checked={reverse}
                    onChange={(v) => {
                      setReverse(v)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.pauseOnHover')}>
                  <Switch
                    checked={pauseOnHover}
                    onChange={(v) => {
                      setPauseOnHover(v)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.marquee.gradient')}>
                  <Switch
                    checked={gradient}
                    onChange={(v) => {
                      setGradient(v)
                      forceUpdate()
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className={styles.demoArea}>
            <Marquee
              key={renderKey}
              duration={duration}
              gap={gap}
              repeat={repeat}
              direction={direction}
              reverse={reverse}
              pauseOnHover={pauseOnHover}
              gradient={gradient}
            >
              {reviews.map((review, index) => (
                <div key={index} className={`${styles.reviewCard} ${styles.reviewCardHover}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar
                      className={styles.avatar}
                      src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${review.name}`}
                    />
                    <span className={styles.userName}>{review.name}</span>
                  </div>
                  <p className={styles.reviewContent}>{review.content}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </Card>
        <Card title={t('component.demo.marquee.specialDemo')}>
          <div className={styles.specialDemo}>
            <div>
              {Array.from({ length: 4 }, (_, i) => (
                <Marquee
                  key={i}
                  pauseOnHover={false}
                  reverse={i % 2 === 0}
                  repeat={4}
                  duration={110}
                  gradient={false}
                  style={{
                    transform: `translateY(${(i - 1) * 4.5 - 10}rem) rotate(-16deg)`,
                    width: '150%',
                    margin: '-48px',
                  }}
                >
                  {(i % 2 === 0 ? reviews.slice(0, 4) : reviews.slice(4)).map((review, index) => (
                    <div key={index} className={styles.reviewCard}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar
                          className={styles.avatar}
                          src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${review.name}`}
                        />
                        <span className={styles.userName}>{review.name}</span>
                      </div>
                      <p className={styles.reviewContent}>{review.content}</p>
                    </div>
                  ))}
                </Marquee>
              ))}
            </div>
            <div className={styles.gradientOverlayVertical}></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
