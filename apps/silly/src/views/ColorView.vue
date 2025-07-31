<template>
  <div class="color-div" :style="{ backgroundColor: finalColor }">
    <div class="info-div">
      <h1 class="final-color">{{ finalColor }}</h1>
      <p v-for="color in colors.filter(color => color.score! > 0)" class="color-percentage">{{ `${color.name}: ${(color.score! * 100).toFixed(0)}%` }}</p>
    </div>
    <textarea v-model="colorInput" ref="colorRef" type="text" placeholder="Type your color combo..." class="color-input" spellcheck=false></textarea>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import Fuse from 'fuse.js'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const colors: Ref<{ name: string, hex: string, score?: number }[]> = ref([
  { name: 'red', hex: '#ff0000' },
  { name: 'green', hex: '#00ff00' },
  { name: 'lime', hex: '#32cd32' },
  { name: 'blue', hex: '#0000ff' },
  { name: 'yellow', hex: '#ffff00' },
  { name: 'orange', hex: '#ff8000' },
  { name: 'cyan', hex: '#00ffff' },
  { name: 'teal', hex: '#008080' },
  { name: 'pink', hex: '#ff69b4' },
  { name: 'magenta', hex: '#ff00ff' },
  { name: 'purple', hex: '#8000ff' },
  { name: 'violet', hex: '#8a2be2' },
  { name: 'brown', hex: '#a52a2a' },
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#ffffff' },
  { name: 'gray', hex: '#808080' },
  { name: 'lavender', hex: '#d3d3ff' },
  { name: 'beige', hex: '#f5f5dc' },
  { name: 'tan', hex: '#d2b48c' },
  { name: 'gold', hex: '#ffd700' },
  { name: 'silver', hex: '#c0c0c0' },
  { name: 'bronze', hex: '#cd7f32' },
  { name: 'navy', hex: '#000080' },
  { name: 'olive', hex: '#808000' },
  { name: 'peach', hex: '#ffe5b4' },
  { name: 'salmon', hex: '#fa8072' },
  { name: 'mint', hex: '#98ff98' },
  { name: 'turquoise', hex: '#40e0d0' },
  { name: 'maroon', hex: '#800000' },
  { name: 'indigo', hex: '#4b0082' },
  { name: 'plum', hex: '#dda0dd' },
  { name: 'ruby', hex: '#e0115f' },
  { name: 'amber', hex: '#ffbf00' },
  { name: 'cerulean', hex: '#007ba7' },
  { name: 'copper', hex: '#b87333' },
  { name: 'scarlet', hex: '#ff2400' },
])

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const finalColor = computed(() => {
  let [totalR, totalG, totalB] = [0, 0, 0]
  let numColors = 0
  let weightSum = 0
  const highestScore = Math.max(...colors.value.map(color => color.score ?? 0))
  if (highestScore === 0) return '#000000'

  colors.value.forEach(color => {
    const rgb = hexToRgb(color.hex)
    if (!rgb || !color.score) return

    const { r, g, b } = rgb
    const weight = color.score / highestScore
    weightSum += weight

    totalR += r * weight
    totalG += g * weight
    totalB += b * weight
    numColors += 1
  })

  const [averageR, averageG, averageB] = [totalR, totalG, totalB].map(color => color / weightSum)

  return rgbToHex(averageR, averageG, averageB)
})

const fuse = new Fuse(colors.value, {
  keys: ['name'],
  includeScore: true,
  threshold: 0.3
})

const colorInput = ref(route.query.input?.toString() ?? '')
const colorRef = ref<HTMLElement>()

const handleNewInput = (newVal: string) => {
  console.log('handling', newVal)
  // router.replace({ path: 'color', query: { input: newVal }})
  const normalizedInput = newVal.replace(/ /g, '')
  const scoreMap = new Map<string, number>()
  const windowSizes = [3, 4, 5] // experiment with different window sizes

  for (const size of windowSizes) {
    for (let i = 0; i <= normalizedInput.length - size; i++) {
      const substr = normalizedInput.slice(i, i + size)
      const matches = fuse.search(substr)

      for (const match of matches) {
        const name = match.item.name
        const existing = scoreMap.get(name) ?? 0
        const sizeWeight = Math.pow(size, 1.5) // or Math.pow(size, 1.5), etc.
        const positionWeight = 1 / (i + 1)
        const matchStrength = 1 - (match.score ?? 1)
        const contribution = matchStrength * positionWeight * sizeWeight
        scoreMap.set(name, existing + contribution)
      }
    }
  }

  // Normalize the scores so they add up to 1
  const totalScore = Array.from(scoreMap.values()).reduce((a, b) => a + b, 0)

  colors.value = colors.value.map(color => {
    const rawScore = scoreMap.get(color.name) ?? 0
    const normalized = totalScore > 0 ? rawScore / totalScore : 0
    return {
      ...color,
      score: Number(normalized.toFixed(2))
    }
  })
}

watch(colorInput, (newVal) => {
  handleNewInput(newVal)
})

onMounted(() => {
  document.title = 'create some colors!'

  handleNewInput(colorInput.value)
  colorRef.value?.focus()
})

</script>

<style>
.color-div {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-family: monospace;
}

.info-div {
  position: absolute;
  left: 0; top: 0;
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 1em;

  font-size: 1.6em;

  width: 15vw;
  height: 100vh;
}

.color-percentage {
  margin: 0;
}

.color-input {
  text-align: center;
  width: 16em;
  height: 2.4em;
  border: none;
  outline: none;
  font-size: 1.2em;
}

</style>