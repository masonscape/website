<template>
  <div class="game-area">
    <div
      v-for="user in users"
      :key="user.id"
      class="user-dot"
      :style="{
        left: user.x - user.size / 2 + 'px',
        top: user.y - user.size / 2 + 'px',
        width: user.size + 'px',
        height: user.size + 'px',
        background: user.color,
      }"
    />
    <!-- myUser comes after every other user so that it shows up always on top -->
    <div
      v-if="myUser"
      class="user-dot"
      :style="{
        left: myUser.x - myUser.size / 2 + 'px',
        top: myUser.y - myUser.size / 2 + 'px',
        width: myUser.size + 'px',
        height: myUser.size + 'px',
        background: myUser.color,
        border: '2px solid #fff'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/game'

definePageMeta({
  layout: false
})

const users = ref<User[]>([]) // all users except me
const currentlyPressingList = new Set()
const myId = ref<string | null>(null)
const myUser = ref<User | null>(null)

const { data, send } = useWebSocket('/api/game', { autoReconnect: true })

watch(data, (raw) => {
  if (!raw) return
  const msg = JSON.parse(raw)
  if (msg.type === 'welcome') {
    myId.value = msg.id
  } else if (msg.type === 'init') {
    if (!myId.value) return
    const mine = msg.users.find((u: User) => u.id === myId.value)
    if (mine) myUser.value = { ...mine }
    users.value = msg.users.filter((u: User) => u.id !== myId.value)
  } else if (msg.type === 'users') {
    if (!myId.value) return
    // Only update myUser if it doesn't exist yet (for reconnect edge cases)
    const mine = msg.users.find((u: User) => u.id === myId.value)
    if (mine && !myUser.value) {
      myUser.value = { ...mine }
    }
    users.value = msg.users.filter((u: User) => u.id !== myId.value)
  }
})

const isPressing = (key: string) => currentlyPressingList.has(key)

const move = (dx: number, dy: number) => {
  if (!myUser.value || !myId.value) return
  myUser.value.x += dx
  myUser.value.y += dy
  send(JSON.stringify({
    type: 'move',
    id: myId.value,
    x: myUser.value.x,
    y: myUser.value.y
  }))
}

let lastTime = performance.now()

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000 // seconds
  lastTime = currentTime

  const speed = 300 // pixels per second
  const distance = speed * deltaTime

  const moveVector = { x: 0, y: 0}

  if (isPressing('ArrowUp') || isPressing('w')) {
    moveVector.y -= distance
  }
  if (isPressing('ArrowDown') || isPressing('s')) {
    moveVector.y += distance
  }
  if (isPressing('ArrowLeft') || isPressing('a')) {
    moveVector.x -= distance
  }
  if (isPressing('ArrowRight') || isPressing('d')) {
    moveVector.x += distance
  }

  // Update position
  move(moveVector.x, moveVector.y)

  requestAnimationFrame(update)
}


onMounted(() => {
  window.addEventListener('keydown', (e) => {
    currentlyPressingList.add(e.key)
  })

  window.addEventListener('keyup', (e) => {
    currentlyPressingList.delete(e.key)
  })

  requestAnimationFrame(update)

})
</script>

<style scoped>
.game-area {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
}
.user-dot {
  position: absolute;
  border-radius: 4px;
}
</style>