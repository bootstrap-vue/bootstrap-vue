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
            <li><b-link to="/docs" exact>Getting started</b-link></li>
            <li><b-link to="/docs/components" exact>Components</b-link></li>
            <li><b-link to="/docs/directives" exact>Directives</b-link></li>
            <li><b-link to="/docs/icons" exact>Icons</b-link></li>
            <li><b-link to="/docs/reference" exact>Reference</b-link></li>
            <li><b-link to="/play" exact>Playground</b-link></li>
          </ul>
          <!-- TODO: Uncomment when we have themes
          <h5 class="bd-text-purple-bright mb-1 mt-3">Themes</h5>
          <ul class="list-unstyled ml-3">
            <li><b-link to="/themes" exact>Themes and dashboards</b-link></li>
          </ul>
          -->
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

      <template v-if="isZeitNow && false">
        <p class="mb-4 text-center">
          <strong class="d-block mx-auto mb-2">Hosting provided by</strong>
          <a href="https://zeit.co/?utm_campaign=bootstrap-vue" target="_blank" rel="noopener">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="35"
              viewBox="0 0 231 46"
              fill="none"
              focusable="false"
              alt="Zeit Logo"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M107.2 37H86.75V33.9L101.85 12.35H87V8.80002H106.95V11.9L91.85 33.45H107.2V37ZM146.95 37H128.6V8.80002H146.95V12.35H132.75V20.85H145.1V24.4H132.75V33.45H146.95V37ZM169.05 37H186.95V33.45H180.1V12.35H186.95V8.80002H169.05V12.35H175.95V33.45H169.05V37ZM220.55 37H216.4V12.35H206.9V8.80002H230.15V12.35H220.55V37Z"
                fill="#000"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.6882 0.470947L50.9832 45.3291H0.393188L25.6882 0.470947Z"
                fill="url(#logotype21)"
              />
              <defs>
                <linearGradient
                  id="logotype21"
                  x1="99.8392"
                  y1="103.113"
                  x2="36.06"
                  y2="15.3616"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#fff" />
                  <stop offset="1" stop-color="#000" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </p>
      </template>

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
        <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a><template v-if="!isNetlify && !isZeitNow">.</template>
        <template v-if="isNetlify">
          and proudly hosted on <a href="https://www.netlify.com" target="_blank">Netlify</a>.
        </template>
        <template v-else-if="isZeitNow">
          and proudly hosted on <a href="https://zeit.co/?utm_campaign=bootstrap-vue" target="_blank">Zeit</a>.
        </template>
      </p>
    </b-container>
  </footer>
</template>

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
    isZeitNow() {
      return Boolean(process.env.ZEIT_NOW)
    }
  }
}
</script>
