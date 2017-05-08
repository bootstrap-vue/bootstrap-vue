<template>
    <div class="container">
        <div v-html="readme"></div>
    </div>
</template>


<script>
    import directives from '../../../../directives';

    export default {
        components: {},
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
