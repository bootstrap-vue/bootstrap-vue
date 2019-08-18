import Vue from './vue'
import { BVTooltipTemplate } from './bv-tooltip-template'

const NAME = 'BVPopoverTemplate'

// @vue/component
export const BVPopoverTemplate = /*#__PURE__*/ Vue.extend({
  name: NAME,
  extends: BVTooltipTemplate,
  computed: {
    templateType() {
      return 'popover'
    }
  },
  methods: {
    renderTemplate(h) {
      return h(
        'div',
        {
          staticClass: 'popover b-popover',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', { staticClass: 'arrow' }),
          this.title ? h('h3', { staticClass: 'popover-header' }, this.title) : h(),
          this.content ? h('div', { staticClass: 'popover-body' }, this.content) : h()
        ]
      )
    }
  }
})
