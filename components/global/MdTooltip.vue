<template>
  <span class="tooltip-wrapper">
    <span 
      v-if="parsedMarkdown" 
      class="tooltip-content" 
      :style="{
        transform: `translate(-50%, -100%)`,
        top: `${position.y - 5}px`, 
        left: `${position.x}px`,
        opacity: isVisible ? 1 : 0
      }"
    >
      <ContentRenderer :value="parsedMarkdown" />
    </span>
    <span class="tooltipped-text" @mousemove="onMouseMove" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      {{ text.replace(/<br>/g, '\n') }}
    </span>
  </span>
</template>

<script setup lang="ts">
import type { MDCParserResult } from '@nuxtjs/mdc'
import { ref, onMounted } from 'vue'

const props = defineProps<{ tooltip: string, text: string }>()

const parsedMarkdown = ref<null | MDCParserResult>(null)
const position = ref({ x: 0, y: 0 })
const isVisible = ref(false)

const onMouseMove = (event: MouseEvent) => {
  if (!isVisible.value) return
  position.value = { 
    x: event.clientX, 
    y: event.clientY
  }
}

const onMouseEnter = (event: MouseEvent) => {
  isVisible.value = true
  position.value = { 
    x: event.clientX, 
    y: event.clientY
  }
}

const onMouseLeave = () => {
  isVisible.value = false
}

onMounted(async () => {
  try {
    parsedMarkdown.value = await parseMarkdown(props.tooltip.replace(/<br>/g, "\n"))
  } catch (err) {
    console.error('Error parsing markdown:', err)
  }
})
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: fixed;
  background-color: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  white-space: pre-line;
  transition: opacity 0.15s ease-out, transform 0.1s ease-out;
  z-index: 1000;
  pointer-events: none;
  /* Center horizontally and position above cursor */
  transform: translate(-50%, -100%) scale(50%);

  font-size: 16px;
  font-weight: normal;
  letter-spacing: normal;
  text-transform: none;
}

.tooltipped-text {
  cursor: pointer;
  text-decoration: underline dotted;
}
</style>