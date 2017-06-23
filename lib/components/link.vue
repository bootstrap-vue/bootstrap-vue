<template>
    <!-- When VueRouter is available -->
    <a v-if="isRouterLink"
       is="router-link"
       :active-class="activeClass"
       :exact-active-class="exactActiveClass"
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :to="to"
       :exact="exact"
       :append="append"
       :replace="replace"
       :event="event"
       :tag="componentTag"
       :class="linkClassObject"
       @click.native="linkClick">
        <slot></slot>
    </a>

    <!-- Fallback mode -->
    <a v-else
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :href="_href"
       :target="target || null"
       :rel="computedRel"
       :class="linkClassObject"
       @click="linkClick">
        <slot></slot>
    </a>
</template>

<script>
import linkMixin from '../mixins/link';

export default {
    mixins: [linkMixin]
};
</script>
