<template>
    <component :is="type"
               :class="classObject"
               :role="isNavBar ? null : 'navigation'"
    >
        <slot></slot>
    </component>
</template>

<script>

export default {
    computed: {
        classObject() {
            return {
                nav: true,
                'navbar-nav': this.isNavBar,
                'nav-tabs': this.tabs,
                'nav-pills': this.pills,
                'flex-column': this.vertical,
                'nav-fill': this.fill
            };
        }
    },
    props: {
        type: {
            type: String,
            default: 'ul'
        },
        fill: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Boolean,
            default: false
        },
        pills: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        },
        isNavBar: {
            type: Boolean,
            default: false
        }
    }
};

</script>
