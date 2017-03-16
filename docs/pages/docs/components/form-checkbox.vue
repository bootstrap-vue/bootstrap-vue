<template>
    <layout :docs="docs">
        <template slot="name">
            Forms Checkbox
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
                    component: 'bFormCheckbox',
                    jsfiddle: 'hvswzcw3',
                    events: [
                        {
                            event: 'change',
                            description: 'On Changed',
                            args: [{arg: 'checked'}]
                        }
                    ]
                };
            }
        }
    };
</script>
