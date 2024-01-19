import { reactive } from 'vue'

export const setting = reactive<{
  messageID?: number
  userID?: number
  selectID?: number
}>({
  messageID: undefined,
  userID: undefined,
  selectID: undefined
})
