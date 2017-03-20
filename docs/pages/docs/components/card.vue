<template>
    <layout :docs="docs">
        <template slot="name">Cards</template>

        <template slot="description">
                A card is a flexible and extensible content container. It includes options for headers and footers,
                a wide variety of content, contextual background colors, and powerful display options.
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
                    component: 'bCard',
                    components: ['bCardGroup'],
                    jsfiddle: 'sjn78wt7'
                };
            }
        }
    };
</script>
