<template>
    <div class="container bd-content" v-html="readme"></div>
</template>

<script>
    import layout from '../../layouts/docs.vue';
    import readme from '../../../../CHANGELOG.md';

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
