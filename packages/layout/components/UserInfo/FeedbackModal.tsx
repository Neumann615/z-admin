import { CameraOutlined, DeleteOutlined } from '@ant-design/icons'
import { ZaRichTextEditor } from '@zealous-admin/components/index'
import { App, Button, Modal, Spin, Tooltip } from 'antd'
import { createStyles } from 'antd-style'
import { domToPng } from 'modern-screenshot'
import { useCallback, useEffect, useState } from 'react'
import { useT } from '../../hooks/useT'

const useStyles = createStyles(({ token, css }) => ({
  // 弹窗样式对齐 ConfigPanel：body 无内边距、头部紧凑、内容区高度限制为 80vh
  resetModal: css`
    .ant-modal-body {
      padding: 0px;
    }
    .ant-modal-header {
      padding: 12px;
      margin-bottom: 0;
    }
    .ant-modal-container {
      padding: 0px;
    }
  `,
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.padding,
    padding: token.padding,
    backgroundColor: token.colorBgContainerDisabled,
  },
  // 自定义头部（参考 ConfigPanel）：左侧标题、右侧操作区
  customHeader: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  customHeaderLeft: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${token.colorTextHeading};
  `,
  customHeaderActions: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  previewBox: {
    position: 'relative',
    height: 360,
    padding: token.paddingXS,
    background: token.colorBgLayout,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadiusLG,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewScroll: {
    width: '100%',
    maxHeight: 360,
    overflow: 'auto',
  },
  shotImg: {
    width: '100%',
    display: 'block',
  },
  deleteBtn: {
    position: 'absolute',
    top: token.marginXS,
    right: token.marginXS,
    zIndex: 1,
    background: token.colorBgContainer,
    boxShadow: token.boxShadowTertiary,
    borderRadius: token.borderRadiusSM,
  },
  emptyState: {
    textAlign: 'center',
    color: token.colorTextTertiary,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: token.marginSM,
  },
  emptyTip: {
    marginBottom: token.margin,
  },
}))

export interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

/**
 * 截图当前页面可视区域（全屏视口内容）
 * 限制输出尺寸避免整页长图导致生成卡顿；#root 内不包含 Modal/Popover 等 portal，不会截到弹窗自身
 */
function capturePage(): Promise<string> {
  const root = document.getElementById('root')
  if (!root) {
    return Promise.reject(new Error('root element not found'))
  }
  return domToPng(root, {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
  })
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const { styles } = useStyles()
  const { message } = App.useApp()
  const t = useT()
  const [capturing, setCapturing] = useState(false)
  const [screenshot, setScreenshot] = useState('')
  const [html, setHtml] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const capture = useCallback(async () => {
    setCapturing(true)
    try {
      const dataUrl = await capturePage()
      setScreenshot(dataUrl)
    }
    catch {
      message.error(t('feedback.captureFailed'))
    }
    finally {
      setCapturing(false)
    }
  }, [message, t])

  // 每次打开时重置内容，由用户点击按钮后触发截图
  useEffect(() => {
    if (open) {
      setScreenshot('')
      setHtml('')
    }
  }, [open])

  const handleSubmit = async () => {
    const text = html.replace(/<[^>]*>/g, '').trim()
    if (!text) {
      message.warning(t('feedback.descriptionRequired'))
      return
    }
    setSubmitting(true)
    try {
      // 模拟提交：实际项目中在此调用反馈接口
      await new Promise(resolve => setTimeout(resolve, 800))
      message.success(t('feedback.submitSuccess'))
      onClose()
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      rootClassName={styles.resetModal}
      width={820}
      centered
      open={open}
      onCancel={onClose}
      closable={false}
      footer={null}
      title={(
        <div className={styles.customHeader}>
          <div className={styles.customHeaderLeft}>
            {t('feedback.title')}
          </div>
          <div className={styles.customHeaderActions}>
            <Button
              type="primary"
              loading={submitting}
              onClick={handleSubmit}
            >
              {t('feedback.submit')}
            </Button>
          </div>
        </div>
      )}
    >
      <div className={styles.body}>
        <div className={styles.previewBox}>
          {capturing
            ? <Spin tip={t('feedback.capturing')} />
            : screenshot
              ? (
                  <>
                    <Tooltip title={t('feedback.delete')}>
                      <Button
                        className={styles.deleteBtn}
                        danger
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => setScreenshot('')}
                      />
                    </Tooltip>
                    <div className={styles.previewScroll}>
                      <img className={styles.shotImg} src={screenshot} alt="" />
                    </div>
                  </>
                )
              : (
                  <div className={styles.emptyState}>
                    <div><CameraOutlined className={styles.emptyIcon} /></div>
                    <div className={styles.emptyTip}>{t('feedback.captureTip')}</div>
                    <Button
                      type="primary"
                      icon={<CameraOutlined />}
                      loading={capturing}
                      onClick={capture}
                    >
                      {t('feedback.captureButton')}
                    </Button>
                  </div>
                )}
        </div>
        <ZaRichTextEditor value={html} onChange={setHtml} height={240} />
      </div>
    </Modal>
  )
}
