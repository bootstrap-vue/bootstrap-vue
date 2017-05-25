<template>
    <table :id="id || null"
           role="grid"
           :class="tableClass"
    >
        <thead :class="headVariant ? ('thead-' + headVariant) : ''">
        <tr role="row">
            <th v-for="field,key in fields"
                @click="headClick(field,key)"
                @keydown.enter="headClick(field,key)"
                @keydown.space.prevent="headClick(field,key)"
                :class="fieldClass(field,key)"
                :aria-label="field.sortable ? (sortDesc ? labelSortAsc : labelSortDesc) : null"
                :aria-sort="(field.sortable && sortBy === key) ? (sortDesc ? 'descending' : 'ascending') : null"
                :tabindex="field.sortable?'0':null"
                v-html="field.label"
            ></th>
        </tr>
        </thead>
        <tfoot v-if="footClone" :class="footVariant ? ('thead-' + footVariant) : ''">
        <tr role="row">
            <th v-for="field,key in fields"
                @click="headClick(field,key)"
                @keydown.enter="headClick(field,key)"
                @keydown.space.prevent="headClick(field,key)"
                :class="fieldClass(field,key)"
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
            :key="items_key"
            :class="rowClass(item)"
            @click="rowClicked(item, index)"
        >
            <td v-for="(field,key) in fields"
                :class="cellClass(field)"
            >
                <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
            </td>
        </tr>
        <tr v-if="showEmpty && _items.length === 0" role="row">
            <td v-if="filter" :colspan="Object.keys(fields).length">
                <slot name="emptyfiltered">
                    <div class="text-center" v-html="emptyFilteredText"></div>
                </slot>
            </td>
            <td v-else :colspan="Object.keys(fields).length">
                <slot name="empty">
                    <div class="text-center" v-html="emptyText"></div>
                </slot>
            </td>
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

    const recToString = v => {
        if (!(v instanceof Object)) {
            return '';
        }

        // Exclude these fields from record stringification
        const exclude = {
            state: true,
            _rowVariant: true
        };

        return toString(Object.keys(v).filter(k => !exclude[k]).reduce((o, k) => { o[k] = v[k]; return o; }, {}));
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
            id: {
                type: String,
                default: ''
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
                    this.responsive ? 'table-responsive' : '',
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
                            const test = regex.test(recToString(item));
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
            fieldClass(field, key) {
                return [
                    field.sortable ? 'sorting' : '',
                    (field.sortable && this.sortBy === key) ? 'sorting_' + (this.sortDesc ? 'desc' : 'asc') : '',
                    field.variant ? ('table-' + field.variant) : '',
                    field.class ? field.class : '',
                    field.invisible ? 'invisible' : ''
                ];
            },
            cellClass(field) {
                    field.variant ? ('table-' + field.variant) : '',
                    field.class ? field.class : '',
                    field.invisible ? 'invisible' : ''
            },
            rowClass(item) {
                // Prefer item._rowVariant over deprecated item.state
                const variant = item._rowVariant || item.state || null;
                return [
                    variant ? ('table-' + variant) : ''
                ];
            },
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
    /* Based on https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap4.css */

    table > thead > tr > .sorting,
    table > tfoot > tr > .sorting {
        padding-right: 30px;
        cursor: pointer;
        position: relative;
    }

    table thead > tr > .sorting:before,
    table thead > tr > .sorting:after,
    table tfoot > tr > .sorting:before,
    table thead > tr > .sorting:after {
        position: absolute;
        bottom: 0.9em;
        display: block;
        opacity: 0.3;
    }

    table.table-sm > thead > tr > .sorting:before,
    table.table-sm > thead > tr > .sorting:after,
    table.table-sm > tfoot > tr > .sorting:before,
    table.table-sm > thead > tr > .sorting:after {
        bottom: 0.4em;
    }

    table > thead > tr > .sorting:before,
    table > tfoot > tr > .sorting:before {
        right: 1em;
        content: "\2191";
    }

    table > thead > tr > .sorting:after,
    table > tfoot > tr > .sorting:after {
        right: 0.5em;
        content: "\2193";
    }

    table > thead > tr > .sorting_asc:before,
    table > thead > tr > .sorting_desc:after,
    table > tfoot > tr > .sorting_asc:before,
    table > tfoot > tr > .sorting_desc:after {
        opacity: 1;
    }
</style>
