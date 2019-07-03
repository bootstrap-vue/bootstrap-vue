<template>
  <main id="content" class="bd-masthead" role="main">
    <div class="container">
      <div class="row align-items-center">
        <aside class="col-md-6 order-md-2">
          <img src="~/static/icon.png" alt="BootstrapVue logo" class="img-fluid mx-auto d-block mb-3 mb-md-0">
        </aside>
        <section class="col-md-6 order-md-1">
          <h1 class="mb-3 text-center text-md-left bd-text-purple-bright">Bootstrap + Vue</h1>

          <p class="lead">
            With <span class="bd-text-purple-bright">BootstrapVue</span> you can build responsive,
            mobile-first projects on the web using <span class="bd-text-purple-bright">Vue.js</span>
            and the world's most popular front-end CSS library &mdash;
            <span class="bd-text-purple-bright">Bootstrap v4</span>.
          </p>

          <p class="mb-3">
            With over 40 available plugins and more than 75 custom UI components,
            <span class="bd-text-purple-bright">BootstrapVue</span> provides one of the most
            comprehensive implementations of the
            <span class="bd-text-purple-bright">Bootstrap v4.3</span> component and grid system
            available for <span class="bd-text-purple-bright">Vue.js v2.6+</span>, complete with
            extensive and automated
            <b-link href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank">
              <abbr title="Web Accessibility Initiative – Accessible Rich Internet Applications">WAI-ARIA</abbr>
            </b-link>
            accessibility markup. <samp>jQuery</samp> is not required.
          </p>

          <p class="mb-2 text-muted">
            BootstrapVue's documentation is created using
            <span class="bd-text-purple-bright">BootstrapVue</span> components and
            generated with <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>.
          </p>

          <b-media no-body class="my-3">
            <b-media-aside vertical-align="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 612"
                width="30px"
                height="30px"
                focusable="false"
                role="img"
              >
                <title>Bootstrap v4 Logo</title>
                <path fill="#563D7C" d="M612 510c0 56.1-45.9 102-102 102H102C45.9 612 0 566.1 0 510V102C0 45.9 45.9 0 102 0h408c56.1 0 102 45.9 102 102v408z" />
                <path fill="#FFF" d="M166.3 133h173.5c32 0 57.7 7.3 77 22s29 36.8 29 66.5c0 18-4.4 33.4-13.2 46.2-8.8 12.8-21.4 22.8-37.8 29.8v1c22 4.7 38.7 15.1 50 31.2 11.3 16.2 17 36.4 17 60.8 0 14-2.5 27.1-7.5 39.2-5 12.2-12.8 22.7-23.5 31.5s-24.3 15.8-41 21-36.5 7.8-59.5 7.8h-164V133zm62.5 149.5h102c15 0 27.5-4.2 37.5-12.8s15-20.8 15-36.8c0-18-4.5-30.7-13.5-38s-22-11-39-11h-102v98.6zm0 156.5h110.5c19 0 33.8-4.9 44.2-14.8 10.5-9.8 15.8-23.8 15.8-41.8 0-17.7-5.2-31.2-15.8-40.8s-25.2-14.2-44.2-14.2H228.8V439z" />
              </svg>
            </b-media-aside>
            <b-media-body class="ml-3 text-muted">
              <a href="https://getbootstrap.com/docs/4.3" target="_blank">Bootstrap v4</a> is the
              world's most popular framework for building responsive, mobile-first sites.
            </b-media-body>
          </b-media>

          <b-media no-body class="mb-4">
            <b-media-aside vertical-align="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 196.32 170.02"
                width="30px"
                height="30px"
                focusable="false"
                role="img"
              >
                <title>Vue.js Logo</title>
                <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z" />
                <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z" />
              </svg>
            </b-media-aside>
            <b-media-body class="ml-3 text-muted">
              <a href="https://vuejs.org" target="_blank">Vue.js</a> (pronounced /<i>vjuː</i>/, like view)
              is a progressive framework for building user interfaces.
            </b-media-body>
          </b-media>

          <div class="d-flex flex-column flex-md-row lead mb-3">
            <b-btn
              to="/docs"
              variant="bd-primary"
              size="lg"
              class="mb-3 mb-md-0 mr-md-3"
            >
              Get started
            </b-btn>
            <b-btn
              href="https://github.com/bootstrap-vue/bootstrap-vue"
              variant="outline-secondary"
              size="lg"
              target="_blank"
            >
              GitHub
            </b-btn>
          </div>
          <b-link class="text-muted mb-0" to="/docs/misc/changelog">
            Currently v{{ version }}
          </b-link>
        </section>
      </div>

      <b-card-group class="mb-0 mt-3">
        <b-card tag="article" bg-variant="transparent" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center mb-2 bd-text-purple-bright">
            <svg
              class="img-responsive mx-auto d-block mb-2"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
              />
            </svg>
            <span>Responsive</span>
          </b-card-text>
          <b-card-text class="text-center">
            Mobile first responsive layout
          </b-card-text>
        </b-card>
        <b-card tag="article" bg-variant="light" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
            <svg
              class="img-responsive mx-auto d-block mb-2"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"
              />
            </svg>
            <span>Modular</span>
          </b-card-text>
          <b-card-text class="text-center">
            <!-- make this a shorter url i.e. /docs/#tree-shaking -->
            <b-link to="/docs/#selective-component-and-directive-inclusion-in-module-bundlers">Import</b-link> only the features that you need
          </b-card-text>
        </b-card>
        <b-card tag="article" bg-variant="transparent" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
            <svg
              class="img-responsive mx-auto d-block mb-2"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M569.344 231.631C512.96 135.949 407.81 72 288 72c-28.468 0-56.102 3.619-82.451 10.409L152.778 10.24c-7.601-10.858-22.564-13.5-33.423-5.9l-13.114 9.178c-10.86 7.601-13.502 22.566-5.9 33.426l43.131 58.395C89.449 131.73 40.228 174.683 6.682 231.581c-.01.017-.023.033-.034.05-8.765 14.875-8.964 33.528 0 48.739 38.5 65.332 99.742 115.862 172.859 141.349L55.316 244.302A272.194 272.194 0 0 1 83.61 208.39l119.4 170.58h.01l40.63 58.04a330.055 330.055 0 0 0 78.94 1.17l-189.98-271.4a277.628 277.628 0 0 1 38.777-21.563l251.836 356.544c7.601 10.858 22.564 13.499 33.423 5.9l13.114-9.178c10.86-7.601 13.502-22.567 5.9-33.426l-43.12-58.377-.007-.009c57.161-27.978 104.835-72.04 136.81-126.301a47.938 47.938 0 0 0 .001-48.739zM390.026 345.94l-19.066-27.23c24.682-32.567 27.711-76.353 8.8-111.68v.03c0 23.65-19.17 42.82-42.82 42.82-23.828 0-42.82-19.349-42.82-42.82 0-23.65 19.17-42.82 42.82-42.82h.03c-24.75-13.249-53.522-15.643-79.51-7.68l-19.068-27.237C253.758 123.306 270.488 120 288 120c75.162 0 136 60.826 136 136 0 34.504-12.833 65.975-33.974 89.94z"
              />
            </svg>
            <span>Accessible</span>
          </b-card-text>
          <b-card-text class="text-center">
            Automated <b-link to="/docs/reference/accessibility">WAI-ARIA accessible</b-link> markup
          </b-card-text>
        </b-card>
      </b-card-group>
      <b-card-group>
        <b-card tag="article" bg-variant="light" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
            <svg
              class="img-responsive mx-auto d-block mb-2"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"
              />
            </svg>
            <span>Modern</span>
          </b-card-text>
          <b-card-text class="text-center" bg-variant="light">
            Built with <a href="https://vuejs.org/">Vue.js v2.6</a> and <a href="https://getbootstrap.com">Bootstrap SCSS v4.3</a>
          </b-card-text>
        </b-card>
        <b-card  tag="article" bg-variant="transparent" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
            <svg
              class="img-responsive mx-auto d-block mb-2"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
              />
            </svg>
            <span>Configurable</span>
          </b-card-text>
          <b-card-text class="text-center">
            Create <b-link to="/docs/reference/theming">themes</b-link> with SCSS variables and <b-link to="/docs/misc/settings">global options</b-link>
          </b-card-text>
        </b-card>
        <b-card tag="article" bg-variant="light" border-variant="white" body-text-variant="muted">
          <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
            <svg
              class="img-responsive mx-auto d-block mb-1"
              height="48px"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              />
            </svg>
            <span>Free</span>
          </b-card-text>
          <b-card-text class="text-center">
            Open sourced on <a href="https://github.com/bootstrap-vue/bootstrap-vue/">GitHub</a>, MIT Lisence.
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </main>
</template>

<style scoped>
.version a {
  color: white;
}

#logo {
  animation: flip 1s;
  transform-style: preserve-3d;
}

@keyframes flip {
  0% {
    opacity: 0.5;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
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
