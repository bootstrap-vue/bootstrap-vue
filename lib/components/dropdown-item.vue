<template>
    <a :is="itemType" class="dropdown-item" :to="to" :href="hrefString"  @click="click">
        <slot></slot>
    </a>
</template>

<script>
    import Link from './link.vue';

    export default {
        extends: Link,
        computed: {
            itemType() {
                return (this.href || this.to) ? this.componentType : 'button';
            }
        }
    };
</script>
