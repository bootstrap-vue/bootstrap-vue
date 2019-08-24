import Vue from './vue'
import { BVTooltipTemplate } from './bv-tooltip-template'
import { isFunction, isUndefinedOrNull } from './inspect'

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
      // Title and content could be a scoped Slot function
      const $title = isFunction(this.title) ? this.title({}) : this.title
      const $content = isFunction(this.content) ? this.content({}) : this.content
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
          isUndefinedOrNull($title) ? h() : h('h3', { staticClass: 'popover-header' }, [$title]),
          isUndefinedOrNull($content) ? h() : h('div', { staticClass: 'popover-body' }, [$content])
        ]
      )
    }
  }
})
