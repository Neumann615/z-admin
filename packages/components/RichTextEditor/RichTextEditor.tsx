import type { Delta, EmitterSource } from 'quill'
import type { ToolbarConfig } from 'quill/modules/toolbar'
import { createStyles } from 'antd-style'
import Quill from 'quill'
import { useEffect, useRef } from 'react'
import { defaultToolbar } from './toolbar'
import 'quill/dist/quill.snow.css'

// 工具栏按钮/选择器的悬停提示文案（按 quill 控件类名映射）
const TOOLTIP_LABELS: Record<string, string> = {
  'ql-bold': '加粗',
  'ql-italic': '斜体',
  'ql-underline': '下划线',
  'ql-strike': '删除线',
  'ql-blockquote': '引用',
  'ql-code-block': '代码块',
  'ql-link': '插入链接',
  'ql-image': '插入图片',
  'ql-video': '插入视频',
  'ql-clean': '清除格式',
  'ql-header': '标题',
  'ql-list': '列表',
  'ql-align': '对齐方式',
  'ql-color': '文字颜色',
  'ql-background': '背景颜色',
  'ql-direction': '文字方向',
  'ql-indent': '缩进',
  'ql-script': '上下标',
  'ql-font': '字体',
  'ql-size': '字号',
}

// 为工具栏元素注入 data-tooltip，配合 CSS ::after 实现悬停提示
function attachTooltips(toolbar: Element) {
  toolbar.querySelectorAll<HTMLElement>('button, .ql-picker-label').forEach((el) => {
    // 按钮直接取自身类名；下拉选择器取父级 .ql-picker 的类名
    const classes = el.classList.contains('ql-picker-label')
      ? el.parentElement?.classList
      : el.classList
    if (!classes) {
      return
    }
    const format = classes.toString().split(' ').find(name => TOOLTIP_LABELS[name])
    if (format) {
      el.setAttribute('data-tooltip', TOOLTIP_LABELS[format])
    }
  })
}

const useStyles = createStyles(({ token, css }, { height, readOnly }: { height: number | 'auto', readOnly: boolean }) => {
  const isAuto = height === 'auto'
  return {
    editor: css`
      width: 100%;
      font-family: ${token.fontFamily};
      /* auto 模式：flex 纵向布局，编辑区填满去除工具栏后的剩余空间 */
      ${isAuto ? 'height: 100%; display: flex; flex-direction: column;' : ''}

      .ql-toolbar.ql-snow {
        flex-shrink: 0;
        /* 只读模式隐藏工具栏 */
        ${readOnly ? 'display: none;' : ''}
        padding: 6px 8px;
        background: ${token.colorBgContainer};
        border: 1px solid ${token.colorBorder};
        border-bottom: none;
        border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
        font-family: inherit;

        /* 悬停提示 */
        [data-tooltip] {
          position: relative;

          &:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -26px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            padding: 3px 8px;
            font-size: ${token.fontSizeSM}px;
            line-height: 1.5;
            white-space: nowrap;
            color: ${token.colorTextLightSolid};
            background: ${token.colorBgSpotlight};
            border-radius: ${token.borderRadiusSM}px;
            box-shadow: ${token.boxShadowSecondary};
            pointer-events: none;
          }
        }

        .ql-stroke {
          stroke: ${token.colorTextSecondary};
        }

        .ql-fill {
          fill: ${token.colorTextSecondary};
        }

        button,
        .ql-picker-label {
          color: ${token.colorTextSecondary};
          transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }

        button:hover,
        button:focus,
        button.ql-active {
          color: ${token.colorPrimary};
          background: ${token.colorPrimaryBg};
          border-radius: ${token.borderRadiusSM}px;

          .ql-stroke {
            stroke: ${token.colorPrimary};
          }

          .ql-fill {
            fill: ${token.colorPrimary};
          }
        }

        .ql-picker-label {
          border: 1px solid transparent;
          transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

          &:hover,
          &.ql-active {
            color: ${token.colorPrimary};
            background: ${token.colorPrimaryBg};
            border-radius: ${token.borderRadiusSM}px;

            .ql-stroke {
              stroke: ${token.colorPrimary};
            }
          }
        }

        .ql-picker.ql-expanded .ql-picker-label {
          color: ${token.colorPrimary};
          border-color: ${token.colorBorder};

          .ql-stroke {
            stroke: ${token.colorPrimary};
          }
        }

        .ql-picker.ql-expanded .ql-picker-options {
          padding: 4px 0;
          background: ${token.colorBgElevated};
          border: 1px solid ${token.colorBorder};
          border-radius: ${token.borderRadiusSM}px;
          box-shadow: ${token.boxShadowSecondary};

          .ql-picker-item {
            color: ${token.colorText};
            border-radius: ${token.borderRadiusSM}px;
            transition: color 0.2s ease, background-color 0.2s ease;

            &:hover,
            &.ql-selected {
              color: ${token.colorPrimary};
              background: ${token.colorPrimaryBg};
            }
          }
        }
      }

      .ql-container.ql-snow {
        background: ${token.colorBgContainer};
        border: 1px solid ${token.colorBorder};
        /* 只读模式隐藏工具栏后，容器需要补全上边框与四角圆角 */
        ${readOnly
          ? `border-radius: ${token.borderRadiusLG}px;`
          : `
            border-top: none;
            border-radius: 0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px;
          `}
        font-family: inherit;
        font-size: ${token.fontSize}px;
        /* 覆盖 quill 核心样式的 height: 100%，由 flex 接管高度，避免与工具栏叠加溢出 */
        ${isAuto ? 'flex: 1; min-height: 0; height: auto;' : ''}

        .ql-editor {
          ${isAuto ? 'height: 100%;' : `min-height: ${height}px;`}
          padding: 12px;
          color: ${token.colorText};
          font-size: ${token.fontSize}px;
          line-height: 1.6;

          &.ql-blank::before {
            color: ${token.colorTextPlaceholder};
            font-style: normal;
          }

          a {
            color: ${token.colorPrimary};

            &:hover {
              color: ${token.colorPrimaryHover};
            }
          }

          blockquote {
            border-left: 4px solid ${token.colorBorderSecondary};
            color: ${token.colorTextDescription};
          }

          code {
            padding: 0 4px;
            background: ${token.colorFillTertiary};
            border-radius: ${token.borderRadiusSM}px;
            color: ${token.colorText};
          }

          /* 代码块接入 antd 主题变量，替代 quill 硬编码的深色背景 */
          .ql-code-block-container {
            padding: ${token.paddingSM}px;
            background: ${token.colorBgLayout};
            border-radius: ${token.borderRadius}px;
            font-family: ${token.fontFamilyCode};
            color: ${token.colorText};
          }

          pre.ql-syntax {
            padding: 12px;
            background: ${token.colorBgLayout};
            border-radius: ${token.borderRadiusSM}px;
            color: ${token.colorText};
          }

          ::selection {
            background: ${token.colorPrimaryBgHover};
          }
        }
      }

      /* 只读模式隐藏工具栏后补全容器上边框（覆盖 quill 的兄弟选择器规则） */
      ${readOnly
        ? `
      .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-top: 1px solid ${token.colorBorder};
      }
      `
        : ''}

      .ql-tooltip {
        background: ${token.colorBgElevated};
        border: 1px solid ${token.colorBorder};
        border-radius: ${token.borderRadiusSM}px;
        box-shadow: ${token.boxShadowSecondary};
        color: ${token.colorText};

        a {
          color: ${token.colorPrimary};
        }

        input[type='text'] {
          background: ${token.colorBgContainer};
          border: 1px solid ${token.colorBorder};
          border-radius: ${token.borderRadiusSM}px;
          color: ${token.colorText};
        }
      }
    `,
  }
})

export interface RichTextEditorProps {
  /** 受控内容（HTML 字符串） */
  value?: string
  /** 非受控模式初始内容（HTML 字符串） */
  defaultValue?: string
  /** 内容变化回调（仅用户编辑时触发） */
  onChange?: (html: string) => void
  /** 占位提示文案 */
  placeholder?: string
  /** 编辑区高度：数字为最小高度（px）；'auto' 自动填满父容器（需父容器有确定高度） */
  height?: number | 'auto'
  /** 是否只读 */
  readOnly?: boolean
  /** 工具栏配置，传 null 隐藏工具栏；变化时自动重建编辑器 */
  toolbar?: ToolbarConfig | null
  /** 自定义类名 */
  className?: string
}

export function RichTextEditor(props: RichTextEditorProps) {
  const {
    value,
    defaultValue,
    onChange,
    placeholder = '请输入内容...',
    height = 300,
    readOnly = false,
    toolbar = defaultToolbar,
    className,
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)
  const handlerRef = useRef<((delta: Delta, oldDelta: Delta, source: EmitterSource) => void) | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const initialHtml = useRef(value ?? defaultValue ?? '').current
  const contentRef = useRef(initialHtml)
  const prevToolbarRef = useRef(toolbar)

  const { styles, cx } = useStyles({ height, readOnly })

  // 创建编辑器实例（挂载或工具栏变化时调用）
  const initEditor = () => {
    const editor = editorRef.current
    if (!editor) {
      return
    }
    const quill = new Quill(editor, {
      theme: 'snow',
      placeholder,
      readOnly,
      modules: { toolbar },
    })
    quillRef.current = quill

    // 为工具栏注入悬停提示
    const toolbarEl = wrapperRef.current?.querySelector('.ql-toolbar')
    if (toolbarEl) {
      attachTooltips(toolbarEl)
    }

    // 写入内容（重建时保留编辑器已有内容，首次为初始内容）
    if (contentRef.current) {
      quill.clipboard.dangerouslyPasteHTML(contentRef.current)
    }

    const handleTextChange = (_delta: Delta, _oldDelta: Delta, source: EmitterSource) => {
      contentRef.current = quill.root.innerHTML
      if (source === Quill.sources.USER) {
        onChangeRef.current?.(quill.root.innerHTML)
      }
    }
    handlerRef.current = handleTextChange
    quill.on(Quill.events.TEXT_CHANGE, handleTextChange)
  }

  // 销毁编辑器并还原 DOM，避免重复挂载时残留
  const destroyEditor = () => {
    const editor = editorRef.current
    const wrapper = wrapperRef.current
    if (quillRef.current && handlerRef.current) {
      quillRef.current.off(Quill.events.TEXT_CHANGE, handlerRef.current)
    }
    quillRef.current = null
    if (wrapper && editor?.isConnected) {
      wrapper.querySelectorAll('.ql-toolbar').forEach(node => node.remove())
      editor.replaceChildren()
      editor.classList.remove('ql-container', 'ql-snow', 'ql-disabled')
      editor.removeAttribute('data-placeholder')
    }
  }

  // 初始化编辑器（仅挂载一次）
  useEffect(() => {
    initEditor()
    return destroyEditor
  }, [])

  // 工具栏变化时重建编辑器（深度比较，避免内联数组导致每次渲染都重建）
  useEffect(() => {
    if (JSON.stringify(prevToolbarRef.current) === JSON.stringify(toolbar)) {
      return
    }
    prevToolbarRef.current = toolbar
    destroyEditor()
    initEditor()
  }, [toolbar])

  // 受控模式：外部 value 变化时同步编辑器内容
  useEffect(() => {
    const quill = quillRef.current
    if (!quill || value === undefined) {
      return
    }
    if (value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value || '')
      contentRef.current = quill.root.innerHTML
    }
  }, [value])

  // 只读状态切换
  useEffect(() => {
    quillRef.current?.enable(!readOnly)
  }, [readOnly])

  // 占位符动态更新
  useEffect(() => {
    quillRef.current?.root.setAttribute('data-placeholder', placeholder)
  }, [placeholder])

  return (
    <div ref={wrapperRef} className={cx(styles.editor, className)}>
      <div ref={editorRef} />
    </div>
  )
}
