<template>
    <label :class="[inputClass,checkboxClass]">
        <input type="checkbox"
               :id="id || null"
               :name="name"
               :value="value"
               :disabled="disabled"
               :required="required"
               autocomplete="off"
               :aria-required="required ? 'true' : null"
               :class="[custom?'custom-control-input':null]"
               :checked="isChecked"
               @change="handleChange">
        <span class="custom-control-indicator"
              aria-hidden="true"
              v-if="custom"></span>
        <span :class="custom ? 'custom-control-description' : null">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import formMixin from '../mixins/form';
import formCustomMixin from '../mixins/form-custom';
import formCheckBoxMixin from '../mixins/form-checkbox';
import arrayIncludes from '../utils/arrayIncludes';
import isArray from '../utils/isArray';


export default {
    mixins: [formMixin, formCustomMixin, formCheckBoxMixin],
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
        },
        size: {
            type: String,
            default: null
        }
    },
    computed: {
        inputClass() {
            return [
                this.size ? `form-control-${this.size}` : null,
                this.custom ? 'custom-checkbox' : null
            ];
        },
        isChecked() {
            if (isArray(this.checked)) {
                return arrayIncludes(this.checked, this.value);
            } else {
                return this.checked === this.value;
            }
        }
    },
    methods: {
        handleChange({ target: { checked } }) {
            if (isArray(this.checked)) {
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
