<template>
    <label :class="[inputClass,checkboxClass,custom?'custom-checkbox':null]">
        <input
                type="checkbox"
                :id="_id"
                :name="name"
                :value="value"
                :disabled="disabled"

                :class="[custom?'custom-control-input':null]"
                :checked="checked===value"
                @change="$emit('change',$event.target.checked?value:uncheckedValue)"
        >
        <span class="custom-control-indicator" v-if="custom"></span>
        <span :class="[custom?'custom-control-description':null]"><slot></slot></span>
    </label>
</template>

<script>
    import formMixin from '../mixins/form';
    import formCheckBoxMixin from '../mixins/form-checkbox';
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [formMixin, formCheckBoxMixin, generateId],
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            value: {
                default: true
            },
            uncheckedValue: {
                default: false
            },
            checked: {
                default: true
            }
        }
    };

</script>
