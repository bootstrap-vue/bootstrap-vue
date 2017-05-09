<template>
    <div class="container">
        <div v-html="readme"></div>

        <h3>Examples</h3>

        <jsfiddle v-for="fid in meta.jsfiddle"
                  :slug="fid" tabs="result,html,js"
                  :key="fid"
        >
        </jsfiddle>

    </div>
</template>


<script>
    /* eslint-disable import/no-unresolved */
    import jsfiddle from '~components/jsfiddle.vue';
    import directives from '../../../../directives';

    export default {
        components: {jsfiddle},
        layout: 'docs',

        asyncData({params: {directive}, redirect}) {
            const doc = directives[directive];
            if (!doc) {
                redirect('/docs');
                return {};
            }
            return {...doc};
        },

        head() {
            return {
                title: `${this.meta.title} - BootstrapVue`
            };
        }
    };
</script>
