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


            <h4>Placement</h4>
            <div class="row">
                <div class="col-md-3 my-1 text-center" v-for="placement in ['top', 'left', 'right', 'bottom']">
                    <b-popover
                            :placement="placement"
                            content="Heya!"
                    >
                        <button class="btn btn-primary">{{ placement }}</button>
                    </b-popover>
                </div>
            </div>

            <h4>Triggers</h4>
            <div class="row">
                <div class="col-md-4 my-1 text-center" v-for="trigger in triggerExamples">
                    <b-popover
                            :triggers="trigger"
                            content="Trigger warning!"
                    >
                        <button class="btn btn-primary">{{ triggersToString(trigger) }}</button>
                    </b-popover>
                </div>
            </div>

            <h4>Content via properties or slots</h4>
            <div class="row">
                <div class="col-md-6 my-1 text-center">
                    <b-popover
                            content="Embedding content using properties is easier as well as simpler to make dynamic."
                    >
                        <button class="btn btn-primary">Using properties</button>
                    </b-popover>
                </div>
                <div class="col-md-6 my-1 text-center">
                    <b-popover>
                        <button class="btn btn-primary">Using slots</button>
                        <span slot="content">
                            Embedding content <span style="color: red">using slots</span> affords you <em>greater <strong>control.</strong></em>
                        </span>
                    </b-popover>
                </div>
            </div>

            <h4>Delay</h4>
            <div class="row">
                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="1000"
                            content="Sorry, I'm a little sleepy."
                            triggers="click"
                    >
                        <button class="btn btn-primary">1000ms</button>
                    </b-popover>
                </div>
                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="{show: 1000, hide: 0}"
                            content="This will disappear right away!"
                            triggers="click"
                    >
                        <button class="btn btn-primary">1000ms on show</button>
                    </b-popover>
                </div>
                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="{show: 0, hide: 1000}"
                            content="This will disappear after a second's delay."
                            triggers="click"
                    >
                        <button class="btn btn-primary">1000ms on hide</button>
                    </b-popover>
                </div>
            </div>

        </template>

        <template slot="usage">
            &lt;b-popover title="My Popover Title"&gt;
            &emsp; &lt;a class="btn btn-primary" role="button" @click="clickEventConfirmed">Submit&lt;/a&gt;
            &emsp; &lt;div class="text-xs-center" slot="content"&gt;
            &emsp;&emsp;  Isn't this lovely?
            &emsp; &lt;/div&gt;
            &lt;/b-popover&gt;
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
                }
            }
        },
        methods: {
            clickEventConfirmed(){
                window.alert("Form submitted!");
            },
            triggersToString(input) {
                if (Array.isArray(input))
                    return input.join(' + ');
                return input;
            }
        },
    }
</script>