import { props as tbodyProps, BTbody } from '../tbody'
import tbodyRowMixin from './mixin-tbody-row'

const props = {
  tbodyClass: {
    type: [String, Array, Object]
    // default: undefined
  },
  ...tbodyProps
}

export default {
  mixins: [tbodyRowMixin],
  props,
  methods: {
    renderTbody() {
      // Render the tbody element and children
      const items = this.computedItems
      // Shortcut to `createElement` (could use `this._c()` instead)
      const h = this.$createElement

      // Prepare the tbody rows
      const $rows = []

      // Add the item data rows or the busy slot
      const $busy = this.renderBusy ? this.renderBusy() : null
      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy)
      } else {
        // Table isn't busy, or we don't have a busy slot

        // Create a slot cache for improved performace when looking up cell slot names.
        // Values will be keyed by the field's `key` and will store the slot's name.
        // Slots could be dynamic (i.e. `v-if`), so we must compute on each render.
        // Used by tbodyRow mixin render helper.
        const cache = {}
        const defaultSlotName = this.hasNormalizedSlot('cell()') ? 'cell()' : null
        this.computedFields.forEach(field => {
          const key = field.key
          const fullName = `cell(${key})`
          const lowerName = `cell(${key.toLowerCase()})`
          cache[key] = this.hasNormalizedSlot(fullName)
            ? fullName
            : this.hasNormalizedSlot(lowerName)
              ? lowerName
              : defaultSlotName
        })
        // Created as a non-reactive property so to not trigger component updates.
        // Must be a fresh object each render.
        this.$_bodyFieldSlotNameCache = cache

        // Add static Top Row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderTopRow ? this.renderTopRow() : h())

        // render the rows
        items.forEach((item, rowIndex) => {
          // Render the individual item row (rows if details slot)
          $rows.push(this.renderTbodyRow(item, rowIndex))
        })

        // Empty Items / Empty Filtered Row slot (only shows if items.length < 1)
        $rows.push(this.renderEmpty ? this.renderEmpty() : h())

        // Static bottom row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderBottomRow ? this.renderBottomRow() : h())
      }

      // Assemble rows into the tbody
      const $tbody = h(
        BTbody,
        {
          class: this.tbodyClass || null,
          props: {
            tbodyTransitionProps: this.tbodyTransitionProps,
            tbodyTransitionHandlers: this.tbodyTransitionHandlers
          }
        },
        $rows
      )

      // Return the assembled tbody
      return $tbody
    }
  }
}
