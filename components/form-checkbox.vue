<template>
    <label :class="[custom?'custom-control':null,custom?'custom-checkbox':null,inline?'form-check-inline':null]">
        <input
                :class="[custom?'custom-control-input':null]"
                type="checkbox"
                :id="id"
                :name="name"
                :value="_value"
                :disabled="disabled"
                @change="change($event.target.checked)"
                :checked="localChecked"

        >
        <span class="custom-control-indicator" v-if="custom"></span>
        <span :class="[custom?'custom-control-description':null]"><slot></slot></span>
    </label>
</template>


<script>

    export default {
        data() {
            return {
                localChecked: this.checked
            };
        },
        mounted() {
            this.change(this.localChecked);
        },
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            _value: {
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            checked: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: true
            },
            custom: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            change(checked) {
                this.localChecked = checked;
                this.$emit('change', checked);
                this.$emit('input', checked ? this._value : undefined);
            }
        }
    };

</script>
