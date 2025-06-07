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
body {
  width: 100vw;
  min-height: 100vh;
}

main {
  flex: 1;
  padding-top: 4em;
  padding-bottom: 4em;
}

a {
  color: var(--color-accent);
}

a:visited {
  color: color-mix(in srgb, var(--color-accent) 50%, black 50%)
}

a:hover {
  color: color-mix(in srgb, var(--color-accent) 50%, white 50%)
}

.default {
  --header-height: 4em;
  --button-size: calc(var(--header-height) / 2);

  font-size: 16px;

  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: calc(1px + 100vh + var(--header-height));
  color: var(--color-secondary);
  font-family: Helvetica, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  align-items: center;
  justify-content: center;
  position: relative;

  overflow-x: hidden;
}
</style>
