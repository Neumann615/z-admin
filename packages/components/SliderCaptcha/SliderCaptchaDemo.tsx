import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useState } from 'react'
import { useT } from '../locale'
import { SliderCaptcha } from './SliderCaptcha'

type CaptchaType = 'slider' | 'embed' | 'float'

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
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
}))

export function SliderCaptchaDemo() {
  const { styles } = useStyles()
  const t = useT()
  const typeLabels: Record<CaptchaType, string> = {
    slider: t('component.demo.sliderCaptcha.type.slider'),
    embed: t('component.demo.sliderCaptcha.type.embed'),
    float: t('component.demo.sliderCaptcha.type.float'),
  }
  const typeOptions = [
    { label: typeLabels.slider, value: 'slider' },
    { label: typeLabels.embed, value: 'embed' },
    { label: typeLabels.float, value: 'float' },
  ]
  const [captchaType, setCaptchaType] = useState<CaptchaType>('float')
  const [width, setWidth] = useState(384)
  const [height, setHeight] = useState(216)
  const [defaultTip, setDefaultTip] = useState(() => t('component.demo.sliderCaptcha.defaultTipText'))
  const [successTip, setSuccessTip] = useState(() => t('component.demo.sliderCaptcha.successTipText'))
  const [errorTip, setErrorTip] = useState(() => t('component.demo.sliderCaptcha.errorTipText'))
  const [renderKey, setRenderKey] = useState(0)
  const [messageApi, contextHolder] = message.useMessage()

  // 语言切换时重置默认提示文案
  useEffect(() => {
    setDefaultTip(t('component.demo.sliderCaptcha.defaultTipText'))
    setSuccessTip(t('component.demo.sliderCaptcha.successTipText'))
    setErrorTip(t('component.demo.sliderCaptcha.errorTipText'))
  }, [t])

  const handleVerify = (success: boolean) => {
    if (success) {
      messageApi.success(t('component.demo.sliderCaptcha.verifySuccess').replace('{type}', typeLabels[captchaType]))
    }
    else {
      messageApi.error(t('component.demo.sliderCaptcha.verifyError').replace('{type}', typeLabels[captchaType]))
    }
  }

  const handleConfigChange = () => {
    setRenderKey(prev => prev + 1)
  }

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.header}>
        <h2>{t('component.demo.sliderCaptcha.title')}</h2>
        <p>ZaSliderCaptcha</p>
      </div>
      <div className={styles.content}>
        <Card>
          <Row gutter={24}>
            {/* 左侧：表单配置 */}
            <Col span={12}>
              <Form layout="vertical">
                <Form.Item label={t('component.demo.sliderCaptcha.type')}>
                  <Select
                    value={captchaType}
                    onChange={(v) => {
                      setCaptchaType(v as CaptchaType)
                      handleConfigChange()
                    }}
                    options={typeOptions}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label={t('component.demo.sliderCaptcha.bgWidth')}>
                      <InputNumber
                        value={width}
                        onChange={(v) => {
                          setWidth(v || 384)
                          handleConfigChange()
                        }}
                        min={200}
                        max={500}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t('component.demo.sliderCaptcha.bgHeight')}>
                      <InputNumber
                        value={height}
                        onChange={(v) => {
                          setHeight(v || 216)
                          handleConfigChange()
                        }}
                        min={100}
                        max={300}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={t('component.demo.sliderCaptcha.defaultTip')}>
                  <Input
                    value={defaultTip}
                    onChange={(e) => {
                      setDefaultTip(e.target.value)
                      handleConfigChange()
                    }}
                  />
                </Form.Item>
                <Form.Item label={t('component.demo.sliderCaptcha.successTip')}>
                  <Input
                    value={successTip}
                    onChange={(e) => {
                      setSuccessTip(e.target.value)
                      handleConfigChange()
                    }}
                  />
                </Form.Item>
                <Form.Item label={t('component.demo.sliderCaptcha.errorTip')}>
                  <Input
                    value={errorTip}
                    onChange={(e) => {
                      setErrorTip(e.target.value)
                      handleConfigChange()
                    }}
                  />
                </Form.Item>
              </Form>
            </Col>

            {/* 右侧：演示区域 */}
            <Col span={12}>
              <div className={styles.demoArea}>
                <SliderCaptcha
                  key={renderKey}
                  type={captchaType}
                  bgSize={{ width, height }}
                  tipText={{
                    default: defaultTip,
                    success: successTip,
                    error: errorTip,
                  }}
                  onVerify={handleVerify}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}
