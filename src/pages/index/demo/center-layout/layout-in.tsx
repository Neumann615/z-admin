import type { LayoutConfig } from '@zealous-admin/layout/index'
import { ColumnWidthOutlined } from '@ant-design/icons'
import { useAppStore } from '@zealous-admin/layout/index'
import { Descriptions, Typography } from 'antd'
import { createStyles } from 'antd-style'
import { useEffect, useRef } from 'react'

const { Title, Paragraph } = Typography

const useStyles = createStyles(({ token, css }) => ({
  wrapper: css`
    padding: 40px;
  `,
  header: css`
    text-align: center;
    margin-bottom: 48px;
  `,
  title: css`
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 8px;
    color: ${token.colorTextHeading};
  `,
  desc: css`
    color: ${token.colorTextSecondary};
    max-width: 720px;
    margin: 0 auto;
  `,
  demoBox: css`
    background: ${token.colorFillContent};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;
    padding: 60px 20px;
    text-align: center;
    margin-top: 24px;
  `,
  hint: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    margin-top: 16px;
  `,
}))

export default function LayoutIn() {
  const { styles } = useStyles()
  const layout = useAppStore(s => s.layout)
  // 记录进入本页面之前的布局配置，用于离开时恢复
  const prevLayoutRef = useRef<LayoutConfig['app']['layout'] | null>(null)

  useEffect(() => {
    // 进入页面：保存旧配置并触发"内层居中"布局配置
    prevLayoutRef.current = useAppStore.getState().layout
    useAppStore.setState(s => ({
      layout: {
        ...s.layout,
        isCenter: true,
        layoutScope: 'inside',
        width: 1200,
      },
    }))
    return () => {
      // 离开页面：恢复进入本页面之前的布局配置
      const prevLayout = prevLayoutRef.current
      if (prevLayout) {
        useAppStore.setState(() => ({ layout: prevLayout }))
      }
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title level={1} className={styles.title}>
          内容区居中示例
        </Title>
        <Paragraph className={styles.desc}>
          进入本页面时自动将布局配置为「内容区居中」，仅内容区域以固定宽度居中显示，侧边菜单与顶栏保持全屏宽度；离开页面时自动恢复进入前的布局配置。
        </Paragraph>
      </div>

      {/* 当前生效的布局配置（实时读取 store） */}
      <Descriptions
        bordered
        size="small"
        column={3}
        items={[
          { key: 'isCenter', label: '居中显示', children: layout.isCenter ? '已开启' : '已关闭' },
          {
            key: 'layoutScope',
            label: '作用范围',
            children: layout.layoutScope === 'inside' ? '内层（内容区）' : '外层（整体布局）',
          },
          { key: 'width', label: '布局宽度', children: `${layout.width}px` },
        ]}
      />

      <div className={styles.demoBox}>
        <p style={{ fontSize: 48, margin: 0 }}>
          <ColumnWidthOutlined />
        </p>
        <p style={{ fontSize: 18, fontWeight: 500, margin: '16px 0 8px' }}>
          内容区被限制在
          {' '}
          {layout.width}
          px 宽度内居中
        </p>
        <p className={styles.hint}>
          侧边菜单与顶栏保持全屏宽度，仅页面内容区域居中显示
        </p>
      </div>
    </div>
  )
}
