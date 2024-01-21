<template>
  <div id="main">
    <Header />
    <Waterfall />
    <TransitionGroup name="fade">
      <Component
        v-for="item in popupComponents"
        :key="item[0]"
        :is="item[1]"
      />
    </TransitionGroup>
  </div>
  <Loading />
</template>

<script lang="ts" setup>
import { popupComponents } from './assets/scripts/popup'
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
</style>
