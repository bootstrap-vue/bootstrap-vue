<template>
    <nav :class="classObject">
        <slot></slot>
    </nav>
</template>


<script>
    export default {
        computed: {
            classObject() {
                return [
                    'navbar',
                    this.type ? `navbar-${this.type}` : null,
                    this.variant ? `bg-${this.variant}` : null,
                    this.fixed ? `fixed-${this.fixed}` : null,
                    this.sticky ? 'sticky-top' : null,
                    this.toggleable ? this.toggleableClass : null
                ];
            },
            toggleableClass() {
                let className = 'navbar-toggleable';

                if (this.toggleBreakpoint) {
                    className += `-${this.toggleBreakpoint}`;
                }

                return className;
            }
        },
        props: {
            type: {
                type: String,
                default: 'light'
            },
            variant: {
                type: String
            },
            toggleable: {
                type: Boolean,
                default: false
            },
            toggleBreakpoint: {
                type: String,
                default: null
            },
            fixed: {
                type: String
            },
            sticky: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
