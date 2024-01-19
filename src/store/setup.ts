// import { IndexedDB } from '@/assets/scripts/indexedDB'
// import { message } from './message'
import { character } from './character'
import { urlToBase64 } from '@/assets/scripts/image'

// new IndexedDB('zzz-interknot', '绳网').add(message, 'list').save()

// 预加载头像
for (const i in character.game) {
  urlToBase64(character.game[i].avatar).then((res) => {
    character.game[i].avatar = res
  })
}
