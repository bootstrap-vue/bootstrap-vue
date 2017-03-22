<template>
    <a :is="componentType" class="dropdown-item" :to="to" :href="hrefString"  @click="click">
        <slot></slot>
    </a>
</template>

<script>
    import Link from './link.vue';

    export default {
        extends: Link
    };
</script>
