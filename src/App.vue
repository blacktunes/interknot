<template>
  <div id="main">
    <Header />
    <Waterfall />
    <Message />
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Message from './components/Message.vue'
import Waterfall from './components/Waterfall.vue'
</script>

<style lang="stylus" scoped>
#main
  margin 20px 10px
  width calc(100vw - 20px)
  max-width 1280px
  min-height 100vh
</style>
