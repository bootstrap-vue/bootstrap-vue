<template>
    <layout :docs="docs">
        <template slot="name">
            Button group
        </template>

        <template slot="description">
            Group a series of buttons together on a single line with the button group
            with radio and checkbox style behavior.
        </template>

        <template slot="demo">

            <div class="row">

                <div class="col">
                    <b-button-group vertical>
                        <b-button variant="success">Top</b-button>
                        <b-button variant="info">Middle</b-button>
                        <b-button variant="primary">Bottom</b-button>
                    </b-button-group>
                </div>

                <div class="col">
                    <b-button-group>
                        <b-button>Left</b-button>
                        <b-button>Middle</b-button>
                        <b-button>Right</b-button>
                    </b-button-group>
                </div>
                <div class="col">
                    <b-button-group size="sm">
                        <b-button>Left</b-button>
                        <b-button>Middle</b-button>
                        <b-button>Right</b-button>
                    </b-button-group>
                </div>
            </div>

        </template>

        <template slot="usage">
            &lt;b-button-group&gt;
            &emsp; &lt;b-button&gt;Left&lt;/b-button&gt;
            &emsp; &lt;b-button&gt;Middle&lt;/b-button&gt;
            &emsp; &lt;b-button&gt;Right&lt;/b-button&gt;
            &lt;/b-button-group&gt;
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
                component: 'bButtonGroup',
                events: []
            }
        };
    },
    methods: {}
};
</script>
