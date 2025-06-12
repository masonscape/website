<template>
  <div v-if="!isMobile" class="nyanvas-container">
    <canvas ref="canvas" />
    <div v-if="settingsShowing" class="settings-container">
      <div class="settings">
        <div class="image-buttons">
          <input type="button" class="image-button" value="Add default images" @click="addDefaultImages">
          <input type="button" class="image-button" value="Delete selected" @click="() => removeImage(selectedImage)">
        </div>
        <div class="image-selector">
          <div
            v-for="src in imageSources"
            :key="src"
            class="setting"
          >
            <img
              :src="src"
              :class="['setting-image', selectedImage === src ? 'active' : '']"
              draggable="false"
              @click="handleClickSettingsImage(src)"
            >
          </div>
        </div>
        <div class="input-wrapper">
          <input
            ref="addInput"
            v-model="newImageSrc"
            placeholder="Image URL"
            type="text"
            @keydown.enter="addImageSource"
          >
          <input
            type="button"
            value="Add image"
            @click="addImageSource"
          >
        </div>
        <!-- Background image input -->
        <div class="input-wrapper">
          <input
            v-model="backgroundImageUrlInput"
            placeholder="Background image URL"
            type="text"
            @keydown.enter="setBackgroundImage"
          >
          <input
            type="button"
            value="Set background"
            @click="setBackgroundImage"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Nyanvas'
})

interface ImageObject {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

const canvas = ref<HTMLCanvasElement | null>(null)
const images = ref<ImageObject[]>([])
const scale = 3

const isClicking = ref(false)
const position = ref({ x: 0, y: 0 })

const defaultImageSources = ref<string[]>([
  'MasonCircle.png',
  'kitties.png',
  'https://preview.redd.it/tenna-s-canon-design-blew-my-expectations-as-well-as-others-v0-jpkwlg4f5l5f1.png?width=458&format=png&auto=webp&s=fe2c8dec7921feff46e0487dfaedbd0d0f461573'
])
const imageSources = ref<string[]>(defaultImageSources.value)
const selectedImage = ref(imageSources.value[0])
const preloadedImages = new Map<string, HTMLImageElement>()

let brushSize = 100
const settingsShowing = ref(false)

const newImageSrc = ref('')
const addInput = ref<HTMLInputElement | null>(null)

const isMobile = ref(false)

const eraseMode = ref(false)

const backgroundImageUrl = ref<string>('')
const backgroundImageUrlInput = ref<string>('')
const backgroundImage = ref<HTMLImageElement | null>(null)

const addImageSource = () => {
  const url = newImageSrc.value.trim()
  if (url) {
    if (!imageSources.value.includes(url)) {
      imageSources.value = [
        ...imageSources.value,
        newImageSrc.value
      ]
    }
    
    newImageSrc.value = ''
    addInput.value?.focus()
  }
}

const addDefaultImages = () => {
  imageSources.value = [...defaultImageSources.value, ...imageSources.value.filter(image => !defaultImageSources.value.includes(image))]
}

watch(imageSources, (newVal) => {
  console.log('changed')
  localStorage.setItem('nyanvasImages', JSON.stringify(newVal))
})

const drawImage = (ctx: CanvasRenderingContext2D, img: ImageObject) => {
  ctx.drawImage(
    img.img,
    (img.x - img.width / 2) * scale,
    (img.y - img.height / 2) * scale,
    img.width * scale,
    img.height * scale
  )
}

const redraw = () => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, el.width, el.height)
  // Draw background image if set
  if (backgroundImage.value) {
    ctx.drawImage(backgroundImage.value, 0, 0, el.width, el.height)
  }
  for (const img of images.value) drawImage(ctx, img)
}

const addImage = (x: number, y: number) => {
  const ctx = canvas.value?.getContext('2d')
  const imgEl = preloadedImages.get(selectedImage.value)
  if (!ctx || !imgEl) return

  const { naturalWidth, naturalHeight } = imgEl
  let width: number, height: number

  if (naturalWidth < naturalHeight) {
    width = brushSize
    height = (naturalHeight / naturalWidth) * brushSize
  } else {
    height = brushSize
    width = (naturalWidth / naturalHeight) * brushSize
  }

  const img: ImageObject = {
    img: imgEl,
    x,
    y,
    width,
    height
  }

  images.value.push(img)
  drawImage(ctx, img)
}


const handleClickSettingsImage = (src: string) => {
  selectedImage.value = src
}

const removeImage = (src: string) => {
  // imageSources.value.splice(imageSources.value.indexOf(src), 1)
  const removingIndex = imageSources.value.indexOf(src)

  if (removingIndex > -1) {
    imageSources.value = imageSources.value.filter(image => image !== src)
  }

  if (selectedImage.value === src) {
    selectedImage.value = imageSources.value[Math.max(0, removingIndex - 1)] || ''
  }
}

const loadImages = async () => {
  await Promise.all(
    imageSources.value.map(src => {
      return new Promise<void>(resolve => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          preloadedImages.set(src, img)
          resolve()
        }
        img.onerror = () => {
          console.warn(`failed to load image '${src}'`)
          resolve()
        }
      })
    })
  )
}

watch(imageSources, () => {
  console.log('images changed, reloading them!')

  loadImages()
})

const setBackgroundImage = () => {
  if (!backgroundImageUrlInput.value.trim()) {
    backgroundImageUrl.value = ''
    backgroundImage.value = null
    redraw()
    return
  }
  backgroundImageUrl.value = backgroundImageUrlInput.value.trim()
  const img = new window.Image()
  img.src = backgroundImageUrl.value
  img.onload = () => {
    backgroundImage.value = img
    redraw()
  }
  img.onerror = () => {
    backgroundImage.value = null
    redraw()
  }
}

onMounted(async () => {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 'ontouchstart' in window || navigator.maxTouchPoints > 0) isMobile.value = true

  const savedImages = localStorage.getItem('nyanvasImages')
  console.log(savedImages)
  if (savedImages) {
    const savedImageArray = JSON.parse(savedImages) as string[]

    imageSources.value = savedImageArray
  }

  const el = canvas.value
  if (!el) return

  const ctx = el.getContext('2d')
  if (!ctx) return
  ctx.imageSmoothingEnabled = true

  await loadImages()

  // Optionally, restore background image from localStorage
  const savedBg = localStorage.getItem('nyanvasBackground')
  if (savedBg) {
    backgroundImageUrl.value = savedBg
    backgroundImageUrlInput.value = savedBg
    const img = new window.Image()
    img.src = savedBg
    img.onload = () => {
      backgroundImage.value = img
      redraw()
    }
    img.onerror = () => {
      backgroundImage.value = null
      redraw()
    }
  }

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return
    isClicking.value = true
    position.value = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isClicking.value = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    position.value = { x: e.clientX, y: e.clientY }
  }

  const handleResize = () => {
    el.width = window.innerWidth * scale
    el.height = window.innerHeight * scale
    redraw()
  }

  const cycleImage = () => {
    const currentImageIndex = imageSources.value.indexOf(selectedImage.value)
    const newIndex = (currentImageIndex + 1) % imageSources.value.length
    selectedImage.value = imageSources.value[newIndex]
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    if (key === 'e') {
      eraseMode.value = !eraseMode.value
    } else if (key === 'x') {
      cycleImage()
    } else if (key === '=') {
      brushSize += 5
    } else if (key === '-') {
      if (brushSize > 5) {
        brushSize -= 5
      }
    } else if (key === 'shift') {
      settingsShowing.value = !settingsShowing.value
    }
  }

  const eraseAt = (x: number, y: number) => {
    images.value = images.value.filter(img => {
      const left = img.x - img.width / 2
      const right = img.x + img.width / 2
      const top = img.y - img.height / 2
      const bottom = img.y + img.height / 2
      return !(x >= left && x <= right && y >= top && y <= bottom)
    })
    redraw()
  }

  el.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  // el.addEventListener('pointerdown', handleMouseDown)
  // document.addEventListener('pointerup', handleMouseUp)
  el.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('keydown', handleKeyDown)
  window.addEventListener('resize', handleResize)

  handleResize()

  const drawingLoop = () => {
    if (isClicking.value) {
      const el = canvas.value
      if (el) {
        const rect = el.getBoundingClientRect()
        const x = (position.value.x - rect.left)
        const y = (position.value.y - rect.top)
        if (eraseMode.value) {
          eraseAt(x, y)
        } else {
          addImage(position.value.x, position.value.y)
        }
      }
    }
    requestAnimationFrame(drawingLoop)
  }

  drawingLoop()

  return () => {
    el.removeEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mouseup', handleMouseUp)
    // el.removeEventListener('pointerdown', handleMouseDown)
    // document.removeEventListener('pointerup', handleMouseUp)
    el.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.settings-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px) brightness(90%);
  z-index: 1000000;
}

.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: 90vh;
  background-color: color-mix(in srgb, var(--color-primary) 80%, transparent);
  color: var(--color-secondary);
  border-radius: 1em;
  outline: 1px solid var(--color-secondary);
  padding: 2em;
  box-sizing: border-box;
}

.image-buttons {
  width: 80%;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.image-selector {
  display: grid;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fit, 4em);
  gap: 0.7em;
  width: 80%;
  height: fit-content;
  max-height: 8.7em;
  overflow-y: auto;
  border-radius: 0.5em;
}

.setting {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  
}

.setting-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0.5em;
  transition: transform 0.1s;
  outline: 1px solid var(--color-secondary);
  cursor: pointer;
  padding: 0.25em;
  box-sizing: border-box;
}

.setting-image:hover {
  transform: scale(1.1);
}


.setting:hover .setting-image-x {
  visibility: visible;
}

.setting-image-x:hover {
  transform:  scale(1.4);
}

.active {
  outline: 1px solid #0090ff;
}

.input-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

input {
  width: auto;
  padding: 0.5em 1em;
  border-radius: 0.7em;
  margin: 0 0.5em 0 0.5em;
  border: 1px solid var(--color-secondary);
  background-color: color-mix(in srgb, var(--color-secondary) 10%, var(--color-primary) 90%);
  color: var(--color-secondary);
  text-align: center;
  font-size: 1em;
}

input[type='button'] {
  background-color: color-mix(in srgb, var(--color-accent) 50%, var(--color-primary) 50%);
  cursor: pointer;
}

.input-wrapper input:focus::placeholder {
  color: transparent
}

canvas {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: black;
  z-index: 1;
  height: 100vh;
  display: block;
}
</style>
