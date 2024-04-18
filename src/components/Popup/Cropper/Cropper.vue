<template>
  <Transition name="fade">
    <div
      class="cropper"
      v-if="props.index !== -1 && cropperSetting.img"
      :style="{ zIndex: 10 + index }"
      @click.stop
    >
      <VuePictureCropper
        :img="cropperSetting.img"
        :options="{
          viewMode: 1,
          movable: false,
          scalable: false,
          zoomOnWheel: false,
          autoCrop: cropperSetting.aspectRatio !== undefined,
          autoCropArea: 1,
          aspectRatio: cropperSetting.aspectRatio
        }"
      />
      <div class="btn-list">
        <div
          class="btn"
          @click.stop="close"
        >
          取消
        </div>
        <div
          class="btn"
          @click.stop="onCropper"
        >
          确认
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { imageCropper, cropperSetting } from './'
import { confirmCallback, closeWindow } from '@/assets/scripts/popup'

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

const onCropper = async () => {
  if (cropper && cropperSetting.fn) {
    cropperSetting.fn(
      (await imageCropper.crop({
        cropperInstance: cropper,
        src: cropperSetting.img,
        outputType: 'base64'
      })) as string
    )
  }
  closeWindow('cropper')
  return true
}

confirmCallback.cropper = onCropper
</script>

<style lang="stylus" scoped>
:deep(.vue--picture-cropper__wrap)
  display flex
  justify-content center
  align-items center
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')

.cropper
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 10

.btn-list
  position fixed
  bottom 15px
  left 50%
  display flex
  justify-content center
  width auto
  transform translateX(-50%)
  gap 20px

  .btn
    display flex
    flex-shrink 0
    justify-content center
    align-items center
    box-sizing border-box
    padding 5px 35px
    border 4px solid #313131
    border-radius 15px
    background-color #000
    color #fff
    cursor pointer
    transition 0.2s
    user-select none

    &:hover
      border-color #a3c101
      background-color #a3c101
      color #000
</style>
