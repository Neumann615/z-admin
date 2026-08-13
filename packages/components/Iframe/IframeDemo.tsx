import { Card, Radio } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'
import { useT } from '../locale'
import { Iframe } from './Iframe'

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
    'padding': `${token.padding}px`,
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
    gap: token.padding,
  },
  iframeArea: {
    height: 610,
    marginTop: token.padding,
    borderRadius: token.borderRadiusLG,
    overflow: 'hidden',
    border: `1px solid ${token.colorBorderSecondary}`,
  },
}))

export function IframeDemo() {
  const { styles } = useStyles()
  const t = useT()
  const sites = [
    { label: t('component.demo.iframe.site.home'), value: 'https://me.zzzpupu.xin/' },
    { label: 'React', value: 'https://react.dev/' },
    { label: 'Vite', value: 'https://vitejs.dev/' },
    { label: 'Ant Design', value: 'https://ant.design/' },
  ]
  const [url, setUrl] = useState(sites[0].value)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('component.demo.iframe.title')}</h2>
        <p>ZaIframe</p>
      </div>
      <div className={styles.content}>
        <Card>
          <Radio.Group
            options={sites}
            optionType="button"
            buttonStyle="solid"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <div className={styles.iframeArea}>
            <Iframe url={url} />
          </div>
        </Card>
      </div>
    </div>
  )
}
