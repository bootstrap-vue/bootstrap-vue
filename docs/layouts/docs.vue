<template>
    <layout>
        <!--<div class="bd-pageheader">-->
            <!--<div class="container">-->
                <!--<h1>-->
                    <!--<slot name="title"></slot>-->
                <!--</h1>-->
                <!--<p class="lead">-->
                    <!--<slot name="lead"></slot>-->
                <!--</p>-->
            <!--</div>-->
        <!--</div>-->

        <div class="container mt-4">
            <div class="row">

                <div class="col-12 col-md-9 bd-content">

                    <b-button-group class="float-right mb-auto">
                        <b-btn variant="secondary" size="sm" @click="issue">Report an issue</b-btn>
                        <b-btn variant="secondary" size="sm" @click="editPage">Edit this page</b-btn>
                        <slot variant="secondary" name="actions"></slot>
                    </b-button-group>

                    <slot name="content"></slot>
                </div>

                <div class="col-12 col-md-3 bd-sidebar">
                    <m-sidebar></m-sidebar>
                </div>

            </div>
        </div>

        <!--<div class="container">-->
        <!--<div id="disqus_script"></div>-->
        <!--<div id="disqus_thread"></div>-->
        <!--</div>-->

    </layout>
</template>

<script>
    import mSidebar from '../includes/sidebar.vue';
    import layout from './site.vue';

    export default {
        components: {layout, mSidebar},

        methods: {
            editPage() {
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/docs/pages';
                let path = window.location.pathname;
                if (path.endsWith('/docs') || path.endsWith('/docs/')) {
                    path += '/index';
                }
                const github_url = base + path + '.vue';
                window.open(github_url, '_blank');
                // this.$ga.event('docs', 'edit_page');
            },
            issue() {
                window.open('https://github.com/bootstrap-vue/bootstrap-vue/issues/new', '_blank');
                // this.$ga.event('docs', 'open_issue');
            }
        },
        mounted() {
//            if (!document.disqus) {
//                const disqus_script = document.getElementById('disqus_script');
//                if (disqus_script) {
//                    const script = document.createElement('script');
//                    script.src = '//bootstrap-vue.disqus.com/embed.js';
//                    script.setAttribute('data-timestamp', Number(new Date()));
//                    disqus_script.appendChild(script);
//                    document.disqus = true;
//                }
//            } else if (window.DISQUS) {
//                window.DISQUS.reset({reload: true});
//            }
        }
    };
</script>
