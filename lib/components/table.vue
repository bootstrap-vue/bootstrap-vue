<template>
    <table :id="id || null"
           role="grid"
           :class="tableClass"
    >
        <thead :class="headVaraiant ? ('thead-' + headVariant) : ''">
        <tr role="row">
            <th v-for="field,key in fields"
                @click="headClick(field,key)"
                @keydown.enter="headClick(field,key)"
                @keydown.space.prevent="headClick(field,key)"
                :class="[field.sortable?'sorting':null,sortBy===key?'sorting_'+(sortDesc?'desc':'asc'):'',field.class?field.class:null,field.invisible?'invisible':null]"
                :aria-label="field.sortable ? (sortDesc ? labelSortAsc : labelSortDesc) : null"
                :aria-sort="(field.sortable && sortBy === key) ? (sortDesc ? 'descending' : 'ascending') : null"
                :tabindex="field.sortable?'0':null"
                v-html="field.label"
            ></th>
        </tr>
        </thead>
        <tfoot v-if="footClone" :class="footVaraiant ? ('thead-' + footVariant) : ''">
        <tr role="row">
            <th v-for="field,key in fields"
                @click="headClick(field,key)"
                @keydown.enter="headClick(field,key)"
                @keydown.space.prevent="headClick(field,key)"
                :class="[field.sortable?'sorting':null,sortBy===key?'sorting_'+(sortDesc?'desc':'asc'):'',field.class?field.class:null,field.invisible?'invisible':null]"
                :aria-label="field.sortable ? (sortDesc ? labelSortAsc : labelSortDesc) : null"
                :aria-sort="(field.sortable && sortBy === key) ? (sortDesc ? 'descending' : 'ascending') : null"
                :tabindex="field.sortable?'0':null"
                v-html="field.label"
            ></th>
        </tr>
        </tfoot>
        <tbody>
        <tr v-for="(item,index) in _items"
            role="row"
            :key="items_key" :class="[item.state?'table-'+item.state:null]"
            @click="rowClicked(item, index)"
        >
            <td v-for="(field,key) in fields" :class="[field.class?field.class:null]">
                <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
            </td>
        </tr>
        <tr v-if="showEmpty && items.length === 0" :colspan="Object.keys(fields).length" role="row">
            <slot name="empty">
                <div class="text-center" v-html="emptyText"></div>
            </slot>
        </tr>
        <tr v-else-if="showEmpty && _items.length === 0" :colspan="Object.keys(fields).length" role="row">
            <slot name="emptyfiltered">
                <div class="text-center" v-html="emptyFilteredText"></div>
            </slot>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import bPagination from './pagination.vue';

    const toString = v => {
        if (!v) {
            return '';
        }

        if (v instanceof Object) {
            return Object.keys(v).map(k => toString(v[k])).join(' ');
        }

        return String(v);
    };

    const defaultSortCompare = (a, b, sortBy) => {
        return toString(a[sortBy]).localeCompare(toString(b[sortBy]), undefined, {numeric: true});
    };

    export default {
        components: {bPagination},
        data() {
            return {
                sortBy: null,
                sortDesc: true
            };
        },
        props: {
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
            bordered: {
                type: Boolean,
                default: false
            },
            inverse: {
                type: Boolean,
                default: false
            },
            hover: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            responsive: {
                type: Boolean,
                default: false
            },
            headVariant: {
                type: String,
                default: ''
            },
            footVariant: {
                type: String,
                default: ''
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
                type: [String, RegExp, Function],
                default: null
            },
            sortCompare: {
                type: Function,
                default: null
            },
            itemsProvider: {
                type: Function,
                default: null
            },
            value: {
                type: Array,
                default: () => []
            },
            footClone: {
                type: Boolean,
                default: false
            },
            labelSortAsc: {
                type: String,
                default: 'Click to sort Ascending'
            },
            labelSortDesc: {
                type: String,
                default: 'Click to sort Descending'
            },
            showEmpty: {
                type: Boolean,
                default: false
            },
            emptyText: {
                type: String,
                default: 'There are no records to show'
            },
            emptyFilteredText: {
                type: String,
                default: 'There are no records matching your request'
            }
        },

        computed: {
            tableClass() {
                return [
                    'table',
                    this.striped ? 'table-striped' : '',
                    this.hover ? 'table-hover' : '',
                    this.inverse ? 'table-inverse' : '',
                    this.bordered ? 'table-bordered' : '',
                    this.responsive ? '.table-responsive' : '',
                    this.small ? 'table-sm' : ''
                ];
            },
            _items() {
                if (!this.items) {
                    return [];
                }

                if (this.itemsProvider) {
                    return this.itemsProvider(this);
                }

                let items = this.items.slice();

                // Apply filter
                if (this.filter) {
                    if (this.filter instanceof Function) {
                        items = items.filter(this.filter);
                    } else {
                        let regex;
                        if (this.filter instanceof RegExp) {
                            regex = this.filter;
                        } else {
                            regex = new RegExp('.*' + this.filter + '.*', 'ig');
                        }
                        items = items.filter(item => {
                            const test = regex.test(toString(item));
                            regex.lastIndex = 0;
                            return test;
                        });
                    }
                }

                // Apply Sort
                const sortCompare = this.sortCompare || defaultSortCompare;
                if (this.sortBy) {
                    items = items.sort((a, b) => {
                        const r = sortCompare(a, b, this.sortBy);
                        return this.sortDesc ? r : r * -1;
                    });
                }

                this.$emit('input', items);

                // Apply pagination
                if (this.perPage) {
                    items = items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
                }
                return items;
            }
        },
        methods: {
            rowClicked(item, index) {
                this.$emit('row-clicked', item, index);
            },
            headClick(field, key) {
                if (!field.sortable) {
                    this.sortBy = null;
                    return;
                }

                if (key === this.sortBy) {
                    this.sortDesc = !this.sortDesc;
                }

                this.sortBy = key;
            }
        }
    };
</script>


<style>
    /* https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap4.css */

    table thead > tr > th.sorting_asc, table thead > tr > th.sorting_desc, table thead > tr > th.sorting,
    table thead > tr > td.sorting_asc,
    table thead > tr > td.sorting_desc,
    table thead > tr > td.sorting,
    table tfoot > tr > th.sorting_asc, table tfoot > tr > th.sorting_desc, table tfoot > tr > th.sorting,
    table tfoot > tr > td.sorting_asc,
    table tfoot > tr > td.sorting_desc,
    table tfoot > tr > td.sorting {
        padding-right: 30px;
    }

    table thead > tr > th:active,
    table thead > tr > td:active,
    table tfoot > tr > th:active,
    table tfoot > tr > td:active {
        outline: none;
    }

    table thead .sorting,
    table thead .sorting_asc,
    table thead .sorting_desc,
    table thead .sorting_asc_disabled,
    table thead .sorting_desc_disabled,
    table tfoot .sorting,
    table tfoot .sorting_asc,
    table tfoot .sorting_desc,
    table tfoot .sorting_asc_disabled,
    table tfoot .sorting_desc_disabled {
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
    table thead .sorting_desc_disabled:after,
    table tfoot .sorting:before, table thead .sorting:after,
    table tfoot .sorting_asc:before,
    table tfoot .sorting_asc:after,
    table tfoot .sorting_desc:before,
    table tfoot .sorting_desc:after,
    table tfoot .sorting_asc_disabled:before,
    table tfoot .sorting_asc_disabled:after,
    table tfoot .sorting_desc_disabled:before,
    table tfoot .sorting_desc_disabled:after {
        position: absolute;
        bottom: 0.9em;
        display: block;
        opacity: 0.3;
    }

    table thead .sorting:before,
    table thead .sorting_asc:before,
    table thead .sorting_desc:before,
    table thead .sorting_asc_disabled:before,
    table thead .sorting_desc_disabled:before,
    table tfoot .sorting:before,
    table tfoot .sorting_asc:before,
    table tfoot .sorting_desc:before,
    table tfoot .sorting_asc_disabled:before,
    table tfoot .sorting_desc_disabled:before {
        right: 1em;
        content: "\2191";
    }

    table thead .sorting:after,
    table thead .sorting_asc:after,
    table thead .sorting_desc:after,
    table thead .sorting_asc_disabled:after,
    table thead .sorting_desc_disabled:after,
    table tfoot .sorting:after,
    table tfoot .sorting_asc:after,
    table tfoot .sorting_desc:after,
    table tfoot .sorting_asc_disabled:after,
    table tfoot .sorting_desc_disabled:after {
        right: 0.5em;
        content: "\2193";
    }

    table thead .sorting_asc:before,
    table thead .sorting_desc:after,
    table tfoot .sorting_asc:before,
    table tfoot .sorting_desc:after {
        opacity: 1;
    }

    table thead .sorting_asc_disabled:before,
    table thead .sorting_desc_disabled:after,
    table tfoot .sorting_asc_disabled:before,
    table tfoot .sorting_desc_disabled:after {
        opacity: 0;
    }
</style>
