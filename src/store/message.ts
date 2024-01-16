import { computed, reactive } from 'vue'
import { setting } from './setting'

export const getMessageIndex = (id: number) => {
  return message.list.findIndex((item) => id === item.id)
}

export const currentMessage = computed(() => {
  if (setting.id === undefined) return undefined

  const index = getMessageIndex(setting.id)
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
      id: 1700816535616,
      user: {
        id: 1,
        name: '这是测试角色',
        avatar:
          'https://ts1.cn.mm.bing.net/th?id=OSK.5cd4345f332791306f4a1549a1f5e461&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM'
      },
      image:
        'https://patchwiki.biligame.com/images/zzz/thumb/8/82/k8yzxifp56twcq6fbux1c1ryyxs8rpn.jpg/750px-%E4%BA%BA%E7%89%A9%E6%B5%B7%E6%8A%A5-%E7%8C%AB%E5%AE%AB%E5%8F%88%E5%A5%88.jpg',
      title: '[测试]这是测试标题',
      text: '这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容这是测试内容',
      time: 1700816865344,
      comments: [
        {
          user: {
            id: 1,
            name: '这是测试角色',
            avatar:
              'https://ts1.cn.mm.bing.net/th?id=OSK.5cd4345f332791306f4a1549a1f5e461&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM'
          },
          text: '这是回复这是回复这是回复这是回复这是回复'
        },
        {
          user: {
            id: 1,
            name: '这是测试角色',
            avatar:
              'https://ts1.cn.mm.bing.net/th?id=OSK.5cd4345f332791306f4a1549a1f5e461&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM'
          },
          text: '这是回复这是回复这是回复这是回复这是回复'
        }
      ]
    }
  ]
})
