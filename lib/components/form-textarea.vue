<template>
    <textarea v-model="value"
              :class="inputClass"
              :id="id || null"
              :name="name"
              :disabled="disabled"
              :placeholder="placeholder"
              :required="required"
              :autocomplete="autocomplete || null"
              :readonly="readonly || plaintext"
              :rows="rowsCount"
              :wrap="wrap || null"
              :aria-required="required ? 'true' : null"
              :aria-invalid="computedAriaInvalid"
              @input="onInput($event.target.value, $event)"
              @change="onChange($event.target.value, $event)"
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
            plaintext: {
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
                const rows = this.rows || 1;
                const lines = (this.value || '').toString().split('\n').length;
                return this.maxRows ? Math.min(this.maxRows, this.rows ? rows : lines) : Math.max(rows, lines);
            },
            inputClass() {
                return [
                    this.plaintext ? 'form-control-plaintext' : 'form-control',
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
            focus() {
                // For external handler that may want a focus method
                if(!this.disabled) {
                    this.$el.focus();
                }
            }
        }
    };
</script>
