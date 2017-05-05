<template>
    <div :class="['form-group','row',inputState]"
        role="group"
        :aria-describedby="describedBy"
    >
        <label v-if="label"
               :for="target"
               :id="labelId"
               :class="[labelSrOnly ? 'sr-only' : 'col-form-label',labelLayout,labelAlignClass]"
               v-html="label"
        ></label>
        <div :class="inputLayout" ref="content">
            <slot></slot>
            <div v-if="feedback"
                 class="form-text form-control-feedback"
                 :id="feedbackId"
                 role="alert"
                 aria-live="assertive"
                 aria-atomic="true"
                 v-html="feedback"
            ></div>
            <small v-if="description"
                   class="form-text text-muted"
                   :id="descriptionId"
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
            labelId() {
                return (this.id && this.label) ? (this.id + '__BV_label_') : null;
            },
            descriptionId() {
                return (this.id && this.description) ? (this.id + '__BV_description_') : null;
            },
            feedbackId() {
                return (this.id && this.feedback) ? (this.id + '__BV_feedback_') : null;
            },
            describedBy() {
                if (this.id && (this.label || this.feedback || this.description)) {
                    return [
                        this.labelId,
                        this.descriptionId,
                        this.feedbackId
                    ].filter(i => i).join(' ');
                }
                return null;
            },
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            labelLayout() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.horizontal ? ('col-sm-' + this.labelSize) : 'col-12';
            },
            labelAlignClass() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.labelTextAlign ? `text-${this.labelTextAlign}` : null;
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
            id: {
                type: String,
                default: null
            },
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
                default: null
            },
            label: {
                type: String,
                default: null
            },
            labelSrOnly: {
                type: Boolean,
                default: false
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
