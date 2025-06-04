<template>
  <header class="title">
    <h1 class="title-text">{{ content.title }}</h1>
    <p class="description">{{ content.description }}</p>
    <div v-if=content.meta.created class="date">
      <span class="created">Created: </span>
      <time class="timestamp">{{ formattedCreatedDate }}</time>
    </div>
    <div v-if=content.meta.modified class="date">
      <span class="created">Modified: </span>
      <time class="timestamp">{{ formattedModifiedDate }}</time>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ content: { title: string, description: string, meta: { created: number, modified?: number } } }>()

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

const formattedCreatedDate = formatDate(props.content.meta.created)
const formattedModifiedDate = props.content.meta.modified && formatDate(props.content.meta.modified)
</script>

<style scoped>
.title {
  margin-top: 3em;
  margin-bottom: 5em;
  border-bottom: 1px var(--color-tertiary) solid
}

.title-text {
  margin: 0;
  font-size: 3em;
}

.description {
  font-style: italic;
  font-size: 1.5em;
  margin-bottom: 2.5em;
  line-height: 1.25em;
}

.date {
  margin-bottom: 1em;
}

.created {
  color: color-mix(in srgb, var(--color-secondary) 50%, var(--color-primary) 50%);
}
</style>