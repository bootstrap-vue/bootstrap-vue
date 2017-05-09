<template>
    <!-- When VueRouter is available -->
    <a v-if="routerAvailable && to"
       is="router-link"
       :active-class="activeClass"
       :exact-active-class="exactActiveClass"
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :to="_to"
       :exact="exact"
       :append="append"
       :replace="replace"
       :event="event"
       :tag="tag"
       @click="click"
    >
        <slot></slot>
    </a>

    <!-- Fallback mode -->
    <a v-else
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :href="_href"
       @click="click"
    >
        <slot></slot>
    </a>
</template>

<script>

    export default {
        computed: {
            routerAvailable() {
                return Boolean(this.$router);
            },
            _href() {
                if (this.disabled) {
                    return '#';
                }

                // If href explicitly provided
                if (this.href) {
                    return this.href;
                }

                // Fallback to `to` prop
                if (this.to && typeof this.to === 'string') {
                    return this.to;
                }
            },
            _to() {
                if (this.disabled) {
                    return null;
                }

                if (this.to) {
                    return this.to;
                }
            }
        },
        props: {
            // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
            to: {
                type: [String, Object],
                default: null
            },
            tag: {
                type: String,
                default: 'a'
            },
            exact: Boolean,
            append: Boolean,
            replace: Boolean,
            activeClass: {
                type: String,
                default: 'active'
            },
            exactActiveClass: {
                type: String,
                default: 'active'
            },
            event: {
                type: [String, Array],
                default: 'click'
            },
            disabled: Boolean,
            href: {
                type: String,
                default: '#'
            }
        },
        methods: {
            click(e) {
                if (this.disabled || this._href === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                this.$emit('click', e);
                this.$root.$emit('clicked::link', this);
            }
        }
    };
</script>
