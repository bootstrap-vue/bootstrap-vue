import { defineComponent } from '../vue'
import { makePropsConfigurable } from '../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    size: {
      type: String
      // default: null
    }
  },
  'formControls'
)

// --- Mixin ---
// @vue/component
export default defineComponent({
  props,
  computed: {
    sizeFormClass() {
      return [this.size ? `form-control-${this.size}` : null]
    }
  }
})
