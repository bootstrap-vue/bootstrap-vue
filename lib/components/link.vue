<template>
    <a :is="componentType" :active-class="activeClass" :to="toObject" :href="hrefString" :exact="exact">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        computed: {
            componentType() {
                return this.$router ? 'router-link' : 'a';
            },
            hrefString() {
                if (this.to) {
                    return this.to.path || this.to;
                }
                return this.href;
            },
            toObject() {
                return this.to || this.href;
            }
        },
        props: {
            activeClass: {
                type: String,
                default: 'active'
            },
            to: {
                type: [String, Object]
            },
            href: {
                type: String
            },
            exact: {
                type: Boolean,
                default: false
            },
        }
    };
</script>
