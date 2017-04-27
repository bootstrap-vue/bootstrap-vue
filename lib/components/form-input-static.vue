<template>
    <p :id="_id"
       :class="['form-control-static',inputClass]"
       v-html="staticValue"
    >
        <slot></slot>
    </p>
</template>

<script>
    import formMixin from '../mixins/form';
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [formMixin, generateId],
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
            }
        }
    };

</script>
