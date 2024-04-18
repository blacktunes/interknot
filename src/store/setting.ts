import { character } from './character'

export const setting = reactive<{
  loading: boolean
  userID: number
  messageID?: number
  selectID?: number
}>({
  loading: true,
  userID: 1
})

export const input = reactive<{
  commentText: string
  commentUser: Character
}>({
  commentText: '',
  commentUser: character.game[0]
})
