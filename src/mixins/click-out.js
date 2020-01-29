import { contains, eventOff, eventOn } from '../utils/dom'

const eventOptions = { passive: true, capture: false }

// @vue/component
export default {
  data() {
    return {
      listenForClickOut: false
    }
  },
  watch: {
    listenForClickOut(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions)
        if (newValue) {
          eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions)
        }
      }
    }
  },
  beforeCreate() {
    // Declare non-reactive properties
    this.clickOutElement = null
    this.clickOutEventName = null
  },
  mounted() {
    if (!this.clickOutElement) {
      this.clickOutElement = document
    }
    if (!this.clickOutEventName) {
      this.clickOutEventName = 'click'
    }
    if (this.listenForClickOut) {
      eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions)
    }
  },
  beforeDestroy() /* istanbul ignore next */ {
    eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions)
  },
  methods: {
    isClickOut(evt) {
      return !contains(this.$el, evt.target)
    },
    _clickOutHandler(evt) {
      if (this.clickOutHandler && this.isClickOut(evt)) {
        this.clickOutHandler(evt)
      }
    }
  }
}
