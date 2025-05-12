<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

onMounted(() => {
  document.title = post.value.title ?? 'Blog Post'
})
</script>

<template>
  <BlogContainer :post="post" />
</template>