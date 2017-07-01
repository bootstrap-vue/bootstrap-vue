<template>
    <div :id="id || null"
         :class="[inputClass, inputState, this.stacked?'custom-controls-stacked':'']"
         role="radiogroup"
    >
        <label :class="[checkboxClass,custom?'custom-radio':null]" v-for="option in formOptions">
            <input :id="option.id || null"
                   :class="custom?'custom-control-input':null"
                   ref="inputs"
                   type="radio"
                   v-model="localValue"
                   :value="option.value"
                   :name="option.name"
                   :disabled="option.disabled"
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
            inputState() {
                return this.state ? `has-${this.state}` : '';
            }
        },
        props: {
            value: {},
            options: {
                type: [Array, Object],
                default: null,
                required: true
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
