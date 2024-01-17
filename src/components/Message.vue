<template>
  <div
    class="message"
    v-if="currentMessage"
  >
    <div class="message-box">
      <div class="header">
        <div class="user">
          <Avatar :src="currentMessage.user.avatar" />
          <div class="name">
            <span>{{ currentMessage.user.name }}</span>
            <div></div>
          </div>
        </div>
        <div
          class="close"
          @click="setting.id = undefined"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 201 130"
            width="55"
          >
            <path
              fill-rule="evenodd"
              fill="rgb(196, 34, 9)"
              d="M0.373,65.000 C0.087,51.609 3.792,38.466 11.131,27.293 C19.671,14.293 32.558,4.832 47.439,0.360 C90.023,0.360 132.606,0.360 175.190,0.360 C183.245,1.482 190.671,5.694 195.361,12.480 C201.498,21.357 202.014,33.317 196.706,43.453 C185.052,65.000 173.397,86.547 161.743,108.094 C156.410,114.144 150.041,119.160 142.916,122.907 C136.598,126.230 129.798,128.498 122.745,129.640 C99.884,129.640 77.024,129.640 54.163,129.640 C38.778,126.247 24.988,117.749 15.165,105.400 C6.284,94.236 0.695,80.120 0.373,65.000 ZM51.473,11.133 L171.156,11.133 C175.707,11.408 180.022,13.285 183.259,16.520 C187.160,20.420 189.059,25.857 188.637,31.333 C177.880,52.431 167.122,73.529 156.364,94.627 C152.903,101.201 147.810,106.769 141.571,110.787 C135.517,114.686 128.583,116.999 121.400,117.520 C98.988,117.520 76.575,117.520 54.163,117.520 C28.223,111.309 10.366,87.869 11.131,62.307 C11.831,38.916 28.017,17.942 51.473,11.133 ZM54.538,17.998 C91.618,17.954 128.697,17.910 165.777,17.866 C171.772,16.637 177.788,19.453 180.569,24.600 C183.069,29.227 182.591,35.067 179.224,39.413 C168.466,58.716 157.708,78.018 146.950,97.320 C144.417,101.017 141.229,104.211 137.537,106.747 C133.865,109.270 129.766,111.094 125.434,112.134 C102.574,112.134 79.713,112.134 56.852,112.134 C33.925,106.570 18.183,85.813 18.891,63.215 C19.538,42.562 33.826,24.045 54.538,17.998 ZM79.713,63.653 C74.334,58.267 68.955,52.880 63.576,47.493 C60.994,44.908 60.994,40.652 63.576,38.066 C66.158,35.481 70.407,35.481 72.989,38.066 C78.368,43.453 83.747,48.840 89.126,54.227 C94.505,48.840 99.884,43.453 105.263,38.066 C107.957,36.746 111.211,37.289 113.332,39.413 C115.452,41.537 115.995,44.796 114.676,47.493 C109.297,52.880 103.918,58.267 98.539,63.653 C103.918,69.040 109.297,74.427 114.676,79.813 C117.258,82.399 117.258,86.654 114.676,89.240 C112.094,91.826 107.845,91.826 105.263,89.240 C99.884,83.853 94.505,78.467 89.126,73.080 C83.299,78.916 77.472,84.751 71.645,90.587 C68.951,91.907 65.697,91.364 63.576,89.240 C61.455,87.116 60.913,83.858 62.231,81.160 C68.059,75.325 73.886,69.489 79.713,63.653 Z"
            />
          </svg>
        </div>
      </div>
      <div class="content">
        <div class="content-image">
          <img
            v-if="currentMessage.image"
            :src="currentMessage.image"
            alt=""
          />
        </div>
        <div class="content-message">
          <div class="title">{{ currentMessage.title }}</div>
          <div class="text">
            {{ currentMessage.text }}
          </div>
          <div class="comment-list">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currentMessage } from '@/store/message'
import Avatar from './Common/Avatar.vue'
import { setting } from '@/store/setting'
</script>

<style lang="stylus" scoped>
.message
  z-index 10
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

      .close
        margin-left auto
        cursor pointer

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
        overflow hidden
        display flex
        align-items center
        justify-content center
        box-sizing border-box
        height 100%
        width 30%
        border-radius 20px
        border 3px solid rgba(100, 100, 100, 0.5)

        img
          display block
          width 100%
          height 100%
          object-fit contain

      .content-message
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

        .text
          color #b2b0b3
          margin-bottom 30px

        .comment
          display flex
          margin-top 5px

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

            .comment-text
              color #959295

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

        &::-webkit-scrollbar
          width 0
          height 0

        .content-image
          flex-shrink 0
          width 100%
          height auto
          max-height 110vw

        .content-message
          flex unset
          flex-shrink 0
          width 100%
          margin-top 20px
          margin-left unset
</style>
