<script setup lang="ts">
import type { Entity, Player, Vector2 } from '@packages/types/game'
import GameCanvas from '@/components/GameCanvas.vue'
import { computed, onMounted, onUnmounted } from 'vue';
import { createEntity } from '@/assets/utils/entity';

const props = defineProps<{
  player: Player,
  entities: Entity[]
}>()

const keysPressed = new Set()

const handleKeydown = (e: KeyboardEvent) => {
  keysPressed.add(e.key)
}

const handleKeyup = (e: KeyboardEvent) => {
  keysPressed.delete(e.key)
}

const movePlayer = () => {
  const speed = 1000

  let tempX = 0
  let tempY = 0

  if (keysPressed.has('ArrowUp')) {
    tempY -= speed
  }
  if (keysPressed.has('ArrowDown')) {
    tempY += speed
  }
  if (keysPressed.has('ArrowLeft')) {
    tempX -= speed
  }
  if (keysPressed.has('ArrowRight')) {
    tempX += speed
  }

  props.player.velocity = {
    x: tempX,
    y: tempY
  }
}

const applyFriction = (vector: Vector2, friction: number, dt: number): Vector2 => {
  const frictionFactor = Math.pow(friction, dt)

  const newVectors: Vector2 = {
    x: vector.x * frictionFactor,
    y: vector.y * frictionFactor
  }

  return {
    x: Math.abs(newVectors.x) >= 0.01 ? newVectors.x : 0,
    y: Math.abs(newVectors.y) >= 0.01 ? newVectors.y : 0
  }  
}

// euler integration
const integrate = (vector1: Vector2, vector2: Vector2, dt: number): Vector2 => {
  return {
    x: vector1.x + vector2.x * dt,
    y: vector1.y + vector2.y * dt
  }
}

const tickEntity = (dt: number) => {
  [...props.entities, props.player].forEach(entity => {
    // integrate velocity
    entity.velocity = integrate(entity.velocity, entity.acceleration, dt)

    // apply friction to velocity
    entity.velocity = applyFriction(entity.velocity, 0.9, dt)

    // update position based on velocity
    entity.position = integrate(entity.position, entity.velocity, dt)
  })
}

let lastTime = performance.now()
let timeLastSpawnedBullets = performance.now()

const gameLoop = () => {
  let now = performance.now()
  let delta = now - lastTime
  let deltaTime = delta / 1000
  lastTime = now

  if (now - timeLastSpawnedBullets >= 800) {
    timeLastSpawnedBullets = now

    ;[-1, 1].forEach(a => {
      [-1, 1].forEach(b => {
        props.entities.push(createEntity({
          id: "5",
          type: "npc",
          position: {
            x: 1920,
            y: 1080
          },
          acceleration: {
            x: 200 * a,
            y: 200 * b
          },
          color: '#ff0000'
        }))
      })
    })
  }

  movePlayer()
  tickEntity(deltaTime)

  requestAnimationFrame(gameLoop)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)

  gameLoop()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})

</script>

<template>
  <GameCanvas :player="props.player" :entities="props.entities" />
</template>