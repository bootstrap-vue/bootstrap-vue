<template>
    <layout>
        <main class="bd-masthead" id="content">
            <div class="container">
                <span class="bd-booticon outline">
                    <img src="~static/banner.png" alt="." style="max-width: 80%;">
                </span>

                <p class="lead">
                    Twitter Bootstrap 4 Components For Vue.js 2
                </p>

                <p class="lead">
                    <router-link to="/docs" class="btn mr-1 mb-1">Documentation</router-link>

                    <router-link to="/play" class="btn">Playground</router-link>
                </p>

                <p class="version">
                    Currently: {{site.version}}
                </p>

            </div>
        </main>

        <div class="bd-featurette">
            <div class="container">
                <h2 class="bd-featurette-title">Easy to get started.</h2>
                <p class="lead">
                    Quickly include packaged js inside your templates or use NPM.
                </p>

                <div class="row">
                    <div class="col-sm-6 mb-3">
                        <h4>NPM</h4>

                        <p>Install via your favorite package manager</p>
                        <div v-code class="bash">
                            # Using YARN
                            yarn add bootstrap-vue

                            # Using NPM
                            npm install --save bootstrap-vue
                        </div>

                        <p>Register components</p>
                        <div v-code class="js">
                            import Vue from 'vue'
                            import BootstrapVue from 'bootstrap-vue';

                            Vue.use(BootstrapVue);
                         </div>

                        <div class="text-center">
                            <br>
                            <b-btn to="/docs" variant="secondary">
                                <span>Learn more</span>
                            </b-btn>
                        </div>
                    </div>
                    <div class="col-sm-6 mb-3">
                        <h4>CDN</h4>
                        <p>Simply include js inside your HTML templates</p>
                        <div v-code class="html">
                            &lt;!-- Add this after vue.js --&gt;
                            &lt;script src=&quot;//unpkg.com/bootstrap-vue/dist/bootstrap-vue.js&quot;&gt;&lt;/script&gt;
                        </div>
                        <div class="text-center">
                            <br>
                            <b-btn to="/docs" variant="secondary">
                                <span>Learn more</span>
                            </b-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<style>
    .bd-masthead {
        margin-top: -30px;
    }
</style>

<script>
    import layout from '../layouts/site.vue';
    import site from '../data/site';

    export default {
        components: {layout},
        computed: {
            site() {
                return site;
            }
        }
    };
</script>
