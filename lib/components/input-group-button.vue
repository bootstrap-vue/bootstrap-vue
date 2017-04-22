<template>
    <span class="input-group-button">
        <b-button :disabled="disabled" :variant="variant" href="">
            <slot></slot>
        </b-button>
    </span>
</template>

<script>
    import bButton from './button.vue';

    export default {
        components: {
            bButton
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            variant: {
                type: String,
                default: null
            }
        }
    };
</script>
