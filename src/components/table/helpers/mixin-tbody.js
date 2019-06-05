import tbodyRowMixin from './mixin-tbody-row'

export default {
  mixins: [tbodyRowMixin],
  props: {
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTransitionProps: {
      type: Object
      // default: undefined
    },
    tbodyTransitionHandlers: {
      type: Object
      // default: undefined
    }
  },
  methods: {
    renderTbody() {
      // Render the tbody element and children
      const h = this.$createElement
      const items = this.computedItems

      // Prepare the tbody rows
      const $rows = []

      // Add the item data rows or the busy slot
      const $busy = this.renderBusy ? this.renderBusy() : null
      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy)
      } else {
        // Table isn't busy, or we don't have a busy slot

        // Add static Top Row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderTopRow ? this.renderTopRow() : h(false))

        // render the rows
        items.forEach((item, rowIndex) => {
          // Render the individual item row (rows if details slot)
          $rows.push(this.renderTbodyRow(item, rowIndex))
        })

        // Empty Items / Empty Filtered Row slot (only shows if items.length < 1)
        $rows.push(this.renderEmpty ? this.renderEmpty() : h(false))

        // Static bottom row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderBottomRow ? this.renderBottomRow() : h(false))
      }

      // If tbody transition enabled
      const isTransGroup = this.tbodyTransitionProps || this.tbodyTransitionHandlers
      let tbodyProps = {}
      let tbodyOn = {}
      if (isTransGroup) {
        tbodyOn = this.tbodyTransitionHandlers || {}
        tbodyProps = {
          ...(this.tbodyTransitionProps || {}),
          tag: 'tbody'
        }
      }

      // Assemble rows into the tbody
      const $tbody = h(
        isTransGroup ? 'transition-group' : 'tbody',
        {
          props: tbodyProps,
          on: tbodyOn,
          class: [this.tbodyClass],
          attrs: { role: 'rowgroup' }
        },
        $rows
      )

      // Return the assembled tbody
      return $tbody
    }
  }
}
