<template>
  <footer class="bd-footer text-muted">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" sm="auto" align-self="center" class="text-center text-sm-left">
          <b-img src="~static/logo.svg" width="100" alt="BootstrapVue logo" fluid></b-img>
        </b-col>

        <b-col cols="auto" md="4" lg="3" class="text-left">
          <h5 class="bd-text-purple-bright mb-1">Documentation</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/" exact>Home</b-link></li>
            <li><b-link to="/docs" exact>Getting started</b-link></li>
            <li><b-link to="/docs/components" exact>Components</b-link></li>
            <li><b-link to="/docs/directives" exact>Directives</b-link></li>
            <li><b-link to="/docs/reference" exact>Reference</b-link></li>
            <li><b-link to="/docs/misc" exact>Miscelaneous</b-link></li>
            <li><b-link to="/play" exact>Playground</b-link></li>
          </ul>
        </b-col>

        <b-col cols="auto" class="text-left">
          <h5 class="bd-text-purple-bright mb-1">Communnity</h5>
          <ul class="list-unstyled ml-3">
            <li><a href="https://github.com/bootstrap-vue/bootstrap-vue" target="_blank">GitHub</a></li>
            <li><a href="https://discord.gg/j2Mtcny" target="_blank">Discord chat</a></li>
            <li><a href="https://twitter.com/BootstrapVue" target="_blank">Twitter</a></li>
            <li><a href="https://opencollective.com/bootstrap-vue/" target="_blank">Open Collective</a></li>
          </ul>
        </b-col>
      </b-row>

      <hr>

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
