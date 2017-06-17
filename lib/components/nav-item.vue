<template>
    <li class="nav-item">
        <b-link class="nav-link"
                v-bind="bLinkProps"
                @click="$emit('click', $event)">
            <slot></slot>
        </b-link>
    </li>
</template>

<script>
import linkMixin from '../mixins/link';
import linkBase from '../mixins/link-base-props'
import bLink from './link.vue';

export default {
    components: { bLink },
    mixins: [linkMixin, linkBase]
};
</script>
