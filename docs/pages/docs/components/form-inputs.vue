<template>
    <layout :docs="docs">
        <template slot="name">
            Textual inputs
        </template>

        <template slot="description">

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
                    component: 'bFormInput',
                    jsfiddle: 'j08b7c4o',
                    events: [
                        {
                            event: 'input',
                            description: 'On text input',
                            args: [
                                {arg: 'text', description: 'New text value'}
                            ]
                        }
                    ]
                };
            }
        }
    };
</script>
