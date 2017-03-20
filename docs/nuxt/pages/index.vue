<template>
    <div>
        <main class="bd-masthead" id="content">
            <div class="container">
                <span class="bd-booticon outline">
                    <img src="~static/banner.png" alt="." style="max-width: 80%;">
                </span>

                <p class="lead">
                    Twitter Bootstrap 4 Components For Vue.js 2
                </p>

                <p class="lead">
                    <router-link to="/docs" class="btn mr-1 mb-1">Getting started</router-link>
                </p>

                <p class="version">
                    Currently: {{site.package_info.version}}
                </p>

            </div>
        </main>

        <div class="bd-featurette">
            <div class="container" v-html="landing"></div>
        </div>
    </div>
</template>

<style>
    .bd-masthead {
        margin-top: -30px;
    }
</style>

<script>
    import landing from '../../LANDING.md';
    import site from '../..';

    export default {
        computed: {
            landing() {
                return landing;
            },
            site() {
                return site;
            }
        }
    };
</script>
