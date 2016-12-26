<template>
    <layout :docs="docs">
        <template slot="name">
            Textual inputs
        </template>

        <template slot="description">
            See examples below.
        </template>

        <template slot="demo">

            <b-form-input v-model="text"></b-form-input>

            <b-form-input v-model="text"
                          type="text"
                          label="Example Label"
                          placeholder="Enter your name"
                          :feedback="text.length?'':'Please enter something'"
                          description="We'll convert your name to lowercase automatically."
                          size="md"
                          :state="text.length?'success':'warning'"
                          :formatter="format"
            ></b-form-input>

            <div>Text Area Mode:</div>
            <b-form-input v-model="text"
                          type="text"
                          label="Example Label"
                          placeholder="Enter your name"
                          :feedback="text.length?'':'Please enter something'"
                          description="We'll convert your name to lowercase automatically."
                          size="md"
                          :state="text.length?'success':'warning'"
                          :formatter="format"
                          textarea
            ></b-form-input>

            <br>
            <p>Value: {{text}}</p>


        </template>

        <template slot="usage">
            &lt;b-form-input v-model=&quot;text&quot;
            type=&quot;text&quot;
            label=&quot;Example Label&quot;
            placeholder=&quot;Enter your name&quot;
            description=&quot;We&#039;ll convert your name to lowercase automatically.&quot;
            size=&quot;md&quot;
            :state=&quot;&#039;success&#039;&quot;
            :formatter=&quot;format&quot;
            /&gt;
        </template>

    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        data(){
            return {
                docs:{
                    component: 'bFormInput',
                    events: [
                        {
                            event: 'input',
                            description: 'On text input',
                            args: [
                                {arg: 'text',description: 'New text value'}
                            ],
                        },
                    ],
                },
                text: '',
            }
        },
        methods: {
            format(value){
                return value.toLowerCase();
            }
        },
    }
</script>