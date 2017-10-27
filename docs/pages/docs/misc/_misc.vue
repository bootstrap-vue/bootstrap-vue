<template>
    <div class="container">
        <div class="bd-content" v-html="readme"></div>
    </div>
</template>

<script>
import docs from '~/../misc';
import docsMixin from '../docs-mixin';

export default {
    mixins: [ docsMixin ],
    layout: 'docs',

    fetch({ params, redirect }) {
        if (!docs[params.misc]) {
            redirect('/docs/misc/' + Object.keys(docs)[0])
        }
    },

    data() {
        return Object.assign({ meta: {}, readme: '' }, docs[this.$route.params.misc])
    },

    head() {
        return {
            title: `${this.meta.title} - BootstrapVue`
        };
    }
};
</script>
