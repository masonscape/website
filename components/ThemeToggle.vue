<template>
  <button @click="toggleTheme" >
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
button {
  all: unset;
}

.theme-icon {
  padding: 0px;
  margin: 0px;
  width: 70%;
  height: 70%;
}
</style>
