<template>
    <textarea v-model="value"
              :id="id || null"
              :name="name"
              :disabled="disabled"
              :wrap="wrap || null"
              :required="required"
              :autocomplete="autocomplete || null"
              :readonly="readonly"
              :class="inputClass"
              :rows="rows || rowsCount"
              :placeholder="placeholder"
              :aria-required="required ? 'true' : null"
              :aria-invalid="computedAriaInvalid"
              @input="onInput(value, $event)"
              @change="onChange(value, $event)"
              @keyup="$emit('keyup, $event)"
              @keyup="$emit('keydown, $event)"
              @focus="$emit('focus', $event)"
              @blur="$emit('blur', $event)"
    ></textarea>
</template>

<script>
    import { formMixin } from '../mixins';
    export default {
        mixins: [formMixin],
        props: {
            value: {
                type: String,
                default: ''
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
            placeholder: {
                type: String,
                default: null
            },
            rows: {
                type: Number,
                default: null
            },
            maxRows: {
                type: Number,
                default: null
            },
            wrap: {
                // 'soft', 'hard' or 'off'. Browser default is 'soft'
                type: String,
                default: 'soft'
            }
        },
        computed: {
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
        methods: {
            onInput(value, e) {
                this.$emit('input', value, e);
            },
            onChange(value, e) {
                this.$emit('input', value, e);
                this.$emit('change', value, e);
            },
            onKeyUp(e) {
                this.$emit('keyup', e);
            },
            onKeyDown(e) {
                this.$emit('keydown', e);
            },
            focus() {
                // For external handler that may want a focus method
                if(!this.disabled) {
                    this.$el.focus();
                }
            }
        }
    };
</script>
