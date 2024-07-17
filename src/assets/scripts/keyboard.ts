import { setting } from '@/store/setting'
import { popupManager } from './popup'

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    case 'Enter':
      popupManager.currentComponentConfirm()
      return
    case 'Escape':
      popupManager.closeCurrentComponent()
      return
  }
})
