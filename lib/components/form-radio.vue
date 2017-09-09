<template>
    <div v-if="is_Plain" class="form-check">
        <!-- Plain Radio -->
        <label :class="['form-check-label', stacked ? '' : 'form-check-inline']">
            <input v-model="computedLocalChecked"
                   :id="safeId()"
                   class="form-check-label"
                   :value="value"
                   :name="get_Name"
                   :required="get_Name && is_Required"
                   :disabled="is_Disabled"
                   ref="radio"
                   type="radio"
                   autocomplete="off"
                   @focus="handleFocus"
                   @blur="handleFocus"
                   @change="handleChange">
            <slot></slot>
        </label>
    </div>
    <label v-else :class="is_ButtonMode ? buttonClasses : labelClasses">
        <!-- Custom or Button Radio -->
        <input v-model="computedLocalChecked"
               :id="safeId()"
               :class="is_ButtonMode ? '' : 'custom-control-input'"
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
        <span v-if="!is_ButtonMode" class="custom-control-indicator" aria-hidden="true"></span>
        <span :class="!is_ButtonMode ? 'custom-control-description' : null">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { idMixin, formMixin, formStateMixin } from '../mixins';
    import { looseEqual } from '../utils';

    export default {
        mixins: [idMixin, formMixin, formStateMixin],
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
                get() {
                    if (this.is_Child) {
                        return this.$parent.localChecked;
                    } else {
                        return this.localChecked;
                    }
                },
                set(val) {
                    if (this.is_Child) {
                        this.$parent.localChecked = val;
                    } else {
                        this.localChecked = val;
                    }
                }
            },
            is_Child() {
                return Boolean(this.$parent && this.$parent.is_RadioCheckGroup);
            },
            is_Disabled() {
                // Child can be disabled while parent isn't
                return Boolean(this.is_Child ? this.$parent.disabled : this.disabled);
            },
            is_Required() {
                return Boolean(this.is_Child ? this.$parent.required : this.required);
            },
            is_Plain() {
                return Booloean(this.is_Child ? this.$parent.plain : this.plain);
            },
            is_Custom() {
                return !this.is_Plain;
            },
            get_Size() {
                return this.is_Child ? this.$parent.size : this.size;
            },
            get_State() {
                // This is a tri-state prop (true, false, null)
                if (typeof this.state === 'boolean') {
                    return this.state;
                } else if (this.state === 'valid') {
                    return true;
                } else if (this.state === 'invalid') {
                    return false;
                } else if (this.is_Childp && typeof this.$parent.get_State === 'boolean') {
                    return this.$parent.get_State;
                }
                return null;
            },
            get_StateClass() {
                // This is a tri-state prop (true, false, null)
                return typeof this.get_State === 'boolean' ? (this.get_State ? 'is-valid' : 'is-invalid') : '';
            },
            is_Stacked() {
                return Boolean(this.is_Child && this.$parent.stacked);
            },
            is_Inline() {
                return !this.is_Stacked;
            },
            is_ButtonMode() {
                return Boolean(this.is_Child && this.$parent.buttons);
            },
            get_ButtonVariant() {
                // Local variant trumps parent variant
                return this.buttonVariant || (this.is_Child ? this.$parent.buttonVariant : null) || 'secondary';
            },
            get_Name() {
                return (this.is_Child ? this.$parent.name : this.name) || null;
            },
            is_Checked() {
                // Specific to Radio
                return looseEqual(this.value, this.computedLocalChecked);
            },
            buttonClasses() {
                // Same for radio & check
                return [
                    'btn',
                    `btn-${this.getButtonVariant}`,
                    Boolean(this.get_Size) ? `btn-${this.get_Size}` : '',
                    // 'disabled' class makes "button" look disabled
                    this.is_Disabled ? 'disabled' : '',
                    // 'active' class makes "button" look pressed
                    this.is_Checked ? 'active' : '',
                    // Focus class makes button look focused
                    this.hasFocus ? 'focus' : ''
                ];
            },
            labelClasses() {
                // Specific to radio
                return [
                    Boolean(this.get_Size) ? `form-control-${this.get_Size}` : '',
                    'custom-control',
                    'custom-radio',
                    this.get_StateClass
                ];
            }
        },
        methods: {
            handleChange({ target: { checked } }) {
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
