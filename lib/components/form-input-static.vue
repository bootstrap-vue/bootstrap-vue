<template>
    <p :id="id || null"
       :class="inputClass"
       v-html="staticValue"
    >
        <slot></slot>
    </p>
</template>

<script>
    export default {
        computed: {
            staticValue() {
                return this.formatter ? this.formatter(this.value) : this.value;
            },
            inputClass() {
                return [
                    'form-control-static',
                    this.size ? `form-control-${this.size}` : null,
                    this.state ? `form-control-${this.state}` : null
                ];
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            value: {
                default: null
            },
            formatter: {
                type: Function
            },
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            }
        }
    };

</script>
