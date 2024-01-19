<template>
  <Window
    title="更换角色"
    @close="closeWindow('select')"
  >
    <div class="scroll-view">
      <div
        v-for="item in character.game"
        :key="item.id"
        class="character"
        :class="{ highlight: item.id === highlightID }"
        :title="item.name"
        @click="onCharacterClick(item)"
      >
        <div class="avatar">
          <img
            :src="item.avatar"
            alt=""
          />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
      <div
        v-for="(item, index) in character.custom"
        :key="item.id"
        class="character"
        :class="{ highlight: item.id === highlightID }"
        :title="item.name"
        @click="onCharacterClick(item)"
        @contextmenu.prevent="handelDelete(index)"
      >
        <div class="avatar">
          <img
            :src="item.avatar"
            alt=""
          />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <template #footer>
      <div
        class="add"
        @click="onAddClick"
      >
        新角色
      </div>
    </template>
  </Window>
</template>

<script lang="ts" setup>
import Window from './Common/Window.vue'
import { setting, input } from '@/store/setting'
import { character } from '@/store/character'
import { computed } from 'vue'
import { compressImage } from '@/assets/scripts/image'
import { currentMessage } from '@/store/message'
import { closeWindow } from '@/store/popup'

const highlightID = computed(() => {
  if (currentMessage.value) {
    if (setting.selectID === -1) {
      return input.commentUser.id
    } else if (setting.selectID === undefined) {
      return currentMessage.value.user.id
    } else {
      return currentMessage.value.comments[setting.selectID].user.id
    }
  } else {
    return setting.userID
  }
})

const onCharacterClick = (item: Character) => {
  if (currentMessage.value) {
    if (setting.selectID === -1) {
      input.commentUser = item
    } else if (setting.selectID === undefined) {
      currentMessage.value.user = item
    } else {
      currentMessage.value.comments[setting.selectID].user = item
    }
  } else {
    setting.userID = item.id
  }
  closeWindow('select')
}

const onAddClick = () => {
  const name = prompt('角色名')
  if (name !== null && name.length > 0) {
    setTimeout(() => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async () => {
        if (input.files?.[0]) {
          const avatar = await compressImage(input.files[0])
          character.custom.push({
            id: Date.now(),
            name,
            avatar
          })
        }
      }
      input.click()
    }, 0)
  }
}

const handelDelete = (index: number) => {
  const flag = confirm('是否删除该用户？')
  if (flag) {
    character.custom.splice(index, 1)
  }
}
</script>

<style lang="stylus" scoped>
.window
  &:hover
    .add
      opacity 1
      transform translate(-50%, 0)

:deep(.content)
  padding 0 15px !important

.scroll-view
  overflow scroll
  display flex
  flex-wrap wrap
  align-items flex-start
  align-content flex-start
  width 100%
  padding 10px 0

  .character
    box-sizing border-box
    display flex
    justify-content center
    align-items center
    flex-direction column
    width 18%
    padding 10px
    margin 1%
    border-radius 20px
    user-select none
    cursor pointer

    &:last-child
      margin-bottom 45px

    .avatar
      position relative
      width 80%
      padding-bottom 80%
      box-sizing border-box
      border 2px solid #999
      border-radius 50%

      img, svg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        object-fit contain
        background-color #666
        border-radius 50%

    .name
      height 20px
      margin-top 10px
      font-size 16px
      text-align center
      color #fff
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      width 100%

.add
  display flex
  justify-content center
  align-items center
  position absolute
  bottom 10px
  left 50%
  box-sizing border-box
  height 35px
  padding 5px 15px
  background-color #000
  border-radius 15px
  border 4px solid #313131
  color #fff
  transform translate(-50%, 50%)
  opacity 0
  transition 0.2s
  cursor pointer

  &:hover
    opacity 1
    transform translate(-50%, 0)
    color #000
    background-color #a3c101
    border-color #a3c101

.highlight
  background-color #a3c101

  .name
    color #000 !important

@media screen and (max-width 500px)
  .scroll-view
    .character
      width 31%

@media screen and (min-width 1000px)
  .scroll-view
    .character
      width 12%

@media screen and (max-width 700px) and (max-aspect-ratio 1 / 1)
  .add
    opacity 1
    transform translate(-50%, 0)
</style>
@/store/popup
