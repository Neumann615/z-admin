import { createStyles } from 'antd-style'
import { useEffect, useRef, useState } from 'react'
import { useTopBarStore } from '../../store/topBar'
import { TabBar } from '../TabBar/TabBar'
import { Toolbar } from '../Toolbar/Toolbar'

const useStyles = createStyles(({ token }) => ({
  header: {
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
  },
  // 粘性顶部：随滚动吸附，向下滚动收起、向上滚动展开
  headerSticky: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: token.boxShadowTertiary,
    transition: 'transform 0.3s ease',
  },
  headerStickyHidden: {
    transform: 'translateY(-100%)',
  },
}))

export function Header() {
  const topBarStore = useTopBarStore()
  const { styles, cx } = useStyles()
  const headerRef = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(false)
  const isSticky = topBarStore.position === 'sticky'

  // sticky 模式：监听滚动容器，向下滚动收起、向上滚动展开
  useEffect(() => {
    if (!isSticky) {
      setIsHidden(false)
      return
    }
    // 向上查找最近的滚动容器
    let scroller = headerRef.current?.parentElement ?? null
    while (scroller && scroller.scrollHeight <= scroller.clientHeight + 1) {
      scroller = scroller.parentElement
    }
    if (!scroller)
      return
    let lastScrollTop = scroller.scrollTop
    const onScroll = () => {
      const scrollTop = scroller.scrollTop
      if (scrollTop <= 0) {
        setIsHidden(false)
      }
      else if (scrollTop > lastScrollTop) {
        setIsHidden(true)
      }
      else if (scrollTop < lastScrollTop) {
        setIsHidden(false)
      }
      lastScrollTop = scrollTop
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [isSticky])

  return (
    <div
      ref={headerRef}
      className={cx(
        styles.header,
        isSticky && styles.headerSticky,
        isSticky && isHidden && styles.headerStickyHidden,
      )}
    >
      {topBarStore.order.map((item: string, index: number) => {
        if (item === 'TabBar') {
          return <TabBar key={index} />
        }
        else if (item === 'Toolbar') {
          return <Toolbar key={index} />
        }
        return null
      })}
    </div>
  )
}
