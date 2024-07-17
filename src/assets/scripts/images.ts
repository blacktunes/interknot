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
