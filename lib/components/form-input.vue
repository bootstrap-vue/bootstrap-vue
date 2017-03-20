<template>
    <input
            v-if="!textarea"
            :type="type"
            :class="['form-control',inputState,inputSize]"
            :name="name"
            :id="$parent.for_id"
            :placeholder="placeholder"
            :value="value"
            @input="onInput($event.target.value)"
            @change="onChange($event.target.value)"
            @keyup="onKeyUp($event)"
            ref="input"
    />
    <textarea
            v-else
            :type="type"
            :class="['form-control',inputState,inputSize]"
            :name="name"
            :id="$parent.for_id"
            :placeholder="placeholder"
            :value="value"
            :rows="rows"
            @input="onInput($event.target.value)"
            @change="onChange($event.target.value)"
            @keyup="onKeyUp($event)"
            ref="input"
    ></textarea>
</template>

<script>
export default {
    computed: {
        inputState() {
            const state = this.state || this.$parent.state;
            return state ? `form-control-${state}` : '';
        },
        inputSize() {
            return this.size ? `form-control-${this.size}` : '';
        }
    },
    methods: {
        format(value) {
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
            this.$emit('change', value);
        },
        onKeyUp(e) {
            this.$emit('keyup', e);
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

        state: {
            type: String,
            default: null
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
