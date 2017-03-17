<template>
    <layout :docs="docs">
        <template slot="name">
            Progress
        </template>

        <template slot="description">
            Use our custom progress component for displaying simple or complex progress bars.
            We don’t use the HTML5 <code>&lt;progress&gt;</code> element, ensuring you can stack progress bars, animate them,
            and place text labels over them.
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
                    component: 'bProgress',
                    jsfiddle: '6kgz9och'
                };
            }
        }
    };
</script>
