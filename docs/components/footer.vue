<template>
  <footer :class="['bd-footer', 'text-muted', { 'docs-border': isDocs }]">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" sm order-sm="3" class="text-center text-sm-right">
          <b-img
            src="~static/logo.svg"
            class="mb-4 mt-0 mt-sm-4"
            alt="BootstrapVue logo"
            width="100"
            fluid
          ></b-img>
        </b-col>

        <b-col cols="auto" md="4" class="text-left">
          <h5 class="bd-text-purple-bright mb-1">Documentation</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/" exact>Home</b-link></li>
            <li><b-link to="/docs" exact>Getting started</b-link></li>
            <li><b-link to="/docs/components" exact>Components</b-link></li>
            <li><b-link to="/docs/directives" exact>Directives</b-link></li>
            <li><b-link to="/docs/reference" exact>Reference</b-link></li>
            <li><b-link to="/docs/misc" exact>Miscellaneous</b-link></li>
            <li><b-link to="/play" exact>Playground</b-link></li>
          </ul>
        </b-col>

        <b-col cols="auto" class="text-left">
          <h5 class="bd-text-purple-bright mb-1">Community</h5>
          <ul class="list-unstyled ml-3">
            <li><a href="https://github.com/bootstrap-vue/bootstrap-vue" target="_blank">GitHub</a></li>
            <li><a href="https://discord.gg/j2Mtcny" target="_blank">Discord chat</a></li>
            <li><a href="https://twitter.com/BootstrapVue" target="_blank">Twitter</a></li>
            <li><a href="https://opencollective.com/bootstrap-vue/" target="_blank">Open Collective</a></li>
          </ul>
        </b-col>
      </b-row>

      <hr>

      <p class="mb-2">
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

<style scoped>
.docs-border {
  border-top: 3px solid #dee2e6;
}

@media (min-width: 1200px) {
  .bd-footer > .container {
    max-width: 960px;
  }
}
</style>

<script>
import { version } from '~/content'

export default {
  name: 'BVDFooter',
  props: {
    isDocs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { version }
  }
}
</script>
