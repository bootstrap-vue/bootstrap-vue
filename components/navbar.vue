<template>
    <nav :class="classObject">

        <button class="navbar-toggler navbar-toggler-right"
                type="button"
                aria-expanded="false"
                aria-label="Toggle navigation"
                v-if="toggleable"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <slot></slot>

    </nav>
</template>


<script>
    export default {
        replace: true,
        computed: {
            classObject() {
                return [
                    'navbar',
                    this.navbarType,
                    this.navbarVariant,
                    this.navbarfixed,
                    this.full ? 'navbar-full' : '',
                    'navbar-toggleable-md',
                ];
            },
            navbarType() {
                return `navbar-${this.type}`;
            },
            navbarVariant() {
                return `bg-${this.variant}`;
            },
            navbarfixed() {
                return this.fixed ? `navbar-fixed-${this.fixed}` : '';
            },
        },
        props: {
            type: {
                type: String,
                default: 'light',
            },
            variant: {
                type: String,
                default: 'faded',
            },
            toggleable: {
                type: Boolean,
                default: false,
            },
            fixed: {
                type: String,
                default: '',
            },
            full: {
                type: Boolean,
                default: false,
            }
        },
    }

</script>
