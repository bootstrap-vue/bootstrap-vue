<template>
    <div v-if="is_Plain && !is_ButtonMode" :class="['form-check', is_Stacked?'':'form-check-inline']">
        <!-- Plain Radio -->
        <label class="form-check-label">
            <input v-model="computedLocalChecked"
                   :id="safeId()"
                   class="form-check-input"
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
    import { idMixin, formRadioCheckMixin, formMixin, formStateMixin } from '../mixins';
    import { looseEqual } from '../utils';

    export default {
        mixins: [idMixin, formRadioCheckMixin, formMixin, formStateMixin],
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
            is_Checked() {
                return looseEqual(this.value, this.computedLocalChecked);
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
                // If this is a child of form-radio-group, we emit a change event on it as well
                if (this.is_Child) {
                    this.$parent.$emit('change', this.computedLocalChecked);
                }
            }
        }
    };
</script>
