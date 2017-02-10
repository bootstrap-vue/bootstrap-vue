<template>
    <layout :docs="docs">
        <template slot="name">
            Textual inputs
        </template>

        <template slot="description">
            See examples below.
        </template>

        <template slot="demo">

            <b-form-input v-model="text"
                          type="text"
                          placeholder="Enter your name"
                          :state="text.length?'success':'warning'"
                          :formatter="format"
            ></b-form-input>

            <br>
            <br>

            <b-form-input textarea
                          v-model="text"
                          placeholder="Text area mode"
            ></b-form-input>

            <br>
            <p>Value: {{text}}</p>


        </template>

        <template slot="usage">
            &lt;b-form-input v-model=&quot;text&quot;
            type=&quot;text&quot;
            placeholder=&quot;Enter your name&quot;
            :state=&quot;text.length?&#039;success&#039;:&#039;warning&#039;&quot;
            :formatter=&quot;format&quot;
            &gt;&lt;/b-form-input&gt;
        </template>

    </layout>
</template>

<script>
import layout from '../../../layouts/components.vue';

export default {
    components: {layout},
    data() {
        return {
            docs: {
                component: 'bFormInput',
                events: [
                    {
                        event: 'input',
                        description: 'On text input',
                        args: [
                            {arg: 'text', description: 'New text value'}
                        ]
                    }
                ]
            },
            text: ''
        };
    },
    methods: {
        format(value) {
            return value.toLowerCase();
        }
    }
};
</script>
