<template>
    <component :is="myTag"
               :class="classObject"
               ref="item"
               v-bind="linkProps">
        <slot></slot>
    </component>
</template>

<script>
import bLink from './link.vue';
import { props as originalLinkProps, computed, omitLinkProps } from '../mixins/link'
// copy link props, but exclude defaults for 'href' & 'to'
// to ensure proper component tag computation
const linkProps = Object.assign(omitLinkProps('href', 'to'), {
    href: { type: originalLinkProps.href.type },
    to: { type: originalLinkProps.to.type }
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

            return this.action || this.to || this.href || actionTags.includes(this.tag);
        },
        listState() {
            return this.variant ? `list-group-item-${this.variant}` : null;
        },
        myTag() {
            if (this.tag) {
                return this.tag;
            }

            return (this.to || this.href) ? 'b-link' : 'div';
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
