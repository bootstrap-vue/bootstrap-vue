<template>
    <layout :docs="docs">
        <template slot="name">
            Buttons
        </template>

        <template slot="description">
            Use Bootstrap’s custom button styles for actions in forms, dialogs, and more.
            Includes support for a handful of contextual variations, sizes, states, and more.
        </template>

        <template slot="demo">

            <div class="row">
                <template
                        v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
                    <div class="col-md-4" v-for="size in ['sm','','lg']">
                        <b-button :size="size" :variant="variant" @click="clicked">
                            {{variant}} {{size}}
                        </b-button>
                    </div>
                </template>
            </div>

        </template>

        <template slot="usage">
            &lt;b-button :size=&quot;size&quot; :variant=&quot;variant&quot; @click=&quot;clicked&quot;&gt;
            Click Me!
            &lt;/b-button&gt;
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
                    component: 'bButton',
                    events: [
                        {
                            event: 'click',
                            description: 'when clicked on button',
                            args: [
                                {
                                    arg: 'link',
                                    description: ''
                                }
                            ]
                        },
                    ],
                }
            }
        },
        methods: {
            clicked(){
                window.alert("Clicked on me!");
            }
        },
    }
</script>