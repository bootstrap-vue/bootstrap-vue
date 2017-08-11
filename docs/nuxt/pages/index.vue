<template>
    <div>
        <main class="bd-masthead" id="content" role="main">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-6 mx-auto col-md-6 order-md-2">
        <img src="~/static/icon.png" alt="" class="img-fluid mb-3 mb-md-0">
      </div>
      <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
        <h1 class="mb-3 bd-text-purple-bright">Bootstrap + Vue</h1>
        <p class="lead">
          Quickly integrate <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4</a>
          components with <a href="https://vuejs.org"> Vue.js </a>
        </p>
        <p class="lead mb-4 text-muted">
          Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components.
        </p>
        <p class="lead mb-4 text-muted">
          Vue.js is a library that focuses heavily on the ViewModel—the two-way data bindings that tie what we see and interact with on the screen with the application's data mode.
        </p>
        <div class="d-flex flex-column flex-md-row lead mb-3">
          <b-link to="/docs" class="btn btn-lg btn-bd-purple mb-3 mb-md-0 mr-md-3">Get started</b-link>
          <b-link href="https://github.com/bootstrap-vue/bootstrap-vue" target="_blank" class="btn btn-lg btn-outline-secondary">Github</b-link>
        </div>
        <router-link class="text-muted mb-0" to="/docs/changelog">
          Currently {{site.package_info.version}}
        </router-link>
      </div>
    </div>
  </div>
</main>

        <!-- <main class="bd-masthead" id="content">
            
            <div class="container">
                <span class="bd-booticon outline">
                    
                </span>

                <p class="lead">
                    Bootstrap 4 Components For Vue.js 2
                </p>

                <p class="lead">
                    <router-link to="/docs" class="btn mr-1 mb-1">Getting started</router-link>
                </p>

                <p class="version">
                    Latest :
                    <a href="https://github.com/bootstrap-vue/bootstrap-vue/releases"
                       target="_blank">{{site.package_info.version}}
                    </a>
                </p>

            </div>
        </main>

        <div class="bd-featurette">
            <div class="container">
                <h2 class="bd-featurette-title">Easy to get started.</h2>

                <p class="lead">
                    Quickly add to your webpack builds or use NPM
                 </p>

                <div class="text-center">
                    <b-btn to="/docs">Getting started</b-btn>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    .version a{
        color: white;
    }
</style>

<script>
    import site from '../..';

    export default {
        computed: {
            site() {
                return site;
            }
        }
    };
</script>
