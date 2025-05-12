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

    <BlogSidebarLeft class="sidebar-left" />
    <BlogContent :post="post" class="content" />
    <BlogSidebarRight class="sidebar-right" />

    <BlogFooter />
  </div>
</template>

<style>
.blog-container {
  --header-height: 80px;
  --sidebar-width: 150px;
}

body {
  width: 100vw;
  min-height: 100vh;
}

.blog-container {
  display: grid;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  justify-content: center;
  position: relative;

  grid-template-rows: var(--header-height) 1fr auto;
  grid-template-columns: var(--sidebar-width) 1fr var(--sidebar-width);
  grid-template-areas:
    "header header header"
    "sidebar-left content sidebar-right"
    "footer footer footer";
}

.sidebar-left, .sidebar-right {
  position: sticky;
  top: var(--header-height);
  height: 100%;
  flex: 1;
}

.sidebar-right {
  grid-area: sidebar-right;
}

.sidebar-left {
  grid-area: sidebar-left;
}

</style>