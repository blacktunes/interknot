import CharacterSelectVue from '@/components/Popup/CharacterSelect.vue'
import ImageCropperVue from '@/components/Popup/ImageCropper.vue'
import MessageVue from '@/components/Popup/Message.vue'
import { cropperClose, cropperOpen } from '@/store/cropper'
import { computed, markRaw, ref, type Component } from 'vue'
import { setting } from '../../store/setting'
import { imageCompress } from './image'

const components = {
  message: MessageVue,
  select: CharacterSelectVue,
  cropper: ImageCropperVue
}
type ComponentKeys = keyof typeof components

type Callbacks = Partial<Record<ComponentKeys, (...args: any[]) => any>>

const callbacks: {
  open: Callbacks
  close: Callbacks
  enter: Partial<Record<ComponentKeys, () => Promise<boolean>>>
} = {
  open: {
    message: (id?: number) => {
      setting.messageID = id
    },
    select: (id?: number) => {
      setting.selectID = id
    },
    cropper: (config?: { aspectRatio?: number; maxWidth?: number }) => {
      return new Promise<{ base64: string; raw: File }>((resolve) => {
        const el = document.createElement('input')
        el.type = 'file'
        el.accept = 'image/*'
        el.onchange = async () => {
          if (el.files?.[0]) {
            resolve({
              base64: await cropperOpen(await imageCompress(el.files[0]), config),
              raw: el.files[0]
            })
          }
        }
        el.click()
      })
    }
  },
  close: {
    message: () => {
      setting.messageID = undefined
    },
    select: () => {
      setting.selectID = undefined
    },
    cropper: () => {
      cropperClose()
    }
  },
  enter: {}
}

export const enterCallback = callbacks.enter

/*------------------------------------------------------------*/

let i: ComponentKeys
for (i in components) {
  components[i] = markRaw(components[i])
}

export const popupComponents = ref<Map<string, Component>>(new Map())

export const currentComponent = computed(
  () => Array.from(popupComponents.value.keys()).pop() as ComponentKeys | undefined
)

namespace Open {
  export type type = Required<typeof callbacks.open>
  export type keys = keyof Open.type
  export type args<T> = T extends Open.keys ? Parameters<Open.type[T]> : []
  export type result<T> = T extends Open.keys
    ? {
        [K in Open.keys]: Unpacked<ReturnType<Open.type[K]>>
      }[T]
    : void
}
export const openWindow = async <T extends ComponentKeys>(
  key: T,
  ...args: Open.args<T>
): Promise<Open.result<T>> => {
  popupComponents.value.set(key, components[key])
  let res
  if (key in callbacks.open) {
    res = await callbacks.open[key]?.(...args)
  }
  return res
}

namespace Close {
  export type type = Required<typeof callbacks.close>
  export type keys = keyof Close.type
  export type args<T> = T extends Close.keys ? Parameters<Close.type[T]> : []
  export type result<T> = T extends Close.keys
    ? {
        [K in Close.keys]: Unpacked<ReturnType<Close.type[K]>>
      }[T]
    : void
}
export const closeWindow = async <T extends ComponentKeys>(
  key: T,
  ...args: Close.args<T>
): Promise<Close.result<T>> => {
  popupComponents.value.delete(key)
  let res
  if (key in callbacks.close) {
    res = await callbacks.close[key]?.(...args)
  }
  return res
}
