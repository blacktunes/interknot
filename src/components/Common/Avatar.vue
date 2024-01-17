<template>
  <div class="avatar">
    <img
      v-if="src"
      :src="src"
      alt=""
    />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    src?: string
    size: number
  }>(),
  { size: 50 }
)
</script>

<style lang="stylus" scoped>
.avatar
  flex-shrink 0
  position relative
  box-sizing border-box
  width calc(v-bind(size) * 1px)
  height calc(v-bind(size) * 1px)
  border-radius 50%
  background-color #a5a3a6

  &:before
    content ''
    position absolute
    top -3px
    right -3px
    bottom -3px
    left -3px
    border-radius 50%
    border 3px solid #302e31

  img
    width 100%
    height 100%
    border-radius 50%
    object-fit contain
    background-color #a5a3a6
</style>
