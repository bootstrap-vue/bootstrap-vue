<template>
    <select :class="inputClass"
            :name="name"
            :id="safeId()"
            v-model="localValue"
            :multiple="multiple || null"
            :size="(multiple || selectSize > 1) ? selectSize : null"
            :disabled="disabled"
            :required="required"
            :aria-required="required ? 'true' : null"
            :aria-invalid="computedAriaInvalid"
            ref="input"
    >
        <slot name="first"></slot>
        <option v-for="(option, idx) in formOptions"
                       :value="option.value"
                       :disabled="option.disabled"
                       :key="`option_${idx}_opt`"
                       v-html="option.text"
        ></option>
        <slot></slot>
    </select>
</template>

<script>
    import { idMixin, formMixin, formSizeMixin, formStateMixin, formOptionsMixin, formCustomMixin } from '../mixins';
    import { warn } from '../utils';

    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.value
            }
        },
        watch: {
            value(newVal, oldVal) {
                this.localValue = newVal;
            },
            localValue(newVal, oldVal) {
                this.$emit('input', this.localValue);
            }
        },
        props: {
            value: {},
            multiple: {
                type: Boolean,
                default: false
            },
            selectSize: {
                // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
                // Size of 1 can bork out firefox
                type: Number,
                default: 0
            },
            ariaInvalid: {
                type: [Boolean, String],
                default: false
            }
        },
        computed: {
            inputClass() {
                return [
                    'form-control',
                    this.stateClass,
                    this.sizeFormClass,
                    (this.plain || this.multiple || this.selectSize > 1) ? null : 'custom-select'
                ];
            },
            computedAriaInvalid() {
                if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
                    return 'true';
                }
                return this.stateClass == 'is-invalid' ? 'true' : null;
            }
        }
    };
</script>
