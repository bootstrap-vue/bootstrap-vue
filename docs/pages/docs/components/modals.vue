<template>
    <layout :docs="docs">
        <template slot="name">
            Modals
        </template>

        <template slot="description">
            Modals are streamlined, but flexible dialog prompts powered by JavaScript.
            They support a number of use cases from user notification to completely custom content and feature
            a handful of helpful sub-components, sizes, and more.
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
                    component: 'bModal',
                    jsfiddle: 'bofh9aaa',
                    events: [
                        {
                            event: 'shown',
                            description: 'always emits when modal is shown'
                        },
                        {
                            event: 'hidden',
                            description: 'always emits when modal is hidden'
                        },
                        {
                            event: 'ok',
                            description: 'when default ok button pressed'
                        },
                        {
                            event: 'cancel',
                            description: 'when default cancel button pressed'
                        }
                    ],
                    slots: [
                        {
                            name: 'modal-header',
                            description: 'Entire modal header container'
                        },
                        {
                            name: 'modal-title',
                            description: 'Modal title'
                        },
                        {
                            name: 'modal-footer',
                            description: 'Modal footer content'
                        }
                    ]
                };
            }
        }
    };
</script>
