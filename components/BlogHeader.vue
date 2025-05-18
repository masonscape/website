<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="name">
      <img class="picture" src="public/MasonCircle.svg">
      <h1 class="masonlane">mason lane</h1>
    </div>
    <div class="button-list">
      <LinkButton class="button" icon="grommet-icons:github" href="https://github.com/mason8592/blog" target="_blank"/>
      <ThemeSwitcher class="button"/>
    </div>
  </header>
</template>

<style scoped>
.header {
  --button-size: calc(var(--header-height) / 2);
  --button-margin: calc((var(--header-height) - var(--button-size)) / 2);

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

.button {
  background-color: var(--color-primary-16);
  color: var(--color-primary);
  border: none;
  cursor: pointer;
  width: var(--button-size);
  height: var(--button-size);

  border-radius: var(--button-size);

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: var(--button-margin);
}

.name {
  margin-left: var(--button-margin);
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.masonlane {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 50cqh;
}

.picture {
  width: 60cqh;
  height: 60cqh;
  clip-path: circle(50%);
}


@media (max-width: 20em) {
  .masonlane {
    display: none
  }
}
</style>