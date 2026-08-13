import { Card, Input } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useState } from 'react'
import { useT } from '../locale'
import { Markdown } from './Markdown'

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
  editorSection: {
    display: 'flex',
    gap: 16,
    minHeight: 480,
  },
  editorPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  panelHeader: {
    fontSize: 13,
    fontWeight: 500,
    color: token.colorTextSecondary,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewPanel: {
    flex: 1,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadius,
    overflow: 'auto',
    backgroundColor: token.colorBgContainer,
  },
  specialDemo: {
    width: '100%',
    maxHeight: 600,
    overflowY: 'auto',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    backgroundColor: token.colorBgContainer,
    padding: token.paddingSM,
  },
}))

export function MarkdownDemo() {
  const { styles } = useStyles()
  const t = useT()
  const [markdownText, setMarkdownText] = useState(() => t('component.demo.markdown.sample'))
  const [viewMode] = useState<'edit' | 'preview' | 'both'>('both')

  // 语言切换时重置示例文档
  useEffect(() => {
    setMarkdownText(t('component.demo.markdown.sample'))
  }, [t])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.markdown.title')}</h2>
        <p>ZaMarkdown</p>
      </div>
      <div className={styles.content}>
        <Card>
          <div className={styles.editorSection}>
            <div
              className={styles.editorPanel}
              style={{ display: viewMode === 'preview' ? 'none' : '' }}
            >
              <div className={styles.panelHeader}>
                <span>
                  {markdownText.length}
                  {' '}
                  {t('component.demo.markdown.chars')}
                </span>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <Input.TextArea
                  value={markdownText}
                  onChange={e => setMarkdownText(e.target.value)}
                  placeholder={t('component.demo.markdown.placeholder')}
                  style={{ height: '100%', fontFamily: 'Inconsolata, Monaco, Consolas, "Courier New", monospace', fontSize: 14, resize: 'none' }}
                />
              </div>
            </div>
            <div
              className={styles.editorPanel}
              style={{ display: viewMode === 'edit' ? 'none' : '' }}
            >
              <div className={styles.panelHeader}>
                <span>{t('component.demo.markdown.preview')}</span>
              </div>
              <div className={styles.previewPanel}>
                <Markdown text={markdownText} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
