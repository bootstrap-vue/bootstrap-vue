<template>
    <div v-if="is_Plain && !is_ButtonMode" :class="['form-check', is_Stacked ?'':'form-check-inline']">
        <label class="form-check-label">
            <input type="checkbox"
                   :id="safeId()"
                   v-model="computedLocalChecked"
                   class="form-check-input"
                   :name="get_Name"
                   :value="value"
                   :true-value="value"
                   :false-value="uncheckedValue"
                   :disabled="is_Disabled"
                   :required="is_Required"
                   ref="check"
                   autocomplete="off"
                   :aria-required="is_Required ? 'true' : null"
                   @change="handleChange">
            <slot></slot>
        </label>
    </div>
    <label v-else :class="is_ButtonMode ? buttonClasses : labelClasses">
        <input type="checkbox"
               :id="safeId()"
               v-model="computedLocalChecked"
               :class="is_ButtonMode ? '' : 'custom-control-input'"
               :name="get_Name"
               :value="value"
               :true-value="value"
               :false-value="uncheckedValue"
               :disabled="is_Disabled"
               :required="is_Required"
               ref="check"
               autocomplete="off"
               :aria-required="is_Required ? 'true' : null"
               @focus="handleFocus"
               @blur="handleFocus"
               @change="handleChange">
        <span v-if="!is_ButtonMode" class="custom-control-indicator" aria-hidden="true"></span>
        <span :class="is_ButtonMode ? '' : 'custom-control-description'">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import { idMixin, formRadioCheckMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../mixins';
    import { isArray } from '../utils/array';
    import { looseEqual } from '../utils';

    export default {
        mixins: [idMixin, formRadioCheckMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin],
        props: {
            value: {
                default: true
            },
            uncheckedValue: {
                // Not applicable in multi-check mode
                default: false
            },
            indeterminate: {
                // Not applicable in multi-check mode
                type: Boolean,
                default: false,
            }
        },
        computed: {
            labelClasses() {
                return [
                    'custom-control',
                    'custom-checkbox',
                    Boolean(this.get_Size) ? `form-control-${this.get_Size}` : '',
                    this.get_StateClass
                ];
            },
            is_Checked() {
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
            computedLocalChecked(newVal, oldVal) {
                if (looseEqual(newVal, oldVal)) {
                    return;
                }
                this.$emit('input', newVal);
                this.$emit('update:indeterminate', this.$refs.check.indeterminate);
            },
            checked(newVal, oldVal) {
                if (this.is_Child || looseEqual(newVal, oldVal)) {
                    return;
                }
                this.computedLocalChecked = newVal;
            },
            indeterminate(newVal, oldVal) {
                this.setIndeterminate(newVal);
            }
        },
        methods: {
            handleChange({ target: { checked } }) {
                // Change event is only fired via user interaction
                // And we only emit the value of this checkbox
                if (this.is_Child || isArray(this.computedLocalChecked)) {
                    this.$emit('change', checked ? this.value : null);
                    if (this.is_Child) {
                        // If we are a child of form-checkbbox-group, emit change on parent
                        this.$parent.$emit('change', this.computedLocalChecked);
                    }
                } else {
                    // Single radio mode supports unchecked value
                    this.$emit('change', checked ? this.value : this.uncheckedValue)
                }
                this.$emit('update:indeterminate', this.$refs.check.indeterminate);
            },
            setIndeterminate(state) {
                // Indeterminate only supported in single checkbox mode
                if (this.is_Child || isArray(this.computedLocalChecked)) {
                    return;
                }
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
