<template>
    <fieldset :class="['form-group',this.stacked?'custom-controls-stacked':'',inputState]">
        <label :class="['custom-control','custom-radio']" v-for="option in formOptions">
            <input
                    v-model="localValue"
                    class="custom-control-input"
                    type="radio"
                    :id="option.id"
                    :value="option.value"
                    :disabled="option.disabled"
            >
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description" v-html="option.text"></span>
        </label>
    </fieldset>
</template>


<script>
    import formOptions from '../mixins/form-options';

    export default {
        mixins: [formOptions],
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
            state: {
                type: String,
                default: null
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
