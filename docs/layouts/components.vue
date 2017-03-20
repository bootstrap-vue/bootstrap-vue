<template>
    <layout>
        <template slot="title">Components</template>
        <template slot="content">

            <h2 class="bd-title" id="content">
                <slot name="name"></slot>
            </h2>

            <p>
                <slot name="description"></slot>
            </p>

            <slot name="notes"></slot>

            <h4 class="mt-4">Example</h4>
            <jsfiddle :slug="`${docs.jsfiddle}`"
                      tabs="result,html,js"
            ></jsfiddle>

            <componentdoc :component="docs.component" :events="docs.events" :slots="docs.slots"></componentdoc>

            <componentdoc :component="component" v-for="component in docs.components"></componentdoc>

        </template>
    </layout>
</template>


<script>
    import mSidebar from '../includes/sidebar.vue';
    import jsfiddle from '../components/jsfiddle.vue';
    import componentdoc from '../components/componentdoc.vue';
    import layout from './docs.vue';

    export default {
        components: {layout, mSidebar, jsfiddle, componentdoc},

        head() {
            return {
                title: 'Components - Bootstrap-Vue'
            };
        },

        props: {
            docs: {
                type: Object
            }
        }
    };
</script>
