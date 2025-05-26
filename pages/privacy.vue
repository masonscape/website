<script setup>
const { data } = await useAsyncData('privacy', () => queryCollection('pages').path(`/pages/privacy`).first())
</script>

<template>
  <ContentBody :content="data" />
</template>