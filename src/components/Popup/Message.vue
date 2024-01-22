<template>
  <Window
    v-if="currentMessage"
    ref="windowDom"
    @close="closeWindow('message')"
  >
    <template #header>
      <div
        class="user"
        @click="onAvatarClick()"
      >
        <template v-if="typeof currentMessage.user === 'number'">
          <Avatar :src="character.game[currentMessage.user].avatar" />
          <div class="name">
            <span>{{ character.game[currentMessage.user].name }}</span>
            <Level :level="character.game[currentMessage.user].level" /></div
        ></template>
        <template v-else>
          <Avatar :src="currentMessage.user.avatar" />
          <div class="name">
            <span>{{ currentMessage.user.name }}</span>
            <Level :level="currentMessage.user.level" />
          </div>
        </template>
      </div>
    </template>
    <div
      class="image"
      @click="onImageClick"
    >
      <img
        v-if="currentMessage.image"
        :src="currentMessage.image"
        alt=""
      />
      <img
        v-else
        src="@/assets/images/empty.webp"
        alt=""
      />
    </div>
    <div
      class="message"
      ref="messageDom"
    >
      <div
        class="title"
        contenteditable
        @keydown.enter.prevent.stop="blur"
        @keydown.escape.prevent.stop="[(reset = true), blur($event)]"
        @focus="reset = false"
        @blur="update($event, 'title', '无标题')"
      >
        {{ currentMessage.title }}
      </div>
      <div
        class="text"
        contenteditable
        @keydown.enter.prevent.stop="blur"
        @keydown.escape.prevent.stop="[(reset = true), blur($event)]"
        @focus="reset = false"
        @blur="update($event, 'text', '暂无内容')"
      >
        {{ currentMessage.text }}
      </div>
      <div v-if="currentMessage.comments.length > 0">
        <div
          class="comment"
          v-for="(comment, index) in currentMessage.comments"
          :key="index"
        >
          <template v-if="typeof comment.user === 'number'">
            <Avatar
              class="comment-avatar"
              :src="character.game[comment.user].avatar"
              @click.stop="openWindow('select', index)"
            />
          </template>
          <template v-else>
            <Avatar
              class="comment-avatar"
              :src="comment.user.avatar"
              @click.stop="openWindow('select', index)"
            />
          </template>
          <div class="comment-content">
            <div
              class="comment-name"
              @click.stop="openWindow('select', index)"
            >
              <span>
                {{ checkOwner(comment.user) }}
                <template v-if="typeof comment.user === 'number'">
                  {{ character.game[comment.user].name }}
                </template>
                <template v-else>
                  {{ comment.user.name }}
                </template>
              </span>
              <div class="floor">{{ index + 1 }}F</div>
            </div>
            <div
              class="comment-text"
              contenteditable
              @keydown.enter.prevent.stop="blur"
              @keydown.escape.prevent.stop="[(reset = true), blur($event)]"
              @focus="reset = false"
              @blur="updateComment($event, index)"
            >
              {{ comment.text }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="empty-comment"
        v-else
      >
        暂时没有人回复楼主···
      </div>
    </div>
    <template #footer>
      <form
        class="input"
        :class="{ show: input.commentText.length > 0 }"
        @submit.prevent="sendComment"
      >
        <Avatar
          class="input-avatar"
          :src="input.commentUser?.avatar"
          @click.stop="onAvatarClick(-1)"
        />
        <input
          type="text"
          v-model="input.commentText"
          @keydown.esc.stop="blur"
        />
        <button
          :disabled="input.commentText.length === 0"
          class="btn"
          :class="{ disabled: input.commentText.length === 0 }"
          type="submit"
        >
          回复
        </button>
      </form>
    </template>
  </Window>
</template>

<script lang="ts" setup>
import Window from '../Common/Window.vue'
import Avatar from '../Common/Avatar.vue'
import Level from '../Common/Level.vue'
import { currentMessage } from '@/store/message'
import { setting, input } from '@/store/setting'
import { closeWindow, openWindow } from '@/assets/scripts/popup'
import { nextTick, ref } from 'vue'
import { character } from '@/store/character'

const checkOwner = (user: number | Character) => {
  if (!currentMessage.value) return

  if (typeof currentMessage.value.user === 'number') {
    if (currentMessage.value.user === 0) return

    if (typeof user === 'number') {
      if (user === currentMessage.value.user) return '[楼主]'
    } else {
      if (user.id === character.game[currentMessage.value.user].id) return '[楼主]'
    }
  } else {
    if (currentMessage.value.user.id === 0) return

    if (typeof user === 'number') {
      if (character.game[user].id === currentMessage.value.user.id) return '[楼主]'
    } else {
      if (user.id === currentMessage.value.user.id) return '[楼主]'
    }
  }
}

let reset = false
const blur = (e: KeyboardEvent) => {
  ;(e.target as HTMLElement).blur()
}

const update = (e: Event, key: 'title' | 'text', defaultText = '空') => {
  if (!currentMessage.value) return
  const target = e.target as HTMLElement

  if (reset) {
    target.innerText = currentMessage.value[key]
    return
  }

  if (target.innerText === currentMessage.value[key]) return

  currentMessage.value[key] = target.innerText = target.innerText || defaultText
}

const updateComment = (e: Event, key: number, defaultText = '空') => {
  if (!currentMessage.value) return
  const target = e.target as HTMLElement

  if (reset) {
    target.innerText = currentMessage.value.comments[key].text
    return
  }

  if (target.innerText === currentMessage.value.comments[key].text) return

  currentMessage.value.comments[key].text = target.innerText = target.innerText || defaultText
}

const onImageClick = () => {
  openWindow('cropper').then(({ base64 }) => {
    if (currentMessage.value) {
      currentMessage.value.image = base64
    }
  })
}

const onAvatarClick = (id?: number) => {
  setting.selectID = id
  openWindow('select')
}

const windowDom = ref<InstanceType<typeof Window>>()
const messageDom = ref<HTMLElement | null>(null)
const sendComment = () => {
  if (!currentMessage.value || input.commentText.length === 0) return

  currentMessage.value.comments.push({
    user: input.commentUser,
    text: input.commentText || '空'
  })
  currentMessage.value.time = Date.now()
  input.commentText = ''

  nextTick(() => {
    if (
      windowDom?.value?.contentDom &&
      windowDom.value.contentDom.scrollHeight > windowDom.value.contentDom.offsetHeight
    ) {
      windowDom.value.contentDom.scrollTo({
        top: windowDom.value.contentDom.scrollHeight,
        behavior: 'smooth'
      })
    } else if (messageDom.value && messageDom.value.scrollHeight > messageDom.value.offsetHeight) {
      messageDom.value.scrollTo({
        top: messageDom.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  })
}
</script>

<style lang="stylus" scoped>
show()
  opacity 1
  transform translateY(0)

.window
  &:hover
    .input
      show()

.user
  display flex
  align-items center
  user-select none
  cursor pointer

  .name
    display flex
    flex-direction column
    margin-left 10px

    span
      color #a1a0a1
      font-size 18px
      height 20px

    .level
      margin-right auto

.image
  overflow hidden
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  height 100%
  width 30%
  border-radius 20px
  border 3px solid rgba(100, 100, 100, 0.5)
  cursor pointer

  img
    display block
    width 100%
    height 100%
    object-fit contain

.message
  display flex
  flex-direction column
  overflow-x hidden
  overflow-y scroll
  flex 1
  box-sizing border-box
  width 100%
  padding 20px 10px 20px 30px
  margin-left 20px
  border-radius 20px
  background #000

  .title
    margin-bottom 10px
    color #fff
    width 100%
    word-break break-all

  .text
    color #b2b0b3
    margin-bottom 30px

  .comment
    display flex
    margin-top 5px

    &:last-child
      margin-bottom 25px

    .comment-avatar
      width 42px
      height 42px
      cursor pointer

    .comment-content
      flex 1
      margin 0 10px
      padding-bottom 10px
      border-bottom 4px solid #1e1c1f

      .comment-name
        display flex
        align-items center
        justify-content space-between
        margin-bottom 5px

        span
          color #fff
          cursor pointer

      .floor
        display flex
        justify-content center
        align-items center
        height 20px
        padding 0 12px 0 10px
        color #000
        font-family none
        font-size 14px
        font-weight bold
        background-color #615f62
        border-radius 0 10px 10px 10px
        user-select none

      .comment-text
        color #959295

  .empty-comment
    text-align right
    padding-top 10px
    margin-top auto
    color #666
    transform translateY(30%)

.input
  box-sizing border-box
  position absolute
  right 20px
  bottom 20px
  display flex
  justify-content center
  align-items center
  height 40px
  width calc(70% - 82.5px)
  border 4px solid #313131
  border-radius 20px
  background-color #000
  font-size 16px
  opacity 0
  transform translateY(50%)
  transition transform 0.15s linear, opacity 0.2s

  .input-avatar
    position absolute
    left -12px
    cursor pointer

  input
    box-sizing border-box
    flex 1
    color #fff
    outline none
    border none
    width 100px
    height 100%
    padding 0 10px 0 50px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    background-color transparent

  .btn
    flex-shrink 0
    display flex
    justify-content center
    align-items center
    width 70px
    height 100%
    padding 0 10px
    margin 0
    border none
    outline none
    border-radius 20px
    color #fff
    text-align center
    background-color transparent
    user-select none
    cursor pointer

    &:hover
      color #000
      background-color #a3c101

  &:hover, &:focus-within
    show()

.show
  show()

.disabled
  color #666 !important
  cursor default !important

  &:hover
    color #666 !important
    background-color transparent !important

@media screen and (max-width 700px) and (max-aspect-ratio 1 / 1)
  :deep(.content)
    margin-bottom 40px

  .image
    flex-shrink 0
    width 100%
    height auto
    max-height 110vw

  .message
    overflow unset
    flex 1 0 0%
    width 100%
    margin-top 20px
    margin-left unset

    .comment
      &:last-child
        margin-bottom 0

  .input
    left 0
    bottom 0
    width 100%
    opacity 1
    transform translateY(0)
    border-radius 10px
    border 4px solid #000

    .input-avatar
      left 15px

    input
      padding-left 75px
</style>
