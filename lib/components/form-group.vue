<template>
    <b-form-row :class="groupClasses"
                :id="safeId()"
                role="group"
                :aria-describedby="describedByIds"
    >
        <label v-if="label || $slots['label'] || horizontal"
               :for="targetId"
               :id="labelId"
               :class="labelClasses"
        >
            <slot name="label"><span v-html="label"></span></slot>
        </label>
        <div :class="inputLayoutClasses" ref="content">
            <slot></slot>
            <b-form-feedback v-show="feedback || $slots['feedback']"
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

<style>
/*
   Bootstrap V4.beta uses ~ sibling selector to display the .invalid-feedback
   so we ue a style override and also place .is-invalid on the input layout section
   to target our b-form-feedback (.invalid-feedback) to display it in case
   thd form input(s) are wrapped in another element, no longer making them siblings
 */
.b-form-group.form-group.is-invalid .invalid-feedback {
  display: block !important;
}
</style>

<script>
    import { warn } from '../utils';
    import { select } from '../utils/dom';
    import { idMixin, formStateMixin } from '../mixins';
    import bFormRow from './form-row';
    import bFormText from './form-text';
    import bFormFeedback from './form-feedback';

    // Selector to find first input with an ID. This Order is important!
    const INPUT_SELECTOR = [
        '[role="radiogroup"][id]',
        '[role="group"][id]',
        'input[id]',
        'select[id]',
        'textarea[id]',
        '.form-control[id]',
        '.form-control-plaintext[id]',
        '.dropdown[id]',
        '.dropup[id]'
    ].join(',');

    export default {
        mixins: [idMixin, formStateMixin],
        components: {
            bFormRow,
            bFormText,
            bFormFeedback
        },
        data() {
            return {
                targetId: null
            };
        },
        props: {
            labelFor: {
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
            inputState() {
                return this.stateClass;
            },
            groupClasses() {
                return [
                    'b-form-group',
                    'form-group',
                    this.validated ? 'was-validated' : null,
                    this.inputState
                ];
            },
            labelClasses() {
                return [
                    this.labelSrOnly ? 'sr-only' : 'col-form-label',
                    this.labelLayout,
                    this.labelAlignClass
                ];
            },
            labelLayout() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.horizontal ? `col-${this.breakpoint}-${this.labelCols}` : 'col-12';
            },
            labelAlignClass() {
                if (this.labelSrOnly) {
                    return null;
                }
                return this.labelTextAlign ? `text-${this.labelTextAlign}` : null;
            },
            inputLayoutClasses() {
                return [
                  this.horizontal ? `col-${this.breakpoint}-${12 - this.labelCols}` : 'col-12'
                ]
            },
            labelId() {
                return (this.label || this.$slots['label']) ? this.safeId('_BV_label_') : null;
            },
            descriptionId() {
                if (this.description || this.$slots['description']) {
                    return this.safeId('_BV_description_');
                }
                return null;
            },
            feedbackId() {
                if (this.feedback || this.$slots['feedback']) {
                    return this.safeId('_BV_feedback_');
                }
                return null;
            },
            describedByIds() {
                if (this.id) {
                    return [
                        this.labelId,
                        this.descriptionId,
                        this.feedbackId
                    ].filter(i => i).join(' ');
                }
                return null;
            }
        },
        methods: {
            updateTargetId() {
                if (this.labelFor) {
                    // User supplied for target
                    this.targetId = this.labelFor;
                    return;
                }
                // Else find first input with ID
                const content = this.$refs.content;
                if (!content) {
                    this.targetId = null;
                } else {
                    // Find first input element with an ID
                    const input = select(INPUT_SELECTOR, content);
                    this.targetId = (input && input.id) ? input.id : null;
                }
            }
        },
        mounted() {
            this.targetId = this.labelFor || null;
            // We run in nextTick to ensure auto IDs are available
            this.$nextTick(() => this.updateTargetId());
        },
        updated() {
            // We run in nextTick to ensure auto IDs are available
            this.$nextTick(() => this.updateTargetId());
        }
    };
</script>
