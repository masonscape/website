<script setup lang="ts">
import type { BlogCollectionItem, MinimalNode } from '@nuxt/content'

const props = defineProps<{ content: BlogCollectionItem }>()

onMounted(() => {
  document.title = props.content.title
})

// this bit is part of the tooltip system. if we try to set a tooltip in our markdown, directly after a word, with no space, it breaks. you need a space before a vue element, at least using the :ElementName syntax. so our tooltip processor adds garbage text (' REPLACE THIS SPACE ') before every tooltip, so that it renders properly.
// that leaves us with garbage text and a properly rendered tooltip. this function strips away the garbage text, leaving us with only the tooltip
const cleanStringsDeep = (node: unknown): unknown => {
  if (typeof node === 'string') {
    return node.replace(/ ?YOU SHOULDNT BE SEEING THIS TEXT PLEASE REPORT IT ?/g, '')
  }
  if (Array.isArray(node)) {
    return node.map(cleanStringsDeep)
  }
  if (node && typeof node === 'object') {
    // Recursively clean all properties of the object
    const newObj: Record<string, unknown> = {}
    for (const key in node) {
      newObj[key] = cleanStringsDeep((node as Record<string, unknown>)[key])
    }
    return newObj
  }
  return node
}

const cleanContent = (content: BlogCollectionItem): BlogCollectionItem => {
  return {
    ...content,
    body: {
      ...content.body,
      value: cleanStringsDeep(content.body.value) as MinimalNode[]
    }
  }
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

.blogpost h1::before,
.blogpost h2::before,
.blogpost h3::before,
.blogpost h4::before,
.blogpost h5::before,
.blogpost h6::before {
  content: "";
  position: absolute;
  display: inline-block;
  background-color: var(--color-accent);
  height: 100%;
  width: 0.2em;
  margin-right: 0.6em;

  transform: translate(-1em, -20%)
}

.blogpost h1,
.blogpost h2,
.blogpost h3,
.blogpost h4,
.blogpost h5,
.blogpost h6 {
  padding: 0.4em;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  margin-left: 1em;
  position: relative;
  font-style: italic;
}

.blogpost blockquote {
  margin: 1.5rem 0;
  height: fit-content;
  padding: 1rem;
  background-color: var(--color-primary-2);
  border-left: 0.2em solid var(--color-accent);
  font-style: italic;
}

.blogpost blockquote * {
  margin: 0;
}

.blogpost pre {
  padding: 1.2rem;
  border-radius: 1em;
  overflow-x: auto;
  font-size: 0.9em;
  max-width: fit-content;
  box-sizing: border-box;
}

html.light .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 30%, #ffffff 70%);
}

html.dark .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 70%, #000000 30%);
}

.blogpost pre code {
  display: block;
  white-space: pre-wrap; /* Allows wrapping */
  word-wrap: break-word; /* Breaks long words */
}

hr {
  margin: 3em 0 3em 0;
}
</style>