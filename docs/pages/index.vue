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
                    <router-link to="/docs" class="btn btn-lg">Getting Started</router-link>
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
                        <code v-code class="shell">
                            $ npm i bootstrap-vue@latest
                            # OR
                            $ yarn add bootstrap-vue@latest
                        </code>
                        <p>Register components</p>
                        <code v-code class="js">
                            import Vue from 'vue'
                            import BootstrapVue from 'bootstrap-vue';

                            // Globally register bootstrap-vue components
                            Vue.use(BootstrapVue);
                        </code>
                        <div class="text-center">
                            <b-btn @click="$router.push('/docs#npm')" variant="success">
                                Learn more
                            </b-btn>
                        </div>

                    </div>

                    <div class="col-sm-6 mb-3">

                        <h4>CDN</h4>
                        <p>
                            Simply include js inside your HTML templates,(free CDN from Powered by unpkg)
                        </p>
                        <code v-code>
                            &lt;script src=&quot;https://unpkg.com/bootstrap-vue/dist/bootstrap-vue.js&quot;&gt;&lt;/script&gt;
                        </code>
                        <div class="text-center">
                            <b-btn @click="$router.push('/docs#cdn')" variant="success">
                                Learn more
                            </b-btn>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </layout>
</template>

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
