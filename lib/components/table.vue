<template>
    <table :id="id || null"
           :aria-busy="computedBusy ? 'true' : 'false'"
           :class="tableClass"
    >
        <thead :class="headClass">
        <tr>
            <th v-for="(field,key) in fields"
                @click.stop.prevent="headClicked($event,field,key)"
                @keydown.enter.stop.prevent="headClicked($event,field,key)"
                @keydown.space.stop.prevent="headClicked($event,field,key)"
                :key="key"
                :class="fieldClass(field,key)"
                :style="field.thStyle || {}"
                :aria-label="field.sortable ? ((localSortDesc && localSortBy === key) ? labelSortAsc : labelSortDesc) : null"
                :aria-sort="(field.sortable && localSortBy === key) ? (localSortDesc ? 'descending' : 'ascending') : null"
                :tabindex="field.sortable?'0':null"
            >
                <slot :name="'HEAD_'+key" :label="field.label" :column="key" :field="field">
                    <div v-html="field.label"></div>
                </slot>
            </th>
        </tr>
        </thead>
        <tfoot v-if="footClone" :class="footClass">
        <tr>
            <th v-for="(field,key) in fields"
                @click.stop.prevent="headClicked($event,field,key)"
                @keydown.enter.stop.prevent="headClicked($event,field,key)"
                @keydown.space.stop.prevent="headClicked($event,field,key)"
                :key="key"
                :class="fieldClass(field,key)"
                :style="field.thStyle || {}"
                :aria-label="field.sortable ? ((localSortDesc && localSortBy === key) ? labelSortAsc : labelSortDesc) : null"
                :aria-sort="(field.sortable && localSortBy === key) ? (localSortDesc ? 'descending' : 'ascending') : null"
                :tabindex="field.sortable?'0':null"
            >
                <slot v-if="$scopedSlots['FOOT_'+key]" :name="'FOOT_'+key" :label="field.label" :column="key"
                      :field="field">
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
            :key="index"
            :class="rowClass(item)"
            @click="rowClicked($event,item,index)"
            @dblclick="rowDblClicked($event,item,index)"
            @mouseenter="rowHovered($event,item,index)"
        >
            <template v-for="(field,key) in fields">
                <td v-if="!hasFormatter(field)" :class="tdClass(field, item, key)" :key="key">
                    <slot :name="key" :value="item[key]" :item="item" :index="index">{{item[key]}}</slot>
                </td>
                <td v-else :key="key" :class="tdClass(field, item, key)"
                    v-html="callFormatter(item, key, field)">
                </td>
            </template>
        </tr>
        <tr v-if="showEmpty && (!_items  || _items.length === 0)">
            <td :colspan="keys(fields).length">
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
    import { warn } from '../utils';
    import { keys } from '../utils/object.js';
    import { listenOnRootMixin } from '../mixins';

    const toString = v => {
        if (!v) {
            return '';
        }
        if (v instanceof Object) {
            return keys(v).map(k => toString(v[k])).join(' ');
        }
        return String(v);
    };

    const recToString = obj => {
        if (!(obj instanceof Object)) {
            return '';
        }

        return toString(keys(obj).reduce((o, k) => {
            // Ignore fields 'state' and ones that start with _
            if (!(/^_/.test(k) || k === 'state')) {
                o[k] = obj[k];
            }
            return o;
        }, {}));
    };

    const defaultSortCompare = (a, b, sortBy) => {
        if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
            return ((a[sortBy] < b[sortBy]) && -1) || ((a[sortBy] > b[sortBy]) && 1) || 0;
        }
        return toString(a[sortBy]).localeCompare(toString(b[sortBy]), undefined, {
            numeric: true
        });
    };

    export default {
        mixins: [listenOnRootMixin],
        data() {
            return {
                localSortBy: this.sortBy || '',
                localSortDesc: this.sortDesc || false,
                localItems: [],
                // Note: filteredItems only used to determine if # of items changed
                filteredItems: [],
                localBusy: this.busy
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
                    return [];
                }
            },
            sortBy: {
                type: String,
                default: null
            },
            sortDesc: {
                type: Boolean,
                default: false
            },
            apiUrl: {
                type: String,
                default: ''
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
            filteredItems(newVal, oldVal) {
                if (!this.providerFiltering && newVal.length !== oldVal.length) {
                    // Emit a filtered notification event, as number of filtered items has changed
                    this.$emit('filtered', newVal);
                }
            },
            sortDesc(newVal, oldVal) {
                if (newVal === this.localSortDesc) {
                    return;
                }
                this.localSortDesc = newVal || false;
            },
            localSortDesc(newVal, oldVal) {
                // Emit update to sort-desc.sync
                if (newVal !== oldVal) {
                    this.$emit('update:sortDesc', newVal);
                    if (!this.noProviderSorting) {
                        this._providerUpdate();
                    }
                }
            },
            sortBy(newVal, oldVal) {
                if (newVal === this.localSortBy) {
                    return;
                }
                this.localSortBy = newVal || null;
            },
            localSortBy(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$emit('update:sortBy', newVal);
                    if (!this.noProviderSorting) {
                        this._providerUpdate();
                    }
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
            },
            localBusy(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$emit('update:busy', newVal);
                }
             }
        },
        mounted() {
            this.localSortBy = this.sortBy;
            this.localSortDesc = this.sortDesc;
            this.localBusy = this.busy;
            if (this.hasProvider) {
                this._providerUpdate();
            }
            this.listenOnRoot('table::refresh', id => {
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
                    apiUrl: this.apiUrl,
                    sortBy: this.localSortBy,
                    sortDesc: this.localSortDesc
                };
            },
            _items() {
                // Grab some props/data to ensure reactivity
                const perPage = this.perPage;
                const currentPage = this.currentPage;
                const filter = this.filter;
                const sortBy = this.localSortBy;
                const sortDesc = this.localSortDesc;
                const sortCompare = this.sortCompare || defaultSortCompare;

                let items = this.hasProvider ? this.localItems : this.items;

                if (!items) {
                    this.$nextTick(this._providerUpdate);
                    return [];
                }

                // Shallow copy of items, so we don't mutate the original array order/size
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
                if (!this.providerFiltering) {
                    // Make a local copy of filtered items to trigger filtered event
                    this.filteredItems = items.slice();
                }

                // Apply local Sort
                if (sortBy && !this.providerSorting) {
                    items = items.sort((a, b) => {
                        const r = sortCompare(a, b, sortBy);
                        return sortDesc ? (r * -1) : r;
                    });
                }

                // Apply local pagination
                if (perPage && !this.providerPaging) {
                    // Grab the current page of data (which may be past filtered items)
                    items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
                }

                // Update the value model with the filtered/sorted/paginated data set
                this.$emit('input', items);
                return items;
            },
            computedBusy() {
                return this.busy || this.localBusy;
            }
        },
        methods: {
            keys,
            fieldClass(field, key) {
                return [
                    field.sortable ? 'sorting' : '',
                    (field.sortable && this.localSortBy === key) ? 'sorting_' + (this.localSortDesc ? 'desc' : 'asc') : '',
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
                return [
                    item._rowVariant ? ((this.inverse ? 'bg-' : 'table-') + item._rowVariant) : ''
                ];
            },
            rowClicked(e, item, index) {
                if (this.computedBusy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.$emit('row-clicked', item, index, e);
            },
            rowDblClicked(e, item, index) {
                if (this.computedBusy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.$emit('row-dblclicked', item, index, e);
            },
            rowHovered(e, item, index) {
                if (this.computedBusy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                this.$emit('row-hovered', item, index, e);
            },
            headClicked(e, field, key) {
                if (this.computedBusy) {
                    // If table is busy (via provider) then don't propagate
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                let sortChanged = false;
                if (field.sortable) {
                    if (key === this.localSortBy) {
                        // Change sorting direction on current column
                        this.localSortDesc = !this.localSortDesc;
                    } else {
                        // Start sorting this column ascending
                        this.localSortBy = key;
                        this.localSortDesc = false;
                    }
                    sortChanged = true;
                } else if (this.localSortBy) {
                    this.localSortBy = null;
                    this.localSortDesc = false;
                    sortChanged = true;
                }

                this.$emit('head-clicked', key, field, e);
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
                this.localBusy = false;
                this.$emit('refreshed');
                this.emitOnRoot('table::refreshed', this.id);
            },
            _providerUpdate() {
                // Refresh the provider items
                if (this.computedBusy || !this.hasProvider) {
                    // Don't refresh remote data if we are 'busy' or if no provider
                    return;
                }

                // Set internal busy state
                this.localBusy = true;

                // Call provider function with context and optional callback
                const data = this.items(this.context, this._providerSetLocal);

                if (!data) {
                    // Provider is using callback
                    return;
                } else if (data.then && typeof data.then === 'function') {
                    // Provider returned Promise
                    data.then(items => {
                        this._providerSetLocal(items);
                    });
                } else {
                    // Provider returned Array data
                    this._providerSetLocal(data);
                }
            },
            hasFormatter(field) {
                return field.formatter && ((typeof (field.formatter) === 'function') || (typeof (field.formatter) === 'string'));
            },
            callFormatter(item, key, field) {
                if (field.formatter && (typeof (field.formatter) === 'function'))
                    return field.formatter(item[key]);

                if (field.formatter && (typeof (this.$parent[field.formatter]) === 'function'))
                    return this.$parent[field.formatter](item[key]);
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
    table.b-table tfoot > tr > .sorting:after {
        position: absolute;
        bottom: 0.9em;
        display: block;
        opacity: 0.3;
    }

    table.b-table.table-sm > thead > tr > .sorting:before,
    table.b-table.table-sm > thead > tr > .sorting:after,
    table.b-table.table-sm > tfoot > tr > .sorting:before,
    table.b-table.table-sm > tfoot > tr > .sorting:after {
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

    table.b-table > thead > tr > .sorting_asc:after,
    table.b-table > thead > tr > .sorting_desc:before,
    table.b-table > tfoot > tr > .sorting_asc:after,
    table.b-table > tfoot > tr > .sorting_desc:before {
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
