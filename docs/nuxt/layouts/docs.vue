<template>
    <div>
        <m-nav></m-nav>

        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-md-9 bd-content">
                    <b-button-group class="float-right mb-auto">
                        <b-btn size="sm" :to="editPageURL" target="_blank">Report an issue</b-btn>
                        <b-btn size="sm" :to="issueURL" target="_blank">Edit this page</b-btn>
                    </b-button-group>

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
    import mSidebar from '../includes/sidebar.vue';
    import mNav from '../includes/nav.vue';
    import mFooter from '../includes/footer.vue';

    export default {
        components: {mSidebar, mNav, mFooter},
        computed: {
            editPageURL() {
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/docs/pages';
                let path = this.$route.path;
                if (path.endsWith('/docs') || path.endsWith('/docs/')) {
                    path += '/index';
                }
                return base + path + '.vue';
            },
            issueURL() {
                // TODO: add appreciate query params for proper issue title
                // (It is an undocumented gitGub feature??)
                return 'https://github.com/bootstrap-vue/bootstrap-vue/issues/new';
            }
        }
    };
</script>
