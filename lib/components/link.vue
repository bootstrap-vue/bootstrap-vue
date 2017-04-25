<template>
    <a :is="componentType"
       :active-class="activeClass"
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :to="to"
       :href="hrefString"
       :exact="exact"
       @click="click"
    >
        <slot></slot>
    </a>
</template>

<script>
    export default {
        computed: {
            componentType() {
                return (this.$router && this.to) ? 'router-link' : 'a';
            },
            hrefString() {
                if (this.to) {
                    return this.to.path || this.to;
                }
                return this.href;
            }
        },
        props: {
            activeClass: {
                type: String,
                default: 'active'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            to: {
                type: [String, Object],
                default: null
            },
            href: {
                type: String,
                default: ''
            },
            exact: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click(e) {
                if (this.disabled || this.href === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                }

                if (!this.disabled) {
                    this.$emit('click', e);
                    this.$root.$emit('shown::dropdown', this);
                }
            }
        }
    };
</script>
