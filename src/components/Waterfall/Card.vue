<template>
  <div class="card">
    <div class="image">
      <img
        v-if="message.image"
        :src="message.image"
        alt=""
      />
    </div>
    <div class="content">
      <div class="user">
        <div class="avatar">
          <img
            v-if="message.user.avatar"
            :src="message.user.avatar"
            alt=""
          />
        </div>
        <span class="ellipsis">{{ message.user.name }}</span>
      </div>
      <div class="title">{{ message.title }}</div>
      <div class="text ellipsis">{{ message.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  message: Message
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

  &:hover
    border-color #a3bc22

  .image
    overflow hidden
    display flex
    align-items center
    justify-content center
    width 100%
    background #666

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
