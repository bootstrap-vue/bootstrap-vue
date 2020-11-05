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
    },
    /* istanbul ignore next: don't think this is used */
    sizeBtnClass() {
      return [this.size ? `btn-${this.size}` : null]
    }
  }
}
