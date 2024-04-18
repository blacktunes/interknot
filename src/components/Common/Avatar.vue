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
    size?: number
  }>(),
  { size: 50 }
)
</script>

<style lang="stylus" scoped>
.avatar
  position relative
  flex-shrink 0
  box-sizing border-box
  width calc(v-bind(size) * 1px)
  height calc(v-bind(size) * 1px)
  border-radius 50%
  background-color #a5a3a6

  &:before
    position absolute
    top -3px
    right -3px
    bottom -3px
    left -3px
    border 3px solid #302e31
    border-radius 50%
    content ''

  img
    width 100%
    height 100%
    border-radius 50%
    background-color #a5a3a6
    object-fit contain
</style>
