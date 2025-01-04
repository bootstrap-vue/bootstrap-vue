<template>
  <main id="content" role="main">
    <section class="bd-masthead pt-3 pt-sm-5 pb-2">
      <b-container tag="article">
        <b-row align-v="center" no-gutters class="mb-2 mb-md-3 mb-lg-4">
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <b-col tag="aside" cols="12" md="4" order-md="2" class="logo-aside mb-4 mb-md-0">
            <bv-logo-animated></bv-logo-animated>
          </b-col>
          <b-col tag="header" cols="12" md="8" order-md="1">
            <h1 class="mb-3 text-center text-md-left bd-text-purple-bright">
              Bootstrap<span class="text-vue-green">Vue</span>
            </h1>

            <p class="lead">
              With <span class="font-weight-bolder">BootstrapVue</span> you can build responsive,
              mobile-first, and ARIA accessible projects on the web using
              <span class="text-muted font-weight-bolder">Vue.js</span> and the world's most popular
              front-end CSS library &mdash;
              <span class="text-muted font-weight-bolder">Bootstrap v4</span>.
            </p>

            <b-media no-body class="my-3">
              <b-media-aside vertical-align="center">
                <bootstrap-logo width="30" height="30"></bootstrap-logo>
              </b-media-aside>
              <b-media-body class="ml-3 text-muted align-self-center">
                <a :href="bootstrapUrl" target="_blank">Bootstrap v4</a> is the world's most popular
                framework for building responsive, mobile-first sites.
              </b-media-body>
            </b-media>

            <b-media no-body class="mb-4">
              <b-media-aside vertical-align="center">
                <vue-logo width="30" height="30" class="media-vue-logo"></vue-logo>
              </b-media-aside>
              <b-media-body class="ml-3 text-muted align-self-center">
                <a href="https://vuejs.org" target="_blank">Vue.js</a>
                (pronounced <span class="text-nowrap">/<i>vjuː</i>/</span>, like view)
                is a progressive framework for building user interfaces.
              </b-media-body>
            </b-media>
          </b-col>
        </b-row>

        <p class="mb-0 text-muted text-center mb-n4 mb-md-n5">
          Current Version<br>
          <b-link to="/docs/reference/changelog" class="small">v{{ version }}</b-link>
        </p>
      </b-container>
    </section>

    <section class="bv-section bv-gray-color">
      <b-container tag="article">
        <div class="d-flex flex-column">
          <div class="order-2 order-md-1">
            <h2 class="h4 text-center bd-text-purple-bright">Overview</h2>
            <b-row class="mb-4">
              <b-col lg="10" offset-lg="1">
                <p class="text-lg-center">
                  With more than 85 components, over 45 available plugins, several directives, and {{ bootstrapIconsCount }}+ icons,
                  <span class="bd-text-purple-bright">BootstrapVue</span> provides one of the most
                  comprehensive implementations of the
                  <span class="bd-text-purple-bright">Bootstrap v{{ bootstrapVersionMajor }}</span> component and grid system
                  available for <span class="bd-text-purple-bright">Vue.js v{{ vueVersionMinor }}</span>, complete with
                  extensive and automated
                  <b-link href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank">
                    <abbr title="Web Accessibility Initiative – Accessible Rich Internet Applications">WAI-ARIA</abbr>
                  </b-link>
                  accessibility markup.
                </p>
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
          </div>
        </div>
      </b-container>
    </section>

    <section class="bv-section bv-white">
      <b-container>
        <h2 class="h4 text-center text-muted">Reasons to choose BootstrapVue</h2>
        <b-card-group deck class="mb-sm-4">
          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center mb-2 bd-text-purple-bright">
              <b-icon icon="phone" width="2.5em" height="2.5em" class="mx-auto d-block mb-3"></b-icon>
              <span>Responsive</span>
            </b-card-text>
            <b-card-text class="text-center">
              Mobile first <b-link to="/docs/components/layout">responsive</b-link> layout
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center bd-text-purple-bright mb-2">
              <b-icon icon="puzzle" width="2.5em" height="2.5em" class="mx-auto d-block mb-3"></b-icon>
              <span>Modular</span>
            </b-card-text>
            <b-card-text class="text-center">
              <b-link to="/docs/#tree-shaking-with-module-bundlers">Import</b-link> only the features that you need
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center bd-text-purple-bright mb-2">
              <b-icon icon="eye-slash" width="2.5em" height="2.5em" class="mx-auto d-block mb-3"></b-icon>
              <span>Accessible</span>
            </b-card-text>
            <b-card-text class="text-center">
              Automated <b-link to="/docs/reference/accessibility">WAI-ARIA accessibility</b-link> markup
            </b-card-text>
          </b-card>
        </b-card-group>

        <b-card-group deck class="mb-n3">
          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center bd-text-purple-bright mb-2">
              <vue-logo-outline width="2.5em" height="2.5em" class="mx-auto d-block mb-3"></vue-logo-outline>
              <span>Modern</span>
            </b-card-text>
            <b-card-text class="text-center" bg-variant="light">
              Built with <a href="https://vuejs.org/">Vue.js v{{ vueVersionMinor }}</a> and
              <a href="https://getbootstrap.com">Bootstrap SCSS v{{ bootstrapVersionMinor }}</a>
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" body-class="px-2" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center bd-text-purple-bright mb-2">
              <b-icon icon="gear" width="2.5em" height="2.5em" class="mx-auto d-block mb-3"></b-icon>
              <span>Configurable</span>
            </b-card-text>
            <b-card-text class="text-center">
              Create <b-link to="/docs/reference/theming">themes</b-link> with SCSS variables and <b-link to="/docs/reference/settings">global options</b-link>
            </b-card-text>
          </b-card>

          <b-card tag="article" body-text-variant="muted" class="rounded-0 border-0">
            <b-card-text text-tag="h3" class="h5 text-center bd-text-purple-bright mb-2">
              <b-icon icon="github" width="2.5rem" height="2.5rem" class="mx-auto d-block mb-3"></b-icon>
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
        <h2 class="h4 text-center bd-text-purple-bright">Integrate with Nuxt.js</h2>
        <div class="mb-2 d-flex flex-row justify-content-center align-items-center">
          <nuxt-logo width="3.5em" height="3.5em"></nuxt-logo>
          <b class="text-muted h2" aria-hidden="true">&plus;</b>
          <bv-logo width="3em" height="3em"></bv-logo>
        </div>
        <b-row class="mb-3">
          <b-col lg="10" offset-lg="1">
            <p class="text-lg-center mb-0">
              Easily integrate BootstrapVue into your Nuxt.js projects using our included Nuxt.js module.
              You can optionally specify only the components, directives and/or plugins you require.
            </p>
          </b-col>
        </b-row>

        <b-button
          to="/docs#nuxtjs-module"
          size="sm"
          variant="outline-secondary"
          class="mb-3"
        >
          BootstrapVue Nuxt.js module
        </b-button>
        <p class="mb-0 text-center">
          BootstrapVue's documentation is created using
          <span class="bd-text-purple-bright">BootstrapVue</span> and
          generated with <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
        </p>
      </b-container>
    </section>

    <section class="bv-section bv-white">
      <b-container tag="article" class="text-center">
        <h2 class="h4 text-center bd-text-purple-bright mb-3">
          <b-icon icon="opencollective" width="2.5em" height="2.5em" class="d-block mx-auto mb-3"></b-icon>
          Support BootstrapVue on Open Collective
        </h2>
        <b-button
          href="https://opencollective.com/bootstrap-vue#sponsor"
          size="sm"
          variant="outline-secondary"
          target="_blank"
          class="mb-2"
        >
          Become a sponsor
        </b-button>
        <b-button
          href="https://opencollective.com/bootstrap-vue#backer"
          size="sm"
          variant="outline-secondary"
          target="_blank"
          class="mb-2"
        >
          Become a backer
        </b-button>
        <b-button
          href="https://opencollective.com/bootstrap-vue#donate"
          size="sm"
          variant="outline-secondary"
          target="_blank"
          class="mb-2"
        >
          Donate
        </b-button>

        <bv-contributors></bv-contributors>
      </b-container>
    </section>

    <div class="bv-section bv-gray bv-p-reset" aria-hidden="true">
      <!-- To give footer on landing page angled top -->
    </div>
  </main>
</template>

<script>
import {
  bootstrapIconsCount,
  bootstrapVersionMajor,
  bootstrapVersionMinor,
  version,
  vueVersionMinor
} from '~/content'
import BootstrapLogo from '~/components/bootstrap-logo'
import BvContributors from '~/components/contributors'
import BvLogo from '~/components/bv-logo'
import BvLogoAnimated from '~/components/bv-logo-animated'
import NuxtLogo from '~/components/nuxt-logo'
import VueLogo from '~/components/vue-logo'
import VueLogoOutline from '~/components/vue-logo-outline'

export default {
  components: {
    BootstrapLogo,
    BvContributors,
    BvLogo,
    BvLogoAnimated,
    NuxtLogo,
    VueLogo,
    VueLogoOutline
  },
  created() {
    this.bootstrapUrl = `https://getbootstrap.com/docs/${bootstrapVersionMinor}`
    this.bootstrapVersionMajor = bootstrapVersionMajor
    this.bootstrapVersionMinor = bootstrapVersionMinor
    this.bootstrapIconsCount = bootstrapIconsCount
    this.vueVersionMinor = vueVersionMinor
    this.version = version
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/functions';
@import '../../node_modules/bootstrap/scss/variables';
@import '../../node_modules/bootstrap/scss/mixins';

.bd-masthead {
  color: #f8f9fa;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  background-color: #343a40;

  .text-muted {
    color: #a6adb5 !important;
  }

  a[href] {
    color: #007bff;
    font-weight: bold;

    &:active,
    &:visited {
      color: #007bff;
    }

    &:hover {
      color: #3f9bff;
      text-decoration: underline;
    }
  }

  // Add shadow to the media aside logos
  .media {
    svg {
      filter: drop-shadow(1px 1px 2px #000000f0);
    }
  }
}

.text-vue-green {
  color: #42b883;
}

.bvd-partner {
  opacity: 0.6;
  transition: opacity 0.15s ease-in-out;

  img {
    height: 2.5rem;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
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
  margin-top: -1px;

  &.bv-white {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3336' preserveAspectRatio='none' version='1.1'%3E%3Cg%3E%3Cpolygon fill='%23eee' points='13913,3336 0,0 27826,0' /%3E%3C/g%3E%3C/svg%3E");
    background-color: #fff;
  }

  &.bv-gray {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3336' preserveAspectRatio='none' version='1.1'%3E%3Cg%3E%3Cpolygon fill='%23fff' points='13913,3336 0,0 27826,0'/%3E%3C/g%3E%3C/svg%3E");
    background-color: #eee;
  }

  &.bv-gray-color {
    // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3450' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='a' filterUnits='objectBoundingBox' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeOffset in='SourceGraphic' result='b' dy='20'/%3E%3CfeGaussianBlur in='b' stdDeviation='25'/%3E%3C/filter%3E%3C/defs%3E%3Cpath filter='url(%23a)' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath fill='%2342B883' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath fill='%237952B3' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3Cpath fill='%23fff' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3C/svg%3E%0A");
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27826 3450' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='a' filterUnits='objectBoundingBox' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeOffset in='SourceGraphic' result='b' dy='20'/%3E%3CfeGaussianBlur in='b' stdDeviation='25'/%3E%3C/filter%3E%3C/defs%3E%3Cpath filter='url(%23a)' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath fill='%2342B883' d='M13943 3336L5092 1668 0 708V0h27826v719l-5032 949z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath fill='%237952B3' d='M0 0h27826v371l-5067 955-8851 1668-8850-1668L0 373z'/%3E%3Cpath filter='url(%23a)' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3Cpath fill='%23343a40' d='M0 0h27826l-5065 954-8851 1668L5059 954 0 1z'/%3E%3C/svg%3E");
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

// Main masthead logo
.bv-logo-animated {
  width: 240px;
  height: 240px;

  @at-root .logo-aside {
    min-height: 240px;
  }

  @media (min-width: map-get($grid-breakpoints, 'md')) {
    width: 230px;
    height: 230px;

    @at-root .logo-aside {
      min-height: 230px;
    }
  }

  @media (min-width: map-get($grid-breakpoints, 'lg')) {
    width: 309px;
    height: 309px;

    @at-root .logo-aside {
      min-height: 309px;
    }
  }

  @media (min-width: map-get($grid-breakpoints, 'xl')) {
    width: 370px;
    height: 370px;

    @at-root .logo-aside {
      min-height: 370px;
    }
  }
}
</style>
