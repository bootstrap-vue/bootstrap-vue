<template>
    <layout>
        <template slot="title">Components</template>
        <template slot="lead">
            Over a dozen reusable components built to provide buttons, dropdowns, input groups, navigation, alerts, and
            much more.
        </template>
        <template slot="content">

            <h1 class="bd-title" id="content">
                <slot name="name"></slot>
            </h1>
            <p>
                <slot name="description"></slot>
            </p>

            <h2>Examples</h2>
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

            <template v-if="events && events.length > 0">
                <h2>Events</h2>
                <br>
                <b-table :items="events" :fields="events_fields">
                    <template slot="event" scope="field">
                        <code>{{field.value}}</code>
                    </template>
                    <template slot="args" scope="field">
                        <template v-for="arg in field.value">
                            <code>{{arg.arg}}</code> {{arg.description}}
                        </template>
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

        props: {
            component: {type: String},
            events: {type: Array, default: () => []},
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
                    description: {label: 'Description'},
                }
            },
            props_items(){
                let component = Vue.options.components[this.component];
                let props = component.options.props;
                return Object.keys(props).map(prop => {
                    let p = props[prop];
                    return {
                        prop: prop,
                        type: p.type ? p.type.name : '??',
                        default: (p.default instanceof Function) ? '[Computed]' : p.default + '',
                    };
                });
            },
        },

    }
</script>