<template>
    <select :class="['form-control','custom-select',inputSize]" v-model="localValue" :disabled="disabled">
        <option v-for="option in formOptions"
                :value="option.value"
                v-html="option.text"
                :disabled="option.disabled"
        ></option>
    </select>
</template>

<script>
    import formOptions from '../mixins/form-options';

    export default {
        mixins: [formOptions],
        data() {
            return {
                localValue: this.value
            };
        },
        computed: {
            inputSize() {
                return this.size ? `form-control-${this.size}` : null;
            }
        },
        props: {
            value: {},
            options: {
                type: [Array, Object],
                required: true
            },
            size: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
