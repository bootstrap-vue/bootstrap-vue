<template>
    <b-form-fieldset :state="state" :layout="layout" :label="label" :description="description" :feedback="feedback" :id="id">
        <input
                v-if="!textarea"
                :type="type"
                :class="['form-control',stateIconType,inputSize]"
                :id="id"
                :name="name"
                :placeholder="placeholder"
                :value="value"
                @input="onInput($event.target.value)"
                ref="input"
        />
        <textarea
                v-if="textarea"
                :type="type"
                :class="['form-control',stateIconType,inputSize]"
                :id="id"
                :name="name"
                :placeholder="placeholder"
                :value="value"
                @input="onInput($event.target.value)"
                ref="input"
        ></textarea>
    </b-form-fieldset>
</template>

<script>
    import {uniqueId} from '../utils/helpers.js'

    export default {
        computed: {
            stateIconType() {
                return this.stateIcon ? `form-control-${this.state}` : '';
            },
            inputSize() {
                return this.size ? `form-control-${this.size}` : '';
            }
        },
        methods: {
            onInput(value) {
                if (this.formatter) {
                    let formattedValue = this.formatter(value);
                    if (formattedValue != value) {
                        value = formattedValue;
                        this.$refs.input.value = formattedValue;
                    }
                }
                this.$emit('input', value);
            }
        },
        props: {
            value: {
                type: String,
                default: null
            },
            type: {
                type: String,
                default: 'text'
            },
            id: {
                type: String,
                default: uniqueId
            },

            name: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: null
            },

            size: {
                type: String,
                default: null
            },

            rows: {
                type: Number,
                default: null
            },

            textarea: {
                type: Boolean,
                default: false
            },

            stateIcon: {
                type: Boolean,
                default: true
            },
            formatter: {
                type: Function,
            },


            // FIELD SET
            layout: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            description: {
                type: String,
                default: null
            },
            feedback: {
                type: String,
                default: null
            },
            // FIELD SET
        },
    }


</script>
