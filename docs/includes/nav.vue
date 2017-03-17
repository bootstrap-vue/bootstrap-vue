<template>
    <b-navbar toggleable class="main-nav fixed-top">

        <b-nav-toggle target="bd-main-nav"/>

        <router-link class="navbar-brand nuxt-link-active" to="/">
            <span>Bootstrap Vue</span>
        </router-link>

        <b-collapse isNav class="justify-content-between" id="bd-main-nav">

            <b-nav isNavBar>
                <b-nav-item to="/docs">Documentation</b-nav-item>

                <b-nav-item to="/play">
                    Playground
                    <small><b-badge variant="success">BETA</b-badge></small>
                </b-nav-item>

            </b-nav>

            <b-nav isNavBar>
                <div class="nav-item nav-link">
                    <iframe src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=fork&count=true"
                            frameborder="0" scrolling="0" width="100px" height="20px">
                    </iframe>
                    <iframe src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=star&count=true&"
                            frameborder="0" scrolling="0" width="100px" height="20px">
                    </iframe>
                </div>

            </b-nav>

        </b-collapse>

    </b-navbar>
</template>

<style>
    .main-nav {
        box-shadow: 0 0 5px rgba(57, 70, 78, .2) !important;
        background: white;
        z-index: 1050;
    }
</style>

<script>
    import site from '../data/site';

    export default{
        data() {
            return {
                site
            };
        }
    };
</script>
