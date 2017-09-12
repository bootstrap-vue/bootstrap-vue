<template>
    <div :id="safeId()"
         :class="groupClasses"
         role="radiogroup"
         tabindex="-1"
         :data-toggle="buttons ? 'buttons' : null"
         :aria-required="required ? 'true' : null"
         :aria-invalid="computedAriaInvalid"
    >
        <slot name="first"></slot>
        <!-- b-form-radio will grab v-model (checked) from b-form-radio-group -->
        <b-form-radio v-for="(option, idx) in formOptions"
                      ref="options"
                      :id="safeId(`_BV_radio_${idx}_opt_`)"
                      :name="name"
                      :value="option.value"
                      :required="name && required"
                      :disabled="option.disabled"
                      :key="`radio_${idx}_opt`"
        ><span v-html="option.text"></span></b-form-radio>
        <slot></slot>
    </div>
</template>

<script>
    import { idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../mixins';
    import bFormRadio from './form-radio.vue';

    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
        components: [bFormRadio],
        data() {
            return {
                localChecked: this.checked,
                // Flag for children
                is_RadioCheckGroup: true
              };
        },
        model: {
            prop: 'checked',
            event: 'input'
        },
        props: {
            checked: {
                type: [String, Object],
                default: null
            },
            validated: {
                type: Boolean,
                default: false
            },
            ariaInvalid: {
                type: [Boolean, String],
                default: false
            },
            stacked: {
                type: Boolean,
                default: false
            },
            buttons: {
                // Render as button style
                type: Boolean,
                default: false
            },
            buttonVariant: {
                // Only applicable when rendered with button style
                type: String,
                default: 'secondary'
            }
        },
        watch: {
            checked(newVal, oldVal) {
                this.localChecked = this.checked;
            },
            localChecked(newVal, oldVal) {
                this.$emit('input', newVal);
            }
        },
        computed: {
            groupClasses() {
                if (this.buttons) {
                    return [
                        'btn-group',
                        this.size ? `btn-group-${this.size}` : '',
                        this.stacked ? 'btn-group-vertical' : '',
                        this.validated ? `was-validated` : ''
                    ];
                }
                return [
                    this.sizeFormClass,
                    (this.stacked && this.custom) ? 'custom-controls-stacked' : '',
                    this.validated ? `was-validated` : ''
               ];
            },
            computedAriaInvalid() {
                if (this.ariaInvalid === true || this.ariaInvalid === 'true' || this.ariaInvalid === '') {
                    return 'true';
                }
                return this.get_State === false ? 'true' : null;
            },
            get_State() {
                // This is a tri-state prop (true/valid, false/invalid, null)
                if (typeof this.state === 'boolean') {
                    return this.state;
                } else if (this.state === 'valid') {
                    return true;
                } else if (this.state === 'invalid') {
                    return false;
                }
                return null;
            }
        }
    };
</script>
