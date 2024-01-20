import { IndexedDB } from './indexedDB'
import { urlToBase64 } from './image'
import { message } from '@/store/message'
import { character } from '@/store/character'

new IndexedDB('zzz-interknot', '绳网').add(message, 'list').add(character, 'custom').save()

// 预加载头像
for (const i in character.game) {
  urlToBase64(character.game[i].avatar).then((res) => {
    character.game[i].avatar = res
  })
}