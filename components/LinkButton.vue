<template>
  <a :href="href">
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
  padding: 0px;
  margin: 0px;
  width: 70%;
  height: 70%;
  background-color: var(--color-primary-2);
}
</style>
