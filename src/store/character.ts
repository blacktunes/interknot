import { computed, reactive } from 'vue'
import { setting } from './setting'

const getAvatar = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const defaultAvatar = computed(() => character.game[0].avatar)

export const character = reactive<{
  game: Character[]
  custom: Character[]
}>({
  game: [
    {
      id: 1,
      name: '匿名',
      avatar: getAvatar('avatar.webp')
    }
  ],
  custom: []
})

export const user = computed(() => {
  const userItem =
    character.game.find((item) => item.id === setting.userID) ||
    character.custom.find((item) => item.id === setting.userID)
  if (!userItem) {
    setting.userID = 1
    return character.game[0]
  }
  return userItem
})
