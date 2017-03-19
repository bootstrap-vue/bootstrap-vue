<template>
    <layout :docs="docs">
        <template slot="name">
            List group
        </template>

        <template slot="description">
            List groups are a flexible and powerful component for displaying a series of content.
            List group items can be modified and extended to support just about any content within.
            They can also be used as navigation with the right modifier class.
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
                    component: 'bListGroup',
                    components: ['bListGroupItem'],
                    jsfiddle: 'eeb2n9tv'
                };
            }
        }
    };
</script>
