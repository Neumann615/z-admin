import { createStyles } from 'antd-style'

// ============================================================
// 自定义涨跌色 (替代 colorError/colorSuccess 语义倒置)
// 中国股市惯例：红色/粉色 = 涨, 绿色 = 跌
// ============================================================
export function getUpDownColors(_token: any) {
  return {
    upColor: '#cf1322', // 涨 — 深红
    upColorBg: '#fff2e8',
    downColor: '#389e0d', // 跌 — 深绿
    downColorBg: '#f6ffed',
  }
}

// ============================================================
// Dashboard 共享样式 (createStyles)
// ============================================================
export const useDashboardStyles = createStyles(({ token, css }) => {
  const { upColor, downColor } = getUpDownColors(token)

  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      background: ${token.colorBgLayout};
      overflow: auto;
      color: ${token.colorText};
      position: relative;
    `,
    container: css`
      padding: ${token.paddingMD}px;
      margin: 0 auto;
      box-sizing: border-box;
    `,
    header: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      padding: 0 0 8px;
    `,
    headerTitle: css`
      font-size: 26px;
      font-weight: 700;
      color: ${token.colorTextHeading};
      letter-spacing: 2px;
      margin: 0;
    `,
    headerTime: css`
      font-size: 16px;
      color: ${token.colorTextSecondary};
      letter-spacing: 1px;
      font-variant-numeric: tabular-nums;
    `,
    breadthItem: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.4;
    `,
    breadthLabel: css`
      font-size: 11px;
      color: ${token.colorTextTertiary};
    `,
    breadthValueUp: css`
      font-size: 18px;
      font-weight: 700;
      color: ${upColor};
      font-variant-numeric: tabular-nums;
    `,
    breadthValueDown: css`
      font-size: 18px;
      font-weight: 700;
      color: ${downColor};
      font-variant-numeric: tabular-nums;
    `,
    breadthValueFlat: css`
      font-size: 18px;
      font-weight: 700;
      color: ${token.colorTextSecondary};
      font-variant-numeric: tabular-nums;
    `,
    statCard: css`
      background: ${token.colorBgElevated};
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      padding: 16px 20px;
      transition: all 0.3s;
      &:hover {
        border-color: ${token.colorPrimaryBorder};
        box-shadow: 0 2px 8px ${token.colorPrimaryBg};
      }
    `,
    chartCard: css`
      background: ${token.colorBgElevated};
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `,
    chartTitle: css`
      font-size: 15px;
      font-weight: 600;
      color: ${token.colorText};
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    `,
    sectionTitle: css`
      font-size: 15px;
      font-weight: 600;
      color: ${token.colorText};
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    `,
    tableWrapper: css`
      .ant-table {
        background: transparent !important;
      }
      .ant-table-thead > tr > th {
        background: ${token.colorFillAlter} !important;
        color: ${token.colorTextSecondary} !important;
        border-bottom: 1px solid ${token.colorBorderSecondary} !important;
        font-size: 13px;
      }
      .ant-table-tbody > tr > td {
        background: transparent !important;
        color: ${token.colorText} !important;
        border-bottom: 1px solid ${token.colorBorderSecondary} !important;
        font-size: 13px;
      }
      .ant-table-tbody > tr:hover > td {
        background: ${token.colorFillQuaternary} !important;
      }
    `,
    ticker: css`
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      color: ${token.colorTextTertiary};
      font-size: 13px;
    `,
    newsFade: css`
      display: inline-block;
      animation: fadeIn 0.5s ease;
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    // 涨跌色辅助
    textUp: css`
      color: ${upColor};
      font-variant-numeric: tabular-nums;
    `,
    textDown: css`
      color: ${downColor};
      font-variant-numeric: tabular-nums;
    `,
  }
})

// 兼容旧代码 — 导出一个包含 upColor/downColor 的 hook
export function useUpDownColors() {
  return getUpDownColors({})
}
