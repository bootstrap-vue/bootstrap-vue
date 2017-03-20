<template>
    <div class="container">
        <div v-html="readme"></div>

        <h4 class="mt-4">Example</h4>
        <jsfiddle :slug="`${meta.jsfiddle}`"
                  tabs="result,html,js"
        ></jsfiddle>

        <componentdoc :component="meta.component" :events="meta.events" :slots="meta.slots"></componentdoc>

        <componentdoc :component="component" v-for="component in meta.components"></componentdoc>
    </div>
</template>


<script>
    import jsfiddle from '../../../components/jsfiddle.vue';
    import componentdoc from '../../../components/componentdoc.vue';
    import componentsDoc from '../../../../components';
    import fetch from 'whatwg-fetch';

    export default {
        components: {jsfiddle, componentdoc},
        layout: 'docs',

        async data({params: {component}}) {

            return {...doc};
        },

        head() {
            return {
                title: 'Components - Bootstrap-Vue'
            };
        }
    };
</script>
