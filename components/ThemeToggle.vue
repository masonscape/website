<template>
  <button class="theme-toggle" @click="toggleTheme" >
    <Icon v-if="isDarkMode" name="mdi:moon-and-stars" class="theme-icon" />
    <Icon v-else name="mdi:white-balance-sunny" class="theme-icon" />
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue"

const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  document.documentElement.setAttribute("data-theme", isDarkMode.value ? "dark" : "light")
}

// Check for saved theme on load
onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  isDarkMode.value = savedTheme === "dark"
  document.documentElement.setAttribute("data-theme", savedTheme)
})
</script>

<style scoped>
.theme-toggle {
  --theme-toggle-size: 40px;
  --theme-toggle-margin: calc((var(--header-height) - var(--theme-toggle-size)) / 2);

  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: none;
  cursor: pointer;
  width: var(--theme-toggle-size);
  height: var(--theme-toggle-size);

  border-radius: calc(infinity * 1px);

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: var(--theme-toggle-margin);
}

.theme-icon {
  padding: 0px;
  margin: 0px;
  width: 70%;
  height: 70%;
}
</style>
