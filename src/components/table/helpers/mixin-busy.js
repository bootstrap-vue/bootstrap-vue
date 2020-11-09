import { h } from '../../../vue'
import { EVENT_NAME_MODEL_PREFIX } from '../../../constants/events'
import { NAME_TABLE } from '../../../constants/components'
import { makePropsConfigurable } from '../../../utils/config'
import { stopEvent } from '../../../utils/events'
import { isFunction } from '../../../utils/inspect'
import { BTr } from '../tr'
import { BTd } from '../td'

// --- Constants ---

const PROP_NAME_BUSY = 'busy'

const EVENT_NAME_MODEL_BUSY = EVENT_NAME_MODEL_PREFIX + PROP_NAME_BUSY

const SLOT_NAME_TABLE_BUSY = 'table-busy'

// --- Mixin ---
// @vue/component
export default {
  props: makePropsConfigurable(
    {
      busy: {
        type: Boolean,
        default: false
      }
    },
    NAME_TABLE
  ),
  data() {
    return {
      localBusy: false
    }
  },
  computed: {
    computedBusy() {
      return this[PROP_NAME_BUSY] || this.localBusy
    }
  },
  watch: {
    localBusy(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit(EVENT_NAME_MODEL_BUSY, newValue)
      }
    }
  },
  methods: {
    // Event handler helper
    stopIfBusy(evt) {
      if (this.computedBusy) {
        // If table is busy (via provider) then don't propagate
        stopEvent(evt)
        return true
      }
      return false
    },
    // Render the busy indicator or return `null` if not busy
    renderBusy() {
      // Return a busy indicator row, or `null` if not busy
      if (this.computedBusy && this.hasNormalizedSlot(SLOT_NAME_TABLE_BUSY)) {
        // Show the busy slot
        return h(
          BTr,
          {
            key: 'table-busy-slot',
            staticClass: 'b-table-busy-slot',
            class: [
              isFunction(this.tbodyTrClass)
                ? /* istanbul ignore next */ this.tbodyTrClass(null, SLOT_NAME_TABLE_BUSY)
                : this.tbodyTrClass
            ],
            attrs: isFunction(this.tbodyTrAttr)
              ? /* istanbul ignore next */ this.tbodyTrAttr(null, SLOT_NAME_TABLE_BUSY)
              : this.tbodyTrAttr
          },
          [
            h(BTd, { props: { colspan: this.computedFields.length || null } }, [
              this.normalizeSlot(SLOT_NAME_TABLE_BUSY)
            ])
          ]
        )
      } else {
        // We return `null` here so that we can determine if we need to
        // render the table items rows or not
        return null
      }
    }
  }
}
