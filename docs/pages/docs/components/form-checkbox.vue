<template>
    <layout :docs="docs">
        <template slot="name">
            Forms Checkbox
        </template>

        <template slot="description">

        </template>

        <template slot="demo">

            <b-form-checkbox v-model="state" value="accepted" unchecked-value="not_accepted">
                I accept terms and use
            </b-form-checkbox>

            <div>State: <strong>{{state}}</strong></div>

        </template>

        <template slot="usage">
            &lt;b-form-checkbox v-model=&quot;check1&quot; value=&quot;Option1&quot;
            Tick me
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
            state: 'please_accept'
        };
    }
};
</script>
