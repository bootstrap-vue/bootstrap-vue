<template>
    <div>

        <h2 style="display: inline">{{tag}}</h2>
        <a :href="githubURL" target="_blank" class="text-muted">(view source)</a>

        <code v-code class="html">
            <{{componentName}}
            <template v-for="prop in props_items">&emsp;&emsp;{{isConst(prop.default)?'':':'}}{{prop.prop}}="{{prop.default}}"<br></template>
            <template v-for="event in events">&emsp;&emsp;@{{event.event}}=""<br></template>></code>

        <template v-if="props_items && props_items.length > 0">
            <h4>Properties</h4>
            <section>
                <b-table :items="props_items" :fields="props_fields" striped>
                    <template slot="default" scope="field">
                        <code>{{field.value}}</code>
                    </template>
                </b-table>
            </section>
        </template>

        <template v-if="slots && slots.length > 0">
            <h4>Slots</h4>
            <b-table :items="slots" :fields="slots_fields" striped></b-table>
        </template>

        <template v-if="events && events.length > 0">
            <h4>Events</h4>
            <b-table :items="events" :fields="events_fields" striped>
                <template slot="args" scope="field">
                    <div v-for="arg in field.value">
                        <code>{{arg.arg}}</code>
                        <span v-html="arg.description"/>
                    </div>
                </template>
            </b-table>
        </template>
    </div>
</template>

<style scoped>
    h4 {
        padding: 20px 0;
    }
</style>

<script>
    import Vue from 'vue';
    import _ from 'lodash';

    export default {
        props: {
            component: {},
            slots: {
                type: Array,
                default: () => []
            },
            events: {
                type: Array,
                default: () => []
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
                };
            },
            slots_fields() {
                return {
                    name: {label: 'Slot'},
                    description: {label: 'Description'}
                };
            },
            props_items() {
                const component = Vue.options.components[this.component];
                const props = component.options.props;
                return Object.keys(props).map(prop => {
                    const p = props[prop];

                    // Describe type
                    let type = p.type || Object;
                    let typeClass = String;
                    if (Array.isArray(type)) {
                        typeClass = type[0];
                        type = type.map(t => t.name).join(' or ');
                    } else {
                        typeClass = type;
                        type = type.name;
                    }

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

                    if (default_val === '' || default_val === null || default_val === 'null') {
                            default_val = '';
                    }

                    default_val = (default_val||'').replace(/"/g,'\'');

                    return {
                        prop: _.kebabCase(prop),
                        type,
                        typeClass,
                        default: default_val
                    };
                });
            },
            componentName() {
                return _.kebabCase(this.component);
            },
            tag() {
                return '<' + this.componentName + '>';
            },
            githubURL() {
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/components';
                return base + '/' + _.kebabCase(this.component).replace('b-','') + '.vue';
            }
        },
        methods: {
            isConst(str) {
                str = str || '';
                return ['true','false','',null,'[]'].indexOf(str) === -1 && str.indexOf('[') === -1;
            }
        }
    }
</script>