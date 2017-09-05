<template>
    <option :value="value" :disabled="diabled"><slot></slot></option>
</template>

<script>
    export default {
        props: {
            value: {
                // We use a component here to be able to bind objects as value
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
