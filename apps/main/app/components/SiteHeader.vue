<script setup lang="ts">
const isSpecialTheme = ref<null | boolean>(null)

onMounted(() => {
  const targetNode = document.documentElement

  const updateIsSpecialTheme = () => {
    isSpecialTheme.value = targetNode.getAttribute('is-special-theme') === 'true'
  }

  updateIsSpecialTheme()

  const observer = new MutationObserver(() => {
    updateIsSpecialTheme()
  })

  observer.observe(targetNode, {
    attributes: true,
    attributeFilter: ['is-special-theme'],
  })
})
</script>

<template>
  <header class="header">
    <NuxtLink class="logolink" href="/">
      <div class="logo">
        <div class="picture-wrapper">
          <div class="placeholder-logo"/>
          <img v-if="typeof isSpecialTheme === 'boolean' && !isSpecialTheme" class="picture" src=/MasonCircle.svg>
          <MasonPicture v-else class="picture" />
        </div>
      </div>
      <p class="wordmark">masonscape</p>
    </NuxtLink>
    <div class="header-links">
      <NuxtLink class="header-link" href="/blog">
        Blog
      </NuxtLink>
    </div>
    <div class="button-list">
      <ThemeSwitcher class="button"/>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  container-type: size;
  background-color: var(--color-primary-95);
  width: 100%;
  top: 0;
  height: var(--header-height);
  z-index: 1000;

  border-bottom: 1px var(--color-primary-70) solid
}

.button-list {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;

  display: flex;
}

.header-links {
  position: absolute;
  font-size: 1.1em;
}

.header-link {
  color: var(--color-secondary) 70%;
  padding: 1em;
  text-decoration: none;
}

.logolink {
  text-decoration: none;
  color: var(--color-secondary);
  height: var(--header-height);
  max-width: fit-content;
  display: flex;
  align-items: center;

  padding-left: 1em;
  padding-right: 1em;

  gap: 0.8rem;
}

.wordmark {
  font-size: 1.6em;
  font-weight: 700;
  color: var(--color-secondary);
}

.logo {
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-logo {
  background: var(--color-secondary);
  border-radius: 50%;
  width: 99%;
  height: 99%;
  position: absolute;
}

html[is-special-theme="false"] .placeholder-logo {
  background: linear-gradient(#00c0ff, #0048ff)
}

.picture-wrapper {
  width: 60cqh;
  height: 60cqh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picture {
  width: 60cqh;
  height: 60cqh;
  clip-path: circle(50%);
}


@media (max-width: 600px) {
  .wordmark {
    display: none
  }
}
</style>