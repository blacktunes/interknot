<template>
  <Transition name="fade">
    <Window
      v-if="props.index !== -1 && currentMessage"
      :style="{ zIndex: 10 + index }"
      @close="close"
      ref="windowDom"
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
          @keydown.escape.prevent.stop="[(reset = true), blur($event)]"
          @focus="reset = false"
          @blur="update($event, 'text', '无内容')"
          v-dompurify-html="currentMessage.text"
        ></div>
        <div class="comment-list">
          <div
            class="comment"
            v-for="(comment, index) in currentMessage.comments"
            :key="index"
          >
            <template v-if="typeof comment.user === 'number'">
              <Avatar
                class="comment-avatar"
                :src="character.game[comment.user].avatar"
                @click.stop="onAvatarClick(index)"
              />
            </template>
            <template v-else>
              <Avatar
                class="comment-avatar"
                :src="comment.user.avatar"
                @click.stop="onAvatarClick(index)"
              />
            </template>
            <div class="comment-content">
              <div class="comment-name">
                <span @click.stop="onAvatarClick(index)">
                  {{ checkOwner(comment.user) }}
                  <template v-if="typeof comment.user === 'number'">
                    {{ character.game[comment.user].name }}
                  </template>
                  <template v-else>
                    {{ comment.user.name }}
                  </template>
                </span>
                <div
                  class="floor"
                  @click="dekComment(index)"
                >
                  <span>{{ index + 1 }}F</span>
                  <svg
                    class="del"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M328.777143 377.904762l31.719619 449.657905h310.662095l31.695238-449.657905h73.264762L744.106667 832.707048a73.142857 73.142857 0 0 1-72.94781 67.998476H360.496762a73.142857 73.142857 0 0 1-72.94781-68.022857L255.488 377.904762h73.289143z m159.207619 22.649905v341.333333h-73.142857v-341.333333h73.142857z m133.729524 0v341.333333h-73.142857v-341.333333h73.142857zM146.285714 256h731.428572v73.142857H146.285714v-73.142857z m518.265905-121.904762v73.142857h-292.571429v-73.142857h292.571429z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="comment-text"
                contenteditable
                @keydown.enter.prevent.stop="blur"
                @keydown.escape.prevent.stop="[(reset = true), blur($event)]"
                @focus="reset = false"
                @blur="updateComment($event, index, '无回复')"
              >
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="no-more">- 已无更多评论 -</div>
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
  </Transition>
</template>

<script lang="ts" setup>
import Window from '../Common/Window.vue'
import Avatar from '../Common/Avatar.vue'
import Level from '../Common/Level.vue'
import { currentMessage } from '@/store/message'
import { input } from '@/store/setting'
import { popupManager } from '@/assets/scripts/popup'
import { character } from '@/store/character'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

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

const reset = ref(false)
const blur = (e: KeyboardEvent) => {
  ;(e.target as HTMLElement).blur()
}

const update = (e: Event, key: 'title' | 'text', defaultText = 'Null') => {
  if (!currentMessage.value) return
  const target = e.target as HTMLElement

  let value = target.innerText.replace(/\n/g, '<br>')
  if (reset.value) {
    value = currentMessage.value[key]
    return
  }

  if (value === currentMessage.value[key]) return

  currentMessage.value[key] = value = value || defaultText
}

const updateComment = (e: Event, key: number, defaultText = 'Null') => {
  if (!currentMessage.value) return
  const target = e.target as HTMLElement

  if (reset.value) {
    target.innerText = currentMessage.value.comments[key].text
    return
  }

  if (target.innerText === currentMessage.value.comments[key].text) return

  currentMessage.value.comments[key].text = target.innerText = target.innerText || defaultText
}

const onImageClick = () => {
  popupManager.open('cropper').then(({ base64 }) => {
    if (currentMessage.value) {
      currentMessage.value.image = base64
    }
  })
}

const onAvatarClick = (id?: number) => {
  popupManager.open('select', id)
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

const dekComment = (id: number) => {
  if (!currentMessage.value) return
  currentMessage.value.comments.splice(id, 1)
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
  cursor pointer
  user-select none

  .name
    display flex
    flex-direction column
    margin-left 10px

    span
      height 20px
      color #a1a0a1
      font-size 18px

    .level
      margin-right auto

.image
  display flex
  justify-content center
  align-items center
  overflow hidden
  box-sizing border-box
  width 30%
  height 100%
  border 3px solid rgba(100, 100, 100, 0.5)
  border-radius 20px
  cursor pointer

  img
    display block
    width 100%
    height 100%
    object-fit contain

.message
  display flex
  flex 1
  flex-direction column
  overflow-x hidden
  overflow-y scroll
  box-sizing border-box
  margin-left 20px
  padding 20px 10px 20px 20px
  width 100%
  border-radius 20px
  background #000
  mask-image linear-gradient(to bottom, transparent, #000 30px, #000, #000 calc(100% - 30px), transparent)
  mask-size 100% 100%
  mask-position 0 0, 100% 0
  mask-repeat no-repeat, no-repeat

  .title
    box-sizing border-box
    margin-bottom 10px
    padding 2px
    width 100%
    color #fff
    word-break break-all

  .text
    box-sizing border-box
    margin-bottom 20px
    padding 2px
    color #b2b0b3

  .comment
    display flex
    padding-top 10px
    border-top 3px solid #1e1c1f

    &:hover
      .comment-content .comment-name .floor
        span
          opacity 0

        .del
          opacity 1

    &:first-child
      border-top none

    .comment-avatar
      width 42px
      height 42px
      cursor pointer

    .comment-content
      flex 1
      margin 0 10px
      padding-bottom 10px

      .comment-name
        display flex
        justify-content space-between
        align-items center
        margin 0 0 2px 2px

        span
          color #fff
          cursor pointer

      .floor
        position relative
        display flex
        justify-content center
        align-items center
        padding 0 12px 0 10px
        height 20px
        border-radius 0 10px 10px 10px
        background-color #615f62
        font-weight bold
        font-size 14px
        cursor pointer
        user-select none

        span
          color #000
          font-family none

        .del
          position absolute
          color #000
          opacity 0

      .comment-text
        box-sizing border-box
        padding 2px
        color #959295

  .no-more
    padding-top 15px
    border-top 3px solid #1e1c1f
    color #666
    text-align center

.input
  position absolute
  right 20px
  bottom 20px
  display flex
  justify-content center
  align-items center
  box-sizing border-box
  width calc(70% - 82.5px)
  height 40px
  border 4px solid #313131
  border-radius 20px
  background-color #000
  font-size 16px
  opacity 0
  transition transform 0.15s linear, opacity 0.2s
  transform translateY(50%)

  .input-avatar
    position absolute
    left -12px
    cursor pointer

  input
    flex 1
    overflow hidden
    box-sizing border-box
    padding 0 10px 0 50px
    width 100px
    height 100%
    outline none
    border none
    background-color transparent
    color #fff
    text-overflow ellipsis
    white-space nowrap

  .btn
    display flex
    flex-shrink 0
    justify-content center
    align-items center
    margin 0
    padding 0 10px
    width 70px
    height 100%
    outline none
    border none
    border-radius 20px
    background-color transparent
    color #fff
    text-align center
    cursor pointer
    user-select none

    &:hover
      background-color #a3c101
      color #000

  &:hover
  &:focus-within
    show()

.show
  show()

.disabled
  color #666 !important
  cursor default !important

  &:hover
    background-color transparent !important
    color #666 !important

@media screen and (max-width 700px) and (max-aspect-ratio 1 / 1)
  :deep(.content)
    margin-bottom 40px

  .image
    flex-shrink 0
    max-height 110vw
    width 100%
    height auto

  .message
    flex 1 0 0%
    overflow unset
    margin-top 20px
    margin-left unset
    width 100%

    .comment
      &:last-child
        margin-bottom 0

  .input
    bottom 0
    left 0
    width 100%
    border 4px solid #000
    border-radius 10px
    opacity 1
    transform translateY(0)

    .input-avatar
      left 15px

    input
      padding-left 75px
</style>
