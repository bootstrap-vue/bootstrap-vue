<template>
    <layout>
        <div class="bd-pageheader">
            <div class="container">
                <h1>
                    <slot name="title"></slot>
                </h1>
                <p class="lead">
                    <slot name="lead"></slot>
                </p>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-3 push-md-9 bd-sidebar">
                    <m-sidebar></m-sidebar>
                </div>
                <div class="col-12 col-md-9 pull-md-3 bd-content">
                    <div class="float-xs-right">
                        <b-button-group toolbar>
                            <slot name="actions"></slot>
                            <b-btn size="sm" @click="issue" variant="warning">‼ Report an issue</b-btn>
                            <b-btn size="sm" @click="editPage" variant="info">📝️Edit this page</b-btn>
                        </b-button-group>
                    </div>
                    <slot name="content"></slot>
                </div>
            </div>
        </div>

        <div class="container">
            <div id="disqus_script"></div>
            <div id="disqus_thread"></div>
        </div>

    </layout>
</template>

<script>
    import layout from './site.vue';
    import mSidebar from '../includes/sidebar.vue';

    export default {
        components: {layout, mSidebar},
        data(){
            return {}
        },
        computed: {
            github(){
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/docs/pages';
                let path = window.location.pathname;
                if (path.endsWith('/docs') || path.endsWith('/docs/'))
                    path += '/index';
                return base + path + '.vue'
            }
        },
        methods: {
            editPage(){
                window.open(this.github, '_blank');
                this.$ga.event('docs', 'edit_page');
            },
            issue(){
                window.open('https://github.com/bootstrap-vue/bootstrap-vue/issues/new', '_blank');
                this.$ga.event('docs', 'open_issue');
            },
        },
        mounted(){
            if (!document.disqus) {
                let disqus_script = document.getElementById('disqus_script');
                if (disqus_script) {
                    let script = document.createElement('script');
                    script.src = '//bootstrap-vue.disqus.com/embed.js';
                    script.setAttribute('data-timestamp', +new Date());
                    disqus_script.appendChild(script);
                    document.disqus = true;
                }
            } else {
                if (DISQUS) DISQUS.reset({reload: true});
            }
        }
    }
</script>