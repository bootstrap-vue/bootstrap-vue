<template>
  <main id="content" role="main">
    <section class="bd-masthead pb-2">
      <b-container tag="article">
        <b-row align-v="center" class="mb-4">
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <b-col tag="aside" cols="8" offset="2" sm="6" offset-sm="3" md="4" offset-md="0" order-md="2">
            <!-- vue-loader will inline the svg as a data uri -->
            <!-- eslint-disable-next-line vue/max-attributes-per-line -->
            <b-img src="~static/logo.svg" alt="BootstrapVue logo" class="bv-logo mb-4 mb-md-0" center fluid></b-img>
          </b-col>

          <b-col tag="section" md="8" order-md="1">
            <h1 class="mb-3 text-center text-md-left bd-text-purple-bright">
              Bootstrap<span class="text-vue-green">Vue</span>
            </h1>

            <p class="lead">
              With <span class="font-weight-bolder">BootstrapVue</span> you can build responsive,
              mobile-first projects on the web using <span class="bd-text-purple-bright">Vue.js</span>
              and the world's most popular front-end CSS library &mdash;
              <span class="bd-text-purple-bright">Bootstrap v4</span>.
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
                  <title>Bootstrap logo</title>
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
                  <title>Vue.js logo</title>
                  <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z" />
                  <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z" />
                </svg>
              </b-media-aside>
              <b-media-body class="ml-3 text-muted">
                <a href="https://vuejs.org" target="_blank">Vue.js</a> (pronounced /<i>vjuː</i>/, like view)
                is a progressive framework for building user interfaces.
              </b-media-body>
            </b-media>

            <p class="mb-0 text-muted">
              Currently <b-link to="/docs/misc/changelog">v{{ version }}</b-link>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="bv-section bv-gray-color">
      <b-container tag="article">
        <b-row class="mb-4">
          <b-col lg="10" offset-lg="1">
            <b-card-text class="text-lg-center">
              With over 40 available plugins and more than 75 custom UI components,
              <span class="bd-text-purple-bright">BootstrapVue</span> provides one of the most
              comprehensive implementations of the
              <span class="bd-text-purple-bright">Bootstrap v4.3</span> component and grid system
              available for <span class="bd-text-purple-bright">Vue.js v2.6+</span>, complete with
              extensive and automated
              <b-link href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank">
                <abbr title="Web Accessibility Initiative – Accessible Rich Internet Applications">WAI-ARIA</abbr>
              </b-link>
              accessibility markup.
            </b-card-text>
          </b-col>
        </b-row>

        <b-row class="justify-content-lg-center">
          <b-col md="4" lg="3">
            <b-btn
              to="/docs"
              variant="bd-primary"
              size="lg"
              class="mb-3 mb-md-0"
              block
            >
              Get started
            </b-btn>
          </b-col>
          <b-col md="4" lg="3">
            <b-btn
              to="/play"
              variant="bd-primary"
              size="lg"
              class="mb-3 mb-md-0"
              block
            >
              Playground
            </b-btn>
          </b-col>
          <b-col md="4" lg="3">
            <b-btn
              href="https://github.com/bootstrap-vue/bootstrap-vue"
              variant="outline-secondary"
              size="lg"
              target="_blank"
              block
            >
              GitHub
            </b-btn>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="bv-section bv-white">
      <b-container>
        <b-card-group deck class="mb-sm-4">
          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center mb-2 bd-text-purple-bright">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <!-- eslint-disable-next-line vue/max-attributes-per-line -->
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>

              <span>Responsive</span>
            </b-card-text>

            <b-card-text class="text-center">
              Mobile first responsive layout
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>

              <span>Modular</span>
            </b-card-text>

            <b-card-text class="text-center">
              <b-link to="/docs/#tree-shaking-with-module-bundlers">Import</b-link> only the features that you need
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>

              <span>Accessible</span>
            </b-card-text>

            <b-card-text class="text-center">
              Automated <b-link to="/docs/reference/accessibility">WAI-ARIA accessibility</b-link> markup
            </b-card-text>
          </b-card>
        </b-card-group>

        <b-card-group deck class="mb-n3">
          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 448 512"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
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

          <b-card tag="article" body-text-variant="muted" body-class="px-2" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>

              <span>Configurable</span>
            </b-card-text>

            <b-card-text class="text-center">
              Create <b-link to="/docs/reference/theming">themes</b-link> with SCSS variables and <b-link to="/docs/misc/settings">global options</b-link>
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h5" class="text-center bd-text-purple-bright mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.5em"
                viewBox="0 0 496 512"
                class="mx-auto d-block mb-3"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>

              <span>Free</span>
            </b-card-text>

            <b-card-text class="text-center">
              Open sourced on <a href="https://github.com/bootstrap-vue/bootstrap-vue/" target="_blank">GitHub</a>,
              <a href="https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE" target="_blank">MIT</a> License
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-container>
    </section>

    <section class="bv-section bv-gray">
      <b-container tag="article" class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 400 400"
          class="d-block mx-auto mb-2"
          version="1"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <title>Nuxt.js logo</title>
          <g transform="translate(0 49)" fill="none" fill-rule="evenodd">
            <path
              fill="#00C58E"
              d="M123 292l-1-1c-2-4-2-8-2-12H25L167 27l59 107 19-14-59-107c-1-2-8-13-20-13-5 0-13 2-19 13L4 268c-1 2-7 14-1 24 2 5 8 10 21 10h120c-13 0-19-5-21-10z"
            />
            <path
              fill="#108775"
              d="M395 269L280 62c-2-2-8-13-20-13-5 0-12 2-19 13l-15 24v48l34-59 114 204h-43a20 20 0 0 1-2 12v1c-6 10-19 10-21 10h68c2 0 15 0 21-10 2-5 4-13-2-23z"
            />
            <path
              fill="#2F495E"
              fill-rule="nonzero"
              d="M332 292v-1l1-2c1-3 2-7 1-10l-4-11-90-158-13-24h-1l-13 24-91 158-3 11a21 21 0 0 0 2 13c3 5 9 10 21 10h168c3 0 16 0 22-10zM226 134l83 145H144l82-145z"
            />
          </g>
        </svg>
        <p>
          BootstrapVue's documentation is created using
          <span class="bd-text-purple-bright">BootstrapVue</span> and
          generated with <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
        </p>
        <b-button to="/docs#nuxtjs-module" size="sm" variant="outline-secondary">BootstrapVue Nuxt.js module</b-button>
      </b-container>
    </section>

    <section class="bv-section bv-white">
      <b-container tag="article" class="text-center">
        <h5 class="text-center bd-text-purple-bright mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 41"
            width="2.5em"
            height="2.5em"
            class="d-block mx-auto mb-2"
            fill="currentColor"
            fill-rule="evenodd"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <title>Open Collective logo</title>
            <path
              fill-opacity=".4"
              d="M32.8 21c0 2.4-.8 4.9-2 6.9l5.1 5.1c2.5-3.4 4.1-7.6 4.1-12 0-4.6-1.6-8.8-4-12.2L30.7 14c1.2 2 2 4.3 2 7z"
            />
            <path d="M20 33.7a12.8 12.8 0 0 1 0-25.6c2.6 0 5 .7 7 2.1L32 5a20 20 0 1 0 .1 31.9l-5-5.2a13 13 0 0 1-7 2z" />
          </svg>
          Support BootstrapVue on Open Collective
        </h5>
        <b-button
          href="https://opencollective.com/bootstrap-vue#backer"
          size="sm"
          variant="outline-secondary"
          target="_blank"
        >
          Become a backer
        </b-button>
        <b-button
          href="https://opencollective.com/bootstrap-vue#sponsor"
          size="sm"
          variant="outline-secondary"
          target="_blank"
        >
          Become a sponsor
        </b-button>
      </b-container>
    </section>

    <section class="bv-section bv-gray bv-p-reset">
      <!-- to give footer on landing page angled top -->
    </section>
  </main>
</template>

<style lang="scss" scoped>
.text-vue-green {
  color: #42b883;
}

// Depth of section angle
$bv-angle-depth: 4rem;
$bv-angle-padding: 3rem;
$bv-angle-depth-md: 8rem;
$bv-angle-padding-md: 6rem;

.bv-section {
  background-size: 100% $bv-angle-depth;
  background-position: center top;
  background-repeat: no-repeat;
  padding-top: calc(#{$bv-angle-depth} + #{$bv-angle-padding});
  padding-bottom: 3rem;

  &.bv-white {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3336' preserveAspectRatio='none' version='1.1'%3E%3Cg%3E%3Cpolygon fill='%23eee' points='13913,3336 0,0 27826,0' /%3E%3C/g%3E%3C/svg%3E");
    background-color: #fff;
  }

  &.bv-gray {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3336' preserveAspectRatio='none' version='1.1'%3E%3Cg%3E%3Cpolygon fill='%23fff' points='13913,3336 0,0 27826,0'/%3E%3C/g%3E%3C/svg%3E");
    background-color: #eee;
  }

  &.bv-gray-color {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3450' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='a' filterUnits='objectBoundingBox' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeOffset in='SourceGraphic' result='b' dy='20'/%3E%3CfeGaussianBlur in='b' stdDeviation='25'/%3E%3C/filter%3E%3C/defs%3E%3Cpath filter='url(%23a)' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath fill='%2342B883' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath fill='%237952B3' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3Cpath fill='%23fff' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3C/svg%3E%0A");
    background-size: 175% 9rem;
    background-position-y: -2.75rem;
    background-color: #eee;
    padding-top: 9rem;
  }

  &.bv-p-reset {
    padding-top: $bv-angle-depth;
    padding-bottom: 0;
  }

  @media (min-width: 768px) {
    padding-bottom: 2rem;
    padding-top: calc(#{$bv-angle-depth-md} + #{$bv-angle-padding-md});

    &.bv-white,
    &.bv-gray {
      background-size: 100% $bv-angle-depth-md;
    }

    &.bv-gray-color {
      background-size: 100% 12rem;
      background-position-y: top;
      padding-top: 16rem;
    }

    &.bv-p-reset {
      padding-top: $bv-angle-depth-md;
      padding-bottom: 0;
    }
  }
}

.bv-logo {
  filter: drop-shadow(-3px 12px 2px #e7e7e7);
  animation: logo-splash 0.35s 1 ease-in-out;
  width: 100%; // IE11 Fix
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;
  transform-style: preserve-3d;
}

@media (prefers-reduced-motion: reduce) {
  .bv-logo {
    transition: none;
    animation: none;
  }
}

@keyframes logo-splash {
  0% {
    opacity: 0.1;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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
