import Vue from './vue'
import { BVTooltipTemplate } from './bv-tooltip-template'
import { isFunction } from './inspect'

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
      const $title = isFunction(this.title) ? [this.title({})] : this.title
      const $content = isFunction(this.content) ? [this.content({})] : this.content
      return h(
        'div',
        {
          staticClass: 'popover b-popover',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', { ref: 'arrow', staticClass: 'arrow' }),
          $title ? h('h3', { staticClass: 'popover-header' }, $title) : h(),
          $content ? h('div', { staticClass: 'popover-body' }, $content) : h()
        ]
      )
    }
  }
})
