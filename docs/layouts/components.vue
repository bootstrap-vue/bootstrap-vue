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

            <slot name="desc">
                <p>
                    <slot name="description"></slot>
                </p>
            </slot>

            <h2>Demo</h2>
            <small class="text-muted">To view this examples source code use edit page button</small>
            <br>
            <div class="bd-example">
                <slot name="demo"></slot>
            </div>

            <template v-if="props_items && props_items.length > 0">
                <h2>Properties</h2>
                <br>
                <section>
                    <b-table :items="props_items" :fields="props_fields" stripped>
                        <template slot="default" scope="field">
                            <code>{{field.value}}</code>
                        </template>
                    </b-table>
                </section>
            </template>

            <template v-if="docs.events && docs.events.length > 0">
                <h2>Events</h2>
                <br>
                <section>
                    <b-table :items="docs.events" :fields="events_fields" stripped>
                        <template slot="args" scope="field">
                            <div v-for="arg in field.value">
                                <code>{{arg.arg}}</code>
                                <span v-html="arg.description"/>
                            </div>
                        </template>
                    </b-table>
                </section>
            </template>

            <h2>Usage</h2>
            <code v-code class="html">
                <slot name="usage"></slot>
            </code>

        </template>
    </layout>
</template>

<script>
    import Vue from 'vue';
    import mSidebar from '../includes/sidebar.vue';
    import layout from './docs.vue';

    export default{
        components: {layout, mSidebar},

        head() {
            return {
                title: this.componentName + ' - Bootstrap-Vue'
            };
        },

        props: {
            docs: {
                type: Object, default: () => {
                    return {
                        events: []
                    };
                }
            }
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
                };
            },
            props_items() {
                const component = Vue.options.components[this.docs.component];
                const props = component.options.props;
                return Object.keys(props).map(prop => {
                    const p = props[prop];

                    // Describe value
                    let default_val = p.default;

                    if (default_val instanceof Function) {
                        if (default_val.name && default_val.name !== '_default' && default_val.name !== 'default') {
                            default_val = default_val.name + '()';
                        } else {
                            default_val = default_val();
                        }
                    }

                    if (typeof default_val !== 'string') {
                        default_val = JSON.stringify(default_val);
                    }

                    if (default_val === '' || default_val === null) {
                        default_val = '-';
                    }

                    // Describe type
                    let type = p.type || Object;
                    if (Array.isArray(type)) {
                        type = type.map(t => t.name).join(' or ');
                    } else {
                        type = type.name;
                    }

                    return {
                        prop,
                        type,
                        default: default_val
                    };
                });
            },
            componentName() {
                return this.docs.component
                    .replace(/(?:^|\.?)([A-Z])/g, (x, y) => '-' + y.toLowerCase())
                    .replace(/^b-/, '');
            },
            githubURL() {
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/components';
                return base + '/' + this.componentName + '.vue';
            }
        },

        methods: {
            viewSrc() {
                window.open(this.githubURL, '_blank');
                // this.$ga.event('docs', 'view_source', this.docs.component);
            }
        }

    };
</script>
