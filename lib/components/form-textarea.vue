<template>
    <textarea v-model="localValue"
              :class="inputClass"
              :style="inputStyle"
              :id="safeId()"
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
    ></textarea>
</template>

<script>
    import { idMixin, formMixin, formSizeMixin, formStateMixin } from '../mixins';
    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
        data() {
            return {
                localValue: this.value
            };
        },
        props: {
            value: {
                type: String,
                default: ''
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
                type: [Number, String],
                default: null
            },
            maxRows: {
                type: [Number, String],
                default: null
            },
            wrap: {
                // 'soft', 'hard' or 'off'. Browser default is 'soft'
                type: String,
                default: 'soft'
            },
            noResize: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            rowsCount() {
                const rows = parseInt(this.rows, 10) || 1;
                const maxRows = parseInt(this.maxRows, 10) || 0;
                const lines = (this.value || '').toString().split('\n').length;
                return maxRows ? Math.min(maxRows, Math.max(rows, lines)) : Math.max(rows, lines);
            },
            inputClass() {
                return [
                    this.plaintext ? 'form-control-plaintext' : 'form-control',
                    this.sizeFormClass,
                    this.stateClass
                ];
            },
            inputStyle() {
                // We set width 100% in plaintext mode to get around a shortcoming in bootstrap CSS
                // setting noResize to true will disable the ability for the user to resize the textarea
                return {
                    width: this.plaintext ? '100%' : null,
                    resize: this.noResize ? 'none' : null
                };
            },
            computedAriaInvalid() {
                if (!Boolean(this.ariaInvalid) || this.ariaInvalid === 'false') {
                    // this.ariaInvalid is null or false or 'false'
                    return this.computedState === false ? 'true' : null ;
                }
                if (this.ariaInvalid === true) {
                   // User wants explicit aria-invalid=true
                    return 'true';
                }
                // Most likely a string value (which could be the string 'true')
                return this.ariaInvalid;
            }
        },
        watch: {
            value(newVal, oldVal) {
                // Update our localValue
                if (newVal !== oldVal) {
                    this.localValue = newVal;
                }
            },
            localValue(newVal, oldVal) {
                // update Parent value
                if (newVal !== oldVal) {
                    this.$emit('input', newVal);
                }
            }
        },
        methods: {
            focus() {
                // For external handler that may want a focus method
                if(!this.disabled) {
                    this.$el.focus();
                }
            }
        }
    };
</script>
