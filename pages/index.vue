<script setup lang="ts">
onMounted(() => {
  document.title = 'masonscape.dev'
})
</script>

<template>
  <div class="main-page">
    <h1>Welcome to the masonscape!</h1>
    <h2>This is a placeholder page. I'll add some cool stuff later.</h2>
    <h3>For now, check out the <NuxtLink to="/blog">blog!</NuxtLink></h3>
  </div>
</template>

<style>
.main-page {
  text-align: center;
}
</style>