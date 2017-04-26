<template>
    <a :is="itemType"
       :class="['dropdown-item',{ disabled }]"
       :to="to"
       :href="hrefString"
       :disabled="disabled"
       tabindex="-1"
       role="menuitem"
       @click="click"
       @click.native="click"
    >
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
