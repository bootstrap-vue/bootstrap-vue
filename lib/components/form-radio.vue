<template>
    <div :id="id || null"
         :class="buttons ? btnGroupClasses : radioGroupClasses"
         role="radiogroup"
         :data-toggle="buttons ? 'buttons' : null"
         :aria-required="required ? 'true' : null"
         :aria-invalid="invalid ? 'true' : null"
    >
        <label v-for="(option, idx) in formOptions"
               :class="buttons ? btnLabelClasses(option, idx) : labelClasses"
               :key="idx"
               :aria-pressed="buttons ? (option.value === localValue ? 'true' : 'false') : null"
        >
            <input :id="id ? (id + '__BV_radio_' + idx) : null"
                   :class="(custom && !buttons) ? 'custom-control-input' : null"
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
    import { formOptionsMixin, formMixin, formCustomMixin, formCheckBoxMixin } from '../mixins';

    export default {
        mixins: [formMixin, formCustomMixin, formCheckBoxMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.value
            };
        },
        props: {
            value: {},
            options: {
                type: [Array, Object],
                default: null,
                required: true
            },
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            invalid: {
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
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            radioGroupClasses() {
                return [
                    this.size ? `form-control-${this.size}` : null,
                    this.state ? `has-${this.state}` : '',
                    this.stacked ? 'custom-controls-stacked' : ''
               ];
            },
            btnGroupClasses() {
                return [
                    'btn-group',
                    this.size ? `btn-group-${this.size}` : null,
                    this.stacked ? 'btn-group-vertical' : ''
                 ];
            },
            labelClasses() {
                return [
                    this.checkboxClass,
                    this.custom ? 'custom-radio' : null
                ];
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
