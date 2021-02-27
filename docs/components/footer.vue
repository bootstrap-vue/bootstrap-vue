<template>
  <footer :class="['bd-footer', 'text-muted', { 'docs-border': isDocs }]">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" sm order-sm="3" class="text-center text-sm-right">
          <b-link to="/" class="d-inline-block mx-auto">
            <BvLogo width="120" height="120" class="img-fluid mb-4 mb-sm-0"></BvLogo>
          </b-link>
        </b-col>

        <b-col cols="auto" md="4" class="text-left">
          <h5 class="bd-text-purple-bright mb-1">Documentation</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/" exact>Home</b-link></li>
            <li><b-link to="/docs" exact>Getting Started</b-link></li>
            <li><b-link to="/docs/components" exact>Components</b-link></li>
            <li><b-link to="/docs/directives" exact>Directives</b-link></li>
            <li><b-link to="/docs/icons" exact>Icons</b-link></li>
            <li><b-link to="/docs/reference" exact>Reference</b-link></li>
            <li><b-link to="/play" exact>Playground</b-link></li>
          </ul>
          <h5 class="bd-text-purple-bright mb-1 mt-3">Themes</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/themes" exact>Themes and dashboards</b-link></li>
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
          <h5 class="bd-text-purple-bright mb-1 mt-3">Release notes</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/docs/reference/changelog" exact>Changelog</b-link></li>
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
        Docs generated with
        <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a><template v-if="!isNetlify && !isVercel">.</template>
        <template v-if="isNetlify">
          and proudly hosted on <a href="https://www.netlify.com" target="_blank">Netlify</a>.
        </template>
        <template v-else-if="isVercel">
          and proudly hosted on <a href="https://vercel.com/?utm_source=bootstrapvue" target="_blank">Vercel</a>.
        </template>
      </p>

      <template v-if="isVercel">
        <p class="mt-3 text-center">
          <a href="https://vercel.com/?utm_source=bootstrapvue" target="_blank" rel="noopener">
            <img src="~assets/powered-by-vercel.svg" width="159" height="33">
          </a>
        </p>
      </template>
    </b-container>
  </footer>
</template>

<script>
import { version } from '~/content'
import BvLogo from '~/components/bv-logo'

export default {
  name: 'BVFooter',
  components: { BvLogo },
  props: {
    isDocs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { version }
  },
  computed: {
    isNetlify() {
      return Boolean(process.env.NETLIFY)
    },
    isVercel() {
      return Boolean(process.env.VERCEL_NOW)
    }
  }
}
</script>

<style scoped>
.bv-logo {
  margin-top: -2rem;
}

.docs-border {
  border-top: 3px solid #dee2e6;
}

@media (min-width: 1200px) {
  .bd-footer > .container {
    max-width: 960px;
  }
}
</style>
