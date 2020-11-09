import { defineComponent } from '../vue'
import { makePropsConfigurable } from '../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    plain: {
      type: Boolean,
      default: false
    }
  },
  'formControls'
)

// --- Mixin ---
// @vue/component
export default defineComponent({
  props,
  computed: {
    custom() {
      return !this.plain
    }
  }
})
