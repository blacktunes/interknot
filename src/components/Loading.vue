<template>
  <Transition name="loading">
    <div
      class="loading"
      v-if="setting.loading"
    >
      <div class="loading__animation"></div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { setting } from '@/store/setting'
</script>

<style lang="stylus" scoped>
.loading
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 999
  display flex
  justify-content center
  align-items center
  background-color #fff
  color #fff
  user-select none

  .loading__animation
    position absolute
    right 15px
    bottom 15px
    width 300px
    height 85px
    background-image url('@/assets/images/loading-sprite.webp')
    background-position 0 0
    background-size 100% 3000%
    animation loadingLoop 0.5s steps(30) infinite forwards

@keyframes loadingLoop
  0%
    background-position 0 0

  100%
    background-position 0 -3000%

.loading-leave-active
  transition all 0.25s

.loading-leave-to
  opacity 0
</style>
