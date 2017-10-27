<template>
    <fieldset :class="groupClasses"
              :id="safeId()"
              :aria-describedby="describedByIds" >
        <b-form-row>
            <legend v-if="label || $slots['label'] || horizontal"
                    :id="labelId"
                    :class="labelClasses"
            ><slot name="label"><span v-html="label"></span></slot></legend>
            <div :class="inputLayoutClasses" ref="content">
                <slot></slot>
                <b-form-feedback v-show="feedback || $slots['feedback']"
                                 :id="feedbackId"
                                 role="alert"
                                 aria-live="assertive"
                                 aria-atomic="true"
                ><slot name="feedback"><span v-html="feedback"></span></slot></b-form-feedback>
                <b-form-text v-if="description || $slots['description']" :id="descriptionId">
                    <slot name="description"><span v-html="description"></span></slot>
                </b-form-text>
            </div>
        </b-form-row>
    </fieldset>
</template>

<style>
/* a fix for a BS4 beta.1 missing CSS rule */
.b-form-group.form-group :valid ~ .invalid-feedback {
  display: none !important;
}
/*
   Bootstrap V4.beta uses ~ sibling selector to display the .invalid-feedback
   so we ue a style override and also place .is-invalid on the input layout section
   to target our b-form-feedback (.invalid-feedback) to display it in case
   thd form input(s) are wrapped in another element, no longer making them siblings
 */
.b-form-group.form-group.is-invalid .invalid-feedback {
  display: block !important;
}
.b-form-group.form-group.is-valid .invalid-feedback {
  display: none !important;
}
</style>

<script>
    import { warn } from '../utils';
    import { select } from '../utils/dom';
    import { idMixin, formStateMixin } from '../mixins';
    import bFormRow from './form-row';
    import bFormText from './form-text';
    import bFormFeedback from './form-feedback';

    export default {
        mixins: [idMixin, formStateMixin],
        components: {
            bFormRow,
            bFormText,
            bFormFeedback
        },
        data() {
            return {
            };
        },
        props: {
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
            },
            validated: {
                type: Boolean,
                value: false
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
                    this.labelSrOnly ? 'sr-only' : 'col-form-legend',
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
    }
</script>
