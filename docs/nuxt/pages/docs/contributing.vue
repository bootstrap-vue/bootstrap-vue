<template>
    <div class="container bd-content" v-html="readme"></div>
</template>

<script>
    import layout from '../../layouts/docs.vue';
    import readme from '../../../../CONTRIBUTING.md';

    export default {
        components: {layout},
        layout: 'docs',
        computed: {
            readme() {
                return readme;
            }
        },
        created() {
            this.$root.$emit('bv-docs::update::toc', this.readme || '');
        }
    };
</script>
