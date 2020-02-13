import Vue from './vue'

export const BVHoverSwap = /*#__PURE__*/ Vue.extend({
  name: 'BVHoverSwap',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    handleHover(evt) {
      this.isHovered = evt.type === 'mouseenter'
    }
  },
  render(h) {
    const $scoped = this.$scopedSlots
    const $default = $scoped.default || (() => h())
    const $hovered = $scoped.hovered || $default
    return h(
      tag,
      { on: { mouseenter: this.handleHover, mouseleave: this.handleHover } },
      [isHovered ? $hovered() : $default()]
    )
  }
})
