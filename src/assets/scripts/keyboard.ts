import { setting } from '@/store/setting'
import { closeWindow, enterCallback, currentComponent } from './popup'

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    case 'Enter':
      if (currentComponent.value === 'cropper') {
        enterCallback.cropper?.()
      }
      return
    case 'Escape':
      if (currentComponent.value) {
        closeWindow(currentComponent.value)
      }
      return
  }
})
