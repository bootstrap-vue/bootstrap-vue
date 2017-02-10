<template>
    <input
            v-if="!textarea"
            :type="type"
            :class="['form-control',stateIconType,inputSize]"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :value="value"
            @input="onInput($event.target.value)"
            @change="onChange($event.target.value)"
            ref="input"
    />
    <textarea
            v-else
            :type="type"
            :class="['form-control',stateIconType,inputSize]"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :value="value"
            :rows="rows"
            @input="onInput($event.target.value)"
            ref="input"
    ></textarea>
</template>

<script>
    import {uniqueId} from '../utils/helpers';

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
            format(value){
                if (this.formatter) {
                    const formattedValue = this.formatter(value);
                    if (formattedValue !== value) {
                        value = formattedValue;
                        this.$refs.input.value = formattedValue;
                    }
                }
                return value;
            },
            onInput(value) {
                if (!this.lazyFormatter) {
                    value = this.format(value);
                }
                this.$emit('input', value);
            },
            onChange(value) {
                value = this.format(value);
                this.$emit('input', value);
            }
        },
        props: {
            value: {
                type: [String, Number],
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
                type: Function
            },
            lazyFormatter: {
                type: Boolean,
                default: false
            }
        }
    };

</script>
