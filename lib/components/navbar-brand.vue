<template>
     <b-link v-if="isLink"
             class="navbar-brand"
             v-bind="linkProps"
             @click="$emit('click', $event)">
        <slot></slot>
    </b-link>
    <div v-else :is="tag" class="navbar-brand">
        <slot></slot>
    </div>
</template>

<script>
import bLink from './link.vue';
import { omitLinkProps, props as originalLinkProps, computed } from '../mixins/link';
import { assign } from '../utils/object';

// Grab a fresh object of link props (omitLinkProps does this)
// less the 'href', 'to', and 'tag' props
// that we will reconstruct without any defaults
// so our component functions properly
const linkProps = assign(omitLinkProps('href', 'to'), {
    href: { type: originalLinkProps.href.type },
    to: { type: originalLinkProps.to.type },
    tag: { type: String, default: 'div' }
});

export default {
    components: { bLink },
    props: linkProps,
    computed: {
        linkProps: computed.linkProps,
        isLink() {
          return this.to || this.href;
        }
    }
};
</script>
