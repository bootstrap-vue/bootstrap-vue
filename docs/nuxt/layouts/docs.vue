<template>
    <div>
        <m-nav></m-nav>

        <div class="container-fluid">
            <div class="row flex-xl-nowrap2">
                <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
                    <m-search/>
                    <m-sidebar></m-sidebar>
                </div>
                
                <div class="d-none d-xl-block col-xl-2 bd-toc">
                </div>

                <div class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
                    <b-button-group class="mb-2 float-right">
                        <b-btn size="sm" :href="issueURL" target="_blank">Report an issue</b-btn>
                        <b-btn size="sm" :href="editPageURL" target="_blank">Edit this page</b-btn>
                    </b-button-group>
                    <br>
                    <nuxt/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mSidebar from '~/components/sidebar.vue';
import mNav from '~/components/nav.vue';
import mFooter from '~/components/footer.vue';
import mSearch from '~/components/search.vue';

export default {
    components: { mSidebar, mNav, mFooter, mSearch },
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
