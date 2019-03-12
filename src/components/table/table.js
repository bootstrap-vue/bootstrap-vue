// Utilities
import looseEqual from '../../utils/loose-equal'
import stableSort from '../../utils/stable-sort'
import { arrayIncludes, isArray } from '../../utils/array'

// Table helper functions
import normalizeFields from './helpers/normalize-fields'
import stringifyRecordValues from './helpers/stringify-record-values'
import defaultSortCompare from './helpers/default-sort-compare'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper mixins
import captionMixin from './helpers/mixin-caption'
import colgroupMixin from './helpers/mixin-colgroup'
import theadMixin from './helpers/mixin-thead'
import tfootMixin from './helpers/mixin-tfoot'
import tbodyMixin from './helpers/mixin-tbody'
import busyMixin from './helpers/mixin-busy'
import selectableMixin from './helpers/mixin-selectable'
import providerMixin from './helpers/mixin-provider'

// b-table component definition
// @vue/component
export default {
  name: 'BTable',
  mixins: [
    idMixin,
    normalizeSlotMixin,
    busyMixin,
    captionMixin,
    colgroupMixin,
    theadMixin,
    tfootMixin,
    tbodyMixin,
    selectableMixin,
    providerMixin
  ],
  // Don't place ATTRS on root element automatically, as table could be wrapped in responsive div
  inheritAttrs: false,
  props: {
    items: {
      type: [Array, Function],
      default() /* istanbul ignore next */ {
        return []
      }
    },
    fields: {
      type: [Object, Array],
      default: null
    },
    primaryKey: {
      // Primary key for record.
      // If provided the value in each row must be unique!!!
      type: String,
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
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
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
    fixed: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: [Boolean, String],
      default: false
    },
    sortBy: {
      type: String,
      default: null
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc',
      validator: direction => arrayIncludes(['asc', 'desc', 'last'], direction)
    },
    sortCompare: {
      type: Function,
      default: null
    },
    noSortReset: {
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
    perPage: {
      type: [Number, String],
      default: 0
    },
    currentPage: {
      type: [Number, String],
      default: 1
    },
    filter: {
      type: [String, RegExp, Object, Array, Function],
      default: null
    },
    filterFunction: {
      type: Function,
      default: null
    },
    noLocalSorting: {
      type: Boolean,
      default: false
    },
    noFooterSorting: {
      type: Boolean,
      default: false
    },
    value: {
      // v-model for retrieving the current displayed rows
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // Mixins will also add to data
      localSortBy: this.sortBy || '',
      localSortDesc: this.sortDesc || false,
      // Our local copy of the items. Must be an array
      localItems: isArray(this.items) ? this.items.slice() : [],
      // Flag for displaying which empty slot to show, and for some event triggering.
      isFiltered: false
    }
  },
  computed: {
    // Layout related computed props
    isStacked() {
      return this.stacked === '' ? true : this.stacked
    },
    isResponsive() {
      const responsive = this.responsive === '' ? true : this.responsive
      return this.isStacked ? false : responsive
    },
    responsiveClass() {
      return this.isResponsive === true
        ? 'table-responsive'
        : this.isResponsive
          ? `table-responsive-${this.responsive}`
          : ''
    },
    tableClasses() {
      return {
        'table-striped': this.striped,
        'table-hover': this.hover,
        'table-dark': this.dark,
        'table-bordered': this.bordered,
        'table-borderless': this.borderless,
        'table-sm': this.small,
        border: this.outlined,
        // The following are b-table custom styles
        'b-table-fixed': this.fixed,
        'b-table-stacked': this.stacked === true || this.stacked === '',
        [`b-table-stacked-${this.stacked}`]: this.stacked !== true && this.stacked,
        'b-table-selectable': this.selectable
      }
    },
    // Items related computed props
    localFiltering() {
      return this.hasProvider ? !!this.noProviderFiltering : true
    },
    localSorting() {
      return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting
    },
    localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true
    },
    context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: this.perPage,
        currentPage: this.currentPage,
        apiUrl: this.apiUrl
      }
    },
    computedFields() {
      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      return normalizeFields(this.fields, this.localItems)
    },
    filteredCheck() {
      // For watching changes to filteredItems vs localItems
      return {
        filteredItems: this.filteredItems,
        localItems: this.localItems,
        localFilter: this.localFilter
      }
    },
    localFilter() {
      // Returns a sanitized/normalized version of filter prop
      if (typeof this.filter === 'function') {
        // this.localFilterFn will contain the correct function ref.
        // Deprecate setting prop filter to a function
        /* istanbul ignore next */
        return ''
      } else if (
        typeof this.filterFunction !== 'function' &&
        !(typeof this.filter === 'string' || this.filter instanceof RegExp)
      ) {
        // Using internal filter function, which only accepts string or regexp at the moment
        return ''
      } else {
        // Could be a string, object or array, as needed by external filter function
        return this.filter
      }
    },
    localFilterFn() {
      let filter = this.filter
      let filterFn = this.filterFunction
      // Sanitized/normalize filter-function prop
      if (typeof filterFn === 'function') {
        return filterFn
      } else if (typeof filter === 'function') {
        // Deprecate setting prop filter to a function
        /* istanbul ignore next */
        return filter
      } else {
        // no filterFunction, so signal to use internal filter function
        return null
      }
    },
    filteredItems() {
      // Returns the records in localItems that match the filter criteria.
      // Returns the original localItems array if not sorting
      let items = this.localItems || []
      const criteria = this.localFilter
      const filterFn =
        this.filterFnFactory(this.localFilterFn, criteria) || this.defaultFilterFnFactory(criteria)

      // We only do local filtering if requested, and if the are records to filter and
      // if a filter criteria was specified
      if (this.localFiltering && filterFn && items.length > 0) {
        items = items.filter(filterFn)
      }
      return items
    },
    sortedItems() {
      // Sorts the filtered items and returns a new array of the sorted items
      // or the original items array if not sorted.
      let items = this.filteredItems || []
      const sortBy = this.localSortBy
      const sortDesc = this.localSortDesc
      const sortCompare = this.sortCompare
      const localSorting = this.localSorting
      if (sortBy && localSorting) {
        // stableSort returns a new array, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = null
          if (typeof sortCompare === 'function') {
            // Call user provided sortCompare routine
            result = sortCompare(a, b, sortBy, sortDesc)
          }
          if (result === null || result === undefined || result === false) {
            // Fallback to built-in defaultSortCompare if sortCompare
            // is not defined or returns null/false
            result = defaultSortCompare(a, b, sortBy)
          }
          // Negate result if sorting in descending order
          return (result || 0) * (sortDesc ? -1 : 1)
        })
      }
      return items
    },
    paginatedItems() {
      let items = this.sortedItems || []
      const currentPage = Math.max(parseInt(this.currentPage, 10) || 1, 1)
      const perPage = Math.max(parseInt(this.perPage, 10) || 0, 0)
      // Apply local pagination
      if (this.localPaging && !!perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage)
      }
      // Return the items to display in the table
      return items
    },
    computedItems() {
      return this.paginatedItems || []
    }
  },
  watch: {
    // Watch props for changes and update local values
    items(newItems) {
      if (this.hasProvider || newItems instanceof Function) {
        this.$nextTick(this._providerUpdate)
      } else if (isArray(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice()
      } else {
        /* istanbul ignore next */
        this.localItems = []
      }
    },
    sortDesc(newVal, oldVal) {
      if (newVal === this.localSortDesc) {
        /* istanbul ignore next */
        return
      }
      this.localSortDesc = newVal || false
    },
    sortBy(newVal, oldVal) {
      if (newVal === this.localSortBy) {
        /* istanbul ignore next */
        return
      }
      this.localSortBy = newVal || null
    },
    // Update .sync props
    localSortDesc(newVal, oldVal) {
      // Emit update to sort-desc.sync
      if (newVal !== oldVal) {
        this.$emit('update:sortDesc', newVal)
      }
    },
    localSortBy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:sortBy', newVal)
      }
    },
    // Watch for changes on computedItems and update the v-model
    computedItems(newVal, oldVal) {
      this.$emit('input', newVal)
    },
    // Watch for changes to the filter criteria and filtered items vs localItems).
    // And set visual state and emit events as required
    filteredCheck({ filteredItems, localItems, localFilter }) {
      // Determine if the dataset is filtered or not
      let isFiltered
      if (!localFilter) {
        // If filter criteria is falsey
        isFiltered = false
      } else if (looseEqual(localFilter, []) || looseEqual(localFilter, {})) {
        // If filter criteria is an empty array or object
        isFiltered = false
      } else if (localFilter) {
        // if Filter criteria is truthy
        isFiltered = true
      } else {
        isFiltered = false
      }
      if (isFiltered) {
        this.$emit('filtered', filteredItems, filteredItems.length)
      }
      this.isFiltered = isFiltered
    },
    isFiltered(newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        // We need to emit a filtered event if isFiltered transitions from true to
        // false so that users can update their pagination controls.
        this.$emit('filtered', this.localItems, this.localItems.length)
      }
    },
    context(newVal, oldVal) {
      // Emit context info for external paging/filtering/sorting handling
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context-changed', newVal)
      }
    }
  },
  mounted() {
    // Initially update the v-model of displayed items
    this.$emit('input', this.computedItems)
  },
  methods: {
    // Filter Function factories
    filterFnFactory(filterFn, criteria) {
      // Wrapper factory for external filter functions.
      // Wrap the provided filter-function and return a new function.
      // returns null if no filter-function defined or if criteria is falsey.
      // Rather than directly grabbing this.computedLocalFilterFn or this.filterFunction
      // We have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (!filterFn || !criteria || typeof filterFn !== 'function') {
        return null
      }

      // Build the wrapped filter test function, passing the criteria to the provided function
      const fn = item => {
        // Generated function returns true if the criteria matches part
        // of the serialized data, otherwise false
        return filterFn(item, criteria)
      }

      // Return the wrapped function
      return fn
    },
    defaultFilterFnFactory(criteria) {
      // Generates the default filter function, using the given filter criteria
      if (!criteria || !(typeof criteria === 'string' || criteria instanceof RegExp)) {
        // Built in filter can only support strings or RegExp criteria (at the moment)
        return null
      }

      // Build the regexp needed for filtering
      let regexp = criteria
      if (typeof regexp === 'string') {
        // Escape special RegExp characters in the string and convert contiguous
        // whitespace to \s+ matches
        const pattern = criteria
          .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          .replace(/[\s\uFEFF\xA0]+/g, '\\s+')
        // Build the RegExp (no need for global flag, as we only need
        // to find the value once in the string)
        regexp = new RegExp(`.*${pattern}.*`, 'i')
      }

      // Generate the wrapped filter test function to use
      const fn = item => {
        // This searches all row values (and sub property values) in the entire (excluding
        // special _ prefixed keys), because we convert the record to a space-separated
        // string containing all the value properties (recursively), even ones that are
        // not visible (not specified in this.fields).
        //
        // TODO: Enable searching on formatted fields and scoped slots
        // TODO: Should we filter only on visible fields (i.e. ones in this.fields) by default?
        // TODO: Allow for searching on specific fields/key, this could be combined with the previous TODO
        // TODO: Give stringifyRecordValues extra options for filtering (i.e. passing the
        //       fields definition and a reference to $scopedSlots)
        //
        // Generated function returns true if the criteria matches part of
        // the serialized data, otherwise false
        // We set lastIndex = 0 on regex in case someone uses the /g global flag
        regexp.lastIndex = 0
        return regexp.test(stringifyRecordValues(item))
      }

      // Return the generated function
      return fn
    }
  },
  render(h) {
    const fields = this.computedFields
    const items = this.computedItems

    // Build the caption (from caption mixin)
    const $caption = this.renderCaption()

    // Build the colgroup
    const $colgroup = this.renderColgroup()

    // Build the thead
    const $thead = this.renderThead()

    // Build the tfoot
    const $tfoot = this.renderTfoot()

    // Build the tbody
    const $tbody = this.renderTbody()

    // Assemble table
    const $table = h(
      'table',
      {
        key: 'b-table',
        staticClass: 'table b-table',
        class: this.tableClasses,
        attrs: {
          // We set aria-rowcount before merging in $attrs, in case user has supplied their own
          'aria-rowcount':
            this.filteredItems.length > items.length ? String(this.filteredItems.length) : null,
          // Merge in user supplied $attrs if any
          ...this.$attrs,
          // Now we can override any $attrs here
          id: this.safeId(),
          role: this.isStacked ? 'table' : null,
          'aria-multiselectable': this.selectable
            ? this.selectMode === 'single'
              ? 'false'
              : 'true'
            : null,
          'aria-busy': this.computedBusy ? 'true' : 'false',
          'aria-colcount': String(fields.length),
          'aria-describedby':
            [
              // Preserve user supplied aria-describedby, if provided in $attrs
              (this.$attrs || {})['aria-describedby'],
              this.captionId
            ]
              .filter(a => a)
              .join(' ') || null
        }
      },
      [$caption, $colgroup, $thead, $tfoot, $tbody]
    )

    // Add responsive wrapper if needed and return table
    return this.isResponsive
      ? h('div', { key: 'b-table-responsive', class: this.responsiveClass }, [$table])
      : $table
  }
}
