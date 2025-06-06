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
</script>

<style>
body {
  width: 100vw;
  min-height: 100vh;
}

main {
  flex: 1;
  margin-top: 3em;
  margin-bottom: 3em;
}

a {
  color: var(--color-accent);
}

.default {
  --header-height: 4em;
  --button-size: calc(var(--header-height) / 2);

  font-size: 16px;

  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  color: var(--color-secondary);
  font-family: Helvetica, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  align-items: center;
  justify-content: center;
  position: relative;

  overflow-x: hidden;
}
</style>
