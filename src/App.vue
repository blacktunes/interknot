<template>
  <div
    id="main"
    @contextmenu.prevent
  >
    <Header />
    <Waterfall />
    <div
      class="mask"
      v-if="currentComponent"
    ></div>
    <Component
      v-for="(item, key) in popupComponents"
      :index="item.index"
      :name="key"
      :is="item.compontnt"
      :key="key"
      @close="closeWindow"
    />
  </div>
  <Loading />
</template>

<script lang="ts" setup>
import { popupComponents, closeWindow, currentComponent } from './assets/scripts/popup'
import Header from './components/Header.vue'
import Waterfall from './components/Waterfall.vue'
import Loading from './components/Loading.vue'
</script>

<style lang="stylus" scoped>
#main
  display flex
  flex-direction column
  margin 0 10px
  width calc(100vw - 20px)
  max-width 1280px
  height 100vh

.mask
  z-index 10
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh

  &:before
    z-index -2
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    backdrop-filter blur(2px)
    background-color rgba(0, 0, 0, 0.5)

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
</style>
