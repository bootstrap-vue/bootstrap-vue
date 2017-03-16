<template>
    <layout :docs="docs">
        <template slot="name">
            Popover
        </template>

        <template slot="desc">
            <p>
                The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
                element, and is customizable.
            </p>
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
    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        computed: {
            docs() {
                return {
                    component: 'bPopover',
                    jsfiddle:'rx6n8d1L',
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
            }
        },
    };
</script>
