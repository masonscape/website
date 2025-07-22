<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const drawStatic = (x: number, y: number) => {
  const ctx = ctxRef.value
  if (!ctx) return

  ctx.fillStyle = Math.random() > 0.5 ? 'black' : 'white'
  ctx.fillRect(x, y, 1, 1)
}

const fillPageWithStatic = () => {
  for (let x = 0; x <= canvasWidth.value; x++) {
    for (let y = 0; y <= canvasHeight.value; y++) {
      drawStatic(x, y)
    }
  }
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const width = window.innerWidth
  const height = window.innerHeight

  canvas.width = width
  canvasWidth.value = width
  canvas.height = height
  canvasHeight.value = height
}

watch([canvasWidth, canvasHeight], () => {
  fillPageWithStatic()
})

onMounted(() => {
  handleResize()
})
</script>

<template>
  <main>
    <canvas class="canvas" ref="canvasRef" />
  </main>
</template>

<style scoped>
.canvas {
  background-color: black;
  z-index: 10000;

  overflow: hidden;

  image-rendering: optimizeSpeed;
}
</style>