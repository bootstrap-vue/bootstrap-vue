import Vue from './vue'

const NAME = 'BVTooltipTemplate'

export const BVTooltipTemplate = Vue.extend({
  name: NAME,
  inheritAttrs: false,
  props: {
    title: {
      // Text string, Array<vNode>, vNode
      type: [String, Array, Object],
      default: ''
    },
    content: {
      // Text string, Array<vNode>, vNode
      // Alias/Alternate for title for tolltip
      type: [String, Array, Object],
      default: ''
    },
    attachment: {
      type: String,
      default: 'auto'
    },
    variant: {
      type: String,
      default: null
    }
  },
  computed: {
    type() {
      return 'tooltip'
    },
    classes() {
      // This could be handled by wrapper component
      return {
        [`b-${this.type}-${this.variant}`]: this.variant,
        [`bs-${this.type}-${this.attachment}`]: this.attachment
      }
    },
    attributes() {
      return {
        role: 'tooltip',
        tabindex: '-1',
        ...this.$attrs
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: 'tooltip b-tooltip',
        class: this.classes,
        attrs: {
          role: 'tooltip',
          tabindex: '-1',
          ...this.$attrs
        }
      },
      [
        h('div', { staticClass: 'arrow' }),
        h('div', { staticClass: 'tooltip-inner' }, this.title || this.content || [h()])
      ]
    )
  }
})
