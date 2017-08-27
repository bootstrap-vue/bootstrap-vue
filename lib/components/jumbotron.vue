<template>
    <div :class="jumbotronClasses">
        <template v-if="fluid">
            <div :class="containerClasses">
                <h1 :is="headerTag" v-if="header" :class="headerClasses" v-html="header"></h1>
                <p v-if="lead" class="lead" v-html="lead"></p>
                <slot></slot>
            </div>
        </template>
        <template v-else>
            <h1 :is="headerTag" v-if="header" :class="headerClasses" v-html="header"></h1>
            <p v-if="lead" class="lead" v-html="lead"></p>
            <slot></slot>
        </template>
    </div>
</template>

<script>
    export default {
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
            headerTag: {
                type: String,
                default: 'h1'
            },
            headerLevel: {
                type: Number,
                default: 3
            },
            lead: {
                type: String,
                default: null
            }
        },
        computed: {
            jumbotronClasses() {
                return [
                    'jumbotron',
                    this.fluid ? 'jumbotron-fluid' : ''
                ];
            },
            containerClasses() {
                return [
                    this.containerFluid ? 'container-fluid' : 'container'
                ];
            },
            headerClasses() {
                return [
                    this.headerLevel ? `display-${this.headerLevel}` : ''
                ]
            }
        }
    };
</script>
