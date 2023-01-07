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
        <b-nav-item to="/themes" active-class="active" no-prefetch>Themes</b-nav-item>
        <b-nav-item to="/play" active-class="active" no-prefetch>Play</b-nav-item>
      </b-navbar-nav>
    </div>

    <b-navbar-nav class="flex-row ml-md-auto d-none d-md-flex">
      <b-nav-item-dropdown
        :text="dropdownText"
        toggle-class="mr-md-2"
        right
      >
        <template v-if="isPR || isDev || isLocal">
          <b-dropdown-item v-if="isPR" active href="/">
            Pull Request {{ prId ? '#' + prId : '- ' + branchName }}
          </b-dropdown-item>
          <b-dropdown-item v-else-if="isLocal" active href="/">
            Local copy
          </b-dropdown-item>
          <b-dropdown-item :active="isDev" :href="devURL" rel="nofollow">
            Development
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          class="navbar-nav-svg"
          focusable="false"
          role="img"
        >
          <title>GitHub</title>
          <g fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16,0.4c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2 c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1 c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3 c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5C23.1,6.6,24.4,7,24.4,7 c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4 c0,0.4,0.3,0.9,1.1,0.8C27.4,29.5,32,23.5,32,16.4C32,7.6,24.8,0.4,16,0.4z"
            />
          </g>
        </svg>
      </b-nav-item>

      <b-nav-item
        href="https://twitter.com/BootstrapVue"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Twitter' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          class="navbar-nav-svg"
          focusable="false"
          role="img"
        >
          <title>Twitter</title>
          <g fill="currentColor">
            <path d="M32,6.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6C25.7,3.8,24,3,22.2,3 c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5C10.3,10.8,5.5,8.2,2.2,4.2c-0.6,1-0.9,2.1-0.9,3.3c0,2.3,1.2,4.3,2.9,5.5 c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1C2.9,27.9,6.4,29,10.1,29c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C30,8.5,31.1,7.4,32,6.1z" />
          </g>
        </svg>
      </b-nav-item>

      <b-nav-item
        href="https://discord.gg/j2Mtcny"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Discord' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          class="navbar-nav-svg"
          focusable="false"
          role="img"
        >
          <title>Discord</title>
          <g fill="currentColor">
            <path d="M13.1,13.424a1.782,1.782,0,0,0,0,3.552A1.7,1.7,0,0,0,14.736,15.2,1.694,1.694,0,0,0,13.1,13.424Zm5.84,0A1.782,1.782,0,1,0,20.576,15.2,1.7,1.7,0,0,0,18.944,13.424Z" />
            <path d="M26.72,0H5.28A3.288,3.288,0,0,0,2,3.3V24.928a3.288,3.288,0,0,0,3.28,3.3H23.424l-.848-2.96,2.048,1.9L26.56,28.96,30,32V3.3A3.288,3.288,0,0,0,26.72,0ZM20.544,20.9s-.576-.688-1.056-1.3a5.049,5.049,0,0,0,2.9-1.9,9.156,9.156,0,0,1-1.84.944,10.531,10.531,0,0,1-2.32.688,11.208,11.208,0,0,1-4.144-.016,13.431,13.431,0,0,1-2.352-.688A9.6,9.6,0,0,1,9.9,17.68a4.976,4.976,0,0,0,2.8,1.888c-.48.608-1.072,1.328-1.072,1.328a5.8,5.8,0,0,1-4.88-2.432,21.426,21.426,0,0,1,2.3-9.328,7.912,7.912,0,0,1,4.5-1.68l.16.192A10.794,10.794,0,0,0,9.5,9.744s.352-.192.944-.464A12.015,12.015,0,0,1,14.08,8.272a1.576,1.576,0,0,1,.272-.032,13.538,13.538,0,0,1,3.232-.032A13.043,13.043,0,0,1,22.4,9.744a10.648,10.648,0,0,0-3.984-2.032l.224-.256a7.912,7.912,0,0,1,4.5,1.68,21.426,21.426,0,0,1,2.3,9.328A5.849,5.849,0,0,1,20.544,20.9Z" />
          </g>
        </svg>
      </b-nav-item>

      <b-nav-item
        href="https://opencollective.com/bootstrap-vue/"
        target="_blank"
        :link-attrs="{ 'aria-label': 'Open Collective' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 41"
          width="32"
          height="32"
          class="navbar-nav-svg"
          fill="currentColor"
          fill-rule="evenodd"
          focusable="false"
          role="img"
        >
          <title>Open Collective</title>
          <path fill-opacity=".4" d="M32.8 21c0 2.4-.8 4.9-2 6.9l5.1 5.1c2.5-3.4 4.1-7.6 4.1-12 0-4.6-1.6-8.8-4-12.2L30.7 14c1.2 2 2 4.3 2 7z" />
          <path d="M20 33.7a12.8 12.8 0 0 1 0-25.6c2.6 0 5 .7 7 2.1L32 5a20 20 0 1 0 .1 31.9l-5-5.2a13 13 0 0 1-7 2z" />
        </svg>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { BASE_URL, BASE_URL_DEV, NETLIFY_URL } from '~/constants'
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
      if (this.isNetlify) {
        return NETLIFY_URL
      }
      return BASE_URL_DEV
    },
    isNetlify() {
      return Boolean(process.env.NETLIFY)
    },
    isVercel() {
      return Boolean(process.env.VERCEL_NOW)
    },
    branchName() {
      // Netlify doesn't support providing the branch name
      return this.isVercel ? process.env.VERCEL_BRANCH || '' : ''
    },
    isDev() {
      // In our case, `production` is the dev branch preview (Netlify)
      return (
        (this.isNetlify && process.env.NETLIFY_CONTEXT === 'production') ||
        (this.isVercel && this.branchName === 'dev')
      )
    },
    isPR() {
      return (
        (this.isNetlify && process.env.PULL_REQUEST && process.env.REVIEW_ID) ||
        (this.isVercel && !this.isDev && this.branchName !== 'master')
      )
    },
    prId() {
      // Vercel doesn't currently support returning the PR number
      // `REVIEW_ID` is provided by Netlify
      return this.isPR ? process.env.REVIEW_ID : ''
    },
    dropdownText() {
      // Dropdown button text
      if (this.isPR) {
        // Vercel doesn't currently support returning the PR number
        return this.prId ? `Pull #${this.prId}` : 'Pull Request'
      } else if (this.isLocal) {
        return 'Local Copy'
      } else if (this.isDev) {
        return 'Development'
      }
      return `v${version}`
    }
  },
  mounted() {
    const host = window.location.host || ''
    this.isLocal = host === 'localhost' || host === '127.0.0.1'
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
