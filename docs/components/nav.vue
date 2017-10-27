<template>
    <b-navbar toggleable="md" class="navbar-dark bd-navbar" fixed="top" style="position:fixed">

        <b-nav-toggle target="bd-main-nav"></b-nav-toggle>

        <b-navbar-brand to="/" exact>BootstrapVue</b-navbar-brand>

        <b-collapse isNav class="justify-content-between" id="bd-main-nav">

            <b-navbar-nav>
                <b-nav-item to="/docs">Documentation</b-nav-item>
                <b-nav-item to="/play"><span>Playground</span></b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav>

                <b-nav-item-dropdown :text="site.package_info.version" right>
                    <b-dropdown-item active>{{site.package_info.version}}</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="https://bootstrap-vue-alpha.surge.sh">Alpha 6 (0.23.0)</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item href="https://github.com/bootstrap-vue/bootstrap-vue" target="_blank">
                    <svg class="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 499.36" focusable="false">
                        <title>GitHub</title>
                        <path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z" fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">GitHub</span>
                </b-nav-item>

                <b-nav-item href="https://bootstrap-vue.now.sh" target="_blank">
                    <svg class="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" focusable="false">
                        <title>Slack</title>
                        <path fill="currentColor" d="M210.787 234.832l68.31-22.883 22.1 65.977-68.309 22.882z"></path>
                        <path d="M490.54 185.6C437.7 9.59 361.6-31.34 185.6 21.46S-31.3 150.4 21.46 326.4 150.4 543.3 326.4 490.54 543.34 361.6 490.54 185.6zM401.7 299.8l-33.15 11.05 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.38-68.36 22.92 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.43-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.5-13.92 2.87-29.06 16.78-33.56l33.12-11.03-22.1-65.9-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.48-13.93 2.89-29.07 16.81-33.58l33.15-11.05-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.46 34.38 68.36-22.92-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.47 34.42 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.87 29.06-16.78 33.56L329.7 194.6l22.1 65.9 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.88 29.07-16.81 33.57z" fill="currentColor"></path>
                    </svg>
                    <span class="sr-only">Slack</span>
                </b-nav-item>

                <div class="nav-item nav-link">
                    <iframe src="https://ghbtns.com/github-btn.html?user=bootstrap-vue&repo=bootstrap-vue&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px">
                    </iframe>
                </div>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<style>
.main-nav {
    box-shadow: 0 0 5px rgba(57, 70, 78, .2) !important;
    background: white;
    z-index: 1050;
    padding-bottom: 0;
}

.main-nav .nav-link,
.main-nav .navbar-brand {
    padding-bottom: 10px;
    border-bottom: 3px solid transparent;
}

.main-nav .nav-link.nuxt-link-active {
    border-bottom: 3px solid #4fc08d;
}

.navbar-brand img {
    height: 1.5em;
    padding-right: .5em;
}
</style>

<script>
import site from '~/..';

export default {
    computed: {
        site: () => site
    }
};
</script>
