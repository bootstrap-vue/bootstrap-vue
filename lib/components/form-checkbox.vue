<template>
    <label :class="labelClasses"
           :aria-pressed="button ? (isChecked ? 'true' : 'false') : null"
    >
        <input type="checkbox"
               :id="safeId()"
               v-model="computedLocalChecked"
               :class="inputClasses"
               :name="get_Name"
               :value="value"
               :checked="isChecked"
               :disabled="is_Disabled"
               :required="is_Required"
               ref="check"
               autocomplete="off"
               :aria-required="is_Required ? 'true' : null"
               @focus="handleFocus"
               @blur="handleFocus"
               @change="handleChange">
        <span v-if="is_Custom && !is_button" class="custom-control-indicator" aria-hidden="true"></span>
        <span :class="(is_Custom && !is_Button) ? 'custom-control-description' : null">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../mixins';
    import { isArray } from '../utils/array';
    import { looseEqual } from '../utils';

    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin],
        data() {
            return {
                localChecked: this.checked,
                hasFocus: false
            }
        },
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            value: {
                default: true
            },
            uncheckedValue: {
                // Not applicable in b-form-checkboxes group
                default: false
            },
            checked: {
                default: true
            },
            indeterminate: {
                // Only applicable when not in b-form-checkboxes group
                type: Boolean,
                default: false,
            },
            button: {
                type: Boolean,
                default: false,
            },
            buttonVariant: {
                type: String,
                default: null,
            }
        },
        computed: {
            computedLocalChecked: {
                // bind to the parent check group value
                get() {
                    return this.$parent.is_RadioCheckGroup ? this.$parent.localChecked : this.localChecked;
                },
                set(val) {
                    if (this.$parent.is_RadioCheckGroup) {
                        this.$parent.localChecked = val;
                    } else {
                        this.localChecked = val;
                    }
                }
            },
            is_Disabled() {
                // Child can be disabled while parent isn't
                return Boolean(this.$parent.disabled || this.disabled);
            },
            is_Required() {
                return Boolean(this.$parent.required || this.required);
            },
            // Form-custom mixin
            is_Plain() {
                return Booloean(this.$parent.plain || this.plain);
            },
            is_Custom() {
                return !this.is_Plain;
            },
            get_Size() {
                return this.$parent.size || this.size;
            },
            get_State() {
                // This is a tri-state prop (true, false, null)
                if (typeof this.computedState === 'boolean') {
                    return this.computedState;
                } else if (this.$parent.is_RadioCheckGroup) {
                    return this.$parent.computedState;
                }
            },
            get_StateClass() {
                typeof this.get_State === 'boolean' ? (this.get_State ? 'is-valid' : 'is-invalid') : ''
            },
            is_Stacked() {
                return Boolean(this.$parent.stacked);
            },
            is_Inline() {
                return !this.is_Stacked;
            },
            is_ButtonMode() {
                // Checboxes could be a single checkbox in button mode
                return Boolean((this.$parent.is_RadioCehckGroup && this.$parent.buttons) || this.button);
            },
            get_ButtonVariant() {
                // this.buttonVariant only applies to radios & checkboxes
                return this.buttonVariant || this.$parent.buttonVariant || 'secondary';
            },
            get_Name() {
                return (this.$parent.is_RadioCehckGroup ? this.$parent.name : this.name) || null;
            },
            labelClasses() {
                if (this.is_ButtonMode) {
                    return [
                        'btn',
                        `btn-${this.get_ButtonVariant}`,
                        Boolean(this.get_Size) ? `btn-${this.get_Size}` : '',
                        this.is_Disabled ? 'disabled' : '',
                        this.isChecked ? 'active' : '',
                        this.hasFocus ? 'focus' : ''
                    ];
                }
                // Not button mode
                return [
                    Boolean(this.get_Size) ? `form-control-${this.get_Size}` : '',
                    this.is_Custom ? 'custom-control' : 'form-check-label',
                    this.is_Custom ? 'custom-checkbox' : '',
                    (this.is_Inline && this.is_Plain) ? 'form-check-inline' : '',
                    this.get_StateClass
                ];
            },
            inputClasses() {
                if (this.is_ButtonMode) {
                    return [];
                } else {
                    return [
                        this.is_Custom ? 'custom-control-input' : 'form-check-input'
                    ];
                }
            },
            isChecked() {
                const checked = this.computedLocalChecked;
                if (isArray(checked)) {
                    for (let i = 0; i < checked.length; i++) {
                        if (looseEqual(checked[i], this.value)) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return looseEqual(checked, this.value);
                }
            }
        },
        watch: {
            checked(newVal, oldVal) {
                this.computedLocalChceked = newVal;
            },
            computedLocalChceked(newVal, oldVal) {
                if (this.$parent.is_RadioCheckGroup || isArray(this.computedLocalChceked)) {
                    this.$emit('input', this.computedLocalChceked);
                } else {
                    // Single radio mode supports unchecked value
                    this.$emit('input', this.isChecked ? this.value : this.uncheckedValue)
                }
            },
            indeterminate(newVal, oldVal) {
                this.setIndeterminate(newVal);
            }
        },
        methods: {
            handleChange({ target: { checked } }) {
                // Change event is only fired via user interaction
                if (this.$parent.is_RadioCheckGroup || isArray(this.computedLocalChceked)) {
                    this.$emit('change', checked ? this.value : null);
                } else {
                    // Single radio mode supports unchecked value
                    this.$emit('change', checked ? this.value : this.uncheckedValue)
                }
                this.$emit('update:indeterminate', this.$refs.check.indeterminate);
            },
            setIndeterminate(state) {
                // Indeterminate only supported in single checkbox mode
                if (this.$parent.is_RadioCheckGroup || isArray(this.computedLocalChceked)) {
                    return;
                }
                this.$refs.check.indeterminate = state;
                // Emit update event to prop
                this.$emit('update:indeterminate', this.$refs.check.indeterminate);
            },
            handleFocus(evt) {
                // Add or remove 'focus' class on label in button mode
                if (this.is_ButtonMode && evt.target) {
                    if (evt.type === 'focus') {
                        this.hasFocus = true;
                    } else if (evt.type === 'blur') {
                        this.hasFocus = false;
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
