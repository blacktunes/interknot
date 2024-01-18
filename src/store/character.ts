import { computed, reactive } from 'vue'
import { setting } from './setting'
import { urlToBase64 } from '@/assets/scripts/image'

const getAvatar = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const character = reactive<{
  game: Character[]
  custom: Character[]
}>({
  game: [
    {
      id: 1,
      name: '匿名',
      avatar: getAvatar('1.png')
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

const preload = async () => {
  for (const i in character.game) {
    urlToBase64(character.game[i].avatar).then((res) => {
      character.game[i].avatar = res
    })
  }
}
preload()
