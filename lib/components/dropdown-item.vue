<template>
    <b-link class="dropdown-item"
            role="menuitem"
            v-bind="bLinkProps"
            @click="$emit('click', $event)">
        <slot></slot>
    </b-link>
</template>

<script>
import linkMixin from '../mixins/link';
import { bLinkProps } from '../mixins/link-base-props';
import bLink from './link.vue';

export default {
    components: { bLink },
    mixins: [linkMixin],
    computed: {
        bLinkProps
    }
};
</script>
