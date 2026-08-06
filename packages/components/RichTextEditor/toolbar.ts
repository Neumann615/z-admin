import type { ToolbarConfig } from 'quill/modules/toolbar'

// 默认工具栏：覆盖常用格式，保持轻量
export const defaultToolbar: ToolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ header: [1, 2, 3, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
]
