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
                this.type ? `navbar-${this.type}` : '',
                this.variant ? `bg-${this.variant}` : '',
                this.fixed ? `navbar-fixed-${this.fixed}` : '',
                this.full ? 'navbar-full' : '',
                this.toggleable ? 'navbar-toggleable-md' : ''
            ];
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
        fixed: {
            type: String
        },
        full: {
            type: Boolean,
            default: false
        }
    }
};

</script>
