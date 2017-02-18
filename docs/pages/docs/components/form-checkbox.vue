<template>
    <layout :docs="docs">
        <template slot="name">
            Forms Checkbox
        </template>

        <template slot="description">
            This component uses a special <code>_value</code> Property to keep compatible with <code>v-model</code>
            directive.
        </template>

        <template slot="demo">

            <b-form-checkbox v-model="check1" _value="Option1" checked>
                CheckBox Default
            </b-form-checkbox>

            <div>Value: {{check1}}</div>

        </template>

        <template slot="usage">
            &lt;b-form-checkbox v-model=&quot;check1&quot; _value=&quot;Option1&quot; checked&gt;
            CheckBox Default
            &lt;/b-form-checkbox&gt;
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
                component: 'bFormCheckbox',
                events: [
                    {
                        event: 'input',
                        args: [
                            {
                                arg: '_value',
                                description: 'The internal <code>_value</code> if checked or <code>undefined</code>'
                            }
                        ]
                    },
                    {
                        event: 'change',
                        description: 'On Changed',
                        args: [{arg: 'checked'}]
                    }
                ]
            },
            check1: ''
        };
    }
};
</script>
