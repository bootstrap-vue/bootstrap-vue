<template>
    <div :class="['form-group','row',inputState]">
        <label :for="target"
               v-if="label"
               :class="['col-form-label',labelLayout]"
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
            };
        },
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            labelLayout() {
                return this.horizontal ? ('col-sm-' + this.labelSize) : 'col-12';
            },
            inputLayout() {
                return this.horizontal ? ('col-sm-' + (12 - this.labelSize)) : 'col-12';
            }
        },
        methods: {
            target() {
                const content = this.$refs.content;
                if (!content) {
                    return null;
                }
                const input = content.querySelector(this.inputSelector);
                return (input && input.id) ? input.id : null;
            }
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
                default: 'input, select, textarea'
            }
        }
    };
</script>
