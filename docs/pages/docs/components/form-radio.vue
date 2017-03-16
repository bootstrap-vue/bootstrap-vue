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
    </layout>
</template>

<script>
    import layout from '../../../layouts/components.vue';

    export default {
        components: {layout},
        computed: {
            docs() {
                return {
                    component: 'bFormRadio',
                    jsfiddle: 'dtjL91t7',
                    events: [
                        {
                            event: 'input',
                            description: 'On text input',
                            args: [
                                {arg: 'input', description: 'New selected value'}
                            ]
                        }
                    ]
                };
            }
        }
    };
</script>
