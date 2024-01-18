<template>
  <Window
    v-if="currentMessage"
    @close="setting.messageID = undefined"
  >
    <template #header>
      <div class="user">
        <Avatar :src="currentMessage.user.avatar" />
        <div class="name">
          <span>{{ currentMessage.user.name }}</span>
          <div></div>
        </div>
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
    <div class="message">
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
          <Avatar
            class="comment-avatar"
            :src="comment.user.avatar"
          />
          <div class="comment-content">
            <div class="comment-name">
              <span> {{ comment.user.name }} </span>
              <div class="floor">{{ index + 1 }}F</div>
            </div>
            <div class="comment-text">{{ comment.text }}</div>
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
        @submit.prevent="test"
      >
        <input type="text" />
        <button
          class="btn"
          type="submit"
        >
          回复
        </button>
      </form>
    </template>
  </Window>
</template>

<script lang="ts" setup>
import Avatar from './Common/Avatar.vue'
import { currentMessage } from '@/store/message'
import { setting } from '@/store/setting'
import { compressImage } from '@/assets/scripts/image'
import Window from './Common/Window.vue'

let reset = false
const blur = (e: KeyboardEvent) => {
  ;(e.target as HTMLElement).blur()
}

const update = (e: Event, key: 'title' | 'text', defaultText = '空') => {
  if (!currentMessage.value) return

  if (reset) {
    ;(e.target as HTMLElement).innerText = currentMessage.value[key]
    return
  }

  if ((e.target as HTMLElement).innerText === currentMessage.value[key]) return

  currentMessage.value[key] = (e.target as HTMLElement).innerText =
    (e.target as HTMLElement).innerText || defaultText
}

const onImageClick = () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = 'image/*'
  el.onchange = async () => {
    if (el.files?.[0] && currentMessage.value) {
      currentMessage.value.image = await compressImage(el.files[0])
    }
  }
  el.click()
}

const test = () => {
  console.log(1)
}
</script>

<style lang="stylus" scoped>
.window
  &:hover
    .input
      opacity 1
      transform translateY(0)

.user
  display flex
  align-items center

  .name
    display flex
    flex-direction column
    margin-left 10px

    span
      color #a1a0a1
      font-size 18px
      height 20px

    div
      height 15px
      width 40px
      margin-top 3px
      background-color #666
      border-radius 10px

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
    flex 1
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
  overflow hidden
  box-sizing border-box
  position absolute
  right 21px
  bottom 25px
  display flex
  justify-content center
  align-items center
  height 40px
  width calc(70% - 50px)
  border 4px solid #313131
  border-radius 20px
  background-color #000
  font-size 16px
  opacity 0
  transform translateY(50%)
  transition 0.15s linear

  input
    box-sizing border-box
    flex 1
    color #fff
    outline none
    border none
    width 100px
    height 100%
    padding 0 10px 0 20px
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
    opacity 1
    transform translateY(0)

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
</style>
