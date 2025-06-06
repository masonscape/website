<script setup lang="ts">
import type { BlogCollectionItem, MinimalNode } from '@nuxt/content'

const props = defineProps<{ content: BlogCollectionItem }>()

onMounted(() => {
  document.title = props.content.title
})

// this bit is part of the tooltip system. if we try to set a tooltip in our markdown, directly after a word, with no space, it breaks. you need a space before a vue element, at least using the :ElementName syntax. so our tooltip processor adds garbage text (' REPLACE THIS SPACE ') before every tooltip, so that it renders properly.
// that leaves us with garbage text and a properly rendered tooltip. this function strips away the garbage text, leaving us with only the tooltip
const cleanContent = (content: BlogCollectionItem): BlogCollectionItem => {
  const newObject: BlogCollectionItem = {
    ...content,
    body: {
      ...content.body,
      value: content.body.value.map(value => {
        if (Array.isArray(value)) {
          return value.map(item => typeof item === 'string' ? item.replace(/ REPLACE THIS SPACE /g, '') : item)
        }
        return value
      }) as MinimalNode[]
    }
  }

  console.log(newObject)

  return newObject
}
</script>

<template>
  <section class="content">
    <ContentTitle :content="content" />
    <ContentRenderer class="blogpost" :value="cleanContent(content)" />
  </section>
</template>

<style>
.content {
  margin: 0;
  background-color: transparent;
  position: relative;
  width: min(44em, 90vw);
}

.blogpost {
  line-height: 1.4em;
}

html.dark .blogpost a:hover {
  color: color-mix(in srgb, var(--color-accent) 50%, white 50%)
}

html.light .blogpost a:hover {
  color: color-mix(in srgb, var(--color-accent) 50%, black 50%)
}

.blogpost ul,
.blogpost ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.blogpost blockquote {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #1e1e1e;
  border-left: 4px solid #66bbff;
  font-style: italic;
  color: #999999;
}

.blogpost pre {
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.8em;
  max-width: fit-content;
  box-sizing: border-box;
}

html.light .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 70%, #ffffff 30%);
}

html.dark .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 70%, #000000 30%);
}

.blogpost pre code {
  display: block;
  white-space: pre-wrap; /* Allows wrapping */
  word-wrap: break-word; /* Breaks long words */
}
</style>