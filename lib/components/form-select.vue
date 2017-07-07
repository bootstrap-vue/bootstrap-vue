<template>
    <select :class="inputClass"
            :name="name"
            :id="id || null"
            v-model="localValue"
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
    import { formMixin, formOptionsMixin, formCustomMixin } from '../mixins/';

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
                    this.custom ? 'custom-select' : null
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
            returnObject: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
