<template>
    <layout :docs="docs">
        <template slot="name">
            Button group
        </template>

        <template slot="description">
            Group a series of buttons together on a single line with the button group
            with radio and checkbox style behavior.
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
                    jsfiddle: 'jccx27as',
                    component: 'bButtonGroup'
                };
            }
        }
    };
</script>
