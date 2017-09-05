<template>
    <label :class="labelClasses">
        <input v-model="computedLocalChecked"
               :id="safeId()"
               :class="inputClasses"
               :value="value"
               :name="get_Name"
               :required="get_Name && is_Required"
               :disabled="is_Disabled"
               ref="radio"
               type="radio"
               autocomplete="off"
               @focus="handleFocus"
               @blur="handleFocus"
               @change="handleChange"
        >
        <span v-if="is_Custom && !is_ButtonMode" class="custom-control-indicator" aria-hidden="true"></span>
        <span :class="(is_Custom && !is_ButtonMode) ? 'custom-control-description' : null">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../mixins';
    import ( looseEqual } from '../utils';

    export default {
        mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin],
        data() {
            return {
                localChceked: this.checked,
                hasFocus: false
            };
        },
        model: {
            prop: 'checked',
            event: 'input'
        },
        props: {
            value: {
                required: true
            },
            checked: {
                // This is the model, except when in group mode
            },
            button: {
                // Render as button style
                type: Boolean,
                default: false
            },
            buttonVariant: {
                // Only applicable when rendered with button style
                type: String,
                default: null
            }
        },
        watch: {
            // Radio Groups can only have a single value, so our watchers are simple
            checked(newVal, oldVal) {
                this.computedLocalChceked = newVal;
            },
            computedLocalChceked(newVal, oldVal) {
                this.$emit('input', this.computedLocalChceked);
            }
        },
        computed: {
            computedLocalChecked: {
                // This would mainly be for checkboxes, but we use it here anyways
                get() {
                    return this.$parent.is_RadioGroup ? this.$parent.localChecked : this.localChecked;
                },
                set(val) {
                    if (this.$parent.is_RadioGroup) {
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
                return (typeof this.state === 'boolean' ? this.state : this.$parent.state) || null;
            },
            get_StateClass() {
                // This is a tri-state prop (true, false, null)
                return typeof this.get_State === 'boolean' ? (this.get_State ? 'is-valid' : 'is-invalid') : '';
            },
            is_Stacked() {
                return Boolean(this.$parent.stacked);
            },
            is_Inline() {
                return !this.is_Stacked;
            },
            is_ButtonMode() {
                return Boolean(this.$parent.buttons || this.button);
            },
            get_ButtonVariant() {
                // this.buttonVariant only applies to radios & checkboxes
                return this.buttonVariant || this.$parent.buttonVariant || 'secondary';
            },
            get_Name() {
                return (this.$parent.is_RadioCheckGroup ? this.$parent.name : this.name) || null;
            },
            isChecked() {
                return looseEqual(this.value, this.computedLocalChecked);
            },
            labelClasses() {
                if (this.is_ButtonMode) {
                    return [
                        'btn',
                        `btn-${this.getButtonVariant}`,
                        Boolean(this.get_Size) ? `btn-${this.get_Size}` : '',
                        // Fix stacking issue (remove space between buttons, specifically the last one)
                        // This might be fixed in BS V4.beta.2
                        this.is_Stacked ? 'mb-0' : '',
                        // 'disabled' class makes "button" look disabled
                        this.is_Disabled ? 'disabled' : '',
                        // 'active' class makes "button" look pressed
                        this.isChecked ? 'active' : '',
                        // Focus class makes button look focused
                        this.hasFocus ? 'focus' : ''
                    ];
                }
                // Not button mode
                return [
                    Boolean(this.get_Size) ? `form-control-${this.get_Size}` : '',
                    this.is_Custom ? 'custom-control' : 'form-check-label',
                    this.is_Custom ? 'custom-radio' : '',
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
            }
        },
        methods: {
            handleChange(target: { checked }) {
                // Change is only emitted on user interaction
                this.$emit('change', checked ? this.value : null);
            },
            handleFocus(evt) {
                // When in buttons mode, we need to add 'focus' class to label when radio focused
                if (this.is_ButtonMode && evt.target) {
                    if (evt.type ==='focus') {
                        this.hasFocus = true;
                    } else if (evt.type ==='blur') {
                        this.hasFocus = false;
                    }
                }
            }
        }
    };
</script>
