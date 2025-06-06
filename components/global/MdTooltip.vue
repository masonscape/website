<template>
  <span class="tooltip-wrapper">
    <span
      v-if="props.tooltip && parsedMarkdown"
      class="tooltip-content"
      :style="{
        top: `${position.y - 10}px`,
        left: `${position.x}px`,
        opacity: isHovering ? 1 : 0,
        pointerEvents: isHovering ? 'auto' : 'none'
      }"
      @mouseenter="tooltipEnter"
      @mouseleave="tooltipLeave"
    >
      <div class="tooltip-hitbox" :style="{ pointerEvents: isHovering ? 'auto' : 'none' }"/>
      <div 
        class="tooltip-text-content" 
            :style="{ 
              userSelect: isMousingOverTooltip ? 'text' : 'none'
            }">
        <ContentRenderer :value="parsedMarkdown" />
      </div>
    </span>
    <span
      class="tooltipped-text"
      @mouseenter="textEnter"
      @mouseleave="textLeave"
    >
      {{ text.replace(/<br>/g, '\n') }}
    </span>
  </span>
</template>

<script setup lang="ts">
import type { MDCParserResult } from '@nuxtjs/mdc'
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{ tooltip: string, text: string }>()

const parsedMarkdown = ref<null | MDCParserResult>(null)
const position = ref({ x: 0, y: 0 })
const isMousingOverTooltipText = ref(false)
const isMousingOverTooltip = ref(false)
const startedShowing = ref(false)

const isHovering = computed(() => {
  return isMousingOverTooltip.value || isMousingOverTooltipText.value
})

let hideTimeout: ReturnType<typeof setTimeout> | null = null

const clearHideTimeout = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const scheduleHide = () => {
  clearHideTimeout()
  hideTimeout = setTimeout(() => {
    if (!isMousingOverTooltip.value && !isMousingOverTooltipText.value) {
      startedShowing.value = false
    }
  }, 100)
}

const textEnter = (event: MouseEvent) => {
  if (event.buttons !== 0) return
  
  clearHideTimeout()
  if (!startedShowing.value) {
    startedShowing.value = true
    const target = event.target as HTMLElement
    const rect = target.getBoundingClientRect()
    position.value = {
      x: rect.left + rect.width / 2, // Center horizontally on the text
      y: rect.top // Top of the text element
    }
  }
  isMousingOverTooltipText.value = true
}

const textLeave = () => {
  isMousingOverTooltipText.value = false
  scheduleHide()
}

const tooltipEnter = () => {
  if (!startedShowing.value) return
  clearHideTimeout()
  isMousingOverTooltip.value = true
}

const tooltipLeave = () => {
  isMousingOverTooltip.value = false
  scheduleHide()
}

onMounted(async () => {
  try {
    parsedMarkdown.value = await parseMarkdown(props.tooltip.replace(/<br>/g, '\n'))
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

html.dark .tooltip-content {
  background-color: color-mix(in srgb, white 10%, var(--color-primary) 90%);
}

html.light .tooltip-content {
  background-color: color-mix(in srgb, black 10%, var(--color-primary) 90%);
}

.tooltip-content {
  position: fixed;
  transform: translate(-50%, -100%);
  padding: 1em;
  z-index: 1000;
  max-width: min(20em, 80em);

  color: var(--color-secondary);
  border-radius: 4px;
  outline: 0.2em solid var(--color-accent);

  white-space: pre-line;
  transition: opacity 0.15s ease-out, transform 0.1s ease-out;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: normal;
  text-transform: none;
  user-select: text;
}

.tooltip-hitbox {
  position: absolute;
  top: -15px;
  bottom: -15px;
  left: -15px;
  right: -15px;
  z-index: -1;
  pointer-events: auto;
}

.tooltip-text-content {
  position: relative;
  z-index: 1;
}

.tooltipped-text {
  cursor: pointer;
  text-decoration: underline dotted;
}</style>