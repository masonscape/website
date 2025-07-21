<template>
  <div class="game-container">
    <canvas ref="canvasRef" class="canvas" width="3840" height="2160" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Entity, Player } from '@packages/types/game'

const props = defineProps<{
  entities: Entity[],
  player?: Player
}>()

const canvasRef = ref<HTMLCanvasElement>()
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))

function updateFrame() {
  render()

  requestAnimationFrame(updateFrame)
}

function render() {
  const canvas = canvasRef.value
  const ctx = ctxRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const entity of [...props.entities, props.player]) {
    if (!entity) return
    drawEntity(ctx, entity)
  }
}

function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity) {
  const { position, size, color } = entity

  if (entity.type === 'player') {
    const outlineScale = 1.1
    const outlineSize = entity.size * outlineScale

    ctx.fillStyle = 'white'
    ctx.fillRect(position.x - outlineSize / 2, position.y - outlineSize / 2, outlineSize, outlineSize)
  }
  
  ctx.fillStyle = color
  ctx.fillRect(position.x - size / 2, position.y - size / 2, size, size)
}

onMounted(() => {
  updateFrame()
})
</script>

<style scoped>
.game-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #121212
}
.canvas {
  aspect-ratio: 16 / 9;
  max-width: 100%;
  max-height: 100%;
  background-color: black;
}
</style>