<template>
  <div class="header">
    <Avatar
      :src="user.avatar"
      :size="40"
      style="margin: 0 10px; cursor: pointer"
      @click="popup.select = true"
    />
    <div class="link">
      <svg
        class="icon"
        viewBox="0 0 1137 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M0 0h1137.777778v1024H0z"
          fill="#D8D8D8"
          fill-opacity=".01"
        ></path>
        <path
          d="M883.939556 1024H253.838222C176.583111 1024 113.777778 964.266667 113.777778 890.823111v-399.36C113.777778 418.133333 176.583111 358.4 253.838222 358.4H290.133333A233.585778 233.585778 0 0 1 284.444444 307.2v-51.2C284.444444 114.574222 411.761778 0 568.888889 0c157.013333 0 284.444444 114.574222 284.444444 256v51.2c0 17.521778-1.991111 34.588444-5.688889 51.2h36.295112C961.137778 358.4 1024 418.133333 1024 491.52v399.303111C1024 964.266667 961.137778 1024 883.939556 1024zM512 702.805333V819.2c0 28.216889 25.486222 51.2 56.888889 51.2s56.888889-22.983111 56.888889-51.2v-116.394667c34.474667-17.635556 58.026667-50.403556 58.026666-88.405333 0-56.604444-51.484444-102.4-114.915555-102.4-63.488 0-114.915556 45.795556-114.915556 102.4 0 38.001778 23.552 70.826667 58.026667 88.405333zM739.555556 256c0-84.878222-76.401778-153.6-170.666667-153.6S398.222222 171.121778 398.222222 256v102.4h341.333334V256z"
        ></path>
      </svg>
      <span>EWW.INTERKNOW.INK</span>
    </div>
    <div class="menu">
      <div
        class="btn"
        @click="onNewMessageClick"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from '@/store/message'
import Avatar from './Common/Avatar.vue'
import { popup, setting } from '@/store/setting'
import { user } from '@/store/character'

const onNewMessageClick = () => {
  const time = Date.now()
  message.list.push({
    id: time,
    user: {
      id: 1,
      name: '这是测试角色',
      avatar:
        'https://ts1.cn.mm.bing.net/th?id=OSK.5cd4345f332791306f4a1549a1f5e461&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM'
    },
    title: '点击修改标题',
    text: '点击修改内容',
    time,
    comments: []
  })

  setting.messageID = time
}
</script>

<style lang="stylus" scoped>
.header
  overflow auto
  z-index 9
  position sticky
  top 0
  background #000
  display flex
  align-items center
  height 50px
  color #404040
  padding 10px 0

  .link
    flex 1
    box-sizing border-box
    display flex
    align-items center
    height 30px
    padding 0 20px
    border-radius 15px
    background-color #131313

    .icon
      margin-right 10px

    span
      font-size 14px
      font-weight bold

  .menu
    display flex
    justify-content center
    align-items center
    box-sizing border-box
    padding 0 10px
    margin-left 20px
    height 35px
    background-color #000
    border 4px solid #313131

    .btn
      position relative
      box-sizing border-box
      display flex
      align-items center
      justify-content center
      width 80px
      height 100%
      margin 0 10px
      font-size 16px
      text-align center
      white-space nowrap
      user-select none
      cursor pointer

      &:after
        content '发帖'
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        display flex
        align-items center
        justify-content center
        color #fff

      &:hover
        &:before
          content ''
          position absolute
          top -5px
          right -25px
          bottom -5px
          left -25px
          display flex
          align-items center
          justify-content center
          background-color #a3c101
          border-radius 30px 10px 20px 30px

        &:after
          color #000

@media screen and (min-width 500px)
  .menu
    border-radius 20px

@media screen and (max-width 500px)
  .menu
    position fixed
    right 15px
    bottom 5px
    border-radius 20px 10px 10px 20px
</style>
