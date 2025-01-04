<template>
  <b-navbar tag="header" type="dark" class="bd-navbar flex-column flex-md-row">
    <b-navbar-brand
      class="mr-0 mr-md-2"
      to="/"
      exact
      active-class="active"
      aria-label="BootstrapVue"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 953 953"
        width="32"
        height="32"
        version="1.1"
        shape-rendering="geometricPrecision"
        fill-rule="evenodd"
        clip-rule="evenodd"
        focusable="false"
        role="img"
        class="d-block"
      >
        <title>BootstrapVue</title>
        <path
          fill="currentColor"
          d="M92 0h769c50 0 92 42 92 92v769c0 50-42 92-92 92H92c-50 0-92-42-92-92V92C0 42 42 0 92 0zm216 710c100 0 160-50 160-133 0-62-44-107-108-113v-3c48-8 86-52 86-102 0-71-55-117-140-117H111v468h197zM195 307h90c50 0 78 23 78 64 0 44-33 68-91 68h-77V307zm0 338V499h90c64 0 98 25 98 73s-33 73-94 73h-94zm503 65l163-468h-90L652 621h-2L531 242h-92l163 468h96z"
        />
      </svg>
    </b-navbar-brand>

    <div class="navbar-nav-scroll">
      <b-navbar-nav class="bd-navbar-nav flex-row">
        <b-nav-item to="/docs" active-class="active" exact no-prefetch>Docs</b-nav-item>
        <b-nav-item to="/vue3" active-class="active" exact no-prefetch>Vue.js 3</b-nav-item>
        <b-nav-item to="/docs/components" active-class="active" no-prefetch>Components</b-nav-item>
        <b-nav-item to="/docs/directives" active-class="active" no-prefetch>Directives</b-nav-item>
        <b-nav-item to="/docs/icons" active-class="active" no-prefetch>Icons</b-nav-item>
        <b-nav-item to="/docs/reference" active-class="active">Reference</b-nav-item>
        <b-nav-item to="/play" active-class="active" no-prefetch>Play</b-nav-item>
      </b-navbar-nav>
    </div>

    <b-navbar-nav class="flex-row ml-md-auto d-none d-md-flex">
      <b-nav-item-dropdown
        :text="dropdownText"
        toggle-class="mr-md-2"
        right
      >
        <template v-if="isLocal">
          <b-dropdown-item active href="/">
            Local copy
          </b-dropdown-item>
          <b-dropdown-item :href="prodURL">
            Latest (v{{ version }})
          </b-dropdown-item>
        </template>
        <template v-else>
          <b-dropdown-item active :href="prodURL">
            Latest (v{{ version }})
          </b-dropdown-item>
          <b-dropdown-item :href="devURL" rel="nofollow">
            Development
          </b-dropdown-item>
        </template>
      </b-nav-item-dropdown>

      <b-nav-item
        href="https://github.com/bootstrap-vue/bootstrap-vue"
        target="_blank"
        :link-attrs="{ 'aria-label': 'GitHub' }"
      >
        <b-icon icon="github"></b-icon>
      </b-nav-item>

      <b-nav-item
        href="https://twitter.com/BootstrapVue"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Twitter' }"
      >
        <b-icon icon="twitter"></b-icon>
      </b-nav-item>

      <b-nav-item
        href="https://discord.gg/j2Mtcny"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Discord' }"
      >
        <b-icon icon="discord"></b-icon>
      </b-nav-item>

      <b-nav-item
        href="https://opencollective.com/bootstrap-vue/"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Open Collective' }"
      >
        <b-icon icon="opencollective"></b-icon>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { BASE_URL, BASE_URL_DEV } from '~/constants'
import { version } from '~/content'

export default {
  name: 'BVHeader',
  data() {
    return {
      version,
      isLocal: false
    }
  },
  computed: {
    prodURL() {
      return BASE_URL
    },
    devURL() {
      return BASE_URL_DEV
    },
    dropdownText() {
      if (this.isLocal) {
        return 'Local Copy'
      }

      return `v${version}`
    }
  },
  mounted() {
    this.isLocal = this.isLocalHost()
  },
  methods: {
    isLocalHost() {
      const host = window.location.host || ''
      return host === 'localhost' || host === '127.0.0.1'
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  color: #cbbde2;
}
.navbar-brand.active {
  color: #fff;
}
</style>
