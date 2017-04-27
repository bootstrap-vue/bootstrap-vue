<template>
    <p :id="_id"
       :class="['form-control-static',inputClass]"
       v-html="staticValue"
    ></p>
</template>

<script>
    import formMixin from '../mixins/form';
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [formMixin, generateId],
        computed: {
            staticValue() {
                return this.formatter ? this.formatter(value) : value;
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
