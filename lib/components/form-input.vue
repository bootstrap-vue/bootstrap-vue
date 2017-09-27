<template>
    <input :id="safeId()"
           :class="inputClass"
           :name="name"
           :value="localValue"
           :type="localType"
           :disabled="disabled"
           :required="required"
           :readonly="readonly || plaintext"
           :placeholder="placeholder"
           :autocomplete="autocomplete || null"
           :aria-required="required ? 'true' : null"
           :aria-invalid="computedAriaInvalid"
           @input="onInput($event.target.value, $event)"
           @change="onChange($event.target.value, $event)"/>
</template>

<style>
    /* Special styling for type=range and color input */
    input.form-control[type="range"],
    input.form-control[type="color"] {
        height: 36px;
        height: 2.25rem;
    }
    input.form-control.form-control-sm[type="range"],
    input.form-control.form-control-sm[type="color"] {
        height: 31px;
        height: 1.9375rem;
    }
    input.form-control.form-control-lg[type="range"],
    input.form-control.form-control-lg[type="color"] {
        height: 48px;
        height: 3rem;
    }
    /* Less padding on type=color */
    input.form-control[type="color"] {
        padding: 8px 8px;
        padding: 0.25rem 0.25rem;
    }
    input.form-control.form-control-sm[type="color"] {
        padding: 4px 5px;
        padding: 0.125rem 0.125rem;
    }
</style>

<script>
    import { idMixin, formMixin, formSizeMixin, formStateMixin } from '../mixins';
    import { arrayIncludes } from '../utils/array';
    
    // Valid input types
    const TYPES = [
        'text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color',
        `date`, `time`, `datetime`, `datetime-local`, `month`, `week`
    ];
    
    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
        data() {
            return {
                localValue: this.value
            }
        },
        props: {
            value: {
                default: null
            },
            type: {
                type: String,
                default: 'text',
                validator: (type) => arrayIncludes(TYPES, type)
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
            formatter: {
                type: Function
            },
            lazyFormatter: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            localType() {
                // We only allow certain types
                return arrayIncludes(TYPES, this.type) ? this.type : 'text';
            },
            inputClass() {
                return [
                    this.plaintext ? `form-control-plaintext` : 'form-control',
                    this.sizeFormClass,
                    this.stateClass
                ];
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
                // Most likely a string value (which could be 'true')
                return this.ariaInvalid;
            }
        },
        watch:{
            value(newVal, oldVal) {
                if (newVal !== oldVal){
                    this.localValue = newVal;
                }
            },
            localValue(newVal, oldVal) {
                if (newVal !== oldVal){
                    this.$emit('input', newVal);
                }
            }
        },
        methods: {
            format(value, e) {
                if (this.formatter) {
                    const formattedValue = this.formatter(value, e);
                    if (formattedValue !== value) {
                        return formattedValue;
                    }
                }
                return value;
            },
            onInput(value, e) {
                if (this.lazyFormatter) {
                    // Update the model with the current unformated value
                    this.localValue = value;
                } else {
                    this.localValue = this.format(value, e);
                }
            },
            onChange(value, e) {
                this.localValue = this.format(value, e);
                this.$emit('change', this.localValue);
            },
            focus() {
                if(!this.disabled) {
                    this.$el.focus();
                }
            }
        }
    };
</script>
