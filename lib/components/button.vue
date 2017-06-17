<template>
    <button v-bind="boundProps"
            :is="componentType"
            :class="classList"
            :disabled="disabled"
            @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, props as linkProps } from '../mixins/link';
const linkPropsNoDefault = {
    href: { type: linkProps.href.type },
    to: { type: linkProps.to.type }
};
const noConflictLinkProps = {
    ...omitLinkProps('disabled', 'href', 'to'),
    ...linkPropsNoDefault
};

export default {
    components: { bLink },

    computed: {
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
            return this.componentType === 'button' ? {} : Object.keys(noConflictLinkProps).reduce((memo, prop) => {
                memo[prop] = this[prop];

                return memo;
            }, {});
        },
    },
    props: {
        ...noConflictLinkProps,

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
