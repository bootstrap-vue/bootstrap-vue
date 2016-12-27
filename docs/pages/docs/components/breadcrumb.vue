<template>
    <layout :docs="docs">
        <template slot="name">
            Breadcrumb
        </template>

        <template slot="description">
            Indicate the current page’s location within a navigational hierarchy.
            Separators are automatically added in CSS through <code>::before</code> and <code>content</code>.
        </template>

        <template slot="demo">
            <b-breadcrumb :items="items"/>
        </template>

        <template slot="usage">
            &lt;b-breadcrumb :items=&quot;[{text: &#039;Home&#039;, link: &#039;#&#039;, active: true},
            {text: &#039;Manage&#039;, link: &#039;#&#039;, active: true},
            {text: &#039;Library&#039;, active: false}]&quot;/&gt;
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data(){
            return {
                docs: {
                    component: 'bBreadcrumb',
                    events: [
                        {
                            event: 'click',
                            args: [
                                {
                                    arg: 'item',
                                    description: 'The item which clicked on',
                                }
                            ],
                            description: 'Only if item is not active',
                        },
                    ],
                },
                items: [
                    {text: 'Home', link: '#', active: true},
                    {text: 'Manage', link: '#', active: true},
                    {text: 'Library', active: false}
                ],
            }
        },
        methods: {},
    }
</script>