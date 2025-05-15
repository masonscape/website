<template>
  <div class="sidebar-right">
    <aside class="toc">
      <h2>Table of Contents</h2>
      <ul>
        <li v-for="link of post.body.toc.links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
          <ul>
              <li v-for="link1 of link.children" :key="link1.id">
                  <a :href="`#${link1.id}`">{{ link1.text }}</a>

              </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  console.log(props.post.body.value.filter(x => x[0] === "h1"))
})
</script>

<style>
.toc {
  width: 80%;
  position: sticky;
  top: 1rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
}

.toc h2 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #66bbff;
}

.toc a {
  color: #cccccc;
  text-decoration: none;
}

.toc a:hover {
  text-decoration: underline;
}
</style>