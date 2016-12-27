<template>
    <nav :class="classObject">
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
                    this.full ? 'navbar-full' : ''
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
