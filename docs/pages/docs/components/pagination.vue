<template>
    <layout :docs="docs">
        <template slot="name">
            Pagination
        </template>

        <template slot="description">
            Quick previous and next links for simple pagination implementations with light markup and styles.
            It’s great for simple sites like blogs or magazines.
            Provide pagination links for your site or app with the multi-page pagination component.
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
                    component: 'bPagination',
                    jsfiddle: 'atb4cnjg'
                };
            }
        }
    };
</script>
