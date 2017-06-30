<template>
    <div :class="['form-group','row',inputState]"
         :id="id || null"
         role="group"
         :aria-describedby="describedBy"
    >
        <label v-if="label || $slots['label']"
               :for="target"
               :id="labelId"
               :class="[labelSrOnly ? 'sr-only' : 'col-form-label',labelLayout,labelAlignClass]"
        >
            <slot name="label"><span v-html="label"></span></slot>
        </label>
        <div :class="inputLayout" ref="content">
            <slot></slot>
            <div v-if="feedback || $slots['feedback']"
                 class="form-text form-control-feedback"
                 :id="feedbackId"
                 role="alert"
                 aria-live="assertive"
                 aria-atomic="true"
            >
                <slot name="feedback"><span v-html="feedback"></span></slot>
            </div>
            <small v-if="description || $slots['description']"
                   class="form-text text-muted"
                   :id="descriptionId"
            >
                <slot name="description"><span v-html="description"></span></slot>
            </small>
        </div>
    </div>
</template>

<script>
    import warn from '../utils/warn';

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
            computedLabelCols() {
                if (this.labelSize) {
                    warn('b-form-fieldset: prop label-size has been deprecated. Use label-cols instead');
                    return this.labelSize;
                }
                return this.labelCols;
            },
            labelLayout() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.horizontal ? ('col-sm-' + this.computedLabelCols) : 'col-12';
            },
            labelAlignClass() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.labelTextAlign ? `text-${this.labelTextAlign}` : null;
            },
            inputLayout() {
                return this.horizontal ? ('col-sm-' + (12 - this.computedLabelCols)) : 'col-12';
            }
        },
        methods: {
            updateTarget() {
                if (this.for && this.$el && this.$el.querySelector('#' + this.for)) {
                    return this.for;
                }
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
            for: {
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
            labelCols: {
                type: Number,
                default: 3,
                validator(value) {
                    if (value >= 1 && value <= 11) {
                        return true;
                    }
                    warn('b-form-fieldset: label-cols must be a value between 1 and 11');
                    return false;
                }
            },
            labelSize: {
                type: Number
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
                default: '[role="radiogroup"],input,select,textarea,.form-control,.form-control-static,.dropdown,.dropup'
            }
        }
    };
</script>
