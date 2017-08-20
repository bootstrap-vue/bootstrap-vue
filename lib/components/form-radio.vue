<template>
    <div :id="safeId()"
         :class="buttons ? btnGroupClasses : radioGroupClasses"
         role="radiogroup"
         tabindex="-1"
         :data-toggle="buttons ? 'buttons' : null"
         :aria-required="required ? 'true' : null"
         :aria-invalid="computedAriaInvalid"
    >
        <label v-for="(option, idx) in formOptions"
               :class="buttons ? btnLabelClasses(option, idx) : labelClasses"
               :key="'radio_'+idx"
               :aria-pressed="buttons ? (option.value === localValue ? 'true' : 'false') : null"
        >
            <input :id="safeId(`_BV_radio_${idx}`)"
                   :class="radioClasses"
                   ref="inputs"
                   type="radio"
                   autocomplete="off"
                   v-model="localValue"
                   :value="option.value"
                   :name="name"
                   :required="name && required"
                   :disabled="option.disabled || disabled"
                   @focus="handleFocus"
                   @blur="handleFocus"
                   @change="$emit('change', returnObject ? option : option.value)"
            >
            <span v-if="custom && !buttons" class="custom-control-indicator" aria-hidden="true"></span>
            <span :class="(custom && !buttons) ? 'custom-control-description' : null" v-html="option.text"></span>
        </label>
    </div>
</template>

<script>
    import { idMixin, formOptionsMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formCheckBoxMixin } from '../mixins';

    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formCheckBoxMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.value,
                localState: this.state
            };
        },
        props: {
            value: {},
            options: {
                type: [Array, Object],
                default: null,
                required: true
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
        computed: {
            radioGroupClasses() {
                return [
                    this.validated ? `was-validated` : '',
                    this.sizeFormClass,
                    this.stacked ? 'custom-controls-stacked' : ''
               ];
            },
            btnGroupClasses() {
                return [
                    'btn-group',
                    this.validated ? `was-validated` : '',
                    this.sizeBtnClass,
                    this.stacked ? 'btn-group-vertical' : ''
                 ];
            },
            radioClasses() {
                return [
                    (this.custom && !this.buttons) ? 'custom-control-input' : null,
                    this.stateClass
                ];
            },
            labelClasses() {
                return [
                    this.checkboxClass,
                    this.custom ? 'custom-radio' : null
                ];
            },
            computedAriaInvalid() {
                if (this.ariaInvalid === true || this.AriaInvalid === 'true') {
                    return 'true'
                }
                return this.computedState === false ? 'true' : null;
            },
            inline() {
                return !this.stacked;
            }
        },
        methods: {
            btnLabelClasses(option, idx) {
                return [
                    'btn',
                    `btn-${this.buttonVariant}`,
                    (option.disabled || this.disabled) ? 'disabled' : '',
                    option.value === this.localValue ? 'active' : null,
                    // Fix staking issue (remove space between buttons)
                    (this.stacked && idx === this.formOptions.length - 1) ? '' : 'mb-0'
                ];
            },
            handleFocus(evt) {
                // When in buttons mode, we need to add 'focus' class to label when radio focused
                if (this.buttons && evt.target && evt.target.parentElement) {
                    const label = evt.target.parentElement;
                    if (evt.type ==='focus') {
                        label.classList.add('focus');
                    } else if (evt.type ==='blur') {
                        label.classList.remove('focus');
                    }
                }
            }
        }
    };
</script>
