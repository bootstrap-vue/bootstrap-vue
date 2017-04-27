<template>
    <select :class="[inputClass,custom?'custom-select':null]"
            :name="name"
            :id="_id"
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
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [formMixin, formOptions, generateId],
        data() {
            return {
                localValue: this.value
            };
        },
        props: {
            value: {},
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
