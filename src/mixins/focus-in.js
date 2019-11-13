import { eventOff, eventOn } from '../utils/dom'

const eventOptions = { passive: true, capture: false }

// @vue/component
export default {
  data() {
    return {
      listenForFocusIn: false
    }
  },
  watch: {
    listenForFocusIn(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions)
        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions)
        }
      }
    }
  },
  beforeCreate() {
    // Declare non-reactive properties
    this.focusInElement = null
  },
  mounted() {
    if (!this.focusInElement) {
      this.focusInElement = document
    }
    if (this.listenForFocusIn) {
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions)
    }
  },
  beforeDestroy() /* istanbul ignore next */ {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions)
  },
  methods: {
    _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt)
      }
    }
  }
}
