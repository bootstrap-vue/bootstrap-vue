<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>
    </div>
</template>


<script>
import directives from '../../../../directives';

export default {
    layout: 'docs',

    fetch({ params, redirect }) {
        if (!directives[params.directive]) {
            redirect('/docs/directives/' + Object.keys(directives)[0])
        }
    },

    data() {
        return Object.assign({ meta: {}, readme: '' }, directives[this.$route.params.directive])
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
