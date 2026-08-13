import type { SignaturePadRef } from './SignaturePad'
import { App, Button, Card, Col, ColorPicker, Form, Image, InputNumber, Modal, Row, Space } from 'antd'
import { createStyles } from 'antd-style'
import { useRef, useState } from 'react'
import { useT } from '../locale'
import { SignaturePad } from './SignaturePad'

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
  },
  toolbar: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  modalImage: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadius,
    padding: token.padding,
  },
}))

export function SignaturePadDemo() {
  const { styles } = useStyles()
  const { message } = App.useApp()
  const t = useT()
  const sigRef = useRef<SignaturePadRef>(null)
  const [penColor, setPenColor] = useState<string | undefined>(undefined)
  const [bgColor, setBgColor] = useState<string | undefined>(undefined)
  const [penWidth, setPenWidth] = useState(5)
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(360)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

  const handleGenerate = () => {
    const url = sigRef.current?.getDataURL()
    if (!url) {
      message.warning(t('component.signaturePad.signRequired'))
      return
    }
    setPreviewUrl(url)
    message.success(t('component.demo.signaturePad.generated'))
  }

  const handleDownload = () => {
    sigRef.current?.download('signature.png')
  }

  const handleClear = () => {
    sigRef.current?.clear()
    setPreviewUrl(undefined)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.signaturePad.title')}</h2>
        <p>ZaSignaturePad</p>
      </div>

      <div className={styles.content}>
        <Card>
          <Row gutter={24}>
            {/* 左侧：配置项 */}
            <Col xs={24} md={10} lg={8}>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label={t('component.demo.common.width')}>
                      <InputNumber
                        value={width}
                        onChange={v => setWidth(v || 500)}
                        min={200}
                        max={1200}
                        step={10}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t('component.demo.common.height')}>
                      <InputNumber
                        value={height}
                        onChange={v => setHeight(v || 265)}
                        min={120}
                        max={800}
                        step={10}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t('component.demo.signaturePad.penWidth')}>
                      <InputNumber
                        value={penWidth}
                        onChange={v => setPenWidth(v || 2.5)}
                        min={1}
                        max={10}
                        step={0.5}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={t('component.demo.signaturePad.penColor')}>
                  <ColorPicker
                    value={penColor}
                    onChange={c => setPenColor(c.toHexString())}
                    showText
                    allowClear
                    onClear={() => setPenColor(undefined)}
                  />
                </Form.Item>
                <Form.Item label={t('component.demo.signaturePad.bgColor')}>
                  <ColorPicker
                    value={bgColor}
                    onChange={c => setBgColor(c.toHexString())}
                    showText
                    allowClear
                    onClear={() => setBgColor(undefined)}
                  />
                </Form.Item>
              </Form>
            </Col>

            {/* 右侧：签名区 + 操作按钮 + 预览 */}
            <Col xs={24} md={14} lg={16}>
              <div className={styles.demoArea}>
                <SignaturePad
                  ref={sigRef}
                  width={width}
                  height={height}
                  penColor={penColor}
                  backgroundColor={bgColor}
                  penWidth={penWidth}
                  onChange={(empty) => {
                    if (empty)
                      setPreviewUrl(undefined)
                  }}
                />
              </div>

              <div className={styles.toolbar}>
                <Space>
                  <Button onClick={handleClear}>{t('component.demo.signaturePad.reSign')}</Button>
                  <Button type="primary" onClick={handleGenerate}>{t('component.demo.signaturePad.generate')}</Button>
                  <Button type="primary" onClick={handleDownload}>{t('component.demo.signaturePad.download')}</Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      <Modal
        title={t('component.demo.signaturePad.previewTitle')}
        open={!!previewUrl}
        onCancel={() => setPreviewUrl(undefined)}
        footer={[
          <Button key="download" type="primary" onClick={handleDownload}>
            {t('component.demo.signaturePad.download')}
          </Button>,
          <Button key="close" onClick={() => setPreviewUrl(undefined)}>
            {t('component.demo.signaturePad.close')}
          </Button>,
        ]}
      >
        {previewUrl && (
          <div className={styles.modalImage}>
            <Image
              src={previewUrl}
              alt={t('component.demo.signaturePad.previewTitle')}
              width={width}
              style={{ border: `1px solid #f0f0f0`, borderRadius: 8 }}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
