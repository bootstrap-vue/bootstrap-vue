<template>
    <table :class="['table',striped?'table-striped':'',hover?'table-hover':'']">
        <thead>
        <tr>
            <th @click="headClick(field,key)"
                :class="[field.sortable?'sorting':null,sort===key?'sorting_'+(sortDesc?'desc':'asc'):'',field.class?field.class:null]"
                v-for="field,key in fields"
            >
                {{field.label}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in _items" :key="items_key" :class="[item.state?'table-'+item.state:null]">
            <td v-for="(field,key) in fields" :class="[field.class?field.class:null]">
                <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Pagination from './pagination.vue';

    export default{
        components: {bPagination: Pagination},

        data() {
            return {
                sort: null,
                sortDesc: true
            };
        },

        props: {
            sortable: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                default: () => []
            },
            fields: {
                type: Object,
                default: () => {
                }
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
            },
            currentPage: {
                type: Number,
                default: 1
            },
            filter: {
                type: String,
                default: null
            }
        },

        computed: {
            _items() {
                if (!this.items) {
                    return [];
                }

                let items = this.items;

                //
                const fix = v => {
                    if (v instanceof Object) {
                        return Object.keys(v).map(k => fix(v[k])).join(' ');
                    }
                    return String(v);
                };

                // Apply filter
                if (this.filter && this.filter.length > 0) {
                    const regex = new RegExp('.*' + this.filter + '.*', 'ig');
                    items = items.filter(item => regex.test(fix(item)));
                }

                // Apply Sort
                if (this.sort) {
                    items = items.sort((a, b) => {
                        const r = fix(a[this.sort]).localeCompare(fix(b[this.sort]));
                        return this.sortDesc ? r : r * -1;
                    });
                }

                // Apply pagination
                if (this.perPage) {
                    items = items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
                }

                return items;
            }
        },

        methods: {
            headClick(field, key) {
                if (!field.sortable) {
                    return;
                }

                if (key === this.sort) {
                    this.sortDesc = !this.sortDesc;
                }
                this.sort = key;
            }
        }

    };
</script>


<style scoped>
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

    div.dataTables_scrollBody table thead .sorting:after,
    div.dataTables_scrollBody table thead .sorting_asc:after,
    div.dataTables_scrollBody table thead .sorting_desc:after {
        display: none;
    }

    table.dataTable.table-condensed .sorting:after,
    table.dataTable.table-condensed .sorting_asc:after,
    table.dataTable.table-condensed .sorting_desc:after {
        top: 6px;
        right: 6px;
    }
</style>
