import tbodyRowMixin from './mixin-tbody-row'
import emptyMixin from './mixin-empty'
import topRowMixin from './mixin-top-row'
import bottomRowMixin from './mixin-bottom-row'
// busy mixin is imported in main table.js as it is used by multiple mixins

export default {
  mixins: [tbodyRowMixin, emptyMixin, topRowMixin, bottomRowMixin],
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
      const $busy = this.renderBusy()
      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy)
      } else {
        // Table isn't bsuy, or we don't have a busy slot

        // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
        $rows.push(this.renderTopRow())

        // render the rows
        items.forEach((item, rowIndex) => {
          // Render the individual item row (rows if details slot)
          $rows.push(this.renderTbodyRow(item, rowIndex))
        })

        // Empty Items / Empty Filtered Row slot (only shows if items.length < -
        $rows.push(this.renderEmpty())

        // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
        $rows.push(this.renderBottomRow())
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
