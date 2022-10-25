import { extend } from '../../../vue'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_STRING
} from '../../../constants/props'
import { SLOT_NAME_CUSTOM_FOOT } from '../../../constants/slots'
import { makeProp } from '../../../utils/props'
import { BTfoot } from '../tfoot'

// --- Props ---

export const props = {
  footClone: makeProp(PROP_TYPE_BOOLEAN, false),
  // Any Bootstrap theme variant (or custom)
  // Falls back to `headRowVariant`
  footRowVariant: makeProp(PROP_TYPE_STRING),
  // 'dark', 'light', or `null` (or custom)
  footVariant: makeProp(PROP_TYPE_STRING),
  tfootClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
  tfootTrClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
}

// --- Mixin ---

// @vue/component
export const tfootMixin = extend({
  props,
  methods: {
    renderTFootCustom() {
      const h = this.$createElement
      if (this.hasNormalizedSlot(SLOT_NAME_CUSTOM_FOOT)) {
        return h(
          BTfoot,
          {
            class: this.tfootClass || null,
            props: { footVariant: this.footVariant || this.headVariant || null },
            key: 'bv-tfoot-custom'
          },
          this.normalizeSlot(SLOT_NAME_CUSTOM_FOOT, {
            items: this.computedItems.slice(),
            fields: this.computedFields.slice(),
            columns: this.computedFields.length
          })
        )
      }

      return h()
    },
    renderTfoot() {
      // Passing true to renderThead will make it render a tfoot
      return this.footClone ? this.renderThead(true) : this.renderTFootCustom()
    }
  }
})
