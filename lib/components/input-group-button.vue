<template>
    <span class="input-group-button">
        <slot>
          <b-button :disabled="disabled" :variant="variant" href="" v-html="text"></b-button>
        </slot>
    </span>
</template>

<script>
    import bButton from './button.vue';

    export default {
        components: {
            bButton
        },
        props: {
            text: {
                type: String,
                default: ''
            },
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
