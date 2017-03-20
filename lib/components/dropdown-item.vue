<template>
    <a :is="componentType" class="dropdown-item" :to="toObject" :href="hrefString">
        <slot></slot>
    </a>
</template>

<script>
    import Link from './link.vue';

    export default {
        extends: Link
    };
</script>
