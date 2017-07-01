<template>
    <select :class="['form-control',inputClass,custom?'custom-select':null]"
            :name="name"
            :id="id || null"
            v-model="localValue"
            :disabled="disabled"
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
    import formOptions from '../mixins/form-options';
    import formMixin from '../mixins/form';
    import formCustomMixin from '../mixins/form-custom';

    export default {
        mixins: [formMixin, formCustomMixin, formOptions],
        data() {
            return {
                localValue: this.value
            };
        },
        props: {
            value: {},
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
