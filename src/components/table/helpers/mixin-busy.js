import { extend } from '../../../vue'
import { MODEL_EVENT_NAME_PREFIX } from '../../../constants/events'
import { PROP_TYPE_BOOLEAN } from '../../../constants/props'
import { SLOT_NAME_TABLE_BUSY } from '../../../constants/slots'
import { stopEvent } from '../../../utils/events'
import { isFunction } from '../../../utils/inspect'
import { makeProp } from '../../../utils/props'
import { BTr } from '../tr'
import { BTd } from '../td'

// --- Constants ---

const MODEL_PROP_NAME_BUSY = 'busy'
const MODEL_EVENT_NAME_BUSY = MODEL_EVENT_NAME_PREFIX + MODEL_PROP_NAME_BUSY

// --- Props ---

export const props = {
  [MODEL_PROP_NAME_BUSY]: makeProp(PROP_TYPE_BOOLEAN, false)
}

// --- Mixin ---

// @vue/component
export const busyMixin = extend({
  props,
  data() {
    return {
      localBusy: false
    }
  },
  computed: {
    computedBusy() {
      return this[MODEL_PROP_NAME_BUSY] || this.localBusy
    }
  },
  watch: {
    localBusy(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit(MODEL_EVENT_NAME_BUSY, newValue)
      }
    }
  },
  methods: {
    // Event handler helper
    stopIfBusy(event) {
      // If table is busy (via provider) then don't propagate
      if (this.computedBusy) {
        stopEvent(event)
        return true
      }
      return false
    },
    // Render the busy indicator or return `null` if not busy
    renderBusy() {
      const { tbodyTrClass, tbodyTrAttr } = this
      const h = this.$createElement

      // Return a busy indicator row, or `null` if not busy
      if (this.computedBusy && this.hasNormalizedSlot(SLOT_NAME_TABLE_BUSY)) {
        return h(
          BTr,
          {
            staticClass: 'b-table-busy-slot',
            class: [
              isFunction(tbodyTrClass)
                ? /* istanbul ignore next */ tbodyTrClass(null, SLOT_NAME_TABLE_BUSY)
                : tbodyTrClass
            ],
            attrs: isFunction(tbodyTrAttr)
              ? /* istanbul ignore next */ tbodyTrAttr(null, SLOT_NAME_TABLE_BUSY)
              : tbodyTrAttr,
            key: 'table-busy-slot'
          },
          [
            h(BTd, { props: { colspan: this.computedFields.length || null } }, [
              this.normalizeSlot(SLOT_NAME_TABLE_BUSY)
            ])
          ]
        )
      }

      // We return `null` here so that we can determine if we need to
      // render the table items rows or not
      return null
    }
  }
})
