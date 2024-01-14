<template>
  <div class="avatar">
    <img
      :src="src"
      alt=""
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  src?: string
}>()
</script>

<style lang="stylus" scoped>
.avatar
  flex-shrink 0
  position relative
  box-sizing border-box
  width 50px
  height 50px
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
</style>
