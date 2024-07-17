<template>
  <Transition name="fade">
    <Window
      v-if="props.index !== -1"
      :style="{ zIndex: 10 + index }"
      @close="close"
      title="更换角色"
      :bg="!currentMessage"
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
          @contextmenu.prevent="handleDelete(index)"
        >
          <div class="avatar">
            <img
              :src="item.avatar"
              alt=""
            />
          </div>
          <div class="name">{{ item.name }}</div>
          <div
            class="del"
            @click.stop="handleDelete(index)"
          >
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="M328.777143 377.904762l31.719619 449.657905h310.662095l31.695238-449.657905h73.264762L744.106667 832.707048a73.142857 73.142857 0 0 1-72.94781 67.998476H360.496762a73.142857 73.142857 0 0 1-72.94781-68.022857L255.488 377.904762h73.289143z m159.207619 22.649905v341.333333h-73.142857v-341.333333h73.142857z m133.729524 0v341.333333h-73.142857v-341.333333h73.142857zM146.285714 256h731.428572v73.142857H146.285714v-73.142857z m518.265905-121.904762v73.142857h-292.571429v-73.142857h292.571429z"
                fill="#fff"
              ></path>
            </svg>
          </div>
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
  </Transition>
</template>

<script lang="ts" setup>
import Window from '../Common/Window.vue'
import { setting, input } from '@/store/setting'
import { character } from '@/store/character'
import { currentMessage } from '@/store/message'
import { popupManager } from '@/assets/scripts/popup'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const highlightID = computed(() => {
  if (currentMessage.value) {
    if (setting.selectID === -1) {
      return input.commentUser.id
    } else if (setting.selectID === undefined) {
      if (typeof currentMessage.value.user === 'number') {
        return character.game[currentMessage.value.user].id
      } else {
        return currentMessage.value.user.id
      }
    } else {
      if (typeof currentMessage.value.comments[setting.selectID].user === 'number') {
        return character.game[currentMessage.value.comments[setting.selectID].user as number].id
      } else {
        return (currentMessage.value.comments[setting.selectID].user as Character).id
      }
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
  popupManager.close('select')
}

const onAddClick = () => {
  const name = prompt('角色名')
  if (name !== null && name.length > 0) {
    const level = Number(prompt('角色等级？'))

    popupManager.open('cropper', {
      aspectRatio: 1,
      maxWidth: 500
    }).then(({ base64 }) => {
      character.custom.push({
        id: Date.now(),
        name,
        level: isNaN(level) ? undefined : level,
        avatar: base64
      })
    })
  }
}

const handleDelete = (index: number) => {
  const flag = confirm('是否删除该角色？')
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
  display flex
  flex-wrap wrap
  align-items flex-start
  align-content flex-start
  overflow scroll
  padding 10px 0
  width 100%

  .character
    position relative
    display flex
    flex-direction column
    justify-content center
    align-items center
    overflow hidden
    box-sizing border-box
    margin 1%
    padding 10px
    width 18%
    border 2px solid transparent
    border-radius 20px
    cursor pointer
    transition 0.3s
    user-select none

    &:hover
      border-color #a3c101

      .del
        opacity 1

    &:last-child
      margin-bottom 45px

    .avatar
      position relative
      box-sizing border-box
      padding-bottom 100%
      width 100%
      border 2px solid #999
      border-radius 50%

      img
      svg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        border-radius 50%
        background-color #666
        object-fit contain

    .name
      overflow hidden
      margin-top 10px
      width 100%
      height 20px
      color #fff
      text-align center
      text-overflow ellipsis
      white-space nowrap
      font-size 16px

    .del
      position absolute
      top -15px
      right -15px
      display flex
      justify-content center
      align-items center
      width 50px
      height 50px
      border-radius 50%
      background-color #000
      opacity 0
      transition 0.3s

      svg
        margin 10px 12.5px 0 0

      &:hover
        opacity 1

.add
  position absolute
  bottom 10px
  left 50%
  display flex
  justify-content center
  align-items center
  box-sizing border-box
  padding 5px 15px
  height 35px
  border 4px solid #313131
  border-radius 15px
  background-color #000
  color #fff
  opacity 0
  cursor pointer
  transition 0.2s
  transform translate(-50%, 50%)

  &:hover
    border-color #a3c101
    background-color #a3c101
    color #000
    opacity 1
    transform translate(-50%, 0)

.highlight
  background-color #a3c101

  .name
    color #000 !important

@media screen and (max-width 500px)
  .scroll-view
    .character
      width 31%

@media screen and (min-width 1200px)
  .scroll-view
    .character
      width 12%

@media screen and (max-width 700px) and (max-aspect-ratio 1 / 1)
  .add
    opacity 1
    transform translate(-50%, 0)
</style>
