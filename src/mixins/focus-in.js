import { eventOff, eventOn } from '../utils/dom'

export default {
  data () {
    return {
      focusInElement: null,
      listenForFocusIn: true
    }
  },
  watch: {
    listenForFocusIn (newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, false)
        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, false)
        }
      }
    }
  },
  mounted () {
    if (!this.focusInElement) {
      this.focusInElement = document
    }
    if (this.listenForFocusIn) {
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, false)
    }
  },
  beforeDestroy () {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, false)
  },
  methods: {
    _focusInHandler (evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt)
      }
    }
  }
}
