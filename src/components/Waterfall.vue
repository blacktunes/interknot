<template>
  <div class="waterfall">
    <wc-flow-layout
      :gap="20"
      :cols="cols"
      class="waterfall"
    >
      <Card
        v-for="(item, index) in list"
        :message="item"
        :key="index"
        @click="openWindow('message', item.id)"
        @delete="handelDelete(item.id)"
      />
    </wc-flow-layout>
  </div>
</template>

<script lang="ts" setup>
import 'wc-flow-layout'
import Card from './Waterfall/Card.vue'
import { computed, ref } from 'vue'
import { getMessageIndex, message } from '@/store/message'
import { openWindow } from '@/assets/scripts/popup'

const list = computed(() => [...message.list].sort((a, b) => b.time - a.time))

const cols = ref(5)

const setCols = () => {
  const innerWidth = window.innerWidth
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

const handelDelete = (id: number) => {
  const flag = confirm('是否删除该帖？')
  if (flag) {
    const index = getMessageIndex(id)
    if (index !== -1) {
      message.list.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.waterfall
  flex 1
  overflow scroll
  width 100%
  border-radius 10px
</style>
