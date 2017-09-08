<template>
    <!-- Container for possible title content. -->
    <div v-show="false" class="d-none" aria-hidden="true">
        <div ref="title"><slot></slot></div>
    </div>
</template>

<script>
    import ToolTip from '../classes/tooltip';
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
            triggers: {
                type: [String, Array],
                default: 'hover focus'
            },
            placement: {
                type: String,
                default: 'top'
            }
        },
        methods: {
            createToolpop() {
                // getTarget is in toolpop mixin
                const target = this.getTarget();
                if (target) {
                    this._toolpop = new ToolTip(target, this.getConfig(), this.$root);
                } else {
                    this._toolpop = null;
                }
                return this._toolpop;
            }
        }
    };
</script>
