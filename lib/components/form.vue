<template>
    <form :class="formClasses"
          :novalidation="!browserValidation"
          @submit="$emit('submit',$event)">
        <slot></slot>
    </form>
</template>

<script>
export default {
    computed: {
        formClasses() {
            return [
                this.inline ? 'form-inline' : '',
                this.validated ? 'was-validated' : ''
            ];
        }
    },
    props: {
        inline: {
            type: Boolean,
            default: false
        },
        browserValidation: {
            type: Boolean,
            default: false
        },
        validated: {
            type: Boolean,
            default: false
        }
    }
};

</script>
