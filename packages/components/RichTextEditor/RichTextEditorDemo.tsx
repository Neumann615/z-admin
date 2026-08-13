import type { ToolbarConfig } from 'quill/modules/toolbar'
import { Card, Col, Form, Input, Row, Select, Switch } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useState } from 'react'
import { useT } from '../locale'
import { RichTextEditor } from './RichTextEditor'
import { defaultToolbar } from './toolbar'

const simpleToolbar: ToolbarConfig = [
  ['bold', 'italic', 'underline'],
  ['link'],
  ['clean'],
]

// 参与格式化的块级标签（行内标签保持原样）
const BLOCK_TAG_RE = /<\/?(?:h[1-6]|p|div|ul|ol|blockquote|pre|table|tr|section|article|header|footer|figure|figcaption|hr)\b[^>]*>/gi

// 将 HTML 输出格式化为缩进多行，便于阅读（quill 输出的 HTML 为单行）
function formatHtml(html: string): string {
  let depth = 0
  return html
    .replace(BLOCK_TAG_RE, match => `\n${match}\n`)
    .trim()
    .split('\n')
    .map((raw) => {
      const line = raw.trim()
      const tags = line.match(BLOCK_TAG_RE) ?? []
      // 闭合/自闭合标签行按上一层级缩进，其余按当前层级
      const isClosing = /^<\//.test(line)
      const indent = isClosing ? Math.max(0, depth - 1) : depth
      const out = `${'  '.repeat(indent)}${line}`
      for (const tag of tags) {
        if (/^<\//.test(tag) || /\/>$/.test(tag) || /^<(?:br|hr)\b/i.test(tag)) {
          depth = Math.max(0, depth - 1)
        }
        else {
          depth += 1
        }
      }
      return out
    })
    .filter(line => line.trim() !== '')
    .join('\n')
}

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
  output: {
    margin: 0,
    padding: `${token.paddingSM}px ${token.paddingMD}px`,
    background: token.colorBgLayout,
    borderRadius: token.borderRadiusLG,
    fontSize: token.fontSizeSM,
    lineHeight: token.lineHeight,
    color: token.colorText,
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
  },
  editorArea: {
    height: 360,
  },
}))

export function RichTextEditorDemo() {
  const { styles } = useStyles()
  const t = useT()
  const [html, setHtml] = useState(() => t('component.demo.richTextEditor.initialContent'))
  const [height, setHeight] = useState<number | 'auto'>(280)
  const [placeholder, setPlaceholder] = useState(() => t('component.richTextEditor.placeholder'))
  const [readOnly, setReadOnly] = useState(false)
  const [toolbarMode, setToolbarMode] = useState<'full' | 'simple' | 'none'>('full')

  // 语言切换时重置初始内容与默认占位提示
  useEffect(() => {
    setHtml(t('component.demo.richTextEditor.initialContent'))
    setPlaceholder(t('component.richTextEditor.placeholder'))
  }, [t])

  const toolbar = toolbarMode === 'full'
    ? defaultToolbar
    : toolbarMode === 'simple'
      ? simpleToolbar
      : null

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.richTextEditor.title')}</h2>
        <p>ZaRichTextEditor</p>
      </div>
      <div className={styles.content}>
        <Card>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label={t('component.demo.richTextEditor.toolbar')}>
                  <Select
                    value={toolbarMode}
                    onChange={v => setToolbarMode(v as 'full' | 'simple' | 'none')}
                    options={[
                      { label: t('component.demo.richTextEditor.toolbarMode.full'), value: 'full' },
                      { label: t('component.demo.richTextEditor.toolbarMode.simple'), value: 'simple' },
                      { label: t('component.demo.richTextEditor.toolbarMode.none'), value: 'none' },
                    ]}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.richTextEditor.height')}>
                  <Select
                    value={height}
                    onChange={v => setHeight(v as number | 'auto')}
                    options={[
                      { label: '200px', value: 200 },
                      { label: '280px', value: 280 },
                      { label: '400px', value: 400 },
                      { label: t('component.demo.richTextEditor.height.auto'), value: 'auto' },
                    ]}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.common.placeholderLabel')}>
                  <Input
                    value={placeholder}
                    onChange={e => setPlaceholder(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('component.demo.richTextEditor.readOnly')} valuePropName="checked">
                  <Switch checked={readOnly} onChange={setReadOnly} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* 自动填满模式需要父容器有确定高度，此处用固定高度区域模拟 */}
          <div className={height === 'auto' ? styles.editorArea : undefined}>
            <RichTextEditor
              value={html}
              onChange={setHtml}
              height={height}
              placeholder={placeholder}
              readOnly={readOnly}
              toolbar={toolbar}
            />
          </div>
        </Card>
        <Row gutter={24}>
          <Col span={12}>
            <Card title={t('component.demo.richTextEditor.htmlSource')}>
              <pre className={styles.output}>{formatHtml(html)}</pre>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t('component.demo.richTextEditor.renderEffect')}>
              {/* 只读模式隐藏工具栏，直接展示富文本渲染效果 */}
              <RichTextEditor value={html} readOnly />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
