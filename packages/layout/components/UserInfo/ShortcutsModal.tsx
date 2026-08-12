import { Modal, Typography } from 'antd'
import { createStyles } from 'antd-style'

const { Text, Title } = Typography

const useStyles = createStyles(({ token, css }) => ({
  modal: css`
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
  content: {
    padding: `${token.padding}px ${token.paddingLG}px`,
  },
  section: {
    'marginBottom': token.marginLG,
    '&:last-child': { marginBottom: 0 },
  },
  sectionTitle: {
    fontSize: token.fontSizeLG,
    fontWeight: token.fontWeightStrong,
    color: token.colorText,
    marginBottom: token.marginSM,
  },
  shortcutRow: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginSM,
    padding: `${token.paddingXS}px 0`,
    fontSize: token.fontSize,
    color: token.colorText,
  },
  keys: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 120,
  },
  key: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `2px 8px`,
    borderRadius: token.borderRadiusSM,
    backgroundColor: token.colorBgElevated,
    border: `1px solid ${token.colorBorderSecondary}`,
    fontSize: token.fontSize,
    color: token.colorText,
    fontFamily: 'monospace',
    lineHeight: 1.4,
  },
  desc: {
    flex: 1,
    color: token.colorTextSecondary,
  },
}))

export interface ShortcutsModalProps {
  open: boolean
  onClose: () => void
}

interface ShortcutItem {
  keys: string[]
  desc: string
}

interface ShortcutSection {
  title: string
  items: ShortcutItem[]
}

const shortcuts: ShortcutSection[] = [
  {
    title: '全局',
    items: [
      { keys: ['Ctrl', 'I'], desc: '查看系统信息' },
      { keys: ['Ctrl', 'K'], desc: '唤起导航搜索' },
    ],
  },
  {
    title: '主导航',
    items: [
      { keys: ['Alt', '←'], desc: '激活上一个主导航' },
      { keys: ['Alt', '→'], desc: '激活下一个主导航' },
    ],
  },
  {
    title: '标签栏',
    items: [
      { keys: ['Alt', '←'], desc: '切换到上一个标签页' },
      { keys: ['Alt', '→'], desc: '切换到下一个标签页' },
      { keys: ['Alt', 'W'], desc: '关闭当前标签页' },
      { keys: ['Alt', '1-9'], desc: '切换到第 n 个标签页' },
      { keys: ['Alt', '0'], desc: '切换到最后一个标签页' },
    ],
  },
  {
    title: '页面',
    items: [
      { keys: ['Alt', '↑'], desc: '最大化' },
      { keys: ['Alt', '↓'], desc: '退出最大化' },
    ],
  },
]

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const { styles } = useStyles()

  return (
    <Modal
      title="快捷键"
      open={open}
      onCancel={onClose}
      footer={null}
      width={620}
      rootClassName={styles.modal}
    >
      <div className={styles.content}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {shortcuts.map(section => (
            <div key={section.title} className={styles.section}>
              <Title level={5} className={styles.sectionTitle}>{section.title}</Title>
              {section.items.map(item => (
                <div key={item.desc} className={styles.shortcutRow}>
                  <div className={styles.keys}>
                    {item.keys.map(key => (
                      <span key={key} className={styles.key}>{key}</span>
                    ))}
                  </div>
                  <Text className={styles.desc}>{item.desc}</Text>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
