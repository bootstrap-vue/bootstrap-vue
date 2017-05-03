<template>
    <a :is="componentType"
       :active-class="activeClass"
       :disabled="disabled"
       :aria-disabled="disabled ? 'true' : 'false'"
       :to="to"
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
