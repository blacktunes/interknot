import Cropper from './Cropper.vue'
import { data, callback } from './data'

export const useCropper = () => data

export const cropper = {
  component: Cropper,
  ...callback
}
