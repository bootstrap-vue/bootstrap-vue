<template>
    <div class="bd-content">

        <h2><code>{{tag}}</code></h2>
        <a :href="githubURL" target="_blank" class="text-muted">(view source)</a>

        <template v-if="props_items && props_items.length > 0">
            <h4>Properties</h4>
            <section>
                <b-table :items="props_items" :fields="props_fields" small head-variant="default" striped>
                    <template slot="default" scope="field">
                        <code v-if="field.value">{{field.value}}</code>
                    </template>
                </b-table>
            </section>
        </template>

        <template v-if="slots && slots.length > 0">
            <h4>Slots</h4>
            <b-table :items="slots" :fields="slots_fields" small head-variant="default" striped></b-table>
        </template>

        <template v-if="events && events.length > 0">
            <h4>Events</h4>
            <b-table :items="events" :fields="events_fields" small head-variant="default" striped>
                <template slot="args" scope="field">
                    <div v-for="arg in field.value" :key="arg">
                        <code v-if="arg.arg">{{arg.arg}}</code>
                        <span v-html="arg.description"></span>
                    </div>
                </template>
            </b-table>
        </template>
    </div>

</template>

<style scoped>
    h1, h2, h3, h4, h5 {
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
            }
        },
        computed: {
            props_fields() {
                const component = Vue.options.components[this.component];
                let props = [];
                if (component) {
                    props = component.options.props;
                }
                const hasRequired = props.length > 0 && props.filter(p => p.required).length > 0;

                const fields = {
                    prop: {label: 'Property'},
                    type: {label: 'Type'},
                    default: {label: 'Default Value'}
                };

                // Add the required column if there are required field(s)
                if (hasRequired) {
                    fields.required = {label: 'Required'};
                }

                return fields;
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
                if (!component) {
                    return {};
                }

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

                    if (default_val instanceof Function && !Array.isArray(default_val)) {
                        default_val = default_val();
                    }

                    if (typeof default_val !== 'string') {
                        default_val = JSON.stringify(default_val);
                    }

                    if (default_val === '' || default_val === null || default_val === 'null') {
                        default_val = '';
                    }

                    default_val = (default_val || '').replace(/"/g, '\'');

                    // Requied prop?
                    const required = p.required ? 'Yes' : '';

                    return {
                        prop: _.kebabCase(prop),
                        type,
                        required,
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
                const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/master/lib/components';
                return base + '/' + _.kebabCase(this.component).replace('b-', '') + '.vue';
            }
        }
    };
</script>
