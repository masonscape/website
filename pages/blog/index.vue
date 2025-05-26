<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryCollection('blog')
    .order('created', 'DESC')
    .all()
  )
</script>

<template>
  <div class="blog-index">
    <h1>wiggle</h1>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.path">
        <IndexLink :post="post" />
      </li>
    </ul>
  </div>
</template>

<style>
</style>