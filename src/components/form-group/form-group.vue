<style>
/*
   Bootstrap V4.beta uses ~ sibling selector to display the .invalid-feedback
   so we ue a style override and also place .is-invalid on the input layout section
   to target our b-form-feedback (.invalid-feedback) to display it in case
   the form input(s) are wrapped in another element, no longer making them siblings
 */
.b-form-group.form-group.is-invalid .invalid-feedback {
  display: block !important;
}
.b-form-group.form-group.is-valid .invalid-feedback {
  display: none !important;
}
</style>

<script>
    import { warn } from '../../utils';
    import { select } from '../../utils/dom';
    import { idMixin, formStateMixin } from '../../mixins';
    import bFormRow from '../form/form-row';
    import bFormText from '../form/form-text';
    import bFormFeedback from '../form/form-feedback';

    export default {
        mixins: [idMixin, formStateMixin],
        components: { bFormRow, bFormText, bFormFeedback },
        render(h) {
            const t = this;
            const $slots = t.$slots;

            // Label
            let legend = h(false);
            if (t.label || $slots.label || t.horizontal) {
                legend = h(
                    'legend',
                    { class: t.labelClasses, attrs: { id: t.labelId } },
                    [ $slots.label || h('span', { domProps: { innerHTML: t.label || '' } }) ]
                );
            }

            // Invalid feeback text
            const feedback = h(
                'b-form-feedback',
                {
                    directives: [
                        { name: 'show', value: t.feedback || $slots.feedback }
                    ],
                    attrs: {
                        id: t.feedbackId,
                        role: 'alert',
                        'aria-live': 'assertive',
                        'aria-atomic': 'true'
                    }
                },
                [ $slots.feedback || h('span', { domProps: { innerHTML: t.feedback || '' } }) ]
            );

            // Form help text (description)
            let description = h(false);
            if (t.description || $slots.description) {
                description = h(
                    'b-form-text',
                    { attrs: { id: t.descriptionId } },
                    [ $slots.description || h('span', { domProps: { innerHTML: t.description || '' } }) ]
                );
            }

            // Build layout
            const content = h(
                'div',
                { ref: 'content', class: t.inputLayoutClasses },
                [ $slots.default, feedback, description ]
            );

            // Generate fieldset wrapper
            return h(
                'fieldset',
                {
                    class: t.groupClasses,
                    attrs: { id: t.safeId(), 'aria-describedby': t.describedByIds }
                },
                [ h('b-form-row', {}, [ legend, content ]) ]
            );
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
