<template>
    <layout :docs="docs">
        <template slot="name">
            Alert
        </template>

        <template slot="description">
            Provide contextual feedback messages for typical user actions with the handful of available
            and flexible alert messages.
        </template>

        <template slot="demo">
            <b-alert show>
                  Default Alert
            </b-alert>

            <b-alert state="success" show>
                  Success Alert
            </b-alert>

            <b-alert state="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
                Dismissible Alert!
            </b-alert>

            <b-alert :show="dismissCountDown"
                     dismissible
                     state="warning"
                     @dismiss-count-down="countDownChanged"
            >
                This alert will dismiss after {{dismissCountDown}} seconds...
            </b-alert>

            <b-btn @click="showAlert" variant="info" class="m-1">Show alert with count-down timer</b-btn>
            <b-btn @click="showDismissibleAlert=true" variant="info" class="m-1">
                Show dismissible alert ({{showDismissibleAlert?'visible':'hidden'}})
            </b-btn>

        </template>

        <template slot="usage">
            &lt;b-alert :show="true" state="success" dismissible&gt;
            &emsp; This is an alert
            &lt;/b-alert&gt;
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data() {
            return {
                docs: {
                    component: 'bAlert',
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
                },
                dismissCountDown: null,
                showDismissibleAlert: false
            };
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            showAlert() {
                this.dismissCountDown = 5;
            }
        }
    };
</script>
