import Vue from '../../utils/vue'

// Utilities
import looseEqual from '../../utils/loose-equal'

// Mixins
import idMixin from '../../mixins/id'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// Table helper Mixins
import itemsMixin from './helpers/mixin-items'
import filteringMixin from './helpers/mixin-filtering'
import sortingMixin from './helpers/mixin-sorting'
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
export default Vue.extend({
  name: 'BTable',
  // Order of mixins is important.
  // They are merged from left to fight, followed by this component.
  mixins: [
    idMixin,
    normalizeSlotMixin,
    itemsMixin,
    filteringMixin,
    sortingMixin,
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
    tableClass: {
      type: [String, Array, Object],
      default: null
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
    // Mixins add to data
    return {}
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
        // User supplied classes
        this.tableClass,
        // Styling classes
        {
          'table-striped': this.striped,
          'table-hover': this.hover && this.computedItems.length > 0 && !this.computedBusy,
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
    context() {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: parseInt(this.perPage, 10) || 0,
        currentPage: parseInt(this.currentPage, 10) || 1,
        apiUrl: this.apiUrl
      }
    },
    computedItems() {
      return this.paginatedItems || []
    }
  },
  watch: {
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
})
