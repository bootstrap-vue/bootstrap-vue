<template>
    <form :class="formClasses"
          :novalidate="novalidate"
          @submit="onSubmit>
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
            novalidate: {
                type: Boolean,
                default: false
            },
            validated: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onSubmit(e) {
                // TODO: Add native validation helper routine here
                this.$emit('submit', e);
            }
        }
    };
</script>
