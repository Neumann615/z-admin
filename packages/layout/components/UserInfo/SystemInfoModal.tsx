import { Descriptions, Modal } from 'antd'
import { useMemo } from 'react'
import { useT } from '../../hooks/useT'
import { useTopBarStore } from '../../store/topBar'

export function SystemInfoModal() {
  const open = useTopBarStore((state: any) => state.systemInfoModalOpen)
  const setOpen = useTopBarStore((state: any) => state.setSystemInfoModalOpen)
  const t = useT()

  const items = useMemo(() => {
    const ua = navigator.userAgent
    let browser = t('systemInfo.unknown')
    if (ua.includes('Edg/'))
      browser = 'Microsoft Edge'
    else if (ua.includes('Chrome/'))
      browser = 'Google Chrome'
    else if (ua.includes('Firefox/'))
      browser = 'Mozilla Firefox'
    else if (ua.includes('Safari/') && !ua.includes('Chrome/'))
      browser = 'Apple Safari'

    let os = t('systemInfo.unknown')
    if (ua.includes('Windows NT 10'))
      os = 'Windows 10/11'
    else if (ua.includes('Windows'))
      os = 'Windows'
    else if (ua.includes('Mac OS X'))
      os = 'macOS'
    else if (ua.includes('Linux'))
      os = 'Linux'
    else if (ua.includes('Android'))
      os = 'Android'
    else if (ua.includes('iPhone') || ua.includes('iPad'))
      os = 'iOS'

    return [
      { key: 'browser', label: t('systemInfo.browser'), children: browser },
      { key: 'os', label: t('systemInfo.os'), children: os },
      { key: 'language', label: t('systemInfo.language'), children: navigator.language },
      {
        key: 'resolution',
        label: t('systemInfo.resolution'),
        children: `${window.screen.width} × ${window.screen.height}`,
      },
      {
        key: 'viewport',
        label: t('systemInfo.viewport'),
        children: `${window.innerWidth} × ${window.innerHeight}`,
      },
      { key: 'url', label: t('systemInfo.url'), children: window.location.href },
      { key: 'userAgent', label: 'User Agent', children: ua },
    ]
  }, [open])

  return (
    <Modal
      title={t('shortcuts.viewSystemInfo')}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={640}
    >
      <Descriptions column={1} bordered size="small" items={items} />
    </Modal>
  )
}
