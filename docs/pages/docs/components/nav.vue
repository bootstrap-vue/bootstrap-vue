<template>
    <layout :docs="docs">
        <template slot="name">
            Navs
        </template>

        <template slot="description">
            Navigation available in Bootstrap share general markup and styles,
            from the base <code>.nav</code> class to the active and disabled states.
            Swap modifier classes to switch between each style.
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
                    component: 'bNav',
                    components: ['bNavItem'],
                    jsfiddle: '8s202srp'
                };
            }
        }
    };
</script>
