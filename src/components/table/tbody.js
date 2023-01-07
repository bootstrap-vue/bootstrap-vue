import { extend } from '../../vue'
import { NAME_TBODY } from '../../constants/components'
import { PROP_TYPE_OBJECT } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { listenersMixin } from '../../mixins/listeners'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tbodyTransitionHandlers: makeProp(PROP_TYPE_OBJECT),
    tbodyTransitionProps: makeProp(PROP_TYPE_OBJECT)
  },
  NAME_TBODY
)

// --- Main component ---

// TODO:
//   In Bootstrap v5, we won't need "sniffing" as table element variants properly inherit
//   to the child elements, so this can be converted to a functional component
// @vue/component
export const BTbody = /*#__PURE__*/ extend({
  name: NAME_TBODY,
  mixins: [attrsMixin, listenersMixin, normalizeSlotMixin],
  provide() {
    return {
      getBvTableRowGroup: () => this
    }
  },
  inject: {
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    getBvTable: {
      default: /* istanbul ignore next */ () => () => ({})
    }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvTable() {
      return this.getBvTable()
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isTbody() {
      return true
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isDark() {
      return this.bvTable.dark
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isStacked() {
      return this.bvTable.isStacked
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    isResponsive() {
      return this.bvTable.isResponsive
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    // Sticky headers are only supported in thead
    isStickyHeader() {
      return false
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    // Needed to handle header background classes, due to lack of
    // background color inheritance with Bootstrap v4 table CSS
    hasStickyHeader() {
      return !this.isStacked && this.bvTable.stickyHeader
    },
    // Sniffed by `<b-tr>` / `<b-td>` / `<b-th>`
    tableVariant() {
      return this.bvTable.tableVariant
    },
    isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers
    },
    tbodyAttrs() {
      return { role: 'rowgroup', ...this.bvAttrs }
    },
    tbodyProps() {
      const { tbodyTransitionProps } = this
      return tbodyTransitionProps ? { ...tbodyTransitionProps, tag: 'tbody' } : {}
    }
  },
  render(h) {
    const data = {
      props: this.tbodyProps,
      attrs: this.tbodyAttrs
    }
    if (this.isTransitionGroup) {
      // We use native listeners if a transition group for any delegated events
      data.on = this.tbodyTransitionHandlers || {}
      data.nativeOn = this.bvListeners
    } else {
      // Otherwise we place any listeners on the tbody element
      data.on = this.bvListeners
    }

    return h(this.isTransitionGroup ? 'transition-group' : 'tbody', data, this.normalizeSlot())
  }
})
