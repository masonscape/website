<template>
  <div class="game-container">
    <div
      v-if="myUser && debugMode"
      class="debug-overlay"
    >
      <h1 v-for="entity in allEntities" :key="entity.type + entity.id">
        {{ entity }}
      </h1>
    </div>
    <canvas ref="canvasRef" class="canvas" width="3840" height="2160" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'game',
  meta: [
    { property: 'og:title', content: 'a silly game about squares' },
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
    { name: 'theme-color', content: '#0090ff' }
  ]
})

const entities = ref<Entity[]>([])
const myUser = ref<Player | null>(null)
const myId = ref<string | null>(null)
const canvasRef = ref<HTMLCanvasElement>()
const ctxRef = computed(() => canvasRef.value?.getContext('2d'))
const keysPressed = new Set<string>()

const debugMode = ref(false)
const orbitMode = ref(false)

const { data, send } = useWebSocket('/api/game', { autoReconnect: true })

const allEntities = computed(() =>
  myUser.value ? [...entities.value, myUser.value] : entities.value
)

watch(data, (raw) => {
  if (!raw) return
  const msg = JSON.parse(raw)

  if (msg.type === 'welcome') {
    myId.value = msg.id
    return
  }

  if (msg.type === 'users' && myId.value) {
    const serverEntities = msg.users as Entity[]
    const player = serverEntities.find(u => u.id === myId.value && u.type === 'player') as Player
    if (player && !myUser.value) myUser.value = { ...player }
    entities.value = serverEntities.filter(e => !(e.id === myId.value && e.type === 'player'))
  }
})

const isKeyDown = (key: string) => keysPressed.has(key)

let lastFrameTime = performance.now()

function updateFrame() {
  const now = performance.now()
  const dt = (now - lastFrameTime) / 1000
  lastFrameTime = now

  if (!myUser.value) {
    requestAnimationFrame(updateFrame)
    return
  }

  const moveVector = getInputVector()
  accelerateEntity(myUser.value, moveVector, 1000)

  // Find this user's NPC by id
  const myEnemy = entities.value.find(e => e.id === findNpcIdFromPlayerId(myUser.value!.id))
  if (myEnemy && orbitMode.value) {
    accelerateEntityTowardsCoordinates(myUser.value, myEnemy.position)
  }

  tickEntity(myUser.value, dt)
  render()

  send(JSON.stringify({
    type: 'state',
    id: myUser.value.id,
    position: myUser.value.position,
    velocity: myUser.value.velocity,
    acceleration: myUser.value.acceleration
  }))

  requestAnimationFrame(updateFrame)
}

watch(myUser, (val) => {
  if (val) requestAnimationFrame(updateFrame)
})

function getInputVector(): Vector2 {
  const accelerationStrength = 30000
  const vector = { x: 0, y: 0 }

  if (isKeyDown('ArrowUp')) vector.y -= accelerationStrength
  if (isKeyDown('ArrowDown')) vector.y = accelerationStrength
  if (isKeyDown('ArrowLeft')) vector.x -= accelerationStrength
  if (isKeyDown('ArrowRight')) vector.x += accelerationStrength

  return vector
}

function render() {
  const canvas = canvasRef.value
  const ctx = ctxRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const entity of allEntities.value) {
    if (!myUser.value) return

    drawEntity(ctx, entity, entity.id.startsWith(myUser.value.id))
  }
}

function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity, belongsToUser: boolean) {
  const { position, size, color, velocity, acceleration } = entity

  if (belongsToUser) {
    const outline = size * 1.1
    ctx.fillStyle = '#fff'
    ctx.fillRect(position.x - outline / 2, position.y - outline / 2, outline, outline)
  }

  ctx.fillStyle = color
  ctx.fillRect(position.x - size / 2, position.y - size / 2, size, size)

  if (debugMode.value) {
    drawVector(ctx, position, velocity, 10, '#00ff00')
    drawVector(ctx, position, acceleration, 100, '#0000ff')
  }
}

function drawVector(ctx: CanvasRenderingContext2D, origin: Vector2, vector: Vector2, scale: number, color: string) {
  const mag = Math.sqrt(vector.x ** 2 + vector.y ** 2)
  if (mag < 0.01) return

  ctx.beginPath()
  ctx.moveTo(origin.x, origin.y)
  ctx.strokeStyle = color
  ctx.lineTo(origin.x + vector.x * scale, origin.y + vector.y * scale)
  ctx.stroke()
}

onMounted(() => {
  window.addEventListener('keydown', e => {
    keysPressed.add(e.key)

    if (!myUser.value) return

    if (e.key === 'd') {
      debugMode.value = !debugMode.value
    }

    if (e.key === 'o') {
      if (orbitMode.value) {
        orbitMode.value = false

        myUser.value = {
          ...myUser.value,
          velocity: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 }
        }
      } else {
        orbitMode.value = true
      }
    }
  })

  window.addEventListener('keyup', e => {
    keysPressed.delete(e.key)
  })

  window.addEventListener('mousedown', e => {
    if (!myUser.value || !canvasRef.value) return

    const canvas = canvasRef.value
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    myUser.value = {
      ...myUser.value,
      position: {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 }
    }
  })
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
}
.canvas {
  aspect-ratio: 16 / 9;
  max-width: 100%;
  max-height: 100%;
  background-color: black;
}
.debug-overlay {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  z-index: 1;
}

.debug-overlay h1 {
  font-size: 0.5em;
}
</style>