<template>
    <button v-bind="conditionalLinkProps"
            :is="componentType"
            :class="classList"
            :aria-pressed="ariaPressed"
            :type="btnType"
            :disabled="disabled"
            @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, props as originalLinkProps, computed } from '../mixins/link';
import { assign } from '../utils/object';

// Grab a fresh object of link props (omitLinkProps does this)
// less the 'href' and 'to' props
// that we will reconstruct without any defaults
// so our computed 'componentType' functions properly
const linkProps = assign(omitLinkProps('href', 'to'), {
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
                this.btnDisabled,
                this.btnPressed
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
        btnPressed() {
            return this.pressed ? 'active' : '';
        },
        ariaPressed() {
            if (this.pressed === true) {
                return 'true';
            } else if (this.pressed === false) {
                return 'false';
            }
            // Remove aria-pressed attribute
            return null;
        },
        conditionalLinkProps() {
            return this.componentType === 'button' ? {} : this.linkProps;
        }
    },
    // merge our prepared link props with button props
    props: assign(linkProps, {
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
        },
        pressed: {
            // tri-state prop: true, false or null
            type: Boolean,
            default: null
        }
    }),
    methods: {
        onClick(e) {
            if (this.disabled) {
                e.stopPropagation();
                e.preventDefault();
            } else {
                this.$emit('click', e);
                if (this.pressed === true || this.pressed === false) {
                    // Emit .sync notification about pressed prop state changing
                    this.$emit('update:pressed', !this.pressed);
                }
            }
        }
    }
};
</script>
