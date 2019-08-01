// Main `<table>` render mixin
// Which includes all main table styling options

export default {
  // Don't place attributes on root element automatically,
  // as table could be wrapped in responsive `<div>`
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
    responsiveClass() {
      return this.isResponsive === true
        ? 'table-responsive'
        : this.isResponsive
          ? `table-responsive-${this.responsive}`
          : ''
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
          'b-table-fixed': this.fixed
        },
        // Stacked table classes
        this.stackedTableClasses,
        // Selectable classes
        this.selectableTableClasses
      ]
    },
    tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in `$attrs`
      const adb =
        [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null
      const items = this.computedItems
      const filteredItems = this.filteredItems
      const fields = this.computedFields
      const selectableAttrs = this.selectableTableAttrs || {}
      const ariaAttrs = this.isTableSimple
        ? {}
        : {
            'aria-busy': this.computedBusy ? 'true' : 'false',
            'aria-colcount': String(fields.length),
            'aria-describedby': adb
          }
      const rowCount =
        items && filteredItems && filteredItems.length > items.length
          ? String(filteredItems.length)
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

      // Build the `<tfoot>`
      $content.push(this.renderTfoot ? this.renderTfoot() : null)

      // Build the `<tbody>`
      $content.push(this.renderTbody ? this.renderTbody() : null)
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
      $content.filter(Boolean)
    )

    // Add responsive wrapper if needed and return table
    return this.isResponsive
      ? h('div', { key: 'b-table-responsive', class: this.responsiveClass }, [$table])
      : $table
  }
}
