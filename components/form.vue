<template>
    <form :class="classObject">
        <slot></slot>
    </form>
</template>

<script>
export default {
    computed: {
        classObject() {
            return [
                this.inline ? 'form-inline' : ''
            ];
        }
    },
    props: {
        inline: {
            type: Boolean,
            default: false
        }
    }
};

</script>
