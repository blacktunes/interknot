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
import { enterCallback, closeWindow } from '@/assets/scripts/popup'

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

enterCallback.cropper = onCropper
</script>

<style lang="stylus" scoped>
:deep(.vue--picture-cropper__wrap)
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')
  display flex
  justify-content center
  align-items center

.cropper
  z-index 10
  position fixed
  top 0
  right 0
  bottom 0
  left 0

.btn-list
  display flex
  justify-content center
  position fixed
  gap 20px
  bottom 15px
  left 50%
  width auto
  transform translateX(-50%)

  .btn
    flex-shrink 0
    display flex
    justify-content center
    align-items center
    box-sizing border-box
    padding 5px 35px
    background-color #000
    border-radius 15px
    border 4px solid #313131
    color #fff
    transition 0.2s
    cursor pointer
    user-select none

    &:hover
      color #000
      background-color #a3c101
      border-color #a3c101
</style>
