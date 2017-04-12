<template>
    <a :is="itemType" class="dropdown-item" :to="to" :href="hrefString"  @click="click">
        <slot></slot>
    </a>
</template>

<script>
    import bLink from './link.vue';

    export default {
        extends: bLink,
        computed: {
            itemType() {
                return (this.href || this.to) ? this.componentType : 'button';
            }
        }
    };
</script>
