<template>
    <select :class="['custom-select',inputSize]"
            :id="id"
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
    import {uniqueId} from '../utils/helpers.js'

    export default {
        data(){
            let selected = this.value;
            if (!selected || !selected.length) selected = this.defaultOption.value;
            return {
                selected,
            }
        },
        mounted(){
            if (this.selected)
                this.change(this.selected);
        },
        computed: {
            allOptions(){
                return [].concat(this.defaultOption, this.options);
            },
            inputState() {
                return this.state ? `has-${this.state}` : null;
            },
            inputSize() {
                return this.size ? `form-control-${this.size}` : null;
            },
        },
        props: {
            options: {
                type: Array,
                default: [],
                required: true,
            },
            defaultOption: {
                default: () => {
                    return {}
                },
            },
            value: {
                default: '',
            },
            size: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            selected(new_val, old_val){
                if (new_val !== old_val)
                    this.change(new_val)
            }
        },
        methods: {
            change(val){
                this.$emit('input', val);
            }
        }
    }

</script>
