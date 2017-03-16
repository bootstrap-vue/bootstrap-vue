<template>
    <layout :docs="docs">
        <template slot="name">
            Tables
        </template>

        <template slot="description">
            For tabular data. Tables support pagination and custom rendering.
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
                    component: 'bTable',
                    jsfiddle: 'a5s95a3q'
                };
            }
        }
    };
</script>
