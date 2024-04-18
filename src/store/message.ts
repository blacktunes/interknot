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

watch(
  () => setting.messageID,
  () => {
    if (currentMessage.value) {
      currentMessage.value.view += 1
    }
  }
)

export const message = reactive<{
  list: Message[]
}>({
  list: [
    {
      id: 1,
      user: 1,
      view: 0,
      title: '[绳网]使用说明',
      text: '其实没啥好介绍的，总之这是内容，可以修改',
      time: 1,
      comments: [
        {
          user: 1,
          text: '然后这是回复，也可以修改'
        },
        {
          user: 1,
          text: '点击头像或昵称可以更换账号'
        },
        {
          user: 1,
          text: '点击左边的图片可以重新上传图片'
        }
      ]
    }
  ]
})
