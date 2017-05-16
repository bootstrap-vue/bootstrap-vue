<template>
    <b-link class="dropdown-item"
            :active="active"
            :disabled="disabled"
            :href="href"
            :to="to"
            :tag="tag"
            :exact="exact"
            :append="append"
            :replace="replace"
            :active-class="activeClass"
            :exact-active-class="exactActiveClass"
            :event="event"
            @click="$emit('click')"
    >
        <slot></slot>
    </b-link>
</template>

<script>
    import linkMixin from '../mixins/link';
    import bLink from './link.vue';

    export default {
        components: {bLink},
        mixins: [linkMixin]
    };
</script>
