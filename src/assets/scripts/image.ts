import { cropperOpen } from "@/store/cropper"

export const imageCompress = (file: File | Blob, width?: number) => {
  return new Promise<string>((resolve) => {
    if (file.type === 'image/gif') {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve((e.target?.result as string) || '')
      }
      reader.readAsDataURL(file)
    } else {
      const src = URL.createObjectURL(file)
      const img = new Image()
      img.src = src
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve('')
          return
        }

        width = width ? (img.width < width ? img.width : width) : img.width
        canvas.width = width
        canvas.height = width * (img.height / img.width)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp'))
        URL.revokeObjectURL(src)
      }
    }
  })
}

export const urlToBase64 = (src: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve('')
        return
      }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/webp'))
    }
    img.src = src
  })
}

export const imageCropper = async (config?: { aspectRatio?: number; maxWidth?: number }) => {
  return new Promise<{ base64: string; raw: File }>((resolve) => {
    const el = document.createElement('input')
    el.type = 'file'
    el.accept = 'image/*'
    el.onchange = async () => {
      if (el.files?.[0]) {
        resolve({
          base64: await cropperOpen(
            await imageCompress(el.files[0]),
            config
          ),
          raw: el.files[0]
        })
      }
    }
    el.click()
  })
}
