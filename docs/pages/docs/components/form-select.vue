<template>
    <layout :docs="docs">
        <template slot="name">
            Select menu
        </template>

        <template slot="description">

        </template>

        <template slot="demo">
            <b-form-select v-model="selected"
                           :options="options"
                           :defaultOption="defaultOption"
                           state="success"
            >
            </b-form-select>

            <div>Selected: <strong>{{selected}}</strong></div>

        </template>

        <template slot="usage">
            &lt;b-form-select v-model=&quot;selected&quot;
            :options=&quot;options&quot;
            :defaultOption=&quot;defaultOption&quot;
            label=&quot;Example Label&quot;
            description=&quot;We&#039;ll never share your gender with anyone else.&quot;
            feedback=&quot;Please Select Some Item&quot;
            state=&quot;success&quot;
            &gt;
            &lt;/b-form-select&gt;
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
                    component: 'bFormSelect',
                },
                selected: 'c',
                defaultOption: {text: 'Please select some item', value: 'default'},
                options: [
                    {text: 'This is First option', value: 'a'},
                    {text: 'Default Selected Option', value: 'b'},
                    {text: 'This is another option', value: 'c'},
                    {text: 'This one is disabled', value: 'd', disabled: true},
                ],
            }
        },
        methods: {},
    }
</script>