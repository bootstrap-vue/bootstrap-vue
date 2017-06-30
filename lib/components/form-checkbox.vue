<template>
    <label :class="[inputClass,checkboxClass,custom?'custom-checkbox':null]">
        <input type="checkbox"
               :id="id || null"
               :name="name"
               :value="value"
               :disabled="disabled"
               :class="[custom?'custom-control-input':null]"
               :checked="isChecked"
               @change="handleChange">
        <span class="custom-control-indicator"
              aria-hidden="true"
              v-if="custom"></span>
        <span :class="[custom?'custom-control-description':null]">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import formMixin from '../mixins/form';
import formCheckBoxMixin from '../mixins/form-checkbox';
import arrayIncludes from '../utils/arrayIncludes';

export default {
    mixins: [formMixin, formCheckBoxMixin],
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
            return arrayIncludes(this.checked, this.value);
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
