<template>
  <FlowThought v-if="currentThought" class="thought" :thought="currentThought" :is-link="false" :liked="likedList.includes(currentThought.id)"/>
  <h1 v-else>{{ `No post found for ${typeof slug} ${slug}` }}</h1>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug

const currentThought: FlowThought | undefined = await $fetch(`/api/flow/thought/${slug}`)
console.log(currentThought)

const likedList = ref<number[]>([])

const initLikedList = () => {
  const flowLikes = localStorage.getItem('flowLikes')
  if (!flowLikes) return null

  return likedList.value = JSON.parse(flowLikes)
}

onMounted(() => {
  const savedLikes = localStorage.getItem('flowLikes')
  if (!savedLikes) {
    localStorage.setItem('flowLikes', JSON.stringify([]))
  } else {
    initLikedList()
  }
})
</script>

<style scoped>
.thought {
  font-size: 1.4em;
  margin-top: 4em;
}
</style>