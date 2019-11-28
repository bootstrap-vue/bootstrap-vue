import identity from '../../../utils/identity'
import { isBoolean } from '../../../utils/inspect'
import { toString } from '../../../utils/string'

// Main `<table>` render mixin
// Includes all main table styling options

export default {
  // Don't place attributes on root element automatically,
  // as table could be wrapped in responsive `<div>`
  inheritAttrs: false,
  provide() {
    return {
      bvTable: this
    }
  },
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
    stickyHeader: {
      // If a string, it is assumed to be the table `max-height` value
      type: [Boolean, String],
      default: false
    },
    noBorderCollapse: {
      type: Boolean,
      default: false
    },
    captionTop: {
      type: Boolean,
      default: false
    },
    tableVariant: {
      type: String,
      default: null
    },
    tableClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    // Layout related computed props
    isResponsive() {
      const responsive = this.responsive === '' ? true : this.responsive
      return this.isStacked ? false : responsive
    },
    isStickyHeader() {
      const stickyHeader = this.stickyHeader === '' ? true : this.stickyHeader
      return this.isStacked ? false : stickyHeader
    },
    wrapperClasses() {
      return [
        this.isStickyHeader ? 'b-table-sticky-header' : '',
        this.isResponsive === true
          ? 'table-responsive'
          : this.isResponsive
            ? `table-responsive-${this.responsive}`
            : ''
      ].filter(identity)
    },
    wrapperStyles() {
      return this.isStickyHeader && !isBoolean(this.isStickyHeader)
        ? { maxHeight: this.isStickyHeader }
        : {}
    },
    tableClasses() {
      const hover = this.isTableSimple
        ? this.hover
        : this.hover && this.computedItems.length > 0 && !this.computedBusy

      return [
        // User supplied classes
        this.tableClass,
        // Styling classes
        {
          'table-striped': this.striped,
          'table-hover': hover,
          'table-dark': this.dark,
          'table-bordered': this.bordered,
          'table-borderless': this.borderless,
          'table-sm': this.small,
          // The following are b-table custom styles
          border: this.outlined,
          'b-table-fixed': this.fixed,
          'b-table-caption-top': this.captionTop,
          'b-table-no-border-collapse': this.noBorderCollapse
        },
        this.tableVariant ? `${this.dark ? 'bg' : 'table'}-${this.tableVariant}` : '',
        // Stacked table classes
        this.stackedTableClasses,
        // Selectable classes
        this.selectableTableClasses
      ]
    },
    tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in `$attrs`
      const adb =
        [(this.$attrs || {})['aria-describedby'], this.captionId].filter(identity).join(' ') || null
      const items = this.computedItems
      const filteredItems = this.filteredItems
      const fields = this.computedFields
      const selectableAttrs = this.selectableTableAttrs || {}
      const ariaAttrs = this.isTableSimple
        ? {}
        : {
            'aria-busy': this.computedBusy ? 'true' : 'false',
            'aria-colcount': toString(fields.length),
            'aria-describedby': adb
          }
      const rowCount =
        items && filteredItems && filteredItems.length > items.length
          ? toString(filteredItems.length)
          : null

      return {
        // We set `aria-rowcount` before merging in `$attrs`,
        // in case user has supplied their own
        'aria-rowcount': rowCount,
        // Merge in user supplied `$attrs` if any
        ...this.$attrs,
        // Now we can override any `$attrs` here
        id: this.safeId(),
        role: 'table',
        ...ariaAttrs,
        ...selectableAttrs
      }
    }
  },
  render(h) {
    const $content = []

    if (this.isTableSimple) {
      $content.push(this.normalizeSlot('default', {}))
    } else {
      // Build the `<caption>` (from caption mixin)
      $content.push(this.renderCaption ? this.renderCaption() : null)

      // Build the `<colgroup>`
      $content.push(this.renderColgroup ? this.renderColgroup() : null)

      // Build the `<thead>`
      $content.push(this.renderThead ? this.renderThead() : null)

      // Build the `<tbody>`
      $content.push(this.renderTbody ? this.renderTbody() : null)

      // Build the `<tfoot>`
      $content.push(this.renderTfoot ? this.renderTfoot() : null)
    }

    // Assemble `<table>`
    const $table = h(
      'table',
      {
        key: 'b-table',
        staticClass: 'table b-table',
        class: this.tableClasses,
        attrs: this.tableAttrs
      },
      $content.filter(identity)
    )

    // Add responsive/sticky wrapper if needed and return table
    return this.wrapperClasses.length > 0
      ? h('div', { key: 'wrap', class: this.wrapperClasses, style: this.wrapperStyles }, [$table])
      : $table
  }
}
