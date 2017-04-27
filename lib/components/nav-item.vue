<template>
    <li class="nav-item" @click="onclick">
        <b-link :class="classObject"
                :to="to"
                :href="href"
                :exact="exact"
                :disabled="disabled"
        >
            <slot></slot>
        </b-link>
    </li>
</template>

<script>
    import bLink from './link.vue';

    export default {
        components: {bLink},
        computed: {
            classObject() {
                return [
                    'nav-link',
                    this.active ? 'active' : '',
                    this.disabled ? 'disabled' : ''
                ];
            }
        },
        props: {
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            to: {
                type: [String, Object]
            },
            href: {
                type: String
            },
            exact: {
                type: Boolean
            }
        },
        methods: {
            onclick(e) {
                // Hide all drop-downs including navbar-toggle
                this.$root.$emit('shown::dropdown', this);
                this.$emit('click', e);
            }
        }
    };
</script>
