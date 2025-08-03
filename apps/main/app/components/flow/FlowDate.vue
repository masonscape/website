<template>
  <time class="time" :datetime="date">
    {{ date }}
  </time>
</template>

<script setup lang="ts">
defineProps<{
  date: string
}>()
</script>

<style scoped>
.time {
  font-size: 0.9em;
  color: var(--color-secondary-70)
}
</style>