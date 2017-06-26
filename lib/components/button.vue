<template>
    <button v-bind="conditionalLinkProps"
            :is="componentType"
            :class="classList"
            :type="btnType"
            :disabled="disabled"
            @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, props as originalLinkProps, computed } from '../mixins/link';

// Grab a fresh object of link props (omitLinkProps does this)
// less the 'href' and 'to' props
// that we will reconstruct without any defaults
// so our computed 'componentType' functions properly
const linkProps = Object.assign(omitLinkProps('href', 'to'), {
    href: { type: originalLinkProps.href.type },
    to: { type: originalLinkProps.to.type }
});

export default {
    components: { bLink },
    computed: {
        linkProps: computed.linkProps,
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
        btnType() {
            return (this.href || this.to) ? null : this.type; 
        },
        conditionalLinkProps() {
            return this.componentType === 'button' ? {} : this.linkProps;
        }
    },
    // merge our prepared link props with button props
    props: Object.assign(linkProps, {
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
        type: {
            type: String,
            default: 'button'
        }
    }),
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
