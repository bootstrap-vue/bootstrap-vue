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
        }
    };
</script>
