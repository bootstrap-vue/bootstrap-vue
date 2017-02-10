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
            <b-alert :show="true">
                  Default Alert
            </b-alert>

            <b-alert :show="true" state="success">
                  Success Alert
            </b-alert>

            <b-alert :show="true" state="danger" dismissible>
                Dismissible Alert!
            </b-alert>

            <b-alert :dismissAfterSeconds="dismissCountDown"
                     dismissible
                     state="warning"
                     @dismiss-count-down="countDownChanged"
            >
                This alert will dismiss after {{dismissCountDown}} seconds...
            </b-alert>

            <b-btn @click="showAlert" variant="info">Show alert with count-down timer</b-btn>

        </template>

        <template slot="usage">
            &lt;b-alert :show="true" state="success" dismissible&gt;
            &emsp; This is an alert
            &lt;/b-alert&gt;
        </template>

    </layout>
</template>

<script>
    import layout, {head} from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data(){
            return {
                docs: {
                    component: 'bAlert',
                    events: [
                        {
                            event: 'dismissed',
                            description: 'Alert dismissed',
                        },
                        {
                            event: 'dismiss-count-down',
                            args: [
                                {
                                    arg: 'dismissCountDown',
                                    description: 'Time remaining to dismissed',
                                }
                            ],
                            description: 'When dismissAfterSeconds enabled, this event emits every second on countdown.',
                        }
                    ],
                },
                dismissCountDown: 0,
            }
        },
        methods: {
            countDownChanged(dismissCountDown){
                this.dismissCountDown = dismissCountDown;
            },
            showAlert(){
                this.dismissCountDown = 5;
            }
        },
    }
</script>