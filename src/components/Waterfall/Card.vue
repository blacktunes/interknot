<template>
  <div
    class="card"
    @contextmenu.prevent.stop="$emit('delete')"
  >
    <div class="image">
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

defineProps<{
  message: Message
}>()

defineEmits<{
  (event: 'delete'): void
}>()
</script>

<style lang="stylus" scoped>
.card
  overflow hidden
  display flex
  flex-direction column
  background-color #222
  border-radius 20px 20px 5px 20px
  border 5px solid #000
  cursor pointer
  transition all 0.3s

  &:hover
    border-color #a3bc22

    .del
      opacity 1

  .image
    overflow hidden
    width 100%
    background #333

    img
      display block
      width 100%
      object-fit cover

  .content
    padding 8px 10px 10px 10px

    .user
      position relative

      .avatar
        position absolute
        left 0
        bottom 0
        width 45px
        height 45px
        border-radius 50%
        border 3px solid #222
        background-color #a1a0a1

        img
          width 100%
          height 100%
          border-radius 50%
          object-fit contain

      span
        display block
        font-size 16px
        color #5d5d5d
        width calc(100% - 52px)
        margin-left 52px
        padding-bottom 6px
        border-bottom 2px solid rgba(90, 90, 90, 0.5)
        transform translateY(-2px)

    .title
      margin 10px 0 8px 0
      font-size 18px
      color #fff

    .text
      font-size 14px
      color #8f8f8f

  .del
    display flex
    align-items center
    justify-content center
    position absolute
    top -15px
    right -15px
    width 50px
    height 50px
    background-color #000
    border-radius 50%
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
