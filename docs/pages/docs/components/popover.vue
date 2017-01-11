<template>
    <layout :docs="docs">
        <template slot="name">
            Popover
        </template>

        <template slot="description">
            The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
            element, and is customizable.
        </template>

        <template slot="demo">

            <div class="row">
                <template
                        v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
                    <div class="col-md-3" v-for="placement in ['top','left','right', 'bottom']">
                        <b-popout :placement="placement" content="Heya!">
                            {{ placement }}
                        </b-popout>
                    </div>
                </template>
            </div>

        </template>

        <template slot="usage">
            <b-popover title="My Popover Title">
                <a class="btn btn-primary" role="button" @click="clickEventConfirmed">Submit</a>
                <div class="text-xs-center" slot="content">
                    Isn't this lovely?
                </div>
            </b-popover>
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
                    component: 'bPopover',
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
            clickEventConfirmed(){
                window.alert("Form submitted!");
            }
        },
    }
</script>