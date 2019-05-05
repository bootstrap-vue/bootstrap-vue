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
                <title>Bootstrap 4 Logo</title>
                <path fill="#563D7C" d="M612 510c0 56.1-45.9 102-102 102H102C45.9 612 0 566.1 0 510V102C0 45.9 45.9 0 102 0h408c56.1 0 102 45.9 102 102v408z" />
                <path fill="#FFF" d="M166.3 133h173.5c32 0 57.7 7.3 77 22s29 36.8 29 66.5c0 18-4.4 33.4-13.2 46.2-8.8 12.8-21.4 22.8-37.8 29.8v1c22 4.7 38.7 15.1 50 31.2 11.3 16.2 17 36.4 17 60.8 0 14-2.5 27.1-7.5 39.2-5 12.2-12.8 22.7-23.5 31.5s-24.3 15.8-41 21-36.5 7.8-59.5 7.8h-164V133zm62.5 149.5h102c15 0 27.5-4.2 37.5-12.8s15-20.8 15-36.8c0-18-4.5-30.7-13.5-38s-22-11-39-11h-102v98.6zm0 156.5h110.5c19 0 33.8-4.9 44.2-14.8 10.5-9.8 15.8-23.8 15.8-41.8 0-17.7-5.2-31.2-15.8-40.8s-25.2-14.2-44.2-14.2H228.8V439z" />
              </svg>
            </b-media-aside>
            <b-media-body class="ml-3 text-muted">
              <a href="https://getbootstrap.com/docs/4.3" target="_blank">Bootstrap 4</a> is the
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
