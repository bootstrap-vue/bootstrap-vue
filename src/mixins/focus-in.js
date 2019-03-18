import { eventOff, eventOn } from '../utils/dom'

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
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, false)
        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, false)
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
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, false)
    }
  },
  beforeDestroy() /* istanbul ignore next */ {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, false)
  },
  methods: {
    _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt)
      }
    }
  }
}
