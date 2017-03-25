<template>
    <div :class="[inputClass,this.stacked?'custom-controls-stacked':'']">
        <label :class="[checkboxClass,custom?'custom-radio':null]" v-for="option in formOptions">
            <input
                    v-model="localValue"
                    :class="custom?'custom-control-input':null"
                    type="radio"
                    :value="option.value"
                    :name="option.name"
                    :id="option.id"
                    :disabled="option.disabled"
                    ref="inputs"
            >

            <span class="custom-control-indicator" v-if="custom"></span>

            <span :class="custom?'custom-control-description':null" v-html="option.text"></span>

        </label>
    </div>
</template>

<script>
    import formOptionsMixin from '../mixins/form-options';
    import formMixin from '../mixins/form';
    import formCheckBoxMixin from '../mixins/form-checkbox';

    export default {
        mixins: [formMixin, formCheckBoxMixin, formOptionsMixin],
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
