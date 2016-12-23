<template>
    <layout :component="component" :events="events">
        <template slot="name">
            Textual inputs
        </template>

        <template slot="description">
            See examples below.
        </template>

        <template slot="demo">

            <b-form-input v-model="text"/>

            <b-form-input v-model="text"
                          type="text"
                          label="Example Label"
                          placeholder="Enter your name"
                          description="We'll convert your name to lowercase automatically."
                          size="md"
                          :state="'success'"
                          :formatter="format"
            />

            <p>Value: {{text}}</p>

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
                component: 'bFormInput',
                text: '',
                events: [
                    {
                        event: '',
                        description: '',
                    },
                ],
            }
        },
        methods: {
            format(value){
                return value.toLowerCase();
            }
        },
    }
</script>