<script setup>

</script>

<template>
  <footer class="footer">
    <p class="copyright">© masonscape.dev</p>
    <div class="footer-links">
      <a href="/privacy" class="footer-link">
        <p>Privacy Policy</p>
      </a>
    </div>
    <div class="button-list">
      <LinkButton class="button" icon="grommet-icons:github" href="https://github.com/mason8592/blog" target="_blank"/>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  background-color: var(--color-primary-2);
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  align-items: center;

  border-top: 1px var(--color-tertiary) solid
}

.copyright {
  margin-left: 1em;
  color: color-mix(in srgb, var(--color-secondary) 70%, var(--color-primary));
}

.footer-links {
  margin-left: 3em;
}

.footer-link {
  text-decoration: none;
  color: color-mix(in srgb, var(--color-secondary) 70%, var(--color-primary));
}

.button-list {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;

  display: flex;
}
</style>