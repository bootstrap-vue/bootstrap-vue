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
import linkMixin from '../mixins/link';
import bLink from './link.vue';

export default {
    components: { bLink },
    mixins: [linkMixin]
};
</script>
