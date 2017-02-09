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

        <template slot="demo">

                <b-dropdown text="Dropdown Button sm" size="sm" class="m-md-2">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here</a>
                </b-dropdown>

                <b-dropdown text="Split Dropdown Button" variant="success" split @click="click" class="m-md-2">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here...</a>
                </b-dropdown>

                <b-dropdown text="Drop-Up" dropup variant="info" class="m-md-2">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here</a>
                </b-dropdown>

                <b-dropdown text="Right align" variant="warning" right class="m-md-2">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here</a>
                </b-dropdown>

        </template>

        <template slot="usage">
            &lt;b-dropdown text=&quot;Split Dropdown Button&quot; variant=&quot;success&quot; split @click=&quot;click&quot;&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;
            &emsp; &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;
            &lt;/b-dropdown&gt;
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
                    component: 'bDropdown',
                    events: [
                        {event: 'shown', description: ''},
                        {event: 'hidden', description: ''},
                        {event: 'click', description: 'Only in split mode'},
                    ],
                }
            }
        },
        methods: {
            click(){
                window.alert('Clicked!');
            }
        },
    }
</script>