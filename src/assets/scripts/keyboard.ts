import { setting } from '@/store/setting'
import { closeCurrentWindow, currentCallback } from './popup'

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    case 'Enter':
      currentCallback()
      return
    case 'Escape':
      closeCurrentWindow()
      return
  }
})
