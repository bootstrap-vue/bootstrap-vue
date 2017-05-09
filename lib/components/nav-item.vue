<template>
    <li class="nav-item">
        <b-link class="nav-link"
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
        >
            <slot></slot>
        </b-link>
    </li>
</template>

<script>
    import bLink from './link.vue';
    import linkMixin from '../mixins/link';

    export default {
        components: {bLink},
        mixins: [linkMixin]
    };
</script>
