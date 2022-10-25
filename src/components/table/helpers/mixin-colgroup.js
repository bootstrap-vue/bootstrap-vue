import { extend } from '../../../vue'
import { SLOT_NAME_TABLE_COLGROUP } from '../../../constants/slots'

// --- Props ---

export const props = {}

// --- Mixin ---

// @vue/component
export const colgroupMixin = extend({
  methods: {
    renderColgroup() {
      const { computedFields: fields } = this
      const h = this.$createElement

      let $colgroup = h()
      if (this.hasNormalizedSlot(SLOT_NAME_TABLE_COLGROUP)) {
        $colgroup = h('colgroup', { key: 'colgroup' }, [
          this.normalizeSlot(SLOT_NAME_TABLE_COLGROUP, { columns: fields.length, fields })
        ])
      }

      return $colgroup
    }
  }
})
