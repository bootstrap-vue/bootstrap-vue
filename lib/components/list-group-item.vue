<template>
    <component :is="myTag"
               :class="classObject"
               ref="item"
               v-bind="bLinkProps">
        <slot></slot>
    </component>
</template>

<script>
import bLink from './link.vue';
import linkBase from '../mixins/link-base-props'

const actionTags = ['a', 'router-link', 'button', 'b-link'];

export default {
    mixins: [linkBase],

    components: { bLink },

    computed: {
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
