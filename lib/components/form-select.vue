<template>
    <select :class="inputClass"
            :name="name"
            :id="id || null"
            v-model="localValue"
            :multiple="multiple || null"
            :size="(multiple || selectSize > 1) ? selectSize : null"
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
    import { warn } from '../utils';

    export default {
        mixins: [formMixin, formCustomMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.multiple ? (this.value || []) : this.value
            };
        },
        computed: {
            inputClass() {
                return [
                    'form-control',
                    this.size ? `form-control-${this.size}` : null,
                    (this.plain || this.multiple || this.selectSize > 1) ? null : 'custom-select'
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
            selectSize: {
                // Browsers default size to 0, which typically shows 4 rows in most browsers
                // Size of 1 can bork out firefox
                type: Number,
                default: 0
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        created() {
            if (this.returnObject) {
                warn('form-select: return-object has been deprecated and will be removed in future releases');
            }
        }
    };

</script>
