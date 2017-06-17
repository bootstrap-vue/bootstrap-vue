<template>
    <b-link class="dropdown-item"
            role="menuitem"
            v-bind="linkProps"
            @click="$emit('click', $event)">
        <slot></slot>
    </b-link>
</template>

<script>
import linkMixin from '../mixins/link';
import bLink from './link.vue';

export default {
    components: { bLink },
    mixins: [linkMixin],
};
</script>
