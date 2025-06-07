<script setup lang="ts">
defineProps<{ src: string, alt?: string }>()

const fullscreenImage = ref(false)

const showImage = (show: boolean) => {
  fullscreenImage.value = show
} 
</script>

<template>
  <div v-if="fullscreenImage" class="fullscreen">
    <div class="x" @click="() => showImage(false)">
      +
    </div>
    <div class="background" @click="() => showImage(false)" />
    <img class="fullscreen-image" :src="'../' + src">
  </div>
  <figure class="image-container">
    <img class="image" :src="'../' + src" @click="() => showImage(true)">
    <figcaption class="caption">{{ alt }}</figcaption>
  </figure>
</template>

<style>
.fullscreen {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0; left: 0;
  z-index: 5000;
}

.x {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4em;
  right: 1em;
  top: 1em;
  width: 1.2em;
  height: 1.2em;
  z-index: 5001;

  text-align: center;
  text-justify: center;

  background-color: var(--color-primary);
  color: var(--color-secondary);

  outline: 1px solid var(--color-secondary);
  border-radius: 100%;

  /* we use a plus sign and rotate it 45 degrees to make it a perfect X */
  transform: rotate(45deg);
}


.background {
  position: fixed;
  outline: 1px solid white;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.fullscreen-image {
  z-index: 5001;
  max-width: 70%;
  max-height: 70%;
}

.image-container {
  width: 80%;
  padding: 1em;
  margin: 2em auto 2em auto;
  background-color: var(--color-primary-2);
}

.image {
  width: 100%;
  cursor: pointer;
}

.caption {
  padding: 0.5em;
  font-style: italic;
}
</style>