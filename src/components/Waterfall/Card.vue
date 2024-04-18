<template>
  <div
    class="card"
    @contextmenu.prevent.stop="$emit('delete')"
  >
    <div class="image">
      <div class="view">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <circle
            cx="256"
            cy="256"
            r="64"
            fill="currentColor"
          ></circle>
          <path
            d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76zM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96z"
            fill="currentColor"
          ></path>
        </svg>
        <span
          contenteditable
          @click.stop
          @keydown.enter.prevent.stop="blur($event)"
          @keydown.escape.prevent.stop="blur($event)"
          @blur="updateView"
        >
          {{ message.view }}
        </span>
      </div>
      <img
        v-if="message.image"
        :src="message.image"
        alt=""
      />
      <img
        v-else
        src="@/assets/images/empty.webp"
        alt=""
      />
    </div>
    <div class="content">
      <div class="user">
        <template v-if="typeof message.user === 'number'">
          <div class="avatar">
            <img
              :src="character.game[message.user].avatar || defaultAvatar"
              alt=""
            />
          </div>
          <span class="ellipsis">{{ character.game[message.user].name }}</span>
        </template>
        <template v-else>
          <div class="avatar">
            <img
              :src="message.user.avatar || defaultAvatar"
              alt=""
            />
          </div>
          <span class="ellipsis">{{ message.user.name }}</span>
        </template>
      </div>
      <div class="title">{{ message.title }}</div>
      <div class="text ellipsis">{{ message.text }}</div>
    </div>
    <div
      class="del"
      @click.stop="$emit('delete')"
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M328.777143 377.904762l31.719619 449.657905h310.662095l31.695238-449.657905h73.264762L744.106667 832.707048a73.142857 73.142857 0 0 1-72.94781 67.998476H360.496762a73.142857 73.142857 0 0 1-72.94781-68.022857L255.488 377.904762h73.289143z m159.207619 22.649905v341.333333h-73.142857v-341.333333h73.142857z m133.729524 0v341.333333h-73.142857v-341.333333h73.142857zM146.285714 256h731.428572v73.142857H146.285714v-73.142857z m518.265905-121.904762v73.142857h-292.571429v-73.142857h292.571429z"
          fill="#fff"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { character, defaultAvatar } from '@/store/character'

const props = defineProps<{
  message: Message
}>()

const emit = defineEmits<{
  (event: 'delete'): void
  (event: 'view', num: number): void
}>()

const blur = (e: KeyboardEvent) => {
  ;(e.target as HTMLInputElement).blur()
}

const updateView = (e: Event) => {
  if (e.target) {
    const num = Number((e.target as HTMLElement).innerText)
    if (!Number.isNaN(num)) {
      emit('view', num)
    } else {
      ;(e.target as HTMLElement).innerText = String(props.message.view)
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  display flex
  flex-direction column
  overflow hidden
  border 5px solid #000
  border-radius 20px 20px 5px 20px
  background-color #222
  cursor pointer
  transition all 0.3s

  &:hover
    border-color #a3bc22

    .del
      opacity 1

  .image
    position relative
    overflow hidden
    width 100%
    background #333

    .view
      position absolute
      top 5px
      left 10px
      display flex
      align-items center
      color #989898

      span
        margin-left 5px
        font-weight bold
        font-size 14px
        font-family none

    img
      display block
      width 100%
      object-fit cover

  .content
    padding 8px 10px 10px

    .user
      position relative

      .avatar
        position absolute
        bottom 0
        left 0
        width 45px
        height 45px
        border 3px solid #222
        border-radius 50%
        background-color #a1a0a1

        img
          width 100%
          height 100%
          border-radius 50%
          object-fit contain

      span
        display block
        margin-left 52px
        padding-bottom 6px
        width calc(100% - 52px)
        border-bottom 2px solid rgba(90, 90, 90, 0.5)
        color #989898
        font-size 16px
        transform translateY(-2px)

    .title
      margin 10px 0 8px
      color #fff
      font-size 18px

    .text
      color #8f8f8f
      font-size 14px

  .del
    position absolute
    top -15px
    right -15px
    display flex
    justify-content center
    align-items center
    width 50px
    height 50px
    border-radius 50%
    background-color #000
    opacity 0
    transition 0.3s

    svg
      margin 10px 12.5px 0 0

    &:hover
      opacity 1

@media screen and (min-width 1000px)
  .image
    max-height 300px

@media screen and (min-width 500px) and (max-width 1000px)
  .image
    max-height 400px

@media screen and (max-width 500px)
  .image
    max-height 110vw
</style>
