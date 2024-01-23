import CharacterSelectVue from '@/components/Popup/CharacterSelect.vue'
import CropperVue from '@/components/Popup/Cropper/Cropper.vue'
import MessageVue from '@/components/Popup/Message.vue'
import { cropperOpen, cropperClose } from '@/components/Popup/Cropper/cropper'
import { setting } from '../../store/setting'
import { imageCompress } from './images'
import { computed, markRaw, ref, reactive, type Component, type ComputedRef } from 'vue'

const components = {
  message: MessageVue,
  select: CharacterSelectVue,
  cropper: CropperVue
}

const callbacks = {
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
              base64: await cropperOpen(
                await imageCompress(el.files[0], config?.maxWidth),
                config?.aspectRatio
              ),
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
    cropper: cropperClose
  },
  enter: {}
}

/*------------------------------------------------------------*/
type ComponentKeys = keyof typeof components

export const popupComponents: Record<
  string,
  {
    compontnt: Component
    index: ComputedRef<number>
  }
> = reactive({})
// 正在显示的组件
export const popup = ref<Set<ComponentKeys>>(new Set())
const _popup = computed(() => Array.from(popup.value))
// 最后打开的组件
export const currentComponent = computed<ComponentKeys | undefined>(
  () => _popup.value[_popup.value.length - 1]
)
// 组件的确认事件
export const enterCallback: Partial<Record<ComponentKeys, () => boolean | Promise<boolean>>> =
  callbacks.enter

let i: ComponentKeys
for (i in components) {
  const key = i
  popupComponents[i] = {
    compontnt: markRaw(components[i]),
    index: computed(() => {
      return _popup.value.indexOf(key)
    })
  }
}

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
  popup.value.add(key)
  let res
  if (key in callbacks.open) {
    res = await (callbacks.open[key as Open.keys] as (...args: any[]) => any)(...args)
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
  popup.value.delete(key)
  let res
  if (key in callbacks.close) {
    res = await (callbacks.close[key as Close.keys] as (...args: any[]) => any)(...args)
  }
  return res
}
