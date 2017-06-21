<template>
    <li class="nav-item">
        <b-link class="nav-link"
                v-bind="linkProps"
                @click="$emit('click', $event)">
            <slot></slot>
        </b-link>
    </li>
</template>

<script>
import { props as linkProps, computed } from '../mixins/link';
import bLink from './link.vue';

export default {
    components: { bLink },
    props: linkProps,
    computed: {
        linkProps: computed.linkProps
    }
};
</script>
