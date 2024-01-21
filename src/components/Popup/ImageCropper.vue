<template>
  <Transition
    name="fade"
    appear
  >
    <div
      class="cropper"
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
          @click.stop="cropperClose"
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
import { SuperImageCropper } from 'super-image-cropper'
import { cropper as cropperSetting, cropperClose } from '@/store/cropper'

const imageCropper = new SuperImageCropper()

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
  cropperClose()
  return true
}

cropperSetting.cb = onCropper
</script>

<style lang="stylus" scoped>
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
