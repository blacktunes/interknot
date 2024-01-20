<template>
  <div id="main">
    <Component
      v-for="(item, index) in components"
      :key="index"
      :is="item"
    />
    <Component
      v-for="item in popupComponents"
      :key="item[0]"
      :is="item[1]"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import type { Component } from 'vue'
import { popupComponents } from './assets/scripts/popup'

// 动态加载所有组件
const components: Component[] = []
const modules = {
  ...import.meta.glob<{ default: Component }>(
    [
      // 组件位置
      './components/*.vue',
      '!./components/Message.vue',
      '!./components/CharacterSelect.vue'
    ],
    {
      eager: true,
      import: 'default'
    }
  )
}
for (const i in modules) {
  components.push(defineComponent(modules[i]))
}
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
