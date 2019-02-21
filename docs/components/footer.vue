<template>
  <footer class="bd-footer text-muted">
    <div class="container">
      <ul class="bd-footer-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/docs/">Documentation</router-link></li>
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
    </div>
  </footer>
</template>

<script>
import { version } from '~/content'

export default {
  computed: {
    version: () => version
  }
}
</script>
