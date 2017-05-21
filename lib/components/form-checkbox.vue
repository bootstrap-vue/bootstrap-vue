<template>
    <label :class="[inputClass,checkboxClass,custom?'custom-checkbox':null]">
        <input type="checkbox"
               :id="_id"
               :name="name"
               :value="value"
               :disabled="disabled"
               :class="[custom?'custom-control-input':null]"
               :checked="isChecked"
               @change="handleChange">
        <span class="custom-control-indicator"
              v-if="custom"></span>
        <span :class="[custom?'custom-control-description':null]">
            <slot></slot>
        </span>
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
    },
    computed: {
        isChecked() {
            return this.checked.includes(this.value);
        }
    },
    methods: {
        handleChange({ target: { checked } }) {
            if (Array.isArray(this.checked)) {
                if (this.isChecked) {
                    this.$emit('change', this.checked.filter(x => x !== this.value));
                } else {
                    this.$emit('change', [...this.checked, this.value]);
                }
            } else {
                this.$emit('change', checked ? this.value : this.uncheckedValue)
            }
        }
    }
};

</script>
