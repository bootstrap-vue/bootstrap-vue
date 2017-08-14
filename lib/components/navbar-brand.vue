<template>
    <component :is="componentTag"
               class="navbar-brand"
               v-bind="conditionalLinkProps"
               @click="$emit('click', $event)">
        <slot></slot>
    </component>
</template>

<script>
import bLink, { computed, propsFactory } from './link';
import { assign } from '../utils/object';

let linkProps = propsFactory()
delete linkProps.href.default;
delete linkProps.to.default;

export default {
    components: { bLink },
    props: assign(linkProps, {
        tag: {
            type: String,
            default: 'div'
        },
    }),
    computed: {
        linkProps: computed.linkProps,
        isLink() {
            return this.to || this.href;
        },
        componentTag() {
            return this.isLink ? `b-link` : this.tag;
        },
        conditionalLinkProps() {
            return this.isLink ? this.linkProps : {};
        }
    }
};
</script>
