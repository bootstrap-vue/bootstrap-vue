// Utilities
import looseEqual from '../../utils/loose-equal'
import stableSort from '../../utils/stable-sort'
import { arrayIncludes } from '../../utils/array'

// Table helper functions
import defaultSortCompare from './helpers/default-sort-compare'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper mixins
import itemsMixin from './helpers/mixin-items'
import filteringMixin from './helpers/mixin-filtering'
import paginationMixin from './helpers/mixin-pagination'
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
  // Order of mixins is important.
  // They are merged from left to fight, followed by this component.
  mixins: [
    idMixin,
    normalizeSlotMixin,
    itemsMixin,
    filteringMixin,
    paginationMixin,
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
      localSortDesc: this.sortDesc || false
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
      return [
        {
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
          [`b-table-stacked-${this.stacked}`]: this.stacked !== true && this.stacked
        },
        // Selectable classes
        this.selectableTableClasses
      ]
    },
    tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in $attrs
      const adb =
        [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null
      const items = this.computedItems
      const fields = this.computedFields
      return {
        // We set aria-rowcount before merging in $attrs, in case user has supplied their own
        'aria-rowcount':
          this.filteredItems.length > items.length ? String(this.filteredItems.length) : null,
        // Merge in user supplied $attrs if any
        ...this.$attrs,
        // Now we can override any $attrs here
        id: this.safeId(),
        role: this.isStacked ? 'table' : null,
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-describedby': adb,
        ...this.selectableTableAttrs
      }
    },
    // Items related computed props
    localSorting() {
      return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting
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
    computedItems() {
      return this.paginatedItems || []
    }
  },
  watch: {
    // Watch props for changes and update local values
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
  render(h) {
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
        attrs: this.tableAttrs
      },
      [$caption, $colgroup, $thead, $tfoot, $tbody]
    )

    // Add responsive wrapper if needed and return table
    return this.isResponsive
      ? h('div', { key: 'b-table-responsive', class: this.responsiveClass }, [$table])
      : $table
  }
}
