<script setup lang="ts">
defineProps<{
  thought: FlowThought
  liked: boolean | null
}>()
</script>

<template>
  <NuxtLink :to="`/flow/${thought.id}`" class="thought-link">
    <FlowThought :thought="thought" :liked="liked"/>
  </NuxtLink>
</template>

<style scoped>
a {
  text-decoration: inherit;
  color: inherit;
  margin: 0;
}
</style>