import { extend } from '../../../vue'
import { NAME_POPOVER_TEMPLATE } from '../../../constants/components'
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect'
import { BVTooltipTemplate } from '../../tooltip/helpers/bv-tooltip-template'

// @vue/component
export const BVPopoverTemplate = /*#__PURE__*/ extend({
  name: NAME_POPOVER_TEMPLATE,
  extends: BVTooltipTemplate,
  computed: {
    templateType() {
      return 'popover'
    }
  },
  methods: {
    renderTemplate(h) {
      const { title, content } = this

      // Title and content could be a scoped slot function
      const $title = isFunction(title) ? title({}) : title
      const $content = isFunction(content) ? content({}) : content

      // Directive usage only
      const titleDomProps = this.html && !isFunction(title) ? { innerHTML: title } : {}
      const contentDomProps = this.html && !isFunction(content) ? { innerHTML: content } : {}

      return h(
        'div',
        {
          staticClass: 'popover b-popover',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        },
        [
          h('div', {
            staticClass: 'arrow',
            ref: 'arrow'
          }),
          isUndefinedOrNull($title) || $title === ''
            ? /* istanbul ignore next */ h()
            : h('h3', { staticClass: 'popover-header', domProps: titleDomProps }, [$title]),
          isUndefinedOrNull($content) || $content === ''
            ? /* istanbul ignore next */ h()
            : h('div', { staticClass: 'popover-body', domProps: contentDomProps }, [$content])
        ]
      )
    }
  }
})
