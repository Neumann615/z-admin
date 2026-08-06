import type { ToolbarConfig } from 'quill/modules/toolbar'
import { Card, Col, Form, Input, Row, Select, Switch } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { RichTextEditor } from './RichTextEditor'
import { defaultToolbar } from './toolbar'

const initialContent = `
<h2>欢迎使用富文本编辑器</h2>
<p>基于 <strong>Quill</strong> 的轻量级编辑器，样式已接入 <strong>antd 主题变量</strong>，可随主题自动适配<em>明暗模式</em>。</p>
<p>支持<strong>加粗</strong>、<em>斜体</em>、<u>下划线</u>、<s>删除线</s> 等常用格式。</p>
<h3>列表与对齐</h3>
<ul>
  <li>无序列表第一项</li>
  <li>无序列表第二项</li>
</ul>
<ol>
  <li>有序列表第一项</li>
  <li>有序列表第二项</li>
</ol>
<p style="text-align: center">这段文字居中显示。</p>
<blockquote>好的工具应该让复杂的事情变简单。</blockquote>
<pre class="ql-syntax" spellcheck="false">import Quill from 'quill'

const editor = new Quill('#editor', { theme: 'snow' })</pre>
<p>可以插入 <a href="https://quilljs.com" target="_blank">链接</a> 与图片。试试编辑上方内容，观察下方输出如何实时变化。</p>
`

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
  const [html, setHtml] = useState(initialContent)
  const [height, setHeight] = useState<number | 'auto'>(280)
  const [placeholder, setPlaceholder] = useState('请输入内容...')
  const [readOnly, setReadOnly] = useState(false)
  const [toolbarMode, setToolbarMode] = useState<'full' | 'simple' | 'none'>('full')

  const toolbar = toolbarMode === 'full'
    ? defaultToolbar
    : toolbarMode === 'simple'
      ? simpleToolbar
      : null

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>富文本编辑器</h2>
        <p>ZaRichTextEditor</p>
      </div>
      <div className={styles.content}>
        <Card>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="工具栏">
                  <Select
                    value={toolbarMode}
                    onChange={v => setToolbarMode(v as 'full' | 'simple' | 'none')}
                    options={[
                      { label: '完整工具栏', value: 'full' },
                      { label: '简约工具栏', value: 'simple' },
                      { label: '隐藏工具栏', value: 'none' },
                    ]}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="编辑区高度">
                  <Select
                    value={height}
                    onChange={v => setHeight(v as number | 'auto')}
                    options={[
                      { label: '200px', value: 200 },
                      { label: '280px', value: 280 },
                      { label: '400px', value: 400 },
                      { label: '自动填满父容器', value: 'auto' },
                    ]}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="占位提示">
                  <Input
                    value={placeholder}
                    onChange={e => setPlaceholder(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="只读模式" valuePropName="checked">
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
            <Card title="HTML 源码">
              <pre className={styles.output}>{formatHtml(html)}</pre>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="渲染效果">
              {/* 只读模式隐藏工具栏，直接展示富文本渲染效果 */}
              <RichTextEditor value={html} readOnly />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
