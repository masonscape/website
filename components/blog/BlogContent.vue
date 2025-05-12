<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="content">
    <ContentRenderer class="blogpost" :value="post" />
  </section>
</template>

<style>
.content {
  grid-area: content;
  margin: 0;
  padding: 2rem;
  background-color: transparent;
  top: var(--header-height);
}

.blogpost h1,
.blogpost h2,
.blogpost h3,
.blogpost h4,
.blogpost h5,
.blogpost h6 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-secondary);
}

.blogpost h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.blogpost h2 {
  font-size: 1.75rem;
}

.blogpost h3 {
  font-size: 1.5rem;
}

.blogpost p {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.blogpost a {
  color: var(--mason-blue);
  text-decoration: none;
}

.blogpost a:hover {
  text-decoration: underline;
}

.blogpost ul,
.blogpost ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.blogpost blockquote {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #1e1e1e;
  border-left: 4px solid #66bbff;
  font-style: italic;
  color: #999999;
}

.blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 80%, #808080 10%);
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  width: fit-content;
}
</style>