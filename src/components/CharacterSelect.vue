<template>
  <Window
    title="更换角色"
    v-if="popup.select"
    @close="popup.select = false"
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
      <div
        class="character"
        @click="onAddClick"
      >
        <div class="avatar">
          <svg
            style="background-color: #fff"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
          >
            <path
              d="M832.234 448H575.25V191.016c0-35.346-28.653-64-64-64s-64 28.654-64 64V448H191.766c-35.346 0-64 28.654-64 64s28.654 64 64 64H447.25v256.984c0 35.346 28.654 64 64 64s64-28.654 64-64V576h256.984c35.346 0 64-28.653 64-64s-28.654-64-64-64z"
              fill=""
            ></path>
          </svg>
        </div>
        <div class="name">新角色</div>
      </div>
    </div>
  </Window>
</template>

<script lang="ts" setup>
import Window from './Common/Window.vue'
import { setting, popup } from '@/store/setting'
import { character } from '@/store/character'
import { computed } from 'vue'
import { compressImage } from '@/assets/scripts/image'
import { currentMessage } from '@/store/message'

const highlightID = computed(() => {
  if (!popup.select) return 0

  if (currentMessage.value) {
    if (setting.selectID === undefined) {
      return currentMessage.value.user.id
    } else {
      return currentMessage.value.comments[setting.selectID].user.id
    }
  } else {
    return setting.userID
  }
})

const onCharacterClick = (item: { id: number; name: string; avatar: string }) => {
  if (currentMessage.value) {
    if (setting.selectID === undefined) {
      currentMessage.value.user = item
    } else {
      currentMessage.value.comments[setting.selectID].user = item
    }
  } else {
    setting.userID = item.id
  }
  popup.select = false
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
:deep(.content)
  padding 0 15px !important

.scroll-view
  overflow scroll
  display flex
  flex-wrap wrap
  align-items flex-start
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

.highlight
  background-color #a3c101

  .name
    color #000 !important

@media screen and (max-width 500px)
  .scroll-view
    .character
      width 31%
</style>
