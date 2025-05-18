<template>
  <header class="title">
    <h1 class="title-text">{{ title }}</h1>
    <h2>test</h2>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.title {
  margin-top: 3em;
  margin-bottom: 5em;
  border-bottom: 1px var(--color-tertiary) solid
}

.title-text {
  margin: 0;
  font-size: 2em;
}
</style>