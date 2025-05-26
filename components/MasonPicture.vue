<template>
  <canvas id="canvas" ref="canvasRef" class="mason" width="900" height="900" />
</template>

<script setup lang="ts">

const canvasRef = ref<null | HTMLCanvasElement>(null)
const secondaryColor = ref<null | string>(null)

function generateColorScale(
  originalHex: string,
  increment: { r: number, g: number, b: number }
): string[] {
  // Parse hex string into decimal values
  const hexToDec = (hex: string) => parseInt(hex, 16)
  
  // Convert decimal to 2-digit hex
  const decToHex = (dec: number) => Math.min(255, Math.max(0, dec)).toString(16).padStart(2, '0')
  
  // Remove # if present
  const cleanHex = originalHex.startsWith('#') ? originalHex.slice(1) : originalHex
  const fixedHex = cleanHex.length === 6 ? cleanHex : cleanHex.split('').map(char => `${char}${char}`).join('')
  
  // Get base components
  const baseR = hexToDec(fixedHex.substring(0, 2))
  const baseG = hexToDec(fixedHex.substring(2, 4))
  const baseB = hexToDec(fixedHex.substring(4, 6))
  
  // Multipliers for each position
  const darkMultipliers = [4, 5, 4, 3, 0, 3, 2, 1, 2]
  const lightMultipliers = [-1, 0, -1, -2, -5, -2, -3, -4, -3]
  const colorIsLight = baseR + baseG + baseB >= 384

  const multipliers = colorIsLight ? lightMultipliers : darkMultipliers
  
  return multipliers.map(mult => {
    // Apply increments as direct numeric additions (not hex arithmetic)
    const r = baseR + (increment.r * mult)
    const g = baseG + (increment.g * mult)
    const b = baseB + (increment.b * mult)
    
    return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`
  })
}

const watchCSSVariable = (variableName: string, callback: (value: string) => void) => {
  const targetNode = document.documentElement

  const observer = new MutationObserver(() => {
    const newValue = window.getComputedStyle(targetNode).getPropertyValue(variableName).trim()
    callback(newValue)
  })

  observer.observe(targetNode, {
    attributes: true,
    attributeFilter: ["style"]
  })

  return () => observer.disconnect()
}

const draw = () => {
  console.log('drawing', canvasRef.value, secondaryColor.value)
  if (!canvasRef.value || !secondaryColor.value) return
  const ctx = canvasRef.value.getContext('2d')!

  const colors = generateColorScale(secondaryColor.value, { r: 0x12, g: 0x12, b: 0x12 })

  ctx.fillStyle = colors[0]
  ctx.fillRect(0, 0, 300, 300)

  ctx.fillStyle = colors[1]
  ctx.fillRect(300, 0, 300, 300)

  ctx.fillStyle = colors[2]
  ctx.fillRect(600, 0, 300, 300)

  ctx.fillStyle = colors[3]
  ctx.fillRect(0, 300, 300, 300)

  ctx.fillStyle = colors[4]
  ctx.fillRect(300, 300, 300, 300)

  ctx.fillStyle = colors[5]
  ctx.fillRect(600, 300, 300, 300)

  ctx.fillStyle = colors[6]
  ctx.fillRect(0, 600, 300, 300)

  ctx.fillStyle = colors[7]
  ctx.fillRect(300, 600, 300, 300)

  ctx.fillStyle = colors[8]
  ctx.fillRect(600, 600, 300, 300)
}

onMounted(async () => {
  const stopWatching = watchCSSVariable('--color-secondary', (newColor) => {
    secondaryColor.value = newColor
    draw()
  })

  onBeforeUnmount(() => {
    stopWatching()
  })

  await nextTick()

  secondaryColor.value = window.getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')

  draw()
})

</script>

<style scoped>

</style>