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
    <a class="logolink" href="/">
      <div class="logo">
        <div class="picture-wrapper">
          <div class="placeholder-logo"/>
          <img v-if="typeof isSpecialTheme === 'boolean' && !isSpecialTheme" class="picture" src="public/MasonCircle.svg">
          <MasonPicture v-else class="picture" />
        </div>
      </div>
    </a>
    <div class="button-list">
      <ThemeSwitcher class="button"/>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  container-type: size;
  background-color: var(--color-primary-2);
  width: 100%;
  top: 0;
  height: var(--header-height);
  z-index: 1000;

  border-bottom: 1px var(--color-tertiary) solid
}

.button-list {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;

  display: flex;
}

.logolink {
  text-decoration: none;
  color: var(--color-secondary);
  height: var(--header-height);
  min-width: var(--header-height);
  max-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.placeholder-logo {
  background: var(--color-secondary);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
}

html[is-special-theme="false"] .placeholder-logo {
  background: linear-gradient(#00c0ff, #0048ff)
}

.picture-wrapper {
  width: 60cqh;
  height: 60cqh;
}

.picture {
  width: 60cqh;
  height: 60cqh;
  clip-path: circle(50%);
}


@media (max-width: 20em) {
  .masonscape {
    display: none
  }
}
</style>