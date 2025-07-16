<script setup lang="ts">
const rotation = ref(0)
defineProps<{ pagetype: string }>()

onMounted(() => {
  document.title = 'Page not found'
})

const handleClick = () => {
  rotation.value += 10
}
</script>

<template>
  <div
    class="error" 
    :style="{
      transform: `rotate(${rotation}deg)`
    }"
    @click="handleClick"
  >
    <h1>That {{ pagetype }} doesn't exist.</h1>
    <h2>I think I know what will make you feel better! Click on me!</h2>
    <h3 v-if="rotation > 0">Rotation: {{ rotation }}°</h3>
    <h4 v-if="rotation >= 360">Spins: {{ Math.floor(rotation / 360) }}</h4>
    <h5 v-if="rotation >= 1800">ok you win go do something else with your time</h5>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
  user-select: none;
}
</style>