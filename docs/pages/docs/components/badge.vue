<template>
    <layout :docs="docs">
        <template slot="name">
            Badges
        </template>

        <template slot="description">
            Small and adaptive tag for adding context to just about any content.
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
                    component: 'bBadge',
                    jsfiddle: 'k8xz9udb'
                };
            }
        }
    };
</script>
