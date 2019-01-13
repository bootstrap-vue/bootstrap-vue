<template>
  <div>
    <main
      id="content"
      class="bd-masthead"
      role="main"
    >
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 mx-auto col-md-6 order-md-2">
            <img
              src="~/static/icon.png"
              alt="Logo"
              class="img-fluid mx-auto d-block mb-3 mb-md-0"
            >
          </div>
          <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
            <h1 class="mb-3 bd-text-purple-bright">Bootstrap + Vue</h1>
            <p class="lead">
              Build responsive, mobile-first projects on the web using Vue.js and the world's most
              popular front-end CSS library &mdash; Bootstrap V4.1.
            </p>
            <p class="lead mb-3">
              <span class="bd-text-purple-bright">BootstrapVue</span> provides one of the most
              comprehensive implementations of <span class="bd-text-purple-bright">Bootstrap V4</span>
              components and grid system available for Vue.js 2.5+, complete with extensive and
              automated WAI-ARIA accessibility markup.
            </p>
            <p class="mb-2 text-muted">
              <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4</a> is the world's most popular
              framework for building responsive, mobile-first sites.
            </p>
            <p class="mb-4 text-muted">
              <a href="https://vuejs.org"> Vue.js</a> (pronounced /vjuË, like view) is a progressive
              framework for building user interfaces.
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
                Github
              </b-btn>
            </div>
            <b-link
              class="text-muted mb-0"
              to="/docs/misc/changelog"
            >
              Currently v{{ version }}
            </b-link>
          </div>
        </div>
      </div>
    </main>
  </div>
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
