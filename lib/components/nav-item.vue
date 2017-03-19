<template>
    <li class="nav-item" @click="onclick">
        <b-link :class="classObject" :to="to" :href="href" :exact="exact">
            <slot></slot>
        </b-link>
    </li>
</template>

<script>

    export default {
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
            onclick() {
                // Hide all drop-downs including navbar-toggle
                this.$root.$emit('hidden::dropdown', this);

                this.$emit('click');
            }
        }
    };
</script>
