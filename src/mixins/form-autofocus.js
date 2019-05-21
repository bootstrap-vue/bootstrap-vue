// Autofocus mixin for form controls
// Handles cases where the input is not the root element of the component

import { matches, select, isVisible } from '../utils/dom'

const SELECTOR = 'input, textarea, select'

export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      let el = this.$el
      if (isVisible(el)) {
        if (!matches(el, SELECTOR)) {
          el = select(SELECTOR, el)
        }
        el && el.focus && el.focus()
      }
    })
  }
}
