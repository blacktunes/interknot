import { setting } from '@/store/setting'
import { closeCurrentComponent, currentComponentCallback } from './popup'

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    case 'Enter':
      currentComponentCallback()
      return
    case 'Escape':
      closeCurrentComponent()
      return
  }
})
