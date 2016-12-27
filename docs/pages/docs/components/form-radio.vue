<template>
    <layout :docs="docs">
        <template slot="name">
            Forms Radio
        </template>

        <template slot="description">
            For even more customization and cross browser consistency,
            use our completely custom form elements to replace the browser defaults.
            They’re built on top of semantic and accessible markup,
            so they’re solid replacements for any default form control.
        </template>

        <template slot="demo">

            <b-form-radio v-model="value" :items="items"/>

            <b-form-radio v-model="value" :items="items" stacked returnObject />

            <div>
                <span>Selected Item: </span>
                <span>{{value}}</span>
            </div>

        </template>

        <template slot="usage">
            &lt;b-form-radio v-model=&quot;value&quot; :items=&quot;items&quot;/&gt;

            &lt;b-form-radio v-model=&quot;value&quot; :items=&quot;items&quot; stacked returnObject /&gt;
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
                    component: 'bFormRadio',
                    events: [
                        {
                            event: 'input',
                            description: 'On text input',
                            args: [
                                {arg: 'input', description: 'New selected value'},
                            ],
                        },
                    ],
                },
                value: 'third',
                items: [
                    {text: 'Toggle this custom radio', value: 'first'},
                    {text: 'Or toggle this other custom radio', value: 'second'},
                    {text: 'This one is Disabled', value: 'third', disabled: true},
                ],
            }
        },
    }
</script>