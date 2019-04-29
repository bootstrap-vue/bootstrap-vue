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
            available for <span class="bd-text-purple-bright">Vue.js v2.5+</span>, complete with
            extensive and automated
            <abbr
              v-b-tooltip.hover
              title="Web Accessibility Initiative – Accessible Rich Internet Applications"
            >WAI-ARIA</abbr>
            accessibility markup. <samp>jQuery</samp> is not required.
          </p>
          <p class="mb-2 text-muted">
            BootstrapVue's documentation is created using
            <span class="bd-text-purple-bright">BootstrapVue</span> components and
            <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>.
          </p>
          <p class="mb-2 text-muted">
            <a href="https://getbootstrap.com/docs/4.3" target="_blank">Bootstrap 4</a> is the
            world's most popular framework for building responsive, mobile-first sites.
          </p>
          <p class="mb-4 text-muted">
            <a href="https://vuejs.org" target="_blank">Vue.js</a> (pronounced /<i>vjuː</i>/, like view)
            is a progressive framework for building user interfaces.
          </p>
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
