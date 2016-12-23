<template>
    <layout :component="component" :events="events">
        <template slot="name">

        </template>

        <template slot="description">

        </template>

        <template slot="demo">

        </template>

        <template slot="usage">

        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/docs-components.vue';

    export default {
        components: {layout},
        data(){
            return {
                component: '',
                events: [
                    {
                        event: '',
                        description: '',
                    },
                ],
            }
        },
        methods: {

        },
    }
</script>