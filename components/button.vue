<template>
    <button :class="classObject" @click.stop.prevent="click">
        <slot></slot>
    </button>
</template>


<script>
    export default {
        computed: {
            classObject(){
                return [
                    'btn',
                    this.btnVariant,
                    this.btnSize,
                    this.btnBlock,
                    this.btnDisabled,
                    this.inactive ? 'btn-inactive' : ''
                ];
            },
            btnBlock() {
                return this.block ? `btn-block` : '';
            },
            btnVariant() {
                return !this.variant ? `btn-secondary` : `btn-${this.variant}`
            },
            btnSize() {
                return !this.size ? '' : `btn-${this.size}`
            },
            btnDisabled() {
                return this.disabled ? 'disabled' : ''
            }
        },
        props: {
            block: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            inactive: {
                type: Boolean,
                default: false
            },
            link: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'md'
            },
            variant: {
                type: String,
                default: 'secondary'
            },
        },
        methods: {
            click: function () {
                this.$emit('click', this.link);
            },
        },
    }
</script>
