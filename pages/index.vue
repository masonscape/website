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
    <hr>
    <a href="https://vuejs.org/" target="blank">
      <div class="image-text-group">
        <img src="https://github.com/vuejs/art/blob/master/logo.png?raw=true" class="image"> 
        <h2>This is my website, built using <span>Vue</span></h2>
        <img src="https://github.com/vuejs/art/blob/master/logo.png?raw=true" class="image"> 
      </div>
    </a>

    <a href="https://nuxt.com/" target="blank">
      <div class="image-text-group">
        <img src="https://nuxt.com/assets/design-kit/icon-green.svg" class="image">
        <h2>(or more specifically, <span>Nuxt</span>)</h2>
        <img src="https://nuxt.com/assets/design-kit/icon-green.svg" class="image">
      </div>
    </a>

    <a href="https://content.nuxt.com/" target="blank">
      <div class="image-text-group">
        <img src="https://nuxt.com/assets/design-kit/icon-white.svg" class="image">
        <h2>(or more specificallyer, <span>Nuxt Content</span>)</h2>
        <img src="https://nuxt.com/assets/design-kit/icon-white.svg" class="image">
      </div>
    </a>
    <hr>
    <h3>For now it's just a <NuxtLink to="/blog">blog</NuxtLink>, but expect to see more stuff here in the future!</h3>
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

.main-page > a {
  color: inherit;
  text-decoration: none;
  margin: 1em;
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
  color: var(--color-accent)
}

.image-text-group {
  display: flex;
  justify-content: center;
  align-content: center;
  width: fit-content;
  color: var(--color-secondary);
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