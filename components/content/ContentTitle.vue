<template>
  <header class="title">
    <h1 class="title-text">{{ content.title }}</h1>
    <p v-if="content.description" class="description">{{ content.description }}</p>
    <div v-if="content.published" class="date">
      <span class="published">Published: </span>
      <time class="timestamp">{{ formattedCreatedDate }}</time>
    </div>
    <div v-if="content.modified" class="date">
      <span class="published">Modified: </span>
      <time class="timestamp">{{ formattedModifiedDate }}</time>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

const props = defineProps<{ content: BlogCollectionItem }>()

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return `${day} ${month} ${year}, ${time}`;
}

const formattedCreatedDate = formatDate(props.content.published)
const formattedModifiedDate = props.content.modified && formatDate(props.content.modified)
</script>

<style scoped>
.title {
  margin-bottom: 3em;
  border-bottom: 1px var(--color-tertiary) solid
}

.title-text {
  margin: 0;
  font-size: 3em;
  line-height: 1;
}

.description {
  font-style: italic;
  font-size: 1.5em;
  margin-bottom: 2em;
  line-height: 1.25em;
}

.date {
  margin-bottom: 1em;
}

.published {
  color: color-mix(in srgb, var(--color-secondary) 50%, var(--color-primary) 50%);
}
</style>