<template>
  <a :href="href" class="button">
    <Icon :name="icon" class="button-icon" :target="target"/>
  </a>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  target: {
    type: String,
    default: '_self'
  }
})
</script>

<style scoped>
.button-icon {
  color: var(--color-secondary);
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}

.button {
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
</style>
