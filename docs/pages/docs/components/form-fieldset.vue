<template>
    <layout :docs="docs">
        <template slot="name">
            Form fieldsets
        </template>

        <template slot="description">

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
                component: 'bFormFieldset',
                jsfiddle:'7ztq8nzd',
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
