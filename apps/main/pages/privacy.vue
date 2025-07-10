<script setup>
const { data: content } = await useAsyncData('privacy', () => queryCollection('pages').path(`/pages/privacy`).first())
</script>

<template>
  <ContentBody :content="content" />
</template>