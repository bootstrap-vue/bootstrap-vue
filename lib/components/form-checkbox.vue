<template>
    <label :class="button ? btnLabelClasses : labelClasses"
           :aria-pressed="button ? (isChecked ? 'true' : 'false') : null"
    >
        <input type="checkbox"
               :id="safeId()"
               :class="checkClasses"
               :name="name"
               :value="value"
               :checked="isChecked"
               :disabled="disabled"
               :required="required"
               ref="check"
               autocomplete="off"
               :aria-required="required ? 'true' : null"
               @focus="handleFocus"
               @blur="handleFocus"
               @change="handleChange">
        <span v-if="custom && !button"
              class="custom-control-indicator"
              aria-hidden="true"
        ></span>
        <span :class="(custom && !button) ? 'custom-control-description' : null">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import { idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formCheckBoxMixin } from '../mixins';
import { arrayIncludes, isArray } from '../utils/array';

export default {
    mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formCheckBoxMixin],
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
        button: {
            type: Boolean,
            default: false,
        },
        buttonVariant: {
            type: String,
            default: 'secondary',
        }
    },
    computed: {
        labelClasses() {
            return [
                this.sizeFormClass,
                this.custom ? 'custom-checkbox' : '',
                this.checkboxClass
            ];
        },
        btnLabelClasses() {
            return [
                'btn',
                `btn-${this.buttonVariant}`,
                this.sizeBtnClass,
                this.isChecked ? 'active' : '',
                this.disabled ? 'disabled' : ''
            ];
        },
        checkClasses() {
            return [
                (this.custom && !this.button ) ? 'custom-control-input' : null,
                this.stateClass
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
        },
        handleFocus(evt) {
            // Add or remove 'focus' class on label in button mode
            if (this.button && evt.target && evt.target.parentElement) {
                const label = evt.target.parentElement;
                if (evt.type === 'focus') {
                    label.classList.add('focus');
                } else if (evt.type === 'blur') {
                    label.classList.remove('focus');
                }
            }
        }
    },
    mounted() {
        // Set initial indeterminate state
        this.setIndeterminate(this.indeterminate);
    }
};

</script>
