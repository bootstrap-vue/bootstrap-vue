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
export default {
  props,
  computed: {
    sizeFormClass() {
      return [this.size ? `form-control-${this.size}` : null]
    }
  }
}
