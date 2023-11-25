<template>
  <wc-flow-layout
    :gap="20"
    :cols="cols"
    class="waterfall"
  >
    <Card
      v-for="(_, index) in list"
      :key="index"
    />
  </wc-flow-layout>
</template>

<script lang="ts" setup>
import 'wc-flow-layout'
import { ref } from 'vue'
import Card from './Waterfall/Card.vue'

const list = ref<number[]>(new Array(100))

const cols = ref(5)
window.onresize = () => {
  setCols()
}

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
</script>

<style lang="stylus" scoped></style>
