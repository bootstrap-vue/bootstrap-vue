<template>
    <layout :docs="docs">
        <template slot="name">
            Collapse
        </template>

        <template slot="description">
            The Bootstrap collapse plugin allows you to toggle content on your pages with a few classes.
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
                    jsfiddle: 'f0qsxezp',
                    component: 'bCollapse',
                    events: [
                        {
                            event: 'collapse::toggle',
                            description: 'toggles when this event emits on $root',
                            args: [
                                {
                                    arg: 'id',
                                    description: 'collapse id'
                                }
                            ]
                        }
                    ]
                };
            }
        }
    };
</script>
