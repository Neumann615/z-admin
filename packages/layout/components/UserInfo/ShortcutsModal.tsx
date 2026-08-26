import type { LayoutMessages } from '@zealous-admin/locales/index'
import { Modal, Typography } from 'antd'
import { createStyles } from 'antd-style'
import { useT } from '../../hooks/useT'

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
  descKey: keyof LayoutMessages
}

interface ShortcutSection {
  titleKey: keyof LayoutMessages
  items: ShortcutItem[]
}

const shortcuts: ShortcutSection[] = [
  {
    titleKey: 'shortcuts.global',
    items: [
      { keys: ['Ctrl', 'I'], descKey: 'shortcuts.viewSystemInfo' },
      { keys: ['Ctrl', 'K'], descKey: 'shortcuts.openSearch' },
    ],
  },
  {
    titleKey: 'shortcuts.tabBar',
    items: [
      { keys: ['Alt', '←'], descKey: 'shortcuts.prevTab' },
      { keys: ['Alt', '→'], descKey: 'shortcuts.nextTab' },
      { keys: ['Alt', 'W'], descKey: 'shortcuts.closeCurrentTab' },
      { keys: ['Alt', '1-9'], descKey: 'shortcuts.nthTab' },
      { keys: ['Alt', '0'], descKey: 'shortcuts.lastTab' },
    ],
  },
  {
    titleKey: 'shortcuts.page',
    items: [
      { keys: ['Alt', '↑'], descKey: 'shortcuts.maximize' },
      { keys: ['Alt', '↓'], descKey: 'shortcuts.exitMaximize' },
    ],
  },
]

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const { styles } = useStyles()
  const t = useT()

  return (
    <Modal
      title={t('shortcuts.title')}
      open={open}
      onCancel={onClose}
      footer={null}
      width={620}
      rootClassName={styles.modal}
    >
      <div className={styles.content}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            {[shortcuts[0], shortcuts[2]].map(section => (
              <div key={section.titleKey} className={styles.section}>
                <Title level={5} className={styles.sectionTitle}>{t(section.titleKey)}</Title>
                {section.items.map(item => (
                  <div key={item.descKey} className={styles.shortcutRow}>
                    <div className={styles.keys}>
                      {item.keys.map(key => (
                        <span key={key} className={styles.key}>{key}</span>
                      ))}
                    </div>
                    <Text className={styles.desc}>{t(item.descKey)}</Text>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {[shortcuts[1]].map(section => (
              <div key={section.titleKey} className={styles.section}>
                <Title level={5} className={styles.sectionTitle}>{t(section.titleKey)}</Title>
                {section.items.map(item => (
                  <div key={item.descKey} className={styles.shortcutRow}>
                    <div className={styles.keys}>
                      {item.keys.map(key => (
                        <span key={key} className={styles.key}>{key}</span>
                      ))}
                    </div>
                    <Text className={styles.desc}>{t(item.descKey)}</Text>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
