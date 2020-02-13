import Vue from './vue'
import { eventOn, eventOff } from './dom'

// --- Constants ---

const EVENT_OPTIONS = { passive: true }

// @vue/component
export const BVHoverSwap = /*#__PURE__*/ Vue.extend({
  name: 'BVHoverSwap',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    parent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  watch: {
    parent() {
      this.listen(true)
    }
  },
  created() {
    // Create non-reactive property
    this.$_hoverEl = null
  },
  mounted() {
    this.$nextTick(() => this.listen(true))
  },
  updated() /* istanbul ignore next */ {
    this.$nextTick(() => this.listen(true))
  },
  beforeDestroy() {
    this.listen(false)
    this.$_hoverEl = null
  },
  methods: {
    listen(on) {
      const el = this.parent ? this.$el.parentElement || this.$el : this.$el
      if (on && this.$_hoverEl && this.$_hoverEl !== el) {
        this.listen(false)
        this.$_hoverEl = el
      }
      const method = on ? eventOn : eventOff
      method(el, 'mouseenter', this.handleHover, EVENT_OPTIONS)
      method(el, 'mouseleave', this.handleHover, EVENT_OPTIONS)
    },
    handleHover(evt) {
      this.isHovered = evt.type === 'mouseenter'
    }
  },
  render(h) {
    const $scoped = this.$scopedSlots
    const $default = $scoped.default || (() => h())
    const $hovered = $scoped.hovered || $default
    return h(this.tag, [this.isHovered ? $hovered() : $default()])
  }
})
