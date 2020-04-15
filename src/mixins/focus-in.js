import { EVENT_OPTIONS_NO_CAPTURE } from '../constants/events'
import { eventOn, eventOff } from '../utils/events'

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
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE)
        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE)
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
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE)
    }
  },
  beforeDestroy() /* istanbul ignore next */ {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE)
  },
  methods: {
    _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt)
      }
    }
  }
}
