<template>
    <button v-bind="boundProps"
            :class="classList"
            :is="componentType"
            :disabled="disabled"
            @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, computedLinkProps } from '../mixins/link';

export default {
    components: { bLink },

    computed: {
        computedLinkProps,

        classList() {
            return [
                'btn',
                this.btnVariant,
                this.btnSize,
                this.btnBlock,
                this.btnDisabled
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
        },

        boundProps() {
            return this.componentType === 'b-link' ? this.computedLinkProps : {}
        },
    },
    props: {
        ...omitLinkProps('disabled'),

        block: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
    },
    methods: {
        onClick(e) {
            if (this.disabled) {
                e.stopPropagation();
                e.preventDefault();
            } else {
                this.$emit('click', e);
            }
        }
    }
};
</script>
