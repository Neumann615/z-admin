import { create } from 'zustand'
import defaultSetting from '../defaultSetting'
import { useUserStore } from './user'

/* 水印配置 */
interface WatermarkState {
  /* 水印文案（数组每一项为一行） */
  content: string[]
  /* 水印字号 */
  fontSize: number
  /* 水印颜色（可选）：不配置时自动跟随主题 colorText */
  color?: string
  /* 水印宽度 */
  width: number
  /* 水印高度 */
  height: number
  /* 旋转角度 */
  rotate: number
  /* 水印间距 [水平, 垂直] */
  gap: [number, number]
  /* 水印层级 */
  zIndex: number
}

export const useWatermarkStore = create<WatermarkState>(() => ({
  content: [defaultSetting.app.name],
  fontSize: 18,
  width: 160,
  height: 100,
  rotate: -30,
  gap: [100, 60],
  zIndex: 9,
}))

// 登录后自动将当前用户名追加到水印文案（用户信息为异步获取，需订阅响应式更新）
useUserStore.subscribe((state, prevState) => {
  const userName = state.userInfo.nickName || state.userInfo.username
  const prevUserName = prevState.userInfo.nickName || prevState.userInfo.username
  if (userName === prevUserName)
    return
  const baseContent = [defaultSetting.app.name]
  useWatermarkStore.setState({
    content: userName ? [...baseContent, userName] : baseContent,
  })
})