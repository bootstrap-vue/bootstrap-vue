<template>
    <layout :docs="docs">
        <template slot="name">
            Tooltips
        </template>

        <template slot="description">
            Inspired by the excellent Tipsy jQuery plugin written by Jason Frame. Tooltips are an updated version,
            which don’t rely on images, use CSS3 for animations, and data-attributes for local title storage.
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
                    component: 'bTooltip',
                    jsfiddle: 'gjzvatu3'
                };
            }
        }
    };
</script>
