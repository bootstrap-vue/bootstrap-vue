<template>
    <div class="container bd-content" v-html="readme"></div>
</template>

<script>
    import readme from '~/../README.md';

    export default {
        layout: 'docs',
        computed: {
            readme() {
                return readme;
            }
        },

        created() {
            this.$root.$emit('bv-docs::update::toc', this.readme || '');
        },

        beforeDestroy() {
            this.$root.$emit('bv-docs::update::toc', '');
        }
    };
</script>
