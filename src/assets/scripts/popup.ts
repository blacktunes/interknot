import CharacterSelectVue from '@/components/Popup/CharacterSelect.vue'
import { cropper } from '@/components/Popup/Cropper'
import MessageVue from '@/components/Popup/Message.vue'
import { createPopupManager } from 'star-rail-vue'
import { input, setting } from '../../store/setting'

export const popupManager = createPopupManager({
  message: {
    component: MessageVue,
    open: (id?: number) => {
      setting.messageID = id
    },
    close: () => {
      setting.messageID = undefined
      input.commentText = ''
    }
  },
  select: {
    component: CharacterSelectVue,
    open: (id?: number) => {
      setting.selectID = id
    },
    close: () => {
      setting.selectID = undefined
    }
  },
  cropper
})
