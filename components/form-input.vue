<template>
    <div :class="['form-group','row',inputState]">
        <label :for="id" v-if="label" :class="['col-form-label','col-xs-2',labelClass]">{{label}}</label>
        <div class="col-xs-10">
            <input
                    :type="type"
                    :class="['form-control',inputClass,stateIconType,inputSize]"
                    :id="id"
                    ref="input"
                    :placeholder="placeholder"
                    :value="localValue"
                    @input="onInput($event.target.value)"
            >
            <small class="text-muted" v-if="description" v-html="description"></small>
        </div>
    </div>
</template>

<script>
    import {uniqueId} from '../utils/helpers.js'

    export default {
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            },
            stateIconType() {
                return this.stateIcon ? `form-control-${this.state}` : '';
            },
            inputSize() {
                return this.size ? `form-control-${this.size}` : '';
            },
            value: {
                get: function () {
                    return this.localValue;
                },
                set: function (val) {
                    this.localValue = val;
                }
            }
        },
        methods: {
            onInput: function (value) {
                if (this.formatter) {
                    let formattedValue = this.formatter(value);
                    if (formattedValue != value) {
                        value = formattedValue;
                        this.$refs.input.value = formattedValue;
                    }
                }
                this.localValue = value;
                this.$emit('input', value);
            }
        },
        data() {
            return {
                localValue: this.value,
            }
        },
        props: {
            type: {
                type: String,
                default: 'text',
            },
            id: {
                type: String,
                default: uniqueId
            },
            label: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: null
            },
            description: {
                type: String,
                default: null
            },
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            stateIcon: {
                type: Boolean,
                default: true
            },
            inputClass: {
                type: String,
            },
            labelClass: {
                type: String,
            },
            formatter: {
                type: Function,
            }
        },
    }


</script>
