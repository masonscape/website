<template>
  <span class="tooltip-wrapper">
    <span v-if="parsedMarkdown" class="tooltip-content">
      <ContentRenderer :value="parsedMarkdown" />
    </span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { MDCParserResult } from '@nuxtjs/mdc'
import { ref, onMounted } from 'vue'

const props = defineProps<{ content: string }>()

const parsedMarkdown = ref<null | MDCParserResult>(null)

onMounted(async () => {
  try {
    parsedMarkdown.value = await parseMarkdown(props.content.replace(/<br>/g, "\n"))
  } catch (err) {
    console.error('Error parsing markdown:', err)
  }
})
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  cursor: pointer;
  text-decoration: underline dotted;
}

.tooltip-content {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1000;
  max-width: 200px;
}

.tooltip-wrapper:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}
</style>
