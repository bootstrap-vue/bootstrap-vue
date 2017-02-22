<template>
    <li class="nav-item">
        <component
                :class="classObject"
                @click="onclick"
                :href="href || to"
                :is="componentType"
                active-class="active"
                :to="to"
                :exact="exact"
                :target="target"
        >
            <slot></slot>
        </component>
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
            },
            componentType() {
                return this.to ? 'router-link' : 'a';
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
                type: Boolean,
                default: false
            },
            target: {
                type: String
            }
        },
        methods: {
            onclick() {
                this.$emit('click', this.to);
            }
        }
    };
</script>
