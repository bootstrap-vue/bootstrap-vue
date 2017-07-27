<template>
    <select :class="inputClass"
            :name="name"
            :id="id || null"
            v-model="localValue"
            :multiple="multiple || null"
            :size="multiple && multipleSize > 1 ? multipleSize : null"
            :disabled="disabled"
            :required="required"
            :aria-required="required ? 'true' : null"
            :aria-invalid="ariaInvalid"
            ref="input"
    >
        <option v-for="option in formOptions"
                :value="option.value"
                v-html="option.text"
                :disabled="option.disabled"
        ></option>
    </select>
</template>

<script>
    import { formMixin, formOptionsMixin, formCustomMixin } from '../mixins';

    export default {
        mixins: [formMixin, formCustomMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.value
            };
        },
        computed: {
            inputClass() {
                return [
                    'form-control',
                    this.size ? `form-control-${this.size}` : null,
                    (this.custom && !this.multiple) ? 'custom-select' : null
                ];
            },
            ariaInvalid() {
                if (this.invalid === true || this.invalid === 'true') {
                    return 'true';
                }
                return null;
            }
        },
        props: {
            value: {},
            invalid: {
                type: [Boolean, String],
                default: false
            },
            size: {
                type: String,
                default: null
            },
            options: {
                type: [Array, Object],
                required: true
            },
            multiple: {
                type: Boolean,
                default: false
            },
            multipleSize: {
                // Browsers default size to 0, which typically shows 4 rows in most browsers
                // Size of 1 can bork out firefox
                type: Number,
                default: 0
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
