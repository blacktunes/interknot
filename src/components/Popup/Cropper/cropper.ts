import { reactive } from 'vue'
import { SuperImageCropper } from 'super-image-cropper'

export const imageCropper = new SuperImageCropper()

export const cropperSetting = reactive<{
  img: string
  aspectRatio?: number
  fn?: (img: string) => void
}>({
  img: ''
})

export const cropperOpen = (img: string, aspectRatio?: number) => {
  return new Promise<string>((resolve) => {
    cropperSetting.img = img
    cropperSetting.aspectRatio = aspectRatio
    cropperSetting.fn = (str) => resolve(str)
  })
}

export const cropperClose = () => {
  cropperSetting.img = ''
  cropperSetting.aspectRatio = undefined
  cropperSetting.fn = undefined
}
