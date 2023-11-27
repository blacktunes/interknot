<template>
  <div class="message">
    <div class="message-box">
      <div class="header">
        <div class="user">
          <div class="avatar"></div>
          <div class="name">
            <span>这是名字</span>
            <div></div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-image"></div>
        <div class="content-message"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="stylus" scoped>
.message
  position fixed
  top 0
  left 0
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
  background-color rgba(0, 0, 0, 0.5)

  &:before
    z-index -2
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    backdrop-filter blur(2px)

  &:after
    z-index -1
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)
    background-size 8px 8px
    opacity 0.5

  .message-box
    position relative
    overflow hidden
    width 70%
    max-width 1000px
    max-height 90%
    background-color #000
    background-clip padding-box
    border 4px solid rgba(100, 100, 100, 0.2)
    border-radius 20px 5px 20px 20px

    &:before
      content ''
      display block
      margin-top 50%

    .header
      position absolute
      top 0
      left 0
      display flex
      align-items center
      box-sizing border-box
      width 100%
      height 70px
      padding 10px 20px

      .user
        display flex
        align-items center

        .avatar
          box-sizing border-box
          width 50px
          height 50px
          border-radius 50%
          border 3px solid rgba(0, 0, 0, 0.5)
          background-color #a1a0a1

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
            width 50%
            margin-top 3px
            background-color #666
            border-radius 10px

    .content
      position absolute
      top 70px
      right 5px
      bottom 5px
      left 5px
      display flex
      padding 20px 15px
      border-radius 5px
      background-color #222

      .content-image
        box-sizing border-box
        height 100%
        width 30%
        border-radius 20px
        border 4px solid rgba(100, 100, 100, 0.5)

      .content-message
        flex 1
        width 100%
        margin-left 20px
        border-radius 20px
        background #000

@media screen and (min-width 500px) and (max-width 1000px)
  .message
    .message-box
      width 90%

@media screen and (max-width 700px) and (max-aspect-ratio 1 / 1)
  .message
    .message-box
      width 90%
      height 90%

      &:before
        content none

      .content
        flex-direction column
        overflow-x hidden
        overflow-y auto

        .content-image
          width 100%
          height 0
          padding-bottom 130%

        .content-message
          flex unset
          flex-shrink 0
          width 100%
          height 500px
          margin-top 20px
          margin-left unset
</style>
