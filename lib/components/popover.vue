<template>
    <!-- Container for possible title and content -->
    <div v-show="false" class="d-none" aria-hidden="true">
        <div ref="title"><slot name="title"></slot></div>
        <div ref="content"><slot></slot></div>
    </div>
</template>

<script>
    import PopOver from '../classes/popover';
    import { warn } from '../utils';
    import { toolpopMixin } from '../mixins';

    export default {
        mixins: [ toolpopMixin ],
        data() {
            return {};
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            triggers: {
                type: [String, Array],
                default: 'click'
            },
            placement: {
                type: String,
                default: 'right'
            }
        },
        methods: {
            createToolpop() {
                // getTarget is in toolpop mixin
                const target = this.getTarget();
                if (target) {
                    this._toolpop = new PopOver(target, this.getConfig(), this.$root);
                } else {
                    this._toolpop = null;
                    warn("b-popover: 'target' element not found!");
                }
                return this._toolpop;
            }
        }
    };
</script>
