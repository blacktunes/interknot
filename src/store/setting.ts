import { reactive } from 'vue'
import { character } from './character'

export const setting = reactive<{
  messageID?: number
  userID?: number
  selectID?: number
}>({
  messageID: undefined,
  userID: undefined,
  selectID: undefined
})

export const input = reactive<{
  commentText: string
  commentUser: Character
}>({
  commentText: '',
  commentUser: character.game[0]
})
