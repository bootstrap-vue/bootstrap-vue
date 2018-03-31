<template>
  <b-navbar
    toggleable="md"
    class="navbar-dark bd-navbar"
    sticky>

    <b-navbar-toggle target="bd-main-nav"/>

    <b-navbar-brand
      to="/"
      exact>
      <svg
        class="d-block"
        width="36"
        height="36"
        viewBox="0 0 612 612"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        fill="#fff">
        <path
          d="M510,8 C561.846401,8.16468012 603.83532,50.1535995 604,102 L604,510 C603.83532,561.846401 561.846401,603.83532 510,604 L102,604 C50.1535995,603.83532 8.16468012,561.846401 8,510 L8,102 C8.16468012,50.1535995 50.1535995,8.16468012 102,8 L510,8 L510,8 Z M510,0 L102,0 C45.9,6.21724894e-15 0,45.9 0,102 L0,510 C0,566.1 45.9,612 102,612 L510,612 C566.1,612 612,566.1 612,510 L612,102 C612,45.9 566.1,6.21724894e-15 510,0 Z"
          fill-rule="nonzero"/>
        <text
          id="BV"
          font-family="Arial"
          font-size="350"
          font-weight="light"
          letter-spacing="2">
          <tspan
            x="72.0527344"
            y="446">B</tspan>
          <tspan
            x="307.5"
            y="446">V</tspan>
        </text>
      </svg>
      <span class="sr-only">Home</span>
    </b-navbar-brand>

    <b-collapse
      is-nav
      class="justify-content-between"
      id="bd-main-nav">

      <b-navbar-nav>
        <b-nav-item
          to="/docs"
          exact>Docs</b-nav-item>
        <b-nav-item to="/docs/components">Components</b-nav-item>
        <b-nav-item to="/docs/directives">Directives</b-nav-item>
        <b-nav-item to="/docs/reference">Reference</b-nav-item>
        <b-nav-item to="/docs/misc">Misc</b-nav-item>
        <b-nav-item to="/play">Play</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>

        <b-nav-item-dropdown
          :text="`v${version}`"
          right>
          <b-dropdown-item href="http://dev.bootstrap-vue.netlify.com">Development</b-dropdown-item>
          <b-dropdown-item href="https://bootstrap-vue.js.org">Latest (v{{ version }})</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item href="http://beta.bootstrap-vue.netlify.com">Beta 2 (v1.5.0)</b-dropdown-item>
          <b-dropdown-item href="http://alpha.bootstrap-vue.netlify.com">Alpha 6 (v0.23.1)</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item
          href="https://github.com/bootstrap-vue/bootstrap-vue"
          target="_blank">
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 499.36"
            focusable="false">
            <title>GitHub</title>
            <path
              d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
              fill="currentColor"
              fill-rule="evenodd"/>
          </svg>
          <span class="sr-only">GitHub</span>
        </b-nav-item>

        <b-nav-item
          href="https://twitter.com/BootstrapVue"
          target="_blank">
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 499.36"
            focusable="false">
            <title>Twitter</title>
            <path
              d="M160.83 416.32c193.2 0 298.92-160.22 298.92-298.92 0-4.51 0-9-.2-13.52A214 214 0 0 0 512 49.38a212.93 212.93 0 0 1-60.44 16.6 105.7 105.7 0 0 0 46.3-58.19 209 209 0 0 1-66.79 25.37 105.09 105.09 0 0 0-181.73 71.91 116.12 116.12 0 0 0 2.66 24c-87.28-4.3-164.73-46.3-216.56-109.82A105.48 105.48 0 0 0 68 159.6a106.27 106.27 0 0 1-47.53-13.11v1.43a105.28 105.28 0 0 0 84.21 103.06 105.67 105.67 0 0 1-47.33 1.84 105.06 105.06 0 0 0 98.14 72.94A210.72 210.72 0 0 1 25 370.84a202.17 202.17 0 0 1-25-1.43 298.85 298.85 0 0 0 160.83 46.92"
              fill="currentColor"/>
          </svg>
          <span class="sr-only">Twitter</span>
        </b-nav-item>

        <b-nav-item
          href="https://bootstrap-vue.now.sh"
          target="_blank">
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            focusable="false">
            <title>Slack</title>
            <path
              fill="currentColor"
              d="M210.787 234.832l68.31-22.883 22.1 65.977-68.309 22.882z"/>
            <path
              d="M490.54 185.6C437.7 9.59 361.6-31.34 185.6 21.46S-31.3 150.4 21.46 326.4 150.4 543.3 326.4 490.54 543.34 361.6 490.54 185.6zM401.7 299.8l-33.15 11.05 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.38-68.36 22.92 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.43-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.5-13.92 2.87-29.06 16.78-33.56l33.12-11.03-22.1-65.9-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.48-13.93 2.89-29.07 16.81-33.58l33.15-11.05-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.46 34.38 68.36-22.92-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.47 34.42 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.87 29.06-16.78 33.56L329.7 194.6l22.1 65.9 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.88 29.07-16.81 33.57z"
              fill="currentColor"/>
          </svg>
          <span class="sr-only">Slack</span>
        </b-nav-item>

        <div class="nav-item nav-link">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="100px"
            height="20px"/>
        </div>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<style>
.main-nav {
  box-shadow: 0 0 5px rgba(57, 70, 78, 0.2) !important;
  background: white;
  z-index: 1050;
  padding-bottom: 0;
}

.main-nav .nav-link,
.main-nav .navbar-brand {
  padding-bottom: 10px;
  border-bottom: 3px solid transparent;
}

.main-nav .nav-link.nuxt-link-active {
  border-bottom: 3px solid #4fc08d;
}

.navbar-brand img {
  height: 1.5em;
  padding-right: 0.5em;
}
</style>

<script>
import { version } from '~/content'

export default {
  computed: {
    version: () => version
  }
}
</script>
