<template>
  <button @click="cycleTheme" >
    <Icon name="material-symbols:palette-outline" class="theme-icon" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

interface Theme {
  name: string,
  primary: string,
  secondary: string,
  dark: boolean
}

const themeList: Theme[] = [
  {
    name: 'dark',
    primary: '121212',
    secondary: 'ffffff',
    dark: true
  },
  {
    name: 'light',
    primary: 'ffffff',
    secondary: '000000',
    dark: false
  },
  {
    name: 'light-pink',
    primary: 'feb6ff',
    secondary: '510083',
    dark: false
  },
  {
    name: 'blue',
    primary: '244880',
    secondary: 'ffff00',
    dark: true
  }
]

const themeNames = themeList.map(theme => theme.name)

const currentTheme = ref<null | Theme>(null)

const getNextTheme = () => {
  if (!currentTheme.value) return

  const currentThemeIndex = themeNames.indexOf(currentTheme.value.name)
  const nextThemeIndex =
    currentThemeIndex === themeList.length - 1 // if current theme is the last theme in the list
      ? 0 // cycle back to the beginning of the theme list
      : currentThemeIndex + 1 // else go to the next theme in the list

  return themeList[nextThemeIndex]
}

const cycleTheme = () => {
  const nextTheme = getNextTheme()
  if (!nextTheme) return

  currentTheme.value = nextTheme

  document.documentElement.style.setProperty('--color-primary', '#' + currentTheme.value.primary)
  document.documentElement.style.setProperty('--color-secondary', '#' + currentTheme.value.secondary)

  document.documentElement.classList.toggle('dark', currentTheme.value.dark)
  document.documentElement.classList.toggle('light', !currentTheme.value.dark)
}

// Check for saved theme on load
onMounted(() => {
  currentTheme.value = document.documentElement.classList[0] === 'dark' ? themeList[0] : themeList[1]
})
</script>

<style scoped>
button {
  all: unset;
}

.theme-icon {
  padding: 0px;
  margin: 0px;
  width: 75%;
  height: 75%;
}
</style>
