<script setup lang="ts">
onMounted(() => {
  document.title = 'masonscape'
})
</script>

<template>
  <div class="main-page">
    <div class="image-text-group">
      <img src="public/MasonCircle.svg" class="image">
      <h1>Welcome to the masonscape!</h1>
      <img src="public/MasonCircle.svg" class="image">
    </div>
    <NuxtLink to="/blog" class="bloglink">Click here to visit the blog!</NuxtLink>
    <hr>
    
    <div class="image-text-group">
      <img src="public/Vue.svg" class="image"> 
      <h2>This is my website, built using <a href="https://vuejs.org/" target="blank">Vue</a></h2>
      <img src="public/Vue.svg" class="image"> 
    </div>
  
    <div class="image-text-group">
      <img src="public/NuxtGreen.svg" class="image">
      <h2>(or more specifically, <a href="https://nuxt.com/" target="blank">Nuxt</a>)</h2>
      <img src="public/NuxtGreen.svg" class="image">
    </div>

    <div class="image-text-group">
      <img src="public/NuxtWhite.svg" class="image">
      <h2>(or more specificallyer, <a href="https://content.nuxt.com/" target="blank">Nuxt Content</a>)</h2>
      <img src="public/NuxtWhite.svg" class="image">
    </div>
    <hr>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80vw;
  color: var(--color-secondary)
}

.bloglink {
  font-size: 1.5em;
  padding: 1em;
  margin-bottom: 1em;
  background-color: var(--color-accent);
  border-radius: 2em;
  text-decoration: none;
  color: var(--color-secondary);
}

.bloglink:hover {
  background-color: color-mix(in srgb, var(--color-accent) 80%, var(--color-primary) 20%);
  transform: scale(110%);
}

h1 {
  margin-left: 1em;
  margin-right: 1em;
}

h1, h2, h3 {
  align-content: center;
}

h2 {
  margin: 0.5em;
}

span {
  color: var(--color-accent);
  text-decoration: underline solid var(--color-accent)
}

hr {
  width: 80vw;
  margin: 1em;
  color: var(--color-primary-2)
}

.image-text-group {
  display: flex;
  justify-content: center;
  align-content: center;
  width: fit-content;
  color: var(--color-secondary);
  margin: 1em;
}

.image {
  margin-top: auto;
  margin-bottom: auto;
  width: 3em;
  height: 3em;
  visibility: hidden;
}

.image-text-group:hover .image {
  visibility: visible;
}
</style>