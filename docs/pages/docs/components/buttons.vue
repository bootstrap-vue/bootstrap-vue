<template>
    <layout :docs="docs">
        <template slot="name">
            Buttons
        </template>

        <template slot="description">
            Use Bootstrap’s custom button styles for actions in forms, dialogs, and more.
            Includes support for a handful of contextual variations, sizes, states, and more.
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
                    jsfiddle: 'L9f7cmms',
                    component: 'bButton',
                    components: ['bLink'],
                    events: [
                        {
                            event: 'click',
                            description: 'when clicked on button'
                        }
                    ]
                };
            }
        }
    };
</script>
