import MessageVue from '@/components/Message.vue'
import CharacterSelectVue from '@/components/CharacterSelect.vue'
import { ref, type Component, markRaw } from 'vue'
import { setting } from './setting'

const components = {
  message: MessageVue,
  select: CharacterSelectVue
}

let i: keyof typeof components
for (i in components) {
  components[i] = markRaw(components[i])
}

export const popupComponents = ref<Map<string, Component>>(new Map())

export const openWindow = (key: keyof typeof components, id?: number) => {
  setting[`${key}ID`] = id
  popupComponents.value.set(key, components[key])
}

export const closeWindow = (key: keyof typeof components) => {
  popupComponents.value.delete(key)
  setting[`${key}ID`] = undefined
}
