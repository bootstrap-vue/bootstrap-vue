<template>
    <div class="container bd-content" v-html="readme"></div>
</template>

<script>
    import readme from '~/../README.md';
    import docsMixin from './docs-mixin';

    export default {
        mixins: [ docsMixin ],
        layout: 'docs',
        computed: {
            readme() {
                return readme;
            }
        }
    };
</script>
