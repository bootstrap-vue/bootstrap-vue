<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>
    </div>
</template>


<script>
import reference from '../../../../reference';

export default {
    layout: 'docs',

    fetch({ params, redirect }) {
        if (!reference[params.reference]) {
            redirect('/docs/reference/' + Object.keys(reference)[0])
        }
    },

    data() {
        return Object.assign({ meta: {}, readme: '' }, reference[this.$route.params.reference])
    },

    head() {
        return {
            title: `${this.meta.title} - BootstrapVue`
        };
    },

    created() {
        this.$root.$emit('bv-docs::update::toc', this.readme || '');
    }
};
</script>
