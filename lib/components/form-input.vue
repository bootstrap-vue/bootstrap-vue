<template>
    <b-form-input-static v-if="static"
                         :id="id || null"
                         :value="value"
                         :size="size"
                         :state="state"
    ></b-form-input-static>
    <textarea v-else-if="isTextArea"
              ref="textarea"
              :name="name"
              :value="value"
              :id="id || null"
              :disabled="disabled"
              :wrap="wrap || null"
              :required="required"
              :autocomplete="autocomplete || null"
              :aria-required="required ? 'true' : null"
              :aria-invalid="computedAriaInvalid"
              :readonly="readonly"
              :class="inputClass"
              :rows="rows || rowsCount"
              :placeholder="placeholder"
              @input="onInput($event.target.value, $event.target)"
              @change="onChange($event.target.value, $event.target)"
              @keyup="onKeyUp($event)"
              @focus="$emit('focus')"
              @blur="$emit('blur')"
    ></textarea>
    <input v-else
           ref="input"
           :name="name"
           :value="value"
           :type="type"
           :id="id || null"
           :disabled="disabled"
           :required="required"
           :autocomplete="autocomplete || null"
           :aria-required="required ? 'true' : null"
           :aria-invalid="computedAriaInvalid"
           :readonly="readonly"
           :class="inputClass"
           :placeholder="placeholder"
           @input="onInput($event.target.value, $event.target)"
           @change="onChange($event.target.value, $event.target)"
           @keyup="onKeyUp($event)"
           @focus="$emit('focus')"
           @blur="$emit('blur')" />
</template>

<script>
    import { formMixin } from '../mixins';
    import bFormInputStatic from './form-input-static.vue';
    export default {
        mixins: [formMixin],
        components: {
            bFormInputStatic
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
                // valid, invalid or null
                type: String,
                default: null
            },
            ariaInvalid: {
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
            textarea: {
                type: Boolean,
                default: false
            },
            rows: {
                type: Number,
                default: null
            },
            wrap: {
                // 'soft', 'hard' or 'off'. Browser default is 'soft'
                type: String,
                default: 'soft'
            },
            formatter: {
                type: Function
            },
            lazyFormatter: {
                type: Boolean,
                default: false
            }
        },
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
                    this.state ? `is-${this.state}` : null
                ];
            },
            computedAriaInvalid() {
                if (!Boolean(this.ariaInvalid) || this.ariaInvalid === 'false') {
                    // this.ariaInvalid is null or false or 'false'
                    return this.state === 'invalid' ? 'true' : null ;
                }
                if (this.ariaInvalid === true) {
                   // User wants explicit aria-invalid=true
                    return 'true';
                }
                // Most likely a string value (which could be 'true')
                return this.ariaInvalid;
            }
        },
        watch:{
            value(newVal, oldVal) {
                if (newVal !== oldVal){
                    this.$refs.input.value = newVal;
                }
            }
        },
        methods: {
            format(value, el) {
                if (this.formatter) {
                    const formattedValue = this.formatter(value, el);
                    if (formattedValue !== value) {
                        this.$refs.input.value = formattedValue;
                        return formattedValue;
                    }
                }
                return value;
            },
            onInput(value, el) {
                let formattedValue=value;
                if (!this.lazyFormatter) {
                    formattedValue = this.format(value, el);
                }
                this.$emit('input', formattedValue);
            },
            onChange(value, el) {
                const formattedValue = this.format(value, el);
                this.$emit('input', formattedValue);
                this.$emit('change', formattedValue);
            },
            onKeyUp(e) {
                this.$emit('keyup', e);
            },
            focus() {
                if(this.static || this.disabled) {
                    return;
                }
                if (this.isTextArea) {
                    this.$refs.textarea.focus();
                } else {
                    this.$refs.input.focus();
                }
            }
        }
    };
</script>
