<template>
    <component :is="myTag"
               :class="classObject"
               ref="item"
               v-bind="computedLinkProps">
        <slot></slot>
    </component>
</template>

<script>
import bLink from './link.vue';
import { linkProps, computedLinkProps } from '../mixins/link'

const actionTags = ['a', 'router-link', 'button', 'b-link'];

export default {
    components: { bLink },

    computed: {
        computedLinkProps,

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
            return this.action || this.to || this.href || actionTags.indexOf(this.tag) !== -1;
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
    props: {
        ...linkProps,

        action: {
            type: Boolean,
            default: null
        },

        variant: {
            type: String,
            default: null
        },
    }
};
</script>
