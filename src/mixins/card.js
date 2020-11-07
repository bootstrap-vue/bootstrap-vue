import { NAME_CARD } from '../constants/components'
import { makePropsConfigurable } from '../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String
      // default: null
    },
    borderVariant: {
      type: String
      // default: null
    },
    textVariant: {
      type: String
      // default: null
    }
  },
  NAME_CARD
)

// --- Mixin ---
// @vue/component
export default {
  props
}
