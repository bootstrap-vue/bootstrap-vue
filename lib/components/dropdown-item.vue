<template>
    <b-link class="dropdown-item"
            role="menuitem"
            v-bind="linkProps"
            @click="$emit('click', $event)">
        <slot></slot>
    </b-link>
</template>

<script>
import { props, computed } from '../mixins/link';
import bLink from './link.vue';

export default {
    components: { bLink },
    props,
    computed: {
        linkProps: computed.linkProps
    }
};
</script>
