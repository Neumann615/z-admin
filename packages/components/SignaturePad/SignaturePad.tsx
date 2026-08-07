import { App } from 'antd'
import { createStyles } from 'antd-style'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

export interface SignaturePadRef {
  /** 清空画布（重签） */
  clear: () => void
  /** 生成图片 dataURL，无签名时返回 null */
  getDataURL: (type?: string, quality?: number) => string | null
  /** 下载签名图片，无签名时返回 false */
  download: (fileName?: string, type?: string, quality?: number) => boolean
  /** 是否已有签名 */
  isEmpty: () => boolean
}

export interface SignaturePadProps {
  width?: number
  height?: number
  /** 画笔颜色，默认使用主题色 */
  penColor?: string
  /** 画布背景色，默认使用容器背景色 */
  backgroundColor?: string
  /** 画笔粗细 */
  penWidth?: number
  className?: string
  /** 签名变化回调 */
  onChange?: (isEmpty: boolean) => void
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    display: inline-flex;
    flex-direction: column;
    gap: ${token.paddingSM}px;
  `,
  canvasWrapper: css`
    position: relative;
    border: 1px dashed ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    overflow: hidden;
    background-color: ${token.colorBgContainer};
    box-shadow: ${token.boxShadowTertiary};
  `,
  canvas: css`
    display: block;
    cursor: crosshair;
    touch-action: none;
  `,
  placeholder: css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: ${token.colorTextQuaternary};
    font-size: ${token.fontSizeLG}px;
    user-select: none;
  `,
}))

interface Point { x: number, y: number }

// 将任意颜色字符串归一化为不透明 RGB，避免颜色带 alpha 时
// 多段笔迹在 round lineCap 重叠处出现 alpha 累加导致的颜色变深
const toOpaqueColor = (() => {
  let ctx: CanvasRenderingContext2D | null = null
  return (color: string): string => {
    if (!ctx)
      ctx = document.createElement('canvas').getContext('2d')
    if (!ctx)
      return color
    // 先重置再赋值，确保读到的是 color 的解析结果而非上次残留
    ctx.fillStyle = '#000'
    ctx.fillStyle = color
    const normalized: string = ctx.fillStyle
    // 形如 rgba(r, g, b, a) -> 提取前三位丢掉 alpha
    if (normalized.startsWith('rgba')) {
      const parts = normalized.match(/\d+(\.\d+)?/g) || []
      return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`
    }
    // 形如 #rrggbb 或 rgb(r, g, b) 已是不透明，原样返回
    return normalized
  }
})()

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>((
  {
    width = 520,
    height = 280,
    penColor,
    backgroundColor,
    penWidth = 3,
    className,
    onChange,
  },
  ref,
) => {
  const { styles, theme } = useStyles()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const lastPointRef = useRef<Point | null>(null)
  const lastMidRef = useRef<Point | null>(null)
  const hasSignatureRef = useRef(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const { message } = App.useApp()

  // 默认使用 colorTextBase（不透明基色，亮色 #000 / 暗色 #fff），比 colorText 更适合签名场景
  // 同时对外部传入的 penColor 做 alpha 去除，避免带透明度颜色在笔迹重叠处变深
  const resolvedPenColor = useMemo(
    () => toOpaqueColor(penColor || theme.colorTextBase),
    [penColor, theme.colorTextBase],
  )
  const resolvedBgColor = backgroundColor || theme.colorBgContainer

  // 初始化 / 重置画布（支持高 DPI）
  const resetCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    ctx.fillStyle = resolvedBgColor
    ctx.fillRect(0, 0, width, height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = resolvedPenColor
    ctx.lineWidth = penWidth
    hasSignatureRef.current = false
    setIsEmpty(true)
    onChange?.(true)
  }

  useEffect(() => {
    resetCanvas()
  }, [width, height, penColor, backgroundColor, penWidth])

  // 主题色变化时刷新背景（保留已有笔迹会导致颜色叠加，这里仅在空画布时安全刷新）
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || hasSignatureRef.current)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.fillStyle = resolvedBgColor
    ctx.fillRect(0, 0, width, height)
  }, [theme, resolvedBgColor, width, height])

  const getPoint = (e: PointerEvent | React.PointerEvent): Point => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top),
    }
  }

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    drawingRef.current = true
    lastPointRef.current = getPoint(e)
    lastMidRef.current = null
    // 画一个起始点（解决单击不显示的问题）
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && lastPointRef.current) {
      ctx.beginPath()
      ctx.arc(lastPointRef.current.x, lastPointRef.current.y, penWidth / 2, 0, Math.PI * 2)
      ctx.fillStyle = resolvedPenColor
      ctx.fill()
    }
    if (!hasSignatureRef.current) {
      hasSignatureRef.current = true
      setIsEmpty(false)
      onChange?.(false)
    }
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current)
      return
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    const current = getPoint(e)
    if (!ctx || !lastPointRef.current)
      return
    // 中点连续法：每段从前一个中点画到当前中点，控制点为上一原始采样点
    // 相邻段共享端点（中点），保证笔迹连续无空隙且曲线平滑
    const midX = (lastPointRef.current.x + current.x) / 2
    const midY = (lastPointRef.current.y + current.y) / 2
    ctx.beginPath()
    if (lastMidRef.current) {
      ctx.moveTo(lastMidRef.current.x, lastMidRef.current.y)
      ctx.quadraticCurveTo(lastPointRef.current.x, lastPointRef.current.y, midX, midY)
    }
    else {
      // 第一段：从起点直线到首个中点
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y)
      ctx.lineTo(midX, midY)
    }
    ctx.strokeStyle = resolvedPenColor
    ctx.lineWidth = penWidth
    ctx.stroke()
    lastMidRef.current = { x: midX, y: midY }
    lastPointRef.current = current
  }

  const endDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current)
      return
    e.preventDefault()
    // 补齐最后一段：从最后中点画到最后的原始采样点，避免末尾出现空隙
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && lastMidRef.current && lastPointRef.current) {
      ctx.beginPath()
      ctx.moveTo(lastMidRef.current.x, lastMidRef.current.y)
      ctx.lineTo(lastPointRef.current.x, lastPointRef.current.y)
      ctx.strokeStyle = resolvedPenColor
      ctx.lineWidth = penWidth
      ctx.stroke()
    }
    drawingRef.current = false
    lastPointRef.current = null
    lastMidRef.current = null
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId)
    }
    catch {
      // noop
    }
  }

  const clear = () => {
    resetCanvas()
  }

  const getDataURL = (type = 'image/png', quality?: number) => {
    const canvas = canvasRef.current
    if (!canvas || !hasSignatureRef.current)
      return null
    return canvas.toDataURL(type, quality)
  }

  const download = (fileName = 'signature.png', type = 'image/png', quality?: number) => {
    const dataURL = getDataURL(type, quality)
    if (!dataURL) {
      message.warning('请先完成签名')
      return false
    }
    const link = document.createElement('a')
    link.download = fileName
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return true
  }

  useImperativeHandle(ref, () => ({
    clear,
    getDataURL,
    download,
    isEmpty: () => !hasSignatureRef.current,
  }))

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <div className={styles.canvasWrapper} style={{ width, height }}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={endDraw}
          onPointerCancel={endDraw}
          onPointerLeave={endDraw}
        />
        {isEmpty && <div className={styles.placeholder}>请在此处签名</div>}
      </div>
    </div>
  )
})
