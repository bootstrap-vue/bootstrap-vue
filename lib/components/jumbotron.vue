<template>
    <div :class="['jumbotron',fluid?'jumbotron-fluid':null]">
        <div :class="containerFluid ? 'container-fluid' : 'container'">
            <h1 v-if="header" class="display-3" v-html="header"></h1>
            <p v-if="lead" class="lead" v-html="lead"></p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {},
        props: {
            fluid: {
                type: Boolean,
                default: false
            },
            containerFluid: {
                type: Boolean,
                default: false
            },
            header: {
                type: String,
                default: null
            },
            lead: {
                type: String,
                default: null
            }
        }
    };
</script>
