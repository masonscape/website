<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

const rotation = ref(0)

onMounted(() => {
  document.title = post ? post.value.title : 'Page not found'
})

const handleClick = () => {
  rotation.value += 10
}
</script>

<template>
  <ContentBody v-if="post" :content="post" />
  <ErrorPage v-else pagetype="post" @click="handleClick" />
</template>

<style scoped>
.error {
  text-align: center;
  user-select: none;
}
</style>