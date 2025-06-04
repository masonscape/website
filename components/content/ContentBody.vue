<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  document.title = props.content.title
})
</script>

<template>
  <section class="content">
    <ContentTitle :content="content" />
    <ContentRenderer class="blogpost" :value="content" />
  </section>
</template>

<style>
.content {
  margin: 0;
  margin-bottom: 3em;
  background-color: transparent;
  position: relative;
  width: min(44em, 90vw);
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

html.dark .blogpost a:hover {
  color: color-mix(in srgb, var(--color-accent) 50%, white 50%)
}

html.light .blogpost a:hover {
  color: color-mix(in srgb, var(--color-accent) 50%, black 50%)
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
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.8em;
  max-width: fit-content;
  box-sizing: border-box;
}

html.light .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 70%, #ffffff 30%);
}

html.dark .blogpost pre {
  background-color: color-mix(in srgb, var(--color-primary) 70%, #000000 30%);
}

.blogpost pre code {
  display: block;
  white-space: pre-wrap; /* Allows wrapping */
  word-wrap: break-word; /* Breaks long words */
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