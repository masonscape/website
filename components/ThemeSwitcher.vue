<template>
  <button @click="handleClick" >
    <Icon name="material-symbols:palette-outline" class="theme-icon" />
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '~/store/theme'

const currentTheme = useTheme()

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

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme')
  const initialTheme = savedTheme ? JSON.parse(savedTheme) : document.documentElement.classList.contains('dark') ? themeList[0] : themeList[1]

  return initialTheme
}

const getNextTheme = (currentTheme: Theme): Theme => {
  const currentThemeIndex = themeNames.indexOf(currentTheme.name)
  const nextThemeIndex =
    currentThemeIndex === themeList.length - 1 // If current theme is the last theme in the list
      ? 0 // Cycle back to the beginning of the theme list
      : currentThemeIndex + 1 // Else go to the next theme in the list

  return themeList[nextThemeIndex]
}

const applyTheme = (theme: Theme) => {
  console.log(theme)
  document.documentElement.style.setProperty('--color-primary', '#' + theme.primary)
  document.documentElement.style.setProperty('--color-secondary', '#' + theme.secondary)
  document.documentElement.setAttribute('is-special-theme', (theme.name !== 'dark' && theme.name !== 'light').toString())

  document.documentElement.classList.toggle('dark', theme.dark)
  document.documentElement.classList.toggle('light', !theme.dark)

  localStorage.setItem('theme', JSON.stringify(theme))
}

const cycleTheme = (currentTheme: Theme): Theme => {
  const nextTheme = getNextTheme(currentTheme)

  currentTheme = nextTheme
  applyTheme(nextTheme)

  return nextTheme
}


const handleClick = () => {
  if (!currentTheme.value) return

  currentTheme.value = cycleTheme(currentTheme.value)
}

onMounted(() => {
  currentTheme.value = getInitialTheme()
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
