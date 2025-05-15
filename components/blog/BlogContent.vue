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
  margin: 0;
  background-color: transparent;
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
}

.blogpost h1 {
  margin-bottom: 1rem;
}

.blogpost p {
  margin-bottom: 1rem;
}

.blogpost a {
  color: var(--blue-4);
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


abbr {
position: relative;
}

abbr:hover::after {
position: absolute;
bottom: 100%;
left: 100%;
display: block;
padding: 0em;
background: black;
content: attr(title);
}
</style>