<template>
     <component :is="componentTag" 
             class="navbar-brand"
             v-bind="conditionalLinkProps"
             @click="$emit('click', $event)">
        <slot></slot>
    </component>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, props as originalLinkProps, computed } from '../mixins/link';
import { assign } from '../utils/object';

// Grab a fresh object of link props (omitLinkProps does this)
// less the 'href', 'to', and 'tag' props
// that we will reconstruct without any defaults
// so our component functions properly
const linkProps = assign(omitLinkProps('href', 'to', 'tag'), {
    href: { type: originalLinkProps.href.type },
    to: { type: originalLinkProps.to.type },
    tag: { type: String }
});

export default {
    components: { bLink },
    props: linkProps,
    computed: {
        linkProps: computed.linkProps,
        isLink() {
            return this.to || this.href;
        },
        componentTag(){
            return this.isLink ? `b-link` : (this.tag || 'div');
        },
        conditionalLinkProps() {
            return this.isLink ? this.linkProps : {};
        }
    }
};
</script>
