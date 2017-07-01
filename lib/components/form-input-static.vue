<template>
    <p :id="id || null"
       :class="['form-control-static',inputClass]"
       v-html="staticValue"
    >
        <slot></slot>
    </p>
</template>

<script>
    import formMixin from '../mixins/form';

    export default {
        mixins: [formMixin],
        computed: {
            staticValue() {
                return this.formatter ? this.formatter(this.value) : this.value;
            }
        },
        props: {
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
