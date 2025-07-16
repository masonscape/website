<template>
  <span class="tooltip-wrapper">
    <span
      v-if="props.tooltip && parsedMarkdown"
      ref="tooltipContentRef"
      class="tooltip-content"
      :style="{
        top: `${position.y - 10}px`,
        left: `${adjustedX}px`,
        opacity: isHovering ? 1 : 0,
        pointerEvents: isHovering ? 'auto' : 'none'
      }"
      @mouseenter="tooltipEnter"
      @mouseleave="tooltipLeave"
    >
      <div class="tooltip-hitbox" :style="{ pointerEvents: isHovering ? 'auto' : 'none' }"/>
      <div 
        class="tooltip-text-content" 
        :style="{ userSelect: isMousingOverTooltip ? 'text' : 'none' }">
        <ContentRenderer :value="parsedMarkdown" />
      </div>
    </span>
    <span
      ref="tooltippedTextRef"
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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const props = defineProps<{ tooltip: string, text: string }>()

const parsedMarkdown = ref<null | MDCParserResult>(null)
const position = ref({ x: 0, y: 0 })
const adjustedX = ref(0)
const isMousingOverTooltipText = ref(false)
const isMousingOverTooltip = ref(false)

const tooltipContentRef = ref<HTMLElement | null>(null)
const tooltippedTextRef = ref<HTMLElement | null>(null)

const isHovering = computed(() => isMousingOverTooltip.value || isMousingOverTooltipText.value)

const adjustTooltipPosition = () => {
  nextTick(() => {
    const tooltipEl = tooltipContentRef.value
    const triggerEl = tooltippedTextRef.value
    if (!tooltipEl || !triggerEl) {
      adjustedX.value = position.value.x
      return
    }
    const tooltipRect = tooltipEl.getBoundingClientRect()
    const triggerRect = triggerEl.getBoundingClientRect()
    const viewportWidth = window.innerWidth

    // Center tooltip horizontally on the trigger
    let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2

    // Prevent overflow left
    if (left < 8) left = 8

    // Prevent overflow right
    if (left + tooltipRect.width > viewportWidth - 8) {
      left = viewportWidth - tooltipRect.width - 8
    }

    adjustedX.value = left
  })
}

const handleScroll = () => {
  isMousingOverTooltipText.value = false
  isMousingOverTooltip.value = false
}

const textEnter = (event: MouseEvent) => {
  if (event.buttons !== 0) return

  const target = event.target as HTMLElement
  const rect = target.getBoundingClientRect()
  position.value = {
    x: rect.left + rect.width / 2,
    y: rect.top
  }
  nextTick(adjustTooltipPosition)
  isMousingOverTooltipText.value = true
}

const textLeave = () => {
  isMousingOverTooltipText.value = false
}

const tooltipEnter = () => {
  isMousingOverTooltip.value = true
}

const tooltipLeave = () => {
  isMousingOverTooltip.value = false
}

onMounted(async () => {
  try {
    parsedMarkdown.value = await parseMarkdown(props.tooltip.replace(/<br>/g, '\n'))
  } catch {
    console.error('Error parsing markdown')
  }
  window.addEventListener('resize', adjustTooltipPosition)
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustTooltipPosition)
  document.removeEventListener('scroll', handleScroll)
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
  transform: translateY(-100%);
  z-index: 1000;
  max-width: min(20em, 60vw);

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
  padding-left: 1em;
  padding-right: 1em;
}

.tooltipped-text {
  cursor: pointer;
  text-decoration: underline dotted;
}</style>