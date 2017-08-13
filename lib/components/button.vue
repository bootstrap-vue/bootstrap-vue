<template>
    <button v-bind="conditionalLinkProps"
            :is="componentType"
            :class="classList"
            :data-toggle="dataToggle"
            :aria-pressed="ariaPressed"
            :type="btnType"
            :disabled="disabled"
            :tabindex="tabIndex"
            @focusin.native="handleFocus"
            @focusout.native="handleFocus"
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
            return this.block ? 'btn-block' : '';
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
        isToggle() {
            return this.pressed === true || this.pressed === false;
        },
        btnPressed() {
            return this.pressed ? 'active' : '';
        },
        ariaPressed() {
            if (this.isToggle) {
                // If a toggle button, Add aria-pressed state (must be string, not Boolean)
                return this.pressed ? 'true' : 'false';
            }
            // Else remove aria-pressed attribute
            return null;
        },
        dataToggle() {
            // Toggle button needs the data-toggle="button" attribute for propper styling
            return this.isToggle ? 'button' : null;
        },
        tabIndex() {
            // Disabled buttons automatically take themselves out of the tab order.
            // Links do not, so we emulate this behaviour by setting tabindex to -1
            return (this.disabled && this.componentType !== 'button') ? '-1' : null;
        },
        conditionalLinkProps() {
            // Add conditional props only intended for 'b-link'
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
            // tri-state syncable prop: true, false or null
            type: Boolean,
            default: null
        }
    }),
    methods: {
        onClick(evt) {
            if (this.disabled) {
                evt.stopPropagation();
                evt.preventDefault();
            } else {
                this.$emit('click', evt);
                if (this.isToggle) {
                    // Emit .sync notification to parent about pressed prop state changing
                    this.$emit('update:pressed', !this.pressed);
                }
            }
        },
        handleFocus(evt) {
            // When in toggle mode, we need to handle focus styling manualy via a class
            if (this.isToggle) {
                const classList = evt.target.classList;
                if (evt.type === 'focusin') {
                    classList.add('focus');
                } else if (evt.type === 'focusout') {
                    classList.remove('focus');
                }
            }
        }
    }
};
</script>
