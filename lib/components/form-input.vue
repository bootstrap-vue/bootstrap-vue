<template>
    <input v-if="!static"
           ref="input"
           :is="isTextArea ? 'textarea' : 'input'"
           :type="isTextArea ? null : type"
           :value="value"
           :name="name"
           :id="id || null"
           :disabled="disabled"
           :required="required"
           :autocomplete="autocomplete || null"
           :aria-required="required ? 'true' : null"
           :aria-invalid="ariaInvalid"
           :readonly="readonly"
           :class="inputClass"
           :rows="isTextArea ? (rows || rowsCount) : null"
           :placeholder="placeholder"
           @input="onInput($event.target.value, $event.target)"
           @change="onChange($event.target.value, $event.target)"
           @keyup="onKeyUp($event)"
           @focus="$emit('focus')"
           @blur="$emit('blur')"
    />
    <b-form-input-static v-else
                         :id="id || null"
                         :value="value"
                         :size="size"
                         :state="state"
    ></b-form-input-static>
</template>

<script>
    import { formMixin } from '../mixins';
    import bFormInputStatic from './form-input-static.vue';

    export default {
        mixins: [formMixin],
        components: {bFormInputStatic},
        computed: {
            isTextArea() {
                return this.textarea || this.type === 'textarea';
            },
            rowsCount() {
                return (this.value || '').toString().split('\n').length;
            },
            inputClass() {
                return [
                    'form-control',
                    this.size ? `form-control-${this.size}` : null,
                    this.state ? `form-control-${this.state}` : null
                ];
            },
            ariaInvalid() {
                if (this.invalid === false) {
                    return null;
                }
                if (this.invalid === true) {
                    return 'true';
                }
                return this.invalid;
            }
        },
        methods: {
            format(value, el) {
                if (this.formatter) {
                    const formattedValue = this.formatter(value, el);
                    if (formattedValue !== value) {
                        value = formattedValue;
                        this.$refs.input.value = formattedValue;
                    }
                }
                return value;
            },
            onInput(value, el) {
                if (!this.lazyFormatter) {
                    value = this.format(value, el);
                }
                this.$emit('input', value);
            },
            onChange(value, el) {
                value = this.format(value, el);
                this.$emit('input', value);
                this.$emit('change', value);
            },
            onKeyUp(e) {
                this.$emit('keyup', e);
            },
            focus() {
                this.$refs.input.focus();
            }
        },
        props: {
            value: {
                default: null
            },
            type: {
                type: String,
                default: 'text'
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
            readonly: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                type: String,
                default: null
            },
            static: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: null
            },
            rows: {
                type: Number,
                default: null
            },
            textarea: {
                type: Boolean,
                default: false
            },
            formatter: {
                type: Function
            },
            lazyFormatter: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
