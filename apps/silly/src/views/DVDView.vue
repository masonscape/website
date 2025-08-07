<template>
  <div class="square" :style="{ width: dvdWidth + 'px', height: dvdHeight + 'px', top: dvdY + 'px', left: dvdX + 'px', position: 'absolute' }">
    <img :src="MasonSquare" class="image"></img>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MasonSquare from '@packages/assets/MasonSquare.png'

const viewWidth = ref<number | null>(null)
const viewHeight = ref<number | null>(null)

const dvdX = ref(0)
const dvdY = ref(0)
const defaultWidth = 100
const defaultHeight = 100
const dvdWidth = ref(defaultWidth)
const dvdHeight = ref(defaultHeight)

// directionX is 1 if it should be moving to the right, and -1 if it should be moving to the left
// same with directionY
let directionX = 1
let directionY = 1

let speed = 128

const initViewSize = () => {
  viewWidth.value = window.innerWidth
  viewHeight.value = window.innerHeight

  if (viewWidth.value < defaultWidth) {
    dvdWidth.value = viewWidth.value
  } else {
    dvdWidth.value = defaultWidth
  }
  
  if (viewHeight.value < defaultHeight) {
    dvdHeight.value = viewHeight.value
  } else {
    dvdHeight.value = defaultHeight
  }
}

const addTrail = (x: number, y: number) => {
  const trail = document.createElement('div')
  trail.style.width = '5px'
  trail.style.height = '5px'
  trail.style.position = 'absolute'
  trail.style.top = `${y + (dvdWidth.value / 2)}px`
  trail.style.left = `${x + (dvdHeight.value / 2)}px`
  trail.style.zIndex = '-5'
  trail.style.backgroundColor = `#ff0000`
  document.getElementById('app')!.appendChild(trail)
  setTimeout(() => trail.remove(), 5000)
}

let lastTime = performance.now()
const gameLoop = () => {
  if (!viewHeight.value || !viewWidth.value) return console.log('view size not set')
  // addTrail(dvdX.value, dvdY.value)
  const now = performance.now()
  const dt = (now - lastTime) / 1000
  lastTime = now

  if (dvdHeight.value === viewHeight.value) {
    dvdY.value = 0
    directionY = 0
  } else if (dvdY.value + dvdHeight.value > viewHeight.value) {
    dvdY.value = viewHeight.value - dvdHeight.value
    directionY = -1
  } else if (dvdY.value <= 0) {
    dvdY.value = 0
    directionY = 1
  }

  if (dvdWidth.value === viewWidth.value) {
    dvdX.value = 0
    directionX = 0
  } else if (dvdX.value + dvdWidth.value > viewWidth.value) {
    dvdX.value = viewWidth.value - dvdWidth.value
    directionX = -1
  } else if (dvdX.value <= 0) {
    dvdX.value = 0
    directionX = 1
  }

  dvdX.value += directionX * dt * speed
  dvdY.value += directionY * dt * speed 

  requestAnimationFrame(gameLoop)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === '=') {
    if (speed === 0) return speed = 1
    speed *= 2
  } else if (e.key === '-') {
    if (speed === 1) return speed = 0
    speed /= 2
  }
}

onMounted(() => {
  initViewSize()
  
  gameLoop()

  window.addEventListener('resize', initViewSize)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', initViewSize)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
.square {
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>