<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

defineProps<{ post: BlogCollectionItem }>()
</script>

<template>
  <a :href="post.path">
    <div>
      {{ post.title }}
    </div>
  </a>
</template>

<style>

</style>