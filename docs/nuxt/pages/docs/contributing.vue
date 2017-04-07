<template>
    <div class="container" v-html="readme"></div>
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
        }
    };
</script>
