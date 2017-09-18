<template>
    <table :id="id || null"
           :aria-busy="computedBusy ? 'true' : 'false'"
           :class="tableClasses">
        <thead :class="headClasses">
            <tr>
                <th v-for="field in computedFields"
                    @click.stop.prevent="headClicked($event,field)"
                    @keydown.enter.stop.prevent="headClicked($event,field)"
                    @keydown.space.stop.prevent="headClicked($event,field)"
                    :key="field.key"
                    :class="fieldClasses(field)"
                    :style="field.thStyle || {}"
                    :aria-label="field.sortable ? ((localSortDesc && localSortBy === field.key) ? labelSortAsc : labelSortDesc) : null"
                    :aria-sort="(field.sortable && localSortBy === field.key) ? (localSortDesc ? 'descending' : 'ascending') : null"
                    :tabindex="field.sortable?'0':null">
                    <slot :name="'HEAD_'+field.key"
                          :label="field.label"
                          :column="field.key"
                          :field="field">
                        <div v-html="field.label"></div>
                    </slot>
                </th>
            </tr>
        </thead>
        <tfoot v-if="footClone" :class="footClasses">
            <tr>
                <th v-for="field in computedFields"
                    @click.stop.prevent="headClicked($event,field)"
                    @keydown.enter.stop.prevent="headClicked($event,field)"
                    @keydown.space.stop.prevent="headClicked($event,field)"
                    :key="field.key"
                    :class="fieldClasses(field)"
                    :style="field.thStyle || {}"
                    :aria-label="field.sortable ? ((localSortDesc && localSortBy === field.key) ? labelSortAsc : labelSortDesc) : null"
                    :aria-sort="(field.sortable && localSortBy === field.key) ? (localSortDesc ? 'descending' : 'ascending') : null"
                    :tabindex="field.sortable?'0':null">
                    <slot v-if="$scopedSlots['FOOT_'+field.key]"
                          :name="'FOOT_'+field.key"
                          :label="field.label"
                          :column="field.key"
                          :field="field">
                        <div v-html="field.label"></div>
                    </slot>
                    <slot v-else
                          :name="'HEAD_'+field.key"
                          :label="field.label"
                          :column="field.key"
                          :field="field">
                        <div v-html="field.label"></div>
                    </slot>
                </th>
            </tr>
        </tfoot>
        <tbody>
            <tr v-if="$scopedSlots['top-row']">
                <slot name="top-row"
                      :columns="computedFields.length"
                      :fields="computedFields"></slot>
            </tr>
            <tr v-for="(item,index) in computedItems"
                :key="index"
                :class="rowClasses(item)"
                @click="rowClicked($event,item,index)"
                @dblclick="rowDblClicked($event,item,index)"
                @mouseenter="rowHovered($event,item,index)">
                <template v-for="field in computedFields">
                    <td v-if="$scopedSlots[field.key]"
                        :class="tdClasses(field, item)"
                        :key="field.key">
                        <slot :name="field.key"
                              :value="getFormattedValue(item, field)"
                              :unformatted="item[field.key]"
                              :item="item"
                              :index="index"
                        ></slot>
                    </td>
                    <td v-else
                        :class="tdClasses(field, item)"
                        :key="field.key"
                        v-html="getFormattedValue(item, field)"
                    ></td>
                </template>
            </tr>
            <tr v-if="showEmpty && (!computedItems || computedItems.length === 0)">
                <td :colspan="computedFields.length">
                    <div v-if="filter"
                         role="alert"
                         aria-live="polite">
                        <slot name="emptyfiltered">
                            <div class="text-center my-2" v-html="emptyFilteredText"></div>
                        </slot>
                    </div>
                    <div v-else
                         role="alert"
                         aria-live="polite">
                        <slot name="empty">
                            <div class="text-center my-2" v-html="emptyText"></div>
                        </slot>
                    </div>
                </td>
            </tr>
            <tr v-if="$scopedSlots['bottom-row']">
                <slot name="bottom-row"
                      :columns="computedfields.length"
                      :fields="computedFields"></slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { warn, pluckProps, looseEqual } from '../utils';
import { keys, assign } from '../utils/object';
import { isArray } from '../utils/array'
import { listenOnRootMixin } from '../mixins';
import startCase from 'lodash.startcase';

function toString(v) {
    if (!v) {
        return '';
    }
    if (v instanceof Object) {
        return keys(v).map(k => toString(v[k])).join(' ');
    }
    return String(v);
}

function recToString(obj) {
    if (!(obj instanceof Object)) {
        return '';
    }

    return toString(keys(obj).reduce((o, k) => {
        // Ignore fields that start with _
        if (!/^_/.test(k)) {
            o[k] = obj[k];
        }
        return o;
    }, {}));
}

function defaultSortCompare(a, b, sortBy) {
    if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
        return ((a[sortBy] < b[sortBy]) && -1) || ((a[sortBy] > b[sortBy]) && 1) || 0;
    }
    return toString(a[sortBy]).localeCompare(toString(b[sortBy]), undefined, {
        numeric: true
    });
}

function processField(key, value) {
    let field = null;
    if (typeof value === 'string') {
        // Label shortcut
        field = { key: key, label: startCase(value) };
    } else if (typeof value === 'function') {
        // Formatter shortcut
        field = { key: key, formatter: value };
    } else if (typeof value === 'object') {
        field = assign({}, value);
        field.key = field.key || key;
    } else if (value !== false) {
        // Fallback to just key
        field = { key: key };
    }
    return field;
}

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
            type: [Object, Array],
            default: null
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
        fixed: {
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
        noLocalSorting: {
            type: Boolean,
            default: false
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
        context(newVal, oldVal) {
            if(!looseEqual(newVal, oldVal)) {
                this.$emit('context-changed', newVal);
            }
        },
        filteredItems(newVal, oldVal) {
            if (this.localFiltering && newVal.length !== oldVal.length) {
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
        this.listenOnRoot('bv::refresh::table', id => {
            if (id === this.id || id === this) {
                this._providerUpdate();
            }
        });
    },
    computed: {
        tableClasses() {
            return [
                'table',
                'b-table',
                this.striped ? 'table-striped' : '',
                this.hover ? 'table-hover' : '',
                this.inverse ? 'table-inverse' : '',
                this.bordered ? 'table-bordered' : '',
                this.responsive ? 'table-responsive' : '',
                this.fixed ? 'table-fixed' : '',
                this.small ? 'table-sm' : ''
            ];
        },
        headClasses() {
            return this.headVariant ? 'thead-' + this.headVariant : '';
        },
        footClasses() {
            const variant = this.footVariant || this.headVariant || null;
            return variant ? 'thead-' + variant : '';
        },
        hasProvider() {
            return this.items instanceof Function;
        },
        localFiltering() {
            return this.hasProvider ? this.noProviderFiltering : true;
        },
        localSorting() {
            return this.hasProvider ? this.noProviderSorting : !this.noLocalSorting;
        },
        localPaging() {
            return this.hasProvider ? this.noProviderPaging : true;
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
        computedFields() {
            // We normalize fields into an array of objects
            // [ { key:..., label:..., ...}, {...}, ..., {..}]
            let fields = [];

            if (isArray(this.fields)) {
                // Normalize array Form
                this.fields.filter(f => f).forEach(f => {
                    if (typeof f === 'string') {
                        fields.push({ key: f, label: startCase(f) });
                    } else if (typeof f === 'object' && f.key && typeof f.key === 'string') {
                        // Full object definition. We use assign so that we don't mutate the original
                        fields.push(assign({}, f));
                    } else if (typeof f === 'object' && keys(f).length === 1) {
                        // Shortcut object (i.e. { 'foo_bar': 'This is Foo Bar' }
                        const key = keys(f)[0];
                        const field = processField(key, f[key]);
                        if (field) {
                            fields.push(field);
                        }
                    }
                })
            } else if (this.fields && typeof this.fields === 'object' && keys(this.fields).length > 0) {
                // Normalize object Form
                keys(this.fields).forEach(key => {
                    let field = processField(key, this.fields[key])
                    if (field) {
                        fields.push(field);
                    }
                });
            }

            // If no field provided, take a sample from first record (if exits)
            if (fields.length === 0 && this.computedItems.length > 0) {
                const sample = this.computedItems[0]
                keys(sample).forEach(k => {
                    fields.push({ key: k , label: startCase(k)});
                });
            }

            // Ensure we have a unique array of fields and that htey have labels
            const memo = {};
            return fields.filter(f => {
                if (!memo[f.key]) {
                    memo[f.key] = true;
                    f.label = f.label || startCase(f.key);
                    return true;
                } else {
                    return false;
                }
            });
        },
        computedItems() {
            // Grab some props/data to ensure reactivity
            const perPage = this.perPage;
            const currentPage = this.currentPage;
            const filter = this.filter;
            const sortBy = this.localSortBy;
            const sortDesc = this.localSortDesc;
            const sortCompare = this.sortCompare;
            const localFiltering = this.localFiltering;
            const localSorting = this.localSorting;
            const localPaging = this.localPaging;

            let items = this.hasProvider ? this.localItems : this.items;

            if (!items) {
                this.$nextTick(this._providerUpdate);
                return [];
            }

            // Array copy for sorting, filtering, etc.
            items = items.slice();

            // Apply local filter
            if (filter && localFiltering) {
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
            if (localFiltering) {
                // Make a local copy of filtered items to trigger filtered event
                this.filteredItems = items.slice();
            }

            // Apply local Sort
            if (sortBy && localSorting) {
                items = items.sort(function sortItemsFn(a, b) {
                    let ret = null;
                    if (typeof sortCompare === 'function') {
                        // Call user provided sortCompare routine
                        ret = sortCompare(a, b, sortBy);
                    }
                    if (ret === null || ret === undefined) {
                        // Fallback to defaultSortCompare if sortCompare not defined or returns null
                        ret = defaultSortCompare(a, b, sortBy);
                    }
                    // Handle sorting direction
                    return (ret || 0) * (sortDesc ? -1 : 1);
                });
            }

            // Apply local pagination
            if (Boolean(perPage) && localPaging) {
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
        fieldClasses(field) {
            return [
                field.sortable ? 'sorting' : '',
                (field.sortable && this.localSortBy === field.key) ? 'sorting_' + (this.localSortDesc ? 'desc' : 'asc') : '',
                field.variant ? ('table-' + field.variant) : '',
                field.class ? field.class : '',
                field.thClass ? field.thClass : ''
            ];
        },
        tdClasses(field, item) {
            let cellVariant = '';
            if (item._cellVariants && item._cellVariants[field.key]) {
                cellVariant = (this.inverse ? 'bg-' : 'table-') + item._cellVariants[field.key];
            }
            return [
                (field.variant && !cellVariant) ? ((this.inverse ? 'bg-' : 'table-') + field.variant) : '',
                cellVariant,
                field.class ? field.class : '',
                field.tdClass ? field.tdClass : ''
            ];
        },
        rowClasses(item) {
            return [
                item._rowVariant ? ((this.inverse ? 'bg-' : 'table-') + item._rowVariant) : ''
            ];
        },
        rowClicked(e, item, index) {
            if (this.stopIfBusy(e)) {
                // If table is busy (via provider) then don't propagate
                return;
            }
            this.$emit('row-clicked', item, index, e);
        },
        rowDblClicked(e, item, index) {
            if (this.stopIfBusy(e)) {
                // If table is busy (via provider) then don't propagate
                return;
            }
            this.$emit('row-dblclicked', item, index, e);
        },
        rowHovered(e, item, index) {
            if (this.stopIfBusy(e)) {
                // If table is busy (via provider) then don't propagate
                return;
            }
            this.$emit('row-hovered', item, index, e);
        },
        headClicked(e, field) {
            if (this.stopIfBusy(e)) {
                // If table is busy (via provider) then don't propagate
                return;
            }
            let sortChanged = false;
            if (field.sortable) {
                if (field.key === this.localSortBy) {
                    // Change sorting direction on current column
                    this.localSortDesc = !this.localSortDesc;
                } else {
                    // Start sorting this column ascending
                    this.localSortBy = field.key;
                    this.localSortDesc = false;
                }
                sortChanged = true;
            } else if (this.localSortBy) {
                this.localSortBy = null;
                this.localSortDesc = false;
                sortChanged = true;
            }

            this.$emit('head-clicked', field.key, field, e);
            if (sortChanged) {
                // Sorting parameters changed
                this.$emit('sort-changed', this.context);
            }
        },
        stopIfBusy(evt) {
            if (this.computedBusy) {
                // If table is busy (via provider) then don't propagate
                evt.preventDefault();
                evt.stopPropagation();
                return true;
            }
            return false;
        },
        refresh() {
            // Expose refresh method
            if (this.hasProvider) {
                this._providerUpdate();
            }
        },
        _providerSetLocal(items) {
            this.localItems = items && items.length > 0 ? items.slice() : [];
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

            if (data) if (data.then && typeof data.then === 'function') {
                // Provider returned Promise
                data.then(items => {
                    this._providerSetLocal(items);
                });
            } else {
                // Provider returned Array data
                this._providerSetLocal(data);
            }
        },
        getFormattedValue(item, field) {
            const key = field.key;
            const formatter = field.formatter;
            const parent = this.$parent;
            let value = item[key];
            if (formatter) {
                if (typeof formatter === 'function') {
                    value = formatter(value, key, item);
                } else if (typeof formatter === 'string' && typeof parent[formatter] === 'function') {
                    value = parent[formatter](value, key, item);
                }
            }
            return value;
        }
    }
}
</script>

<style>
    /* Add support for fixed layout table */
    table.b-table.table-fixed {
        table-layout: fixed;
    }

    /* Sort styling */
    table.b-table>thead>tr>th,
    table.b-table>tfoot>tr>th {
        position: relative;
    }

    table.b-table>thead>tr>th.sorting,
    table.b-table>tfoot>tr>th.sorting {
        padding-right: 1.5em;
        cursor: pointer;
    }

    table.b-table thead>tr>th.sorting:before,
    table.b-table thead>tr>th.sorting:after,
    table.b-table tfoot>tr>th.sorting:before,
    table.b-table tfoot>tr>th.sorting:after {
        position: absolute;
        bottom: 0;
        display: block;
        opacity: 0.4;
        padding-bottom: inherit;
        font-size: inherit;
        line-height: 180%
    }

    table.b-table>thead>tr>th.sorting:before,
    table.b-table>tfoot>tr>th.sorting:before {
        right: 0.75em;
        content: "\2191";
    }

    table.b-table>thead>tr>th.sorting:after,
    table.b-table>tfoot>tr>th.sorting:after {
        right: 0.25em;
        content: "\2193";
    }

    table.b-table>thead>tr>th.sorting_asc:after,
    table.b-table>thead>tr>th.sorting_desc:before,
    table.b-table>tfoot>tr>th.sorting_asc:after,
    table.b-table>tfoot>tr>th.sorting_desc:before {
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
