<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="blog-container">
    <BlogHeader class="header" />

    <BlogContent :post="post" class="content" />
    <!-- <aside class="toc">
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
    </aside> -->

    <BlogFooter />
  </div>
</template>

<style>
.blog-container {
  --header-height: 5em;
  font-size: 16px;
}

body {
  width: 100vw;
  min-height: 100vh;
}

.blog-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  align-items: center;
  justify-content: center;
  position: relative;
}

.sidebar-right {
  right: 0;
  position: fixed;
  margin-top: var(--header-height);
  height: fit-content;
  flex: 1;
}

.content {
  flex: 1;
  position: relative;
  width: min(48em, 90vw);
}

@media (max-width: 37.5em) {
  .header > .button-list {
    display: none;
  }
}
</style>