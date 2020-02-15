import Vue from './vue'
import { EVENT_OPTIONS_PASSIVE, eventOnOff } from './events'

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
      if (on && this.$_hoverEl !== el) {
        this.listen(false)
        this.$_hoverEl = el
      }
      eventOnOff(on, this.$_hoverEl, 'mouseenter', this.handleHover, EVENT_OPTIONS_PASSIVE)
      eventOnOff(on, this.$_hoverEl, 'mouseleave', this.handleHover, EVENT_OPTIONS_PASSIVE)
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
