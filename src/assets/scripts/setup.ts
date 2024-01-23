import { IndexedDB } from './indexedDB'
import { urlToBase64 } from './image'
import { message } from '@/store/message'
import { character } from '@/store/character'
import { setting } from '@/store/setting'

new IndexedDB('zzz-interknot', '绳网')
  .add({ data: message, key: 'list', name: 'message' })
  .add({ data: character, key: 'custom', name: 'character' })
  .save()
  .finally(() => {
    setting.loading = false
  })

// 预加载头像
for (const i in character.game) {
  urlToBase64(character.game[i].avatar).then((res) => {
    character.game[i].avatar = res
  })
}
