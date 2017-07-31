<template>
    <div class="container">
        <div class="bd-content" v-html="readme" v-play></div>
    </div>
</template>


<script>
import directives from '../../../../directives';

export default {
    layout: 'docs',

    data() {
        return Object.assign({ meta: {}, readme: '' }, directives[this.$route.params.directive])
    },

    head() {
        return {
            title: `${this.meta.title} - BootstrapVue`
        };
    }
};
</script>
