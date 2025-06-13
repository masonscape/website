<template>
  <div class="default">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
useHead({
  meta: [
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
    { name: 'theme-color', content: '#0090ff' }
  ]
})
</script>

<style>
main {
  flex: 1;
  padding-top: 4em;
  padding-bottom: 4em;
}

.default {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: calc(1px + 100vh + var(--header-height));
  color: var(--color-secondary);

  align-items: center;
  justify-content: center;
  position: relative;

  overflow-x: hidden;
}
</style>
