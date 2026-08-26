import { useEffect } from 'react'
import { usePageStore } from '../store/page'
import { useTopBarStore } from '../store/topBar'
import { useControlTab } from './useControlTab'

// 判断事件目标是否为可输入元素，避免在输入框中误触发快捷键
function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement))
    return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

export function useGlobalShortcuts() {
  const { openTab, closeTab, fixedTab } = useControlTab()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { setSearchModalOpen, setSystemInfoModalOpen, tabs, nowTab }
        = useTopBarStore.getState()

      // Ctrl/Cmd + K：唤起导航搜索（输入框聚焦时也生效）
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchModalOpen(true)
        return
      }

      // Ctrl/Cmd + I：查看系统信息
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault()
        setSystemInfoModalOpen(true)
        return
      }

      // 其余 Alt 组合键在输入框中不响应
      if (isEditableTarget(e.target))
        return

      if (!e.altKey)
        return

      const currentIndex = tabs.findIndex((tab: any) => tab.tabId === nowTab.tabId)

      switch (e.key) {
        // Alt + ← / →：切换到上一个 / 下一个标签页（循环）
        case 'ArrowLeft': {
          e.preventDefault()
          if (tabs.length > 1) {
            const prev = tabs[(currentIndex - 1 + tabs.length) % tabs.length]
            if (prev?.menuData)
              openTab(prev.menuData)
          }
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          if (tabs.length > 1) {
            const next = tabs[(currentIndex + 1) % tabs.length]
            if (next?.menuData)
              openTab(next.menuData)
          }
          break
        }
        // Alt + ↑ / ↓：最大化 / 退出最大化
        case 'ArrowUp': {
          e.preventDefault()
          usePageStore.getState().enterMaximize()
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          usePageStore.getState().exitMaximize()
          break
        }
        // Alt + W：关闭当前标签页（与 TabBar 关闭按钮行为一致：固定标签先取消固定，仅剩一个时不关闭）
        case 'w':
        case 'W': {
          e.preventDefault()
          const current = tabs[currentIndex]
          if (!current || tabs.length <= 1)
            break
          if (current.isFixed)
            fixedTab(current.tabId)
          else
            closeTab(current.tabId)
          break
        }
        // Alt + 1-9：切换到第 n 个标签页；Alt + 0：切换到最后一个标签页
        default: {
          if (/^[0-9]$/.test(e.key)) {
            e.preventDefault()
            const targetIndex
              = e.key === '0' ? tabs.length - 1 : Number(e.key) - 1
            const target = tabs[targetIndex]
            if (target?.menuData)
              openTab(target.menuData)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openTab, closeTab, fixedTab])
}
