<script setup>

</script>

<template>
  <footer class="footer">
    <h1>footer</h1>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  background-color: var(--color-primary);
  grid-area: footer;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;

  border-top: 1px var(--color-tertiary) solid
}
</style>