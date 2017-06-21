<template>
    <button class="dropdown-item"
            type="button"
            role="menuitem"
            :disabled="disabled"
            @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick(e) {
            this.$root.$emit("clicked::link", this);
            this.$emit("click", e);
        },
    }
};
</script>
