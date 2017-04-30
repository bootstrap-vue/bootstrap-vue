<template>
    <input v-if="!static"
           :type="type"
           :value="value"
           :name="name"
           :id="_id"
           :disabled="disabled"
           ref="input"

           :is="textarea?'textarea':'input'"
           :class="['form-control',inputClass]"
           :rows="rows || rowsCount"

           :placeholder="placeholder"

           @input="onInput($event.target.value)"
           @change="onChange($event.target.value)"
           @keyup="onKeyUp($event)"
           @focus="$emit('focus')"
           @blur="$emit('blur')"
    />
    <b-form-input-static v-else
                         :id="_id"
                         :value="value"
                         :formatter="formatter"
    ></b-form-input-static>
</template>

<script>
    import formMixin from '../mixins/form';
    import generateId from '../mixins/generate-id';
    import bFormInputStatic from './form-input-static.vue';

    export default {
        mixins: [formMixin, generateId],
        components: {bFormInputStatic},
        computed: {
            rowsCount() {
                return (this.value || '').toString().split('\n').length;
            }
        },
        methods: {
            format(value) {
                if (this.formatter) {
                    const formattedValue = this.formatter(value);
                    if (formattedValue !== value) {
                        value = formattedValue;
                        this.$refs.input.value = formattedValue;
                    }
                }
                return value;
            },
            onInput(value) {
                if (!this.lazyFormatter) {
                    value = this.format(value);
                }
                this.$emit('input', value);
            },
            onChange(value) {
                value = this.format(value);
                this.$emit('input', value);
                this.$emit('change', value);
            },
            onKeyUp(e) {
                this.$emit('keyup', e);
            }
        },
        props: {
            value: {
                default: null
            },
            type: {
                type: String,
                default: 'text'
            },
            static: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: null
            },
            rows: {
                type: Number,
                default: null
            },
            textarea: {
                type: Boolean,
                default: false
            },
            formatter: {
                type: Function
            },
            lazyFormatter: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
