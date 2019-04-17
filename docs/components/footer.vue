<template>
  <footer class="bd-footer text-muted">
    <b-container fluid>
      <ul class="bd-footer-links">
        <li><b-link to="/">Home</b-link></li>
        <li><b-link to="/docs/">Documentation</b-link></li>
        <li>
          <a href="https://github.com/bootstrap-vue/bootstrap-vue" target="_blank">
            GitHub
          </a>
        </li>
      </ul>

      <p>
        Designed and built with all the love in the world. Maintained by the
        <a href="https://github.com/orgs/bootstrap-vue/people" target="_blank">core team</a>
        with the help of
        <a href="https://github.com/bootstrap-vue/bootstrap-vue/graphs/contributors" target="_blank">our contributors</a>.
      </p>

      <p>
        Currently v{{ version }}. Code licensed
        <a href="https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE" target="_blank">MIT</a>.
        Docs generated with <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>
      </p>
    </b-container>
  </footer>
</template>

<script>
import { version } from '~/content'

export default {
  name: 'BVDFooter',
  data() {
    return { version }
  }
}
</script>
