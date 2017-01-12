<template>
    <layout :docs="docs">
        <template slot="name">
            Popover
        </template>

        <template slot="description">
            The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
            element, and is customizable.
        </template>

        <template slot="demo">


            <h3>Placement</h3>
            <div class="row">
                <div class="col-md-3" v-for="placement in ['top','left','right', 'bottom']">
                    <b-popout
                            :placement="placement"
                            content="Heya!"
                    >
                        {{ placement }}
                    </b-popout>
                </div>
            </div>

            <h3>Triggers</h3>
            <div class="row">
                <div class="col-md-4" v-for="trigger in TriggerExamples">
                    <b-popout
                            :triggers="trigger"
                            content="Trigger warning!"
                    >
                        {{ triggersToString(trigger) }}
                    </b-popout>
                </div>
            </div>

            <h3>Content via properties or slots</h3>
            <div class="row">
                <div class="col-md-6">
                    <b-popout
                            content="Embedding content using properties is easier as well as simpler to make dynamic."
                            title="Title Property">
                        Using properties
                    </b-popout>
                </div>
                <div class="col-md-6">
                    <b-popout>
                        Using slots
                        <span slot="title">
                            <em>Title Slot</em>
                        </span>
                        <span slot="content">
                            Embedding content using slots <em>affords you <strong>greater control.</strong></em>
                        </span>
                    </b-popout>
                </div>
            </div>

            <h3>Delay</h3>
            <div class="row">
                <div class="col-md-4">
                    <b-popout
                            delay="2000"
                            content="Tooltip"
                            triggers="click"
                    >
                        2000ms
                    </b-popout>
                    <b-popout
                            delay="{show: 1000, hide: 0}"
                            content="This will disappear right away!"
                            triggers="click"
                    >
                        1000ms on show only
                    </b-popout>
                    <b-popout
                            delay="{show: 0, hide: 1000}"
                            content="This will disappear after a second's delay."
                            triggers="click"
                    >
                        1000ms on hide only
                    </b-popout>
                </div>
            </div>

        </template>

        <template slot="usage">
            <b-popover title="My Popover Title">
                <a class="btn btn-primary" role="button" @click="clickEventConfirmed">Submit</a>
                <div class="text-xs-center" slot="content">
                    Isn't this lovely?
                </div>
            </b-popover>
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data() {
            return {
                triggerExamples: [
                  'click',
                  'focus',
                  'hover',
                  ['click', 'focus'],
                  ['click', 'hover'],
                  ['focus', 'hover']
                ],
                docs:{
                    component: 'bPopover',
                    events: [
                        {
                            event: 'showChange',
                            description: 'Emitted each time the Popover display status changes.',
                            args: [
                                {
                                    arg: 'newShowState',
                                    description: 'Boolean representation of the new Popover show/hide status.'
                                }
                            ]
                        },
                        {
                            event: 'focus',
                            description: 'When the popover receives focus, usually artificially because the user clicked/tapped on it. Intended to simulate focus being maintained on the target when desired.'
                        },
                        {
                            event: 'blur',
                            description: 'When the popover loses focus.'
                        },
                    ],
                },
                methods: {
                    triggersToString(input) {
                        if (Array.isArray(input))
                          return input.join(' + ');
                        return input;
                    }
                }
            }
        },
        methods: {
            clickEventConfirmed(){
                window.alert("Form submitted!");
            }
        },
    }
</script>