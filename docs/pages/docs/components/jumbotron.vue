<template>
    <layout :docs="docs">
        <template slot="name">
            Jumbotron
        </template>

        <template slot="description">
            A lightweight, flexible component that can optionally extend the entire viewport to
            showcase key marketing messages on your site.
         </template>
    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        computed: {
            docs() {
                return {
                    component: 'bJumbotron',
                    jsfiddle: 'bptLavov'
                };
            }
        }
    };
</script>
