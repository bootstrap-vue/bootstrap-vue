<template>
    <div class="container">

        <div v-html="readme" v-play></div>

        <componentdoc :component="meta.component" :events="meta.events" :slots="meta.slots"></componentdoc>

        <componentdoc :component="component" :key="component" v-for="component in meta.components"></componentdoc>
    </div>
</template>


<script>
    import componentdoc from '~components/componentdoc.vue';
    import docs from '../../../../components';

    export default {
        components: {componentdoc},
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
