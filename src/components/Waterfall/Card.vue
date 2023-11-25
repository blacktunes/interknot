<template>
  <div class="card">
    <div
      class="image"
      :style="{ height: height + 'px' }"
    ></div>
    <div class="content">
      <div class="user">
        <div class="avatar"></div>
        <span>这是名字</span>
      </div>
      <div class="title">这是标题</div>
      <div class="text">这是内容</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const height = ref(getRandomInt(150, 300))
</script>

<style lang="stylus" scoped>
.card
  overflow hidden
  display flex
  flex-direction column
  background-color #222
  border-radius 20px 20px 5px 20px
  border 5px solid #222
  cursor pointer

  &:hover
    border-color #a3bc22

  .image
    width 100%
    height 200px
    background #666

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

      span
        display block
        font-size 16px
        font-weight bold
        color #5d5d5d
        width calc(100% - 55px)
        margin-left 55px
        padding-bottom 6px
        border-bottom 2px solid rgba(90, 90, 90, 0.5)

    .title
      margin 10px 0 8px 0
      font-size 18px
      font-weight bold
      color #fff

    .text
      font-size 14px
      font-weight bold
      color #8f8f8f
</style>
