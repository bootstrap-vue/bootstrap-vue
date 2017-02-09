<template>
    <layout>
        <template slot="title">Components</template>
        <template slot="lead">
            Over a dozen reusable components built to provide buttons, dropdowns, input groups, navigation, alerts, and
            much more.
        </template>
        <template slot="actions">
            <b-btn size="sm" @click="viewSrc">{{componentName}}.vue</b-btn>
        </template>
        <template slot="content">

            <h1 class="bd-title" id="content">
                <slot name="name"></slot>
            </h1>
            <p>
                <slot name="description"></slot>
            </p>

            <h2>Examples</h2>
            <small class="text-muted">To view this examples source code use edit page button</small>
            <br>
            <div class="bd-example">
                <slot name="demo"></slot>
            </div>

            <h2>Usage</h2>
            <code v-code class="html">
                <slot name="usage"></slot>
            </code>

            <template v-if="props_items && props_items.length > 0">
                <h2>Properties</h2>
                <br>
                <b-table :items="props_items" :fields="props_fields">
                    <template slot="prop" scope="field">
                        <code>{{field.value}}</code>
                    </template>
                    <template slot="default" scope="field">
                        <code>{{field.value}}</code>
                    </template>
                </b-table>
            </template>

            <template v-if="docs.events && docs.events.length > 0">
                <h2>Events</h2>
                <br>
                <b-table :items="docs.events" :fields="events_fields">
                    <template slot="event" scope="field">
                        <code>{{field.value}}</code>
                    </template>
                    <template slot="args" scope="field">
                        <div v-for="arg in field.value">
                            <code>{{arg.arg}}</code>
                            <span v-html="arg.description"/>
                        </div>
                    </template>
                </b-table>
            </template>

        </template>
    </layout>
</template>

<script>
    import layout from './docs.vue';
    import mSidebar from '../includes/sidebar.vue';
    import Vue from 'vue';

    export default{
        components: {layout, mSidebar},

        head(){
            return {
                title: this.componentName + ' - Bootstrap-Vue',
            }
        },

        props: {
            docs: {
                type: Object, default: () => {
                    return {
                        events: []
                    }
                }
            },
        },

        computed: {
            props_fields() {
                return {
                    prop: {label: 'Property'},
                    type: {label: 'Type'},
                    default: {label: 'Default Value'}
                };
            },
            events_fields() {
                return {
                    event: {label: 'Event'},
                    args: {label: 'Arguments'},
                    description: {label: 'Description'}
                }
            },
            props_items(){
                let component = Vue.options.components[this.docs.component];
                let props = component.options.props;
                return Object.keys(props).map(prop => {
                    let p = props[prop];
                    return {
                        prop: prop,
                        type: p.type ? p.type.name : '-',
                        default: (p.default instanceof Function) ? '[Computed]' : p.default + '',
                    };
                });
            },
            componentName(){
                return this.docs.component
                    .replace(/(?:^|\.?)([A-Z])/g, (x, y) => "-" + y.toLowerCase())
                    .replace(/^b-/, "")
            },
            githubURL(){
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/components';
                return base + '/' + this.componentName + '.vue';
            },
        },

        methods: {
            viewSrc(){
                window.open(this.githubURL, '_blank');
                // this.$ga.event('docs', 'view_source', this.docs.component);
            },
        },

    }
</script>