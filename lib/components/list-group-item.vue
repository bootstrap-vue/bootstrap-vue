<template>
    <component :is="myTag"
               :class="classObject"
               ref="item"
               v-bind="conditionalLinkProps">
        <slot></slot>
    </component>
</template>

<script>
import bLink from './link.vue';
import { props as originalLinkProps, computed, omitLinkProps } from '../mixins/link';
import arrayIncludes from '../utils/arrayIncludes';
// copy link props, but exclude defaults for 'href', 'to', & 'tag'
// to ensure proper component tag computation
const linkProps = Object.assign(omitLinkProps('href', 'to'), {
    href: { type: originalLinkProps.href.type },
    to: { type: originalLinkProps.to.type },
    tag: { type: originalLinkProps.tag.type }
});

const actionTags = ['a', 'router-link', 'button', 'b-link'];

export default {
    components: { bLink },

    computed: {
        linkProps: computed.linkProps,

        classObject() {
            return [
                'list-group-item',
                this.listState,
                this.active ? 'active' : null,
                this.disabled ? 'disabled' : null,
                this.isAction ? 'list-group-item-action' : null
            ];
        },

        isAction() {
            if (this.action === false) {
                return false;
            }

            // this previously could return a string,
            // coercing to a boolean for more consistent expected value
            return !!(this.action || this.to || this.href || arrayIncludes(actionTags, this.tag));
        },

        listState() {
            return this.variant ? `list-group-item-${this.variant}` : null;
        },

        myTag() {
            if (this.tag) {
                return this.tag;
            }

            return (this.to || this.href) ? 'b-link' : 'div';
        },

        conditionalLinkProps() {
            return this.myTag !== 'b-link' ? {} : this.linkProps;
        }
    },

    // merge the link props with list-group-item props
    props: Object.assign(linkProps, {
        action: {
            type: Boolean,
            default: null
        },

        variant: {
            type: String,
            default: null
        },
    })
};
</script>
