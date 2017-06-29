<template>
    <table :id="id || null"
           role="grid"
           :aria-busy="busy ? 'true' : 'false'"
           :class="tableClass"
    >
        <thead :class="headClass">
            <tr role="row">
                <th v-for="(field,key) in fields"
                    @click.stop.prevent="headClicked($event,field,key)"
                    @keydown.enter.stop.prevent="headClicked($event,field,key)"
                    @keydown.space.stop.prevent="headClicked($event,field,key)"
                    :key="key"
                    :class="fieldClass(field,key)"
                    :style="field.thStyle || {}"
                    :aria-label="field.sortable ? ((sortDesc && sortBy === key) ? labelSortAsc : labelSortDesc) : null"
                    :aria-sort="(field.sortable && sortBy === key) ? (sortDesc ? 'descending' : 'ascending') : null"
                    :tabindex="field.sortable?'0':null"
                >
                  <slot :name="'HEAD_'+key" :label="field.label" :column="key" :field="field">
                    <div v-html="field.label"></div>
                  </slot>
                </th>
            </tr>
        </thead>
        <tfoot v-if="footClone" :class="footClass">
            <tr role="row">
                <th v-for="(field,key) in fields"
                    @click.stop.prevent="headClicked($event,field,key)"
                    @keydown.enter.stop.prevent="headClicked($event,field,key)"
                    @keydown.space.stop.prevent="headClicked($event,field,key)"
                    :key="key"
                    :class="fieldClass(field,key)"
                    :style="field.thStyle || {}"
                    :aria-label="field.sortable ? ((sortDesc && sortBy === key) ? labelSortAsc : labelSortDesc) : null"
                    :aria-sort="(field.sortable && sortBy === key) ? (sortDesc ? 'descending' : 'ascending') : null"
                    :tabindex="field.sortable?'0':null"
                >
                  <slot v-if="$scopedSlots['FOOT_'+key]" :name="'FOOT_'+key" :label="field.label" :column="key" :field="field">
                    <div v-html="field.label"></div>
                  </slot>
                  <slot v-else :name="'HEAD_'+key" :label="field.label" :column="key" :field="field">
                    <div v-html="field.label"></div>
                  </slot>
                </th>
            </tr>
        </tfoot>
        <tbody>
            <tr v-for="(item,index) in _items"
                role="row"
                :key="index"
                :class="rowClass(item)"
                @click="rowClicked($event,item,index)"
                @hover="rowHovered($event,item,index)"
            >
                <td v-for="(field,key) in fields" :key="key" :class="tdClass(field, item, key)">
                    <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
                </td>
            </tr>
            <tr v-if="showEmpty && (!_items  || _items.length === 0)" role="row">
                <td :colspan="Object.keys(fields).length">
                    <div v-if="filter" role="alert" aria-live="polite">
                        <slot name="emptyfiltered">
                            <div class="text-center my-2" v-html="emptyFilteredText"></div>
                        </slot>
                    </div>
                    <div v-else role="alert" aria-live="polite">
                        <slot name="empty">
                            <div class="text-center my-2" v-html="emptyText"></div>
                        </slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import warn from '../utils/warn';

    const toString = v => {
        if (!v) {
            return '';
        }
        if (v instanceof Object) {
            return Object.keys(v).map(k => toString(v[k])).join(' ');
        }
        return String(v);
    };

    const recToString = (obj) => {
        if (!(obj instanceof Object)) {
            return '';
        }

        // Exclude these fields from record stringification
        const exclude = { state: true, _rowVariant: true };

        return toString(Object.keys(obj).reduce((o, k) => {
          if (!exclude[k]) {
            o[k] = obj[k];
          }
          return o;
        }, {}));
    };

    const defaultSortCompare = (a, b, sortBy) => {
        if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
            if (a[sortBy] < b[sortBy]) {
                return -1;
            } else if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            return 0;
        } else {
            return toString(a[sortBy]).localeCompare(toString(b[sortBy]), undefined, {
                numeric: true
            });
        }
    };

    export default {
        data() {
            return {
                sortBy: null,
                sortDesc: true,
                localItems: []
            };
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            items: {
                type: [Array, Function],
                default() {
                    if (this && this.itemsProvider) {
                        // Deprecate itemsProvider
                        warn('b-table: prop items-provider has been deprecated. Pass a function to items instead');
                        return this.itemsProvider;
                    }
                    return [];
                }
            },
            fields: {
                type: Object,
                default: {}
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
                // Deprecated in favour of items
                type: Function,
                default: null
            },
            noProviderPaging: {
                type: Boolean,
                default: false
            },
            noProviderSorting: {
                type: Boolean,
                default: false
            },
            noProviderFiltering: {
                type: Boolean,
                default: false
            },
            busy: {
                type: Boolean,
                default: false
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
        watch: {
            items(newVal, oldVal) {
                if (oldVal !== newVal) {
                    this._providerUpdate();
                }
            },
            sortDesc(newVal, oldVal) {
                if (oldVal !== newVal && !this.noProviderSorting) {
                    this._providerUpdate();
                }
            },
            sortBy(newVal, oldVal) {
                if (oldVal !== newVal && !this.noProviderSorting) {
                    this._providerUpdate();
                }
            },
            perPage(newVal, oldVal) {
                if (oldVal !== newVal && !this.noProviderPaging) {
                    this._providerUpdate();
                }
            },
            currentPage(newVal, oldVal) {
                if (oldVal !== newVal && !this.noProviderPaging) {
                    this._providerUpdate();
                }
            },
            filter(newVal, oldVal) {
                if (oldVal !== newVal && !this.noProviderFiltering) {
                    this._providerUpdate();
                }
            }
        },
        mounted() {
            if (this.hasProvider) {
                this._providerUpdate();
            }
            this.$root.$on('table::refresh', (id) => {
                if (id === this.id) {
                    this._providerUpdate();
                }
            });
        },
        computed: {
            tableClass() {
                return [
                    'table',
                    'b-table',
                    this.striped ? 'table-striped' : '',
                    this.hover ? 'table-hover' : '',
                    this.inverse ? 'table-inverse' : '',
                    this.bordered ? 'table-bordered' : '',
                    this.responsive ? 'table-responsive' : '',
                    this.small ? 'table-sm' : ''
                ];
            },
            headClass() {
                return this.headVariant ? 'thead-' + this.headVariant : '';
            },
            footClass() {
                const variant = this.footVariant || this.headVariant || null;
                return variant ? 'thead-' + variant : '';
            },
            hasProvider() {
                return this.items instanceof Function;
            },
            providerFiltering() {
                return Boolean(this.hasProvider && !this.noProviderFiltering);
            },
            providerSorting() {
                return Boolean(this.hasProvider && !this.noProviderSorting);
            },
            providerPaging() {
                return Boolean(this.hasProvider && !this.noProviderPaging);
            },
            context() {
                return {
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                    filter: this.filter,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                };
            },
            _items() {
                // Grab some props/data to ensure reactivity
                const perPage = this.perPage;
                const currentPage = this.currentPage;
                const filter = this.filter;
                const sortBy = this.sortBy;
                const sortDesc = this.sortDesc;
                const sortCompare = this.sortCompare || defaultSortCompare;

                let items = this.hasProvider ? this.localItems : this.items;

                if (!items) {
                    this.$nextTick(this._providerUpdate);
                    return [];
                }

                items = items.slice();

                // Apply local filter
                if (filter && !this.providerFiltering) {
                    if (filter instanceof Function) {
                        items = items.filter(filter);
                    } else {
                        let regex;
                        if (filter instanceof RegExp) {
                            regex = filter;
                        } else {
                            regex = new RegExp('.*' + filter + '.*', 'ig');
                        }
                        items = items.filter(item => {
                            const test = regex.test(recToString(item));
                            regex.lastIndex = 0;
                            return test;
                        });
                    }
                }

                // Apply local Sort
                if (this.sortBy && !this.providerSorting) {
                    items = items.sort((a, b) => {
                        const r = sortCompare(a, b, this.sortBy);
                        return this.sortDesc ? r : r * -1;
                    });
                }

                // Apply local pagination
                if (perPage && !this.providerPaging) {
                    items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
                }

                // Update the value model with the filtered/sorted/paginated data set
                this.$emit('input', items);
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
                    field.thClass ? field.thClass : ''
                ];
            },
            tdClass(field, item, key) {
                let cellVariant = '';
                if (item._cellVariants && item._cellVariants[key]) {
                    cellVariant = (this.inverse ? 'bg-' : 'table-') + item._cellVariants[key];
                }
                return [
                    (field.variant && !cellVariant) ? ((this.inverse ? 'bg-' : 'table-') + field.variant) : '',
                    cellVariant,
                    field.class ? field.class : '',
                    field.tdClass ? field.tdClass : ''
                ];
            },
            rowClass(item) {
                // Prefer item._rowVariant over deprecated item.state
                const variant = item._rowVariant || item.state || null;
                return [
                    variant ? ((this.inverse ? 'bg-' : 'table-') + variant) : ''
                ];
            },
            rowClicked(e, item, index) {
                if (this.busy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.$emit('row-clicked', item, index);
            },
            rowHovered(e, item, index) {
                if (this.busy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.$emit('row-hovered', item, index);
            },
            headClicked(e, field, key) {
                if (this.busy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                let sortChanged = false;
                if (!field.sortable) {
                    if (this.sortBy) {
                        this.sortBy = null;
                        sortChanged = true;
                    }
                } else {
                    if (key === this.sortBy) {
                        // Change sorting direction on column
                        this.sortDesc = !this.sortDesc;
                    } else {
                        // Start sorting this column descending
                        this.sortBy = key;
                        this.sortDesc = true;
                    }
                    sortChanged = true;
                }
                this.$emit('head-clicked', key, field);
                if (sortChanged) {
                    // Sorting parameters changed
                    this.$emit('sort-changed', this.context);
                }
            },
            refresh() {
                // Expose refresh method
                if (this.hasProvider) {
                    this._providerUpdate();
                }
            },
            _providerSetLocal(items) {
                this.localItems = (items && items.length > 0) ? items.slice() : [];
                this.$emit('refreshed');
                this.$root.$emit('table::refreshed', this.id);
            },
            _providerUpdate() {
                // Refresh the provider items
                if (this.busy || !this.hasProvider) {
                    // Don't refresh remote data if we are 'busy' or if no provider
                    return;
                }

                // Call provider function with context and optional callback
                const data = this.items(this.context, this._providerSetLocal);

                if (!data) {
                    // Provider is using callback
                    return;
                }

                if (data.then && typeof data.then === 'function') {
                    // Provider returned Promise
                    data.then((items) => {
                        this._providerSetLocal(items);
                    });
                } else {
                    // Provider returned Array data
                    this._providerSetLocal(data);
                }
            }
        }
    };
</script>

<style>
    /* Based on https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap4.css */

    table.b-table > thead > tr > .sorting,
    table.b-table > tfoot > tr > .sorting {
        padding-right: 30px;
        cursor: pointer;
        position: relative;
    }

    table.b-table thead > tr > .sorting:before,
    table.b-table thead > tr > .sorting:after,
    table.b-table tfoot > tr > .sorting:before,
    table.b-table thead > tr > .sorting:after {
        position: absolute;
        bottom: 0.9em;
        display: block;
        opacity: 0.3;
    }

    table.b-table.table-sm > thead > tr > .sorting:before,
    table.b-table.table-sm > thead > tr > .sorting:after,
    table.b-table.table-sm > tfoot > tr > .sorting:before,
    table.b-table.table-sm > thead > tr > .sorting:after {
        bottom: 0.45em;
    }

    table.b-table > thead > tr > .sorting:before,
    table.b-table > tfoot > tr > .sorting:before {
        right: 1em;
        content: "\2191";
    }

    table.b-table > thead > tr > .sorting:after,
    table.b-table > tfoot > tr > .sorting:after {
        right: 0.5em;
        content: "\2193";
    }

    table.b-table > thead > tr > .sorting_asc:before,
    table.b-table > thead > tr > .sorting_desc:after,
    table.b-table > tfoot > tr > .sorting_asc:before,
    table.b-table > tfoot > tr > .sorting_desc:after {
        opacity: 1;
    }

    /* Busy table styling */

    table.b-table[aria-busy="false"] {
        opacity: 1;
    }

    table.b-table[aria-busy="true"] {
        opacity: .6;
    }
</style>
