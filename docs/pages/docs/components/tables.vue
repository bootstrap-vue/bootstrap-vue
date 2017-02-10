<template>
    <layout :docs="docs">
        <template slot="name">
            Tables
        </template>

        <template slot="description">
            For tabular data. Tables support pagination and custom rendering.
        </template>

        <template slot="demo">

            <b-table
                    :items="items"
                    :fields="fields"
                    pagination
                    :perPage="3"
            >
                <template slot="name" scope="item">
                    {{item.value.first}} {{item.value.last}}
                </template>
                <template slot="actions" scope="item">
                    <b-btn size="sm" @click="details(item.item)">Details</b-btn>
                </template>
            </b-table>

        </template>

        <template slot="usage">

            &lt;b-table
            :items=&quot;items&quot;
            :fields=&quot;fields&quot;
            pagination
            :perPage=&quot;3&quot;
            &gt;
            &lt;template slot=&quot;name&quot; scope=&quot;item&quot;&gt;
            { {item.value.first}} { {item.value.last}}
            &lt;/template&gt;
            &lt;template slot=&quot;actions&quot; scope=&quot;item&quot;&gt;
            &lt;b-btn size=&quot;sm&quot; @click=&quot;details(item.item)&quot;&gt;Details&lt;/b-btn&gt;
            &lt;/template&gt;
            &lt;/b-table&gt;

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
                component: 'bTable'

            },
            items: [
                {
                    isActive: true,
                    age: 40,
                    name: {
                        first: 'Dickerson',
                        last: 'Macdonald'
                    }

                },
                {
                    isActive: false,
                    age: 21,
                    name: {
                        first: 'Larsen',
                        last: 'Shaw'
                    }

                },
                {
                    isActive: false,
                    age: 26,
                    name: {
                        first: 'Mitzi',
                        last: 'Navarro'
                    }

                },
                {
                    isActive: false,
                    age: 22,
                    name: {
                        first: 'Geneva',
                        last: 'Wilson'
                    }

                },
                {
                    isActive: true,
                    age: 38,
                    name: {
                        first: 'Jami',
                        last: 'Carney'
                    }

                },
                {
                    isActive: false,
                    age: 27,
                    name: {
                        first: 'Essie',
                        last: 'Dunlap'
                    }

                }
            ],
            fields: {
                name: {label: 'Person Full name'},
                age: {label: 'Person age'},
                isActive: {label: 'is Active'},
                actions: {label: 'Actions'}
            }
        };
    },
    methods: {
        details(item) {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(item));
        }
    }
};
</script>
