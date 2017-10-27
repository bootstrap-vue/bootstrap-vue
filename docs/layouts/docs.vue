<template>
    <div>
        <m-nav></m-nav>
        <b-container fluid class="mt-5 pt-3">
            <b-row class="flex-xl-nowrap2">
                <b-col cols="12" md="3" xl="2" class="bd-sidebar">
                    <m-search/>
                    <m-sidebar></m-sidebar>
                </b-col>
                
                <b-col xl="2" class="d-none d-xl-block bd-toc pt-4">
                    <m-toc />
                </b-col>

                <b-col cols="12" md="9" xl="8" class="pb-md-3 pl-md-5 bd-content">
                    <b-button-group class="my-2 float-right">
                        <b-btn size="sm" variant="light" :href="issueURL" target="_blank">Report an issue</b-btn>
                        <b-btn size="sm" variant="light" :href="editPageURL" target="_blank">Edit this page</b-btn>
                    </b-button-group>

                    <nuxt/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import mSidebar from '~/components/sidebar.vue';
import mNav from '~/components/nav.vue';
import mFooter from '~/components/footer.vue';
import mToc from '~/components/toc.vue';

// Import search.vue async in a separate chunk
const mSearch = () => import('~/components/search.vue' /* webpackChunkName: "mSearch" */).then(m => m.default());

export default {
    components: { mSidebar, mNav, mFooter, mSearch, mToc },
    computed: {
        editPageURL() {
            const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/dev';
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
