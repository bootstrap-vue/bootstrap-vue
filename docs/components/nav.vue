<template>
  <b-navbar
    toggleable="md"
    class="navbar-dark bd-navbar"
    sticky
  >
    <b-navbar-toggle target="bd-main-nav" />

    <b-navbar-brand
      to="/"
      exact
    >
      <svg
        class="d-block"
        width="36"
        height="36"
        viewBox="0 0 612 612"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        fill="#fff"
      >
        <path
          d="M510,8 C561.846401,8.16468012 603.83532,50.1535995 604,102 L604,510 C603.83532,561.846401 561.846401,603.83532 510,604 L102,604 C50.1535995,603.83532 8.16468012,561.846401 8,510 L8,102 C8.16468012,50.1535995 50.1535995,8.16468012 102,8 L510,8 L510,8 Z M510,0 L102,0 C45.9,6.21724894e-15 0,45.9 0,102 L0,510 C0,566.1 45.9,612 102,612 L510,612 C566.1,612 612,566.1 612,510 L612,102 C612,45.9 566.1,6.21724894e-15 510,0 Z"
          fill-rule="nonzero"
        />
        <text
          id="BV"
          font-family="Arial"
          font-size="350"
          font-weight="light"
          letter-spacing="2"
        >
          <tspan
            x="72.0527344"
            y="446"
          >
            B
          </tspan>
          <tspan
            x="307.5"
            y="446"
          >
            V
          </tspan>
        </text>
      </svg>
      <span class="sr-only">Home</span>
    </b-navbar-brand>

    <b-collapse
      id="bd-main-nav"
      is-nav
      class="justify-content-between"
    >
      <b-navbar-nav>
        <b-nav-item
          to="/docs"
          exact
        >
          Docs
        </b-nav-item>
        <b-nav-item to="/docs/components" active-class="active">Components</b-nav-item>
        <b-nav-item to="/docs/directives" active-class="active">Directives</b-nav-item>
        <b-nav-item to="/docs/reference" active-class="active">Reference</b-nav-item>
        <b-nav-item to="/docs/misc" active-class="active">Misc</b-nav-item>
        <b-nav-item to="/play" active-class="active">Play</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item-dropdown
          :text="`v${version}`"
          right
        >
          <b-dropdown-item href="http://dev.bootstrap-vue.netlify.com">Development</b-dropdown-item>
          <b-dropdown-item href="https://bootstrap-vue.js.org">Latest (v{{ version }})</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item
          href="https://github.com/bootstrap-vue/bootstrap-vue"
          target="_blank"
        >
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 499.36"
            focusable="false"
          >
            <title>GitHub</title>
            <path
              d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
          <span class="sr-only">GitHub</span>
        </b-nav-item>

        <b-nav-item
          href="https://twitter.com/BootstrapVue"
          target="_blank"
        >
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 499.36"
            focusable="false"
          >
            <title>Twitter</title>
            <path
              d="M160.83 416.32c193.2 0 298.92-160.22 298.92-298.92 0-4.51 0-9-.2-13.52A214 214 0 0 0 512 49.38a212.93 212.93 0 0 1-60.44 16.6 105.7 105.7 0 0 0 46.3-58.19 209 209 0 0 1-66.79 25.37 105.09 105.09 0 0 0-181.73 71.91 116.12 116.12 0 0 0 2.66 24c-87.28-4.3-164.73-46.3-216.56-109.82A105.48 105.48 0 0 0 68 159.6a106.27 106.27 0 0 1-47.53-13.11v1.43a105.28 105.28 0 0 0 84.21 103.06 105.67 105.67 0 0 1-47.33 1.84 105.06 105.06 0 0 0 98.14 72.94A210.72 210.72 0 0 1 25 370.84a202.17 202.17 0 0 1-25-1.43 298.85 298.85 0 0 0 160.83 46.92"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">Twitter</span>
        </b-nav-item>

        <b-nav-item
          href="https://discord.gg/j2Mtcny"
          target="_blank"
        >
          <svg
            class="navbar-nav-svg"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            viewBox="0 0 245 240"
          >
            <title>Discord Chat</title>
            <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" fill="currentColor" />
            <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" fill="currentColor" />
          </svg>
          <span class="sr-only">Discord Chat</span>
        </b-nav-item>

        <div class="nav-item nav-link">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="100px"
            height="20px"
          />
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
