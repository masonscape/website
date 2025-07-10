<script setup lang="ts">
useHead({
  title: 'masonscape',
  meta: [
    { name: 'description', content: 'welcome to the masonscape!' },
    { property: 'og:title', content: 'masonscape.com' },
    { property: 'og:description', content: 'welcome to the masonscape!' },
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
  ]
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
    
    <div class="image-text-group">
      <img src="public/Vue.svg" class="image"> 
      <h2>This is my website, built using <a href="https://vuejs.org/" target="blank">Vue</a></h2>
      <img src="public/Vue.svg" class="image"> 
    </div>
  
    <div class="image-text-group">
      <img src="public/Nuxt.svg" class="image">
      <h2>(or more specifically, <a href="https://nuxt.com/" target="blank">Nuxt</a>)</h2>
      <img src="public/Nuxt.svg" class="image">
    </div>

    <div class="image-text-group">
      <img src="public/Nuxt.svg" class="image">
      <h2>(or more specificallyer, <a href="https://content.nuxt.com/" target="blank">Nuxt Content</a>)</h2>
      <img src="public/Nuxt.svg" class="image">
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 90vw;
  color: var(--color-secondary);

  font-size: min(5vw, 1em)
}

.bloglink {
  font-size: 120%;
  padding: 1.2em;
  margin-bottom: 1em;
  background-color: var(--color-accent);
  border-radius: 2em;
  text-decoration: none;
  color: var(--color-secondary);
  max-width: 50%;
  max-height: 50%;
}

.bloglink:hover {
  background-color: color-mix(in srgb, var(--color-accent) 80%, var(--color-primary) 20%);
  transform: scale(110%);
}

h1, h2, h3 {
  align-content: center;
  margin: 0.5em;
}
span {
  color: var(--color-accent);
  text-decoration: underline solid var(--color-accent)
}

.image-text-group {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  color: var(--color-secondary);
  margin: 1em;
}

.image {
  margin-top: auto;
  margin-bottom: auto;
  width: 3em;
  height: 3em;
  aspect-ratio: 1;
  visibility: hidden;
}

.image-text-group:hover .image {
  visibility: visible;
}

@media (max-width: 640px) {
  .image {
    display: none;
  }
}
</style>