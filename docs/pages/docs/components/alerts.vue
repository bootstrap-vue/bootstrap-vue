<template>
    <layout :docs="docs">
        <template slot="name">
            Alerts
        </template>

        <template slot="description">
            Provide contextual feedback messages for typical user actions with the handful of available
            and flexible alert messages.
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
                    component: 'bAlert',
                    jsfiddle: 'src29p6L',
                    events: [
                        {
                            event: 'dismissed',
                            description: 'Alert dismissed'
                        },
                        {
                            event: 'dismiss-count-down',
                            args: [
                                {
                                    arg: 'dismissCountDown',
                                    description: 'Time remaining to dismissed'
                                }
                            ],
                            description: 'When dismissAfterSeconds enabled, this event emits every second on countdown.'
                        }
                    ]
                };
            }
        }
    };
</script>
