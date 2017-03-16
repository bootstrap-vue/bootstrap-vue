<template>
    <layout :docs="docs">
        <template slot="name">
            Form Select
        </template>

        <template slot="description">

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
                    component: 'bFormSelect',
                    jsfiddle: 'b4bg7d24'
                };
            }
        }
    };
</script>
