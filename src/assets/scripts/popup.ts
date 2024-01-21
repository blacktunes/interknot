import CharacterSelectVue from '@/components/Popup/CharacterSelect.vue'
import ImageCropperVue from '@/components/Popup/ImageCropper.vue'
import MessageVue from '@/components/Popup/Message.vue'
import { markRaw, ref, type Component } from 'vue'
import { setting } from '../../store/setting'

const components = {
  message: MessageVue,
  select: CharacterSelectVue,
  cropper: ImageCropperVue
}

const componentCallback = {
  message: (id?: number) => {
    setting.messageID = id
  },
  select: (id?: number) => {
    setting.selectID = id
  }
}

let i: keyof typeof components
for (i in components) {
  components[i] = markRaw(components[i])
}

export const popupComponents = ref<Map<string, Component>>(new Map())

type ComponentKeys = keyof typeof components
type CallbackKeys = keyof typeof componentCallback
type ArgsType<T> = T extends CallbackKeys ? Parameters<(typeof componentCallback)[T]> : []

export const openWindow = <T extends ComponentKeys>(key: T, ...args: ArgsType<T>) => {
  if (key in componentCallback) {
    ;(componentCallback[key as CallbackKeys] as (...args: any[]) => void)(...args)
  }
  popupComponents.value.set(key, components[key])
}

export const closeWindow = <T extends ComponentKeys>(key: T, ...args: ArgsType<T>) => {
  popupComponents.value.delete(key)
  if (key in componentCallback) {
    ;(componentCallback[key as CallbackKeys] as (...args: any[]) => void)(...args)
  }
}
