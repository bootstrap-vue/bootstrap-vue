<template>
    <div>
        <main class="bd-masthead" id="content">
            
            <div class="container">
                <span class="bd-booticon outline">
                    <img src="~static/icon.png" alt="." style="max-width: 80%;">
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
        </div>
    </div>
</template>

<style>
    .bd-masthead {
        margin-top: -30px;
    }
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
