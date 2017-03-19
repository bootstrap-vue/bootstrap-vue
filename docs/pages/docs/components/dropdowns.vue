<template>
    <layout :docs="docs">
        <template slot="name">
            Dropdowns
        </template>

        <template slot="description">
            Dropdowns are toggleable, contextual overlays for displaying lists of links and more.
            They’re made interactive with the included Bootstrap dropdown JavaScript plugin.
            They’re toggled by clicking, not by hovering; this is an
            <a href="http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/">intentional design decision.</a>.
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
                    component: 'bDropdown',
                    components: ['bDropdownItem'],
                    jsfiddle: '8205xLmk',
                    events: [
                        {event: 'shown', description: ''},
                        {event: 'hidden', description: ''},
                        {event: 'click', description: 'Only in split mode'}
                    ]
                };
            }
        }
    };
</script>
