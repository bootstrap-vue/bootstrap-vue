<template>
  <b-navbar tag="header" type="dark" class="bd-navbar flex-column flex-md-row">
    <b-navbar-brand
      class="mr-0 mr-md-2"
      to="/"
      exact
      active-class="active"
      aria-label="BootstrapVue"
    >
      <bv-badge width="32" height="32" class="d-block"></bv-badge>
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
          <b-dropdown-item :href="url">
            Latest (v{{ version }})
          </b-dropdown-item>
        </template>
        <template v-else>
          <b-dropdown-item active :href="url">
            Latest (v{{ version }})
          </b-dropdown-item>
          <b-dropdown-item to="/docs/reference/changelog">
            Changelog
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
import { BASE_URL } from '~/constants'
import { version } from '~/content'
import BvBadge from '~/components/bv-badge'

export default {
  name: 'BVHeader',
  components: { BvBadge },
  data() {
    return {
      version,
      isLocal: false
    }
  },
  computed: {
    url() {
      return BASE_URL
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
      const host = window.location.hostname || ''
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
