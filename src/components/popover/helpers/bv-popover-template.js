import Vue from '../../../utils/vue'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'

import { BVTooltipTemplate } from '../../tooltip/helpers/bv-tooltip-template'

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
      // Title and content could be a scoped slot function
      const $title = isFunction(this.title) ? this.title({}) : this.title
      const $content = isFunction(this.content) ? this.content({}) : this.content

      // Directive usage only
      const titleDomProps = this.html && !isFunction(this.title) ? { innerHTML: this.title } : {}
      const contentDomProps =
        this.html && !isFunction(this.content) ? { innerHTML: this.content } : {}

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
          isUndefinedOrNull($title) || $title === ''
            ? h()
            : h('h3', { staticClass: 'popover-header', domProps: titleDomProps }, [$title]),
          isUndefinedOrNull($content) || $content === ''
            ? h()
            : h('div', { staticClass: 'popover-body', domProps: contentDomProps }, [$content])
        ]
      )
    }
  }
})
