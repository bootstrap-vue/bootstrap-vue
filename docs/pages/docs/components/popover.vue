<template>
    <layout :docs="docs">
        <template slot="name">
            Popover
        </template>

        <template slot="description">
            The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
            element, and is customizable.
            <br>
            For more advanced usage, you can use
            <a href="https://github.com/SirLamer/click-confirm" target="_blank">Click Confirm</a>
            component by @SirLamer which is based on popover.
            <br>
            <br>
            <div class="text-center">
                <img src="~static/click-confirm.png">
                <br>
                <small class="text-muted">click-confirm example</small>
            </div>

        </template>

        <template slot="demo">

            <h4 class="mt-sm-4 ms-sm-4 text-muted">Placement</h4>
            <div class="row">
                <div class="col-md-3 my-1 text-center" v-for="placement in ['top', 'left', 'right', 'bottom']">
                    <b-popover
                            :placement="placement"
                            content="Heya!"
                    >
                        <b-btn variant="primary">{{ placement }}</b-btn>
                    </b-popover>
                </div>
            </div>

            <h4 class="mt-sm-4 ms-sm-4 text-muted">Triggers</h4>
            <div class="row">
                <div class="col-md-4 my-1 text-center" v-for="trigger in triggerExamples">
                    <b-popover
                            :triggers="trigger"
                            content="Trigger warning!"
                    >
                        <b-btn variant="primary">{{ triggersToString(trigger) }}</b-btn>
                    </b-popover>
                </div>
            </div>

            <h4 class="mt-sm-4 ms-sm-4 text-muted">Content via properties or slots</h4>
            <div class="row">
                <div class="col-md-6 my-1 text-center">
                    <b-popover
                            content="Embedding content using properties is easier as well as simpler to make dynamic."
                    >
                        <b-btn variant="primary">Using properties</b-btn>
                    </b-popover>
                </div>
                <div class="col-md-6 my-1 text-center">
                    <b-popover>
                        <b-btn variant="primary">Using slots</b-btn>
                        <span slot="content">
                            Embedding content <span
                                style="color: red">using slots</span> affords you <em>greater <strong>control.</strong></em>
                        </span>
                    </b-popover>
                </div>
            </div>

            <h4 class="mt-sm-4 ms-sm-4 text-muted">Delay</h4>
            <div class="row">

                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="1000"
                            content="Sorry, I'm a little sleepy."
                            :triggers="['click','hover']"
                    >
                        <b-btn variant="primary">1000ms</b-btn>
                    </b-popover>
                </div>

                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="{show: 1000, hide: 0}"
                            content="This will disappear right away!"
                            :triggers="['click','hover']"
                    >
                        <b-btn variant="primary">1000ms on show</b-btn>
                    </b-popover>
                </div>

                <div class="col-md-4 my-1 text-center">
                    <b-popover
                            :delay="{show: 0, hide: 1000}"
                            content="This will disappear after a second's delay."
                            :triggers="['click','hover']"
                    >
                        <b-btn variant="primary">1000ms on hide</b-btn>
                    </b-popover>
                </div>
            </div>

        </template>

        <template slot="usage">
            &lt;b-popover title="My Popover Title"&gt;
            &emsp; &lt;b-btn @click=&quot;clickEventConfirmed&quot;&gt;Submit&lt;/b-btn&gt;
            &emsp; &lt;div class="text-xs-center" slot="content"&gt;
            &emsp;&emsp; Isn't this lovely?
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
                docs: {
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
                        }
                    ]
                }
            };
        },
        methods: {
            clickEventConfirmed() {
                // eslint-disable-next-line no-alert
                alert('Form submitted!');
            },
            triggersToString(input) {
                if (Array.isArray(input)) {
                    return input.join(' + ');
                }
                return input;
            }
        }
    };
</script>
