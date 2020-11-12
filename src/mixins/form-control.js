import { makePropsConfigurable } from '../utils/config'
import { attemptFocus, isVisible, matches, requestAF, select } from '../utils/dom'

// --- Constants ---

const SELECTOR = 'input, textarea, select'

// --- Props ---

export const props = {
  id: {
    type: String
    // default: undefined
  },
  name: {
    type: String
    // default: undefined
  },
  ...makePropsConfigurable(
    {
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      form: {
        type: String
        // default: null
      },
      autofocus: {
        type: Boolean,
        default: false
      }
    },
    'formControls'
  )
}

// --- Mixin ---
// @vue/component
export default {
  props,
  mounted() {
    this.handleAutofocus()
  },
  /* istanbul ignore next */
  activated() {
    this.handleAutofocus()
  },
  methods: {
    handleAutofocus() {
      this.$nextTick(() => {
        requestAF(() => {
          let el = this.$el
          if (this.autofocus && isVisible(el)) {
            if (!matches(el, SELECTOR)) {
              el = select(SELECTOR, el)
            }
            attemptFocus(el)
          }
        })
      })
    }
  }
}
