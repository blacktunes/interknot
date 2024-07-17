<template>
  <div class="waterfall">
    <wc-waterfall
      :gap="20"
      :cols="cols"
      class="waterfall"
      v-if="list.length > 0"
    >
      <Card
        v-for="(item, index) in list"
        :message="item"
        :key="index"
        @click="popupManager.open('message', item.id)"
        @delete="handleDelete(item.id)"
        @view="handleView(item.id, $event)"
      />
    </wc-waterfall>
    <div
      class="empty-list"
      v-else
    >
      <img
        src="@/assets/images/empty.webp"
        alt=""
      />
      <span>什么都没有</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'wc-waterfall'
import Card from './Waterfall/Card.vue'
import { getMessageIndex, message } from '@/store/message'
import { popupManager } from '@/assets/scripts/popup'

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

const handleDelete = (id: number) => {
  const flag = confirm('是否删除该帖？')
  if (flag) {
    const index = getMessageIndex(id)
    if (index !== -1) {
      message.list.splice(index, 1)
    }
  }
}

const handleView = (id: number, num: number) => {
  const index = getMessageIndex(id)
  if (index !== -1) {
    message.list[index].view = num
  }
}
</script>

<style lang="stylus" scoped>
.waterfall
  flex 1
  overflow scroll
  width 100%
  border-radius 10px

  .empty-list
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 100%
    height 80%
    color #666
    text-align center
    font-size 20px
    user-select none

    img
      max-width 300px
</style>
