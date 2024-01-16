<template>
  <div class="waterfall">
    <wc-flow-layout
      :gap="20"
      :cols="cols"
      class="waterfall"
    >
      <Card
        v-for="(item, index) in message.list"
        :message="item"
        :key="index"
        @click="setting.id = item.id"
      />
    </wc-flow-layout>
  </div>
</template>

<script lang="ts" setup>
import 'wc-flow-layout'
import { ref } from 'vue'
import Card from './Waterfall/Card.vue'
import { setting } from '@/store/setting'
import { message } from '@/store/message'

const cols = ref(5)

const setCols = () => {
  const innerWidth = window.innerWidth
  console.log(innerWidth)
  if (innerWidth > 1000) {
    cols.value = 5
    return
  }
  if (innerWidth > 500) {
    cols.value = 3
    return
  }
  cols.value = 1
}
setCols()

window.onresize = setCols
</script>

<style lang="stylus" scoped>
.waterfall
  flex 1
  overflow scroll
  width 100%
  margin 10px 0
  border-radius 10px
</style>
