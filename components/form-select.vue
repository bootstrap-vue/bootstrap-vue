<template>
    <select :class="['form-control','custom-select',inputSize]"
            v-model="selected"
            :options="allOptions"
            :disabled="disabled"
    >
        <option v-for="option in allOptions"
                :value="option.value"
                v-html="option.text"
                :disabled="option.disabled"
        ></option>
    </select>
</template>

<script>

    export default {
        data() {
            let selected = this.value;
            if (!selected) {
                selected = this.defaultOption ? this.defaultOption.value : null;
            }
            return {
                selected
            };
        },
        mounted() {
            if (this.selected) {
                this.change(this.selected);
            }
        },
        computed: {
            allOptions() {
                if (this.defaultOption) {
                    return [].concat(this.defaultOption, this.options);
                }
                return this.options;
            },
            inputSize() {
                return this.size ? `form-control-${this.size}` : null;
            }
        },
        props: {
            options: {
                type: Array,
                default: [],
                required: true
            },
            defaultOption: {
                default: null
            },
            value: {
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            selected(new_val, old_val) {
                if (new_val !== old_val) {
                    this.change(new_val);
                }
            }
        },
        methods: {
            change(val) {
                this.$emit('input', val);
            }
        }
    };

</script>
