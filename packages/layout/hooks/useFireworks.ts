import { useCallback, useEffect, useRef } from 'react'
import { themeColorList } from '../utils/data'

// ---------- 默认颜色 ----------
const defaultColors = themeColorList

interface CardThrowConfig {
  count?: number
  colors?: string[]
  startX?: number
  startY?: number
  gravity?: number
  throwSpeed?: number
  spreadAngle?: number
  rotationSpeed?: { min: number, max: number }
  cardSize?: number
}

interface CardParticle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  alpha: number
  decay: number
  gravity: number
  size: number
  upDragX: number
  upDragY: number
  downDragX: number
  downDragY: number
  flutterFactor: number
  rotation: number
  rotationSpeed: number
  startY: number
}

function getDefaultConfig(): Required<CardThrowConfig> {
  return {
    count: 180,
    colors: defaultColors,
    startX: window.innerWidth / 2,
    startY: window.innerHeight * 0.4,
    gravity: 0.08,
    throwSpeed: 35,
    spreadAngle: Math.PI / 3.5,
    rotationSpeed: { min: 0.05, max: 0.15 },
    cardSize: 8,
  }
}

/* ---------- 高清 Canvas 创建 ---------- */
function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 9999;
  `
  return canvas
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')
  if (ctx)
    ctx.scale(dpr, dpr) // 使用逻辑坐标，清晰无模糊
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)]
}

/* ---------- Hook ---------- */
export function useFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const cardsRef = useRef<CardParticle[]>([])
  const isAnimatingRef = useRef(false)
  const resizeHandlerRef = useRef<(() => void) | null>(null)

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  // 创建卡片（伞状初速度）
  const createCard = useCallback((config: CardThrowConfig, originX: number, originY: number): CardParticle => {
    const speed = config.throwSpeed!
    const halfSpread = config.spreadAngle! / 2

    const angleOffset = random(-halfSpread, halfSpread)
    const vx = Math.sin(angleOffset) * speed
    const vy = -Math.cos(angleOffset) * speed

    const sizeVar = random(0.75, 1.25)
    const baseGravity = config.gravity!
    const gravityVar = random(0.7, 1.35)

    return {
      x: originX + random(-25, 25),
      y: originY + random(-12, 12),
      vx,
      vy,
      color: randomColor(config.colors!),
      alpha: 1,
      decay: random(0.0007, 0.0016),
      gravity: baseGravity * gravityVar,
      size: config.cardSize! * sizeVar,
      upDragX: 0.93 + random(-0.02, 0.02),
      upDragY: 0.90 + random(-0.02, 0.02),
      downDragX: 0.995 + random(-0.003, 0.003),
      downDragY: 0.986 + random(-0.005, 0.005),
      flutterFactor: random(0.7, 1.3),
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(config.rotationSpeed!.min, config.rotationSpeed!.max) * (Math.random() > 0.5 ? 1 : -1),
      startY: originY,
    }
  }, [])

  function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  const drawCard = useCallback((ctx: CanvasRenderingContext2D, p: CardParticle) => {
    ctx.save()
    ctx.translate(p.x, p.y)

    ctx.rotate(p.rotation * 0.3)

    const flipAngle = p.rotation * 2.5
    const flipFactor = Math.abs(Math.cos(flipAngle))
    const scaleX = 0.15 + flipFactor * 0.85
    ctx.scale(scaleX, 1)

    ctx.globalAlpha = p.alpha
    ctx.fillStyle = p.color
    ctx.shadowColor = p.color
    ctx.shadowBlur = 2

    const w = p.size * 1.8
    const h = p.size * 0.7
    drawRoundedRect(ctx, -w / 2, -h / 2, w, h, 2)
    ctx.fill()

    ctx.restore()
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      isAnimatingRef.current = false
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      isAnimatingRef.current = false
      return
    }

    clear()
    const dpr = window.devicePixelRatio || 1
    const logicalWidth = canvas.width / dpr
    const logicalHeight = canvas.height / dpr

    cardsRef.current = cardsRef.current.filter((card) => {
      card.rotation += card.rotationSpeed

      card.vy += card.gravity

      const flipAngle = card.rotation * 2.5
      const flipFactor = Math.abs(Math.cos(flipAngle))
      const tiltDir = Math.sin(flipAngle)

      if (card.vy < 0) {
        card.vx *= card.upDragX
        card.vy *= card.upDragY
        card.vx += tiltDir * flipFactor * 0.02 * card.flutterFactor
      }
      else {
        card.vx *= card.downDragX
        card.vy *= card.downDragY
        const flutterScale = (Math.abs(card.rotationSpeed) / 0.1) * card.flutterFactor
        card.vx += tiltDir * flipFactor * 0.12 * flutterScale
        card.vx += (Math.random() - 0.5) * 0.015 * card.flutterFactor
      }

      card.x += card.vx
      card.y += card.vy

      card.alpha -= card.decay

      const outOfScreen
        = card.x < -100
          || card.x > logicalWidth + 100
          || card.y > logicalHeight + 100

      if (card.alpha <= 0 || outOfScreen) {
        return false
      }

      drawCard(ctx, card)
      return true
    })

    if (cardsRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }
    else {
      isAnimatingRef.current = false
    }
  }, [clear, drawCard])

  const throwCards = useCallback((config: CardThrowConfig = {}) => {
    const defaultConfig = getDefaultConfig()
    const mergedConfig = { ...defaultConfig, ...config }

    if (!canvasRef.current) {
      const canvas = createCanvas()
      document.body.appendChild(canvas)
      resizeCanvas(canvas)
      canvasRef.current = canvas

      resizeHandlerRef.current = () => {
        if (canvasRef.current)
          resizeCanvas(canvasRef.current)
      }
      window.addEventListener('resize', resizeHandlerRef.current)
    }

    const startX = mergedConfig.startX ?? defaultConfig.startX
    const startY = mergedConfig.startY ?? defaultConfig.startY

    for (let i = 0; i < mergedConfig.count; i++) {
      cardsRef.current.push(createCard(mergedConfig, startX, startY))
    }

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true
      animate()
    }
  }, [createCard, animate])

  useEffect(() => {
    return () => {
      if (animationRef.current)
        cancelAnimationFrame(animationRef.current)
      if (resizeHandlerRef.current)
        window.removeEventListener('resize', resizeHandlerRef.current)
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current)
        canvasRef.current = null
      }
    }
  }, [])

  return { throwCards }
}