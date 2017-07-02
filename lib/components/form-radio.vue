<template>
    <div :id="id || null"
         :class="inputClass"
         role="radiogroup"
         :aria-required="required ? 'true' : null"
         :aria-invalid="ariaInvalid"
    >
        <label :class="[checkboxClass, custom?'custom-radio':null]"
               v-for="option in formOptions"
        >
            <input :id="option.id || null"
                   :class="custom?'custom-control-input':null"
                   ref="inputs"
                   type="radio"
                   autocomplete="off"
                   v-model="localValue"
                   :value="option.value"
                   :name="name"
                   :required="name && required"
                   :disabled="option.disabled || disabled"
                   @change="$emit('change', returnObject ? option : option.value)"
            >
            <span v-if="custom" class="custom-control-indicator" aria-hidden="true"></span>
            <span :class="custom?'custom-control-description':null" v-html="option.text"></span>
        </label>
    </div>
</template>

<script>
    import formOptionsMixin from '../mixins/form-options';
    import formMixin from '../mixins/form';
    import formCustomMixin from '../mixins/form-custom';
    import formCheckBoxMixin from '../mixins/form-checkbox';

    export default {
        mixins: [formMixin, formCustomMixin, formCheckBoxMixin, formOptionsMixin],
        data() {
            return {
                localValue: this.value
            };
        },
        computed: {
            inputClass() {
                return [
                    this.size ? `form-control-${this.size}` : null,
                    this.state ? `has-${this.state}` : '',
                    this.stacked ? 'custom-controls-stacked' : ''
                 ];
            },
            ariaInvalid() {
                if (this.invalid === true || this.invalid === 'true') {
                    return 'true';
                }
                return null;
            }
        },
        props: {
            value: {},
            options: {
                type: [Array, Object],
                default: null,
                required: true
            },
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            invalid: {
                type: [Boolean, String],
                default: false
            },
            stacked: {
                type: Boolean,
                default: false
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
