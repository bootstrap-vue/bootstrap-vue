<template>
    <div>
        <m-nav></m-nav>
    
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-md-9">
                    <div class="float-right">
                        <a href="https://github.com/bootstrap-vue/bootstrap-vue/releases" target="_blank">
                            <img src="https://img.shields.io/github/release/bootstrap-vue/bootstrap-vue.svg?style=flat-square" alt="GitHub release">
                        </a>
                    </div>
    
                    <b-button-group class="mb-2">
                        <b-btn size="sm" :href="issueURL" target="_blank">Report an issue</b-btn>
                        <b-btn size="sm" :href="editPageURL" target="_blank">Edit this page</b-btn>
                    </b-button-group>
                    <br>
    
                    <nuxt/>
                </div>
    
                <div class="col-12 col-md-3 bd-sidebar">
                    <m-sidebar></m-sidebar>
                </div>
            </div>
        </div>
    
        <m-footer></m-footer>
    
    </div>
</template>

<script>
import mSidebar from '~/includes/sidebar.vue';
import mNav from '~/includes/nav.vue';
import mFooter from '~/includes/footer.vue';

export default {
    components: { mSidebar, mNav, mFooter },
    computed: {
        editPageURL() {
            const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master';
            let path = this.$route.path;
            if (path === '/') {
                path = '';
            } else if (path === '/docs/setup') {
                return base + '/docs/SETUP.md';
            } else if (path === '/docs/contributing') {
                return base + '/CONTRIBUTING.md';
            } else if (/\/$/.test(path)) {
                return base + path;
            }
            return base + path + '/README.md';
        },
        issueURL() {
            // Add appreciate query params for proper issue title
            return 'https://github.com/bootstrap-vue/bootstrap-vue/issues/new?title=Docs';
        }
    }
};
</script>
