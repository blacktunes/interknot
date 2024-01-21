import { reactive } from 'vue'
import { character } from './character'

export const setting = reactive<{
  messageID?: number
  userID?: number
  selectID?: number
  loading: boolean
}>({
  messageID: undefined,
  userID: 1,
  selectID: undefined,
  loading: true
})

export const input = reactive<{
  commentText: string
  commentUser: Character
}>({
  commentText: '',
  commentUser: character.game[0]
})
