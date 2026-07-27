import { Spin } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

export interface IframeProps {
  url: string
}

const useStyles = createStyles(({ token, css }) => ({
  wrapper: css`
    width: 100%;
    height: 100%;
    position: relative;
  `,
  loadingMask: css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${token.colorBgLayout};
    z-index: 1;
  `,
  iframe: css`
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  `,
}))

export function Iframe({ url }: IframeProps) {
  const [loading, setLoading] = useState(true)
  const { styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loadingMask}>
          <Spin size="large" />
        </div>
      )}
      <iframe
        src={url}
        title={url}
        className={styles.iframe}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export default Iframe
