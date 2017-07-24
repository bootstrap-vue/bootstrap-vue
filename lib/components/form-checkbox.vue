<template>
    <label :class="[inputClass,checkboxClass]">
        <input type="checkbox"
               :id="id || null"
               :name="name"
               :value="value"
               :disabled="disabled"
               :required="required"
               ref="check"
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
import { formMixin, formCustomMixin, formCheckBoxMixin } from '../mixins';
import { arrayIncludes, isArray } from '../utils/array';

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
        indeterminate: {
            type: Boolean,
            default: false,
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
    watch: {
        indeterminate(newVal, oldVal) {
            this.setIndeterminate(newVal);
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
            this.$emit('update:indeterminate', this.$refs.check.indeterminate);
        },
        setIndeterminate(state) {
            this.$refs.check.indeterminate = state;
            // Emit update event to prop
            this.$emit('update:indeterminate', this.$refs.check.indeterminate);
        }
    },
    mounted() {
        // Set initial indeterminate state
        this.setIndeterminate(this.indeterminate);
    }
};

</script>
