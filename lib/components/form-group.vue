<template>
    <b-form-row :class="groupClasses"
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
            <b-form-feedback v-if="feedback || $slots['feedback']"
                             :id="feedbackId"
                             role="alert"
                             aria-live="assertive"
                             aria-atomic="true"
            >
                <slot name="feedback"><span v-html="feedback"></span></slot>
            </b-form-feedback>
            <b-form-text v-if="description || $slots['description']" :id="descriptionId">
                <slot name="description"><span v-html="description"></span></slot>
            </b-form-text>
        </div>
    </b-form-row>
</template>

<script>
    import {warn} from '../utils';
    import bFormRow from './form-row';
    import bFormText from './form-text';
    import bFormFeedback from './form-feedback';

    // Selector to find first input with an ID. This Order is important!
    const INPUT_SELECTOR = [
        '[role="radiogroup"][id]',
        'input[id]',
        'select[id]',
        'textarea[id]',
        '.form-control[id]',
        '.form-control-plaintext[id]',
        '.dropdown[id]',
        '.dropup[id]'
    ].join(',');

    export default {
        components: {
            bFormRow,
            bFormText,
            bFormFeedback
        },
        data() {
            return {
                target: null
            };
        },
        props: {
            id: {
                type: String,
                default: null
            },
            labelFor: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            validated: {
                type: Boolean,
                value: false
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
                    warn('b-form-group: label-cols must be a value between 1 and 11');
                    return false;
                }
            },
            breakpoint: {
                type: String,
                default: 'sm'
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
            }
        },
        computed: {
            groupClasses() {
                return [
                    'form-group',
                    this.validated ? 'was-validated' : null,
                    this.inputState
                ];
            },
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
                return this.state ? `is-${this.state}` : '';
            },
            labelLayout() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.horizontal ? `col-${this.breakpoint}-${this.computedLabelCols}` : 'col-12';
            },
            labelAlignClass() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.labelTextAlign ? `text-${this.labelTextAlign}` : null;
            },
            inputLayout() {
                return this.horizontal ? `col-${this.breakpoint}-${12 - this.labelCols}` : 'col-12';
            }
        },
        methods: {
            updateTarget() {
                if (this.labelFor) {
                    // User supplied for target
                    return this.labelFor;
                }
                // Else find first input with ID
                const content = this.$refs.content;
                if (!content) {
                    return null;
                }
                // Find first input element with an ID
                const input = content.querySelector(INPUT_SELECTOR);
                this.target = (input && input.id) ? input.id : null;
            }
        },
        mounted() {
            this.updateTarget();
        },
        updated() {
            this.updateTarget();
        }
    };
</script>
