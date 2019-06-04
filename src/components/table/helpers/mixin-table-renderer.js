// Main `<table>` render mixin
// Which indlues all main table stlying options

export default {
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
      const selectableAttrs = this.selectableTableAttrs || {}
      return {
        // We set aria-rowcount before merging in $attrs, in case user has supplied their own
        'aria-rowcount':
          this.filteredItems && this.filteredItems.length > items.length
            ? String(this.filteredItems.length)
            : null,
        // Merge in user supplied $attrs if any
        ...this.$attrs,
        // Now we can override any $attrs here
        id: this.safeId(),
        role: this.isStacked ? 'table' : null,
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-describedby': adb,
        ...selectableAttrs
      }
    }
  },
  render(h) {
    // Build the caption (from caption mixin)
    const $caption = this.renderCaption ? this.renderCaption() : null

    // Build the colgroup
    const $colgroup = this.renderColgroup ? this.renderColgroup() : null

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
      [$caption, $colgroup, $thead, $tfoot, $tbody].filter(Boolean)
    )

    // Add responsive wrapper if needed and return table
    return this.isResponsive
      ? h('div', { key: 'b-table-responsive', class: this.responsiveClass }, [$table])
      : $table
  }
}
