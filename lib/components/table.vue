<template>
    <table :class="['table',striped?'table-striped':'',hover?'table-hover':'']">
        <thead>
        <tr>
            <th @click="headClick(field,key)"
                :class="[field.sortable?'sorting':null,sortBy===key?'sorting_'+(sortDesc?'desc':'asc'):'',field.class?field.class:null]"
                v-for="field,key in fields"
                v-html="field.label"
                :key="key"
            ></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in _items" :key="item[items_key]" :class="[item.state?'table-'+item.state:null]">
            <td v-for="(field,key) in fields" :class="[field.class?field.class:null]">
                <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import LocalAdapter from '../utils/local-adapter';

    export default {
        data() {
            return {
                sortBy: null,
                sortDesc: true
            };
        },
        props: {
            items: {
                type: Array
            },
            fields: {
                type: Object
            },
            adapter: {
                type: Object,
                default: () => new LocalAdapter(this)
            },
            striped: {
                type: Boolean,
                default: false
            },
            hover: {
                type: Boolean,
                default: false
            },
            perPage: {
                type: Number,
                default: null
            },
            items_key: {
                type: String,
                default: null
            }
        },

        computed: {
            _items() {
                const items = this.adapter.items();
                this.$emit('input', items);
            }
        },
        methods: {
            headClick(field, key) {
                if (!field.sortable) {
                    this.adapter.setSortBy(null);
                    return;
                }

                if (key === this.sortBy) {
                    this.adapter.toggleSortDesc();
                }

                this.adapter.setSortBy(key);
            }
        }
    };
</script>


<style>
    /* https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap4.css */

    table thead > tr > th.sorting_asc, table thead > tr > th.sorting_desc, table thead > tr > th.sorting,
    table thead > tr > td.sorting_asc,
    table thead > tr > td.sorting_desc,
    table thead > tr > td.sorting {
        padding-right: 30px;
    }

    table thead > tr > th:active,
    table thead > tr > td:active {
        outline: none;
    }

    table thead .sorting,
    table thead .sorting_asc,
    table thead .sorting_desc,
    table thead .sorting_asc_disabled,
    table thead .sorting_desc_disabled {
        cursor: pointer;
        position: relative;
    }

    table thead .sorting:before, table thead .sorting:after,
    table thead .sorting_asc:before,
    table thead .sorting_asc:after,
    table thead .sorting_desc:before,
    table thead .sorting_desc:after,
    table thead .sorting_asc_disabled:before,
    table thead .sorting_asc_disabled:after,
    table thead .sorting_desc_disabled:before,
    table thead .sorting_desc_disabled:after {
        position: absolute;
        bottom: 0.9em;
        display: block;
        opacity: 0.3;
    }

    table thead .sorting:before,
    table thead .sorting_asc:before,
    table thead .sorting_desc:before,
    table thead .sorting_asc_disabled:before,
    table thead .sorting_desc_disabled:before {
        right: 1em;
        content: "\2191";
    }

    table thead .sorting:after,
    table thead .sorting_asc:after,
    table thead .sorting_desc:after,
    table thead .sorting_asc_disabled:after,
    table thead .sorting_desc_disabled:after {
        right: 0.5em;
        content: "\2193";
    }

    table thead .sorting_asc:before,
    table thead .sorting_desc:after {
        opacity: 1;
    }

    table thead .sorting_asc_disabled:before,
    table thead .sorting_desc_disabled:after {
        opacity: 0;
    }
</style>
