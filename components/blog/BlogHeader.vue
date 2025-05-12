<script setup>

</script>

<template>
  <header class="header">
    <div class="name">
      <img class="picture" src="public/MasonCircle.svg">
      <h1 class="masonlane">Mason Lane</h1>
    </div>
    <ThemeToggle class="theme-toggle"/>
  </header>
</template>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  grid-area: header;
  position: sticky;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;

  border-bottom: 1px var(--color-tertiary) solid
}

.theme-toggle {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.name {
  margin-left: auto;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.masonlane {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

.picture {
  width: calc(var(--header-height) * 0.5);
  height: calc(var(--header-height) * 0.5);
  clip-path: circle(50%);
}
</style>