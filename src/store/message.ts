import { computed, reactive } from 'vue'
import { setting } from './setting'

export const getMessageIndex = (id: number) => {
  return message.list.findIndex((item) => id === item.id)
}

export const currentMessage = computed(() => {
  if (setting.messageID === undefined) return undefined

  const index = getMessageIndex(setting.messageID)
  if (index !== -1) {
    return message.list[index]
  }
  return undefined
})

export const message = reactive<{
  list: Message[]
}>({
  list: [
    {
      id: 1,
      user: 0,
      image:
        'https://patchwiki.biligame.com/images/zzz/thumb/8/82/k8yzxifp56twcq6fbux1c1ryyxs8rpn.jpg/750px-%E4%BA%BA%E7%89%A9%E6%B5%B7%E6%8A%A5-%E7%8C%AB%E5%AE%AB%E5%8F%88%E5%A5%88.jpg',
      title: '[测试]这是测试标题',
      text: '这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容',
      time: 1,
      comments: [
        {
          user: 0,
          text: '这是回复这是回复这是回复这是回复这是回复'
        },
        {
          user: 0,
          text: '这是回复这是回复这是回复这是回复这是回复'
        },
        {
          user: 0,
          text: '这是回复这是回复这是回复这是回复这是回复'
        },
        {
          user: 0,
          text: '这是回复这是回复这是回复这是回复这是回复'
        },
        {
          user: 0,
          text: '这是回复这是回复这是回复这是回复这是回复'
        }
      ]
    }
  ]
})
