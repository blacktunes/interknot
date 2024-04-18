type Unpacked<T> = T extends Promise<infer U> ? U : T

interface MessageBase {
  user: number | Character
  text: string
}

type Message = MessageBase & {
  id: number
  title: string
  image?: string
  time: number
  view: number
  comments: MessageBase[]
}

interface Character {
  id: number
  name: string
  avatar: string
  level?: number
}
