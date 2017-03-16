<template>
    <layout :docs="docs">
        <template slot="name">
            Breadcrumb
        </template>

        <template slot="description">
            Indicate the current page’s location within a navigational hierarchy.
            Separators are automatically added in CSS through <code>::before</code> and <code>content</code>.
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
                    component: 'bBreadcrumb',
                    jsfiddle: 'aL7wdszr',
                    events: [
                        {
                            event: 'click',
                            args: [
                                {
                                    arg: 'item',
                                    description: 'The item which clicked on'
                                }
                            ],
                            description: 'Only if item is not active'
                        }
                    ]
                };
            }
        }
    };
</script>
