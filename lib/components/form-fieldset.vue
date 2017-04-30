<template>
    <div :class="['form-group','row',inputState]">
        <label :for="target"
               v-if="label"
               :class="['col-form-label',labelLayout,labelAlignClass]"
               v-html="label"
        ></label>
        <div :class="inputLayout" ref="content">
            <slot></slot>
            <div class="form-text form-control-feedback"
                 v-if="feedback"
                 role="alert"
                 aria-live="polite"
                 v-html="feedback"
            ></div>
            <small class="form-text text-muted"
                   v-if="description"
                   v-html="description"
            ></small>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                target: null
            };
        },
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            labelLayout() {
                return this.horizontal ? ('col-sm-' + this.labelSize) : 'col-12';
            },
            labelAlignClass() {
                switch (this.labelTextAlign.toLowerCase()) {
                    case 'center':
                        return 'text-center';
                    case 'right':
                        return 'text-right';
                    case 'left':
                    default:
                        return null;
                }
            },
            inputLayout() {
                return this.horizontal ? ('col-sm-' + (12 - this.labelSize)) : 'col-12';
            }
        },
        methods: {
            updateTarget() {
                const content = this.$refs.content;
                if (!content) {
                    return null;
                }
                const input = content.querySelector(this.inputSelector);
                this.target = (input && input.id) ? input.id : null;
            }
        },
        mounted() {
            this.updateTarget();
        },
        updated() {
            this.updateTarget();
        },
        props: {
            state: {
                type: String,
                default: null
            },
            horizontal: {
                type: Boolean,
                default: false
            },
            labelSize: {
                type: Number,
                default: 3
            },
            labelTextAlign: {
                type: String,
                required: false,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            description: {
                type: String,
                default: null
            },
            feedback: {
                type: String,
                default: null
            },
            inputSelector: {
                type: String,
                default: 'input,select,textarea,.form-control,.form-control-static,.dropdown,.dropup'
            }
        }
    };
</script>
