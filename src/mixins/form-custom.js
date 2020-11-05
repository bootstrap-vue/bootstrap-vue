import { makePropsConfigurable } from '../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    plain: {
      type: Boolean,
      default: false
    }
  },
  'formCustom'
)

// --- Mixin ---
// @vue/component
export default {
  props,
  computed: {
    custom() {
      return !this.plain
    }
  }
}
