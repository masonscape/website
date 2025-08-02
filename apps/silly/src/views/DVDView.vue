<template>
  <div class="square" :style="{ top: dvdY + 'px', left: dvdX + 'px', position: 'absolute' }">
    <img src="@packages/assets/MasonSquare.svg" width="100" height="100"></img>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const viewWidth = ref<number | null>(null)
const viewHeight = ref<number | null>(null)

const dvdX = ref(0)
const dvdY = ref(0)

// directionX is 1 if it should be moving to the right, and -1 if it should be moving to the left
// same with directionY
let directionX = 1
let directionY = 1

let speed = 100

const initViewSize = () => {
  console.log(`setting screen size to ${window.innerWidth}, ${window.innerHeight}`)
  viewWidth.value = window.innerWidth
  viewHeight.value = window.innerHeight
}

const addTrail = (x: number, y: number) => {
  const trail = document.createElement('div')
  trail.style.width = '5px'
  trail.style.height = '5px'
  trail.style.position = 'absolute'
  trail.style.top = `${y + 50}px`
  trail.style.left = `${x + 50}px`
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

  if (dvdY.value + 100 > viewHeight.value) {
    directionY = -1
  } else if (dvdY.value < 0) {
    directionY = 1
  }

  if (dvdX.value + 100 > viewWidth.value) {
    directionX = -1
  } else if (dvdX.value < 0) {
    directionX = 1
  }

  dvdX.value += directionX * dt * speed
  dvdY.value += directionY * dt * speed 

  requestAnimationFrame(gameLoop)
}

const handleKeydown = (e: KeyboardEvent) => {
  console.log(e.key)
  if (e.key === '=') {
    speed += 10
  } else if (e.key === '-') {
    if (speed < 10) return speed = 0
    speed -= 10
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
  width: 100px;
  height: 100px;
}
</style>