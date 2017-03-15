<template>
    <label :class="[custom?'custom-control':null,custom?'custom-checkbox':null,inline?'form-check-inline':null]">
        <input
                :class="[custom?'custom-control-input':null]"
                type="checkbox"
                :id="id"
                :name="name"
                :value="value"
                :disabled="disabled"
                :checked="checked===value"
                @change="$emit('change',$event.target.checked?value:uncheckedValue)"
        >
        <span class="custom-control-indicator" v-if="custom"></span>
        <span :class="[custom?'custom-control-description':null]"><slot></slot></span>
    </label>
</template>


<script>

    export default {
        data() {
            return {

            }
        },
        model: {
            prop: 'checked',
            event: 'change'
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
            value: {
                default: true
            },
            uncheckedValue: {
                default: false
            },
            checked: {
                default: true
            },
            disabled: {
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
        }
    };

</script>
