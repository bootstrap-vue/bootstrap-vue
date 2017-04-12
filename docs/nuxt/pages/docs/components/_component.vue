<template>
    <div class="container">
        <div v-html="readme"></div>

        <template v-if="meta.jsfiddle && meta.jsfiddle.length">
            <h4 class="mt-4">Example</h4>
            <jsfiddle :slug="`${meta.jsfiddle}`" tabs="result,html,js"></jsfiddle>
        </template>

        <componentdoc :component="meta.component" :events="meta.events" :slots="meta.slots"></componentdoc>

        <componentdoc :component="component" :key="component" v-for="component in meta.components"></componentdoc>
    </div>
</template>


<script>
    /* eslint-disable import/no-unresolved */
    import jsfiddle from '~components/jsfiddle.vue';
    import componentdoc from '~components/componentdoc.vue';
    import docs from '../../../../components';

    export default {
        components: {jsfiddle, componentdoc},
        layout: 'docs',

        asyncData({params: {component}, redirect}) {
            if (!component) {
                component = 'alert';
            }

            const doc = docs[component];
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
