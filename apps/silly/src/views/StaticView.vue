<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const canvasWidth = ref(0)
const canvasHeight = ref(0)
const rainbowMode = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)


// const drawStatic = (x: number, y: number) => {
//   const ctx = ctxRef.value
//   if (!ctx) return

//   // if (rainbowMode.value) {
//   //   ctx.fillStyle = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
//   // } else {
//   //   ctx.fillStyle = Math.random() >= 0.5 ? 'black' : 'white'
//   // }

// const rawRed = x / 4
// const rawGreen = x % 255
// const rawBlue = 255

//   const [red, green, blue] = [rawRed, rawGreen, rawBlue].map(color => 
//     Math.abs(Math.floor(Number(color)))
//       .toString(16)
//       .padStart(2, '0')
//   )

//   console.log(red, green, blue)

//   ctx.fillStyle = `#${red + green + blue}`

//   ctx.fillRect(x, y, 1, 1)
// }

const fillPageWithStatic = () => {
  if (!canvasRef.value || !ctxRef.value) return

  const width = canvasWidth.value
  const height = canvasHeight.value

  const imageData = ctxRef.value.createImageData(width, height)
  const data = imageData.data

  const now = Math.random() * 1000
  const nowMod = (now) % 255

  const [mx, my] = [mouseX.value, mouseY.value]
  
  let i = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rawRed   = (x * y * mx * my % 255) * mx % 255
      const rawGreen = (x * y * mx * my % 255) * my % 255
      const rawBlue  = x * y * mx * my % 255
      
      data[i++] = Math.max(0, Math.min(255, rawRed))
      data[i++] = Math.max(0, Math.min(255, rawGreen))
      data[i++] = Math.max(0, Math.min(255, rawBlue))
      data[i++] = 255
    }
  }

  ctxRef.value.putImageData(imageData, 0, 0)
}

// const fillPageWithStatic = () => {
//   for (let x = 0; x <= canvasWidth.value; x++) {
//     for (let y = 0; y <= canvasHeight.value; y++) {
//       drawStatic(x, y)
//     }
//   }
// }

const initCanvasSize = (scale: number = 1) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const width = window.innerWidth * scale
  const height = window.innerHeight * scale

  canvas.width = width
  canvasWidth.value = width
  canvas.height = height
  canvasHeight.value = height
}

watch([canvasWidth, canvasHeight], () => {
  fillPageWithStatic()
})

const handleKeydown = (e: KeyboardEvent) => {
  console.log(e.key)
  if (e.key === ' ') {
    fillPageWithStatic()
  } else if (e.key === 'r') {
    console.log('switching rainbow mode to ', rainbowMode.value)
    rainbowMode.value = !rainbowMode.value
    fillPageWithStatic()
  }
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', handleMouseMove)

  const loopDraw = () => {
    fillPageWithStatic()

    requestAnimationFrame(loopDraw)
  }

  initCanvasSize()

  loopDraw()
})

onUnmounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <main>
    <canvas class="canvas" ref="canvasRef" />
  </main>
</template>

<style>
.canvas {
  background-color: black;

  image-rendering: optimizeSpeed;

  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
}
</style>