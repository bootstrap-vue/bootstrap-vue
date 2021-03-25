import { Vue } from '../vue'
import { EVENT_OPTIONS_NO_CAPTURE } from '../constants/events'
import { contains } from '../utils/dom'
import { eventOn, eventOff } from '../utils/events'

// @vue/component
export const clickOutMixin = Vue.extend({
  data() {
    return {
      listenForClickOut: false
    }
  },
  watch: {
    listenForClickOut(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(
          this.clickOutElement,
          this.clickOutEventName,
          this._clickOutHandler,
          EVENT_OPTIONS_NO_CAPTURE
        )
        if (newValue) {
          eventOn(
            this.clickOutElement,
            this.clickOutEventName,
            this._clickOutHandler,
            EVENT_OPTIONS_NO_CAPTURE
          )
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
      eventOn(
        this.clickOutElement,
        this.clickOutEventName,
        this._clickOutHandler,
        EVENT_OPTIONS_NO_CAPTURE
      )
    }
  },
  beforeDestroy() {
    eventOff(
      this.clickOutElement,
      this.clickOutEventName,
      this._clickOutHandler,
      EVENT_OPTIONS_NO_CAPTURE
    )
  },
  methods: {
    isClickOut(event) {
      return !contains(this.$el, event.target)
    },
    _clickOutHandler(event) {
      if (this.clickOutHandler && this.isClickOut(event)) {
        this.clickOutHandler(event)
      }
    }
  }
})
