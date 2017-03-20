<template>
    <layout :docs="docs">
        <template slot="name">
            Navbar
        </template>

        <template slot="description">
            The navbar is a wrapper that positions branding, navigation, and other elements into a concise header.
            It’s easily extensible and thanks to our Collapse plugin, it can easily integrate responsive behaviors.
        </template>
    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        computed: {
            docs() {
                return {
                    component: 'bNavbar',
                    components: ['bNavItemDropdown', 'bNavToggle', 'bCollapse', 'bNavItem'],
                    jsfiddle: 'qv4dzgjx'
                };
            }
        }
    };
</script>
