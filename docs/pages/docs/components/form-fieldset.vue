<template>
    <layout :docs="docs">
        <template slot="name">
            Form fieldsets
        </template>

        <template slot="description">
            See examples below.
        </template>

        <template slot="demo">

            <b-form-fieldset
                    :feedback="text.length?'':'Please enter something'"
                    description="We'll convert your name to lowercase automatically."
                    label="Example Label"
                    :state="text.length?'success':'warning'"
            >

                <b-form-input v-model="text"></b-form-input>

            </b-form-fieldset>


        </template>

        <template slot="usage">
            &lt;b-form-fieldset
            :feedback=&quot;text.length?&#039;&#039;:&#039;Please enter something&#039;&quot;
            description=&quot;We&#039;ll convert your name to lowercase automatically.&quot;
            label=&quot;Example Label&quot;
            :state=&quot;text.length?&#039;success&#039;:&#039;warning&#039;&quot;
            &gt;

            &lt;b-form-input v-model=&quot;text&quot;&gt;&lt;/b-form-input&gt;

            &lt;/b-form-fieldset&gt;

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
