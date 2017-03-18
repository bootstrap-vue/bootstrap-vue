<template>
    <button :class="classObject" :is="componentType" :to="to" :href="href" @click="onclick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        computed: {
            classObject() {
                return [
                    'btn',
                    this.btnVariant,
                    this.btnSize,
                    this.btnBlock,
                    this.btnDisabled,
                    this.inactive ? 'btn-inactive' : ''
                ];
            },
            componentType() {
                return (this.href || this.to) ? 'b-link' : 'button';
            },
            btnBlock() {
                return this.block ? `btn-block` : '';
            },
            btnVariant() {
                return this.variant ? `btn-${this.variant}` : `btn-secondary`;
            },
            btnSize() {
                return this.size ? `btn-${this.size}` : '';
            },
            btnDisabled() {
                return this.disabled ? 'disabled' : '';
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
                default: null
            },
            to: {
                type: [String, Object]
            },
            href: {
                type: String
            }
        },
        methods: {
            onclick() {
                this.$emit('click');
            }
        }
    };
</script>
