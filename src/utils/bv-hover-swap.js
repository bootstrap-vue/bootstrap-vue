import Vue from './vue'
import { eventOn, eventOff } from './dom'

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
  mounted() {
    this.listen(true)
  },
  updated() /* istanbul ignore next */ {
    this.$nextTick(() => this.listen(true))
  },
  beforeDestroy() {
    this.listen(false)
  },
  methods: {
    listen(on) {
      const method = on ? eventOn : eventOff
      const el = this.parent ? this.$el.parentElement || this.$el : this.$el
      method(el, 'mouseenter', this.handleHover, { passive: true })
      method(el, 'mouseleave', this.handleHover, { passive: true })
    },
    handleHover(evt) {
      this.isHovered = evt.type === 'mouseenter'
    }
  },
  render(h) {
    const $scoped = this.$scopedSlots
    const $default = $scoped.default || (() => h())
    const $hovered = $scoped.hovered || $default
    return h(this.tag, {}, [this.isHovered ? $hovered() : $default()])
  }
})
