import { mergeData } from 'vue-functional-data-merge'

import prefixPropName from '../../utils/prefix-prop-name'
import copyProps from '../../utils/copyProps'
import { assign } from '../../utils/object'
import { htmlOrText } from '../../utils/html'
import cardMixin from '../../mixins/card-mixin'

export const props = assign({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'footer')), {
  footer: {
    type: String,
    default: null
  },
  footerHTML: {
    type: String,
    default: null
  },
  footerClass: {
    type: [String, Object, Array],
    default: null
  }
})

// @vue/component
export default {
  name: 'BCardFooter',
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.footerTag,
      mergeData(data, {
        staticClass: 'card-footer',
        class: [
          props.footerClass,
          {
            [`bg-${props.footerBgVariant}`]: Boolean(props.footerBgVariant),
            [`border-${props.footerBorderVariant}`]: Boolean(props.footerBorderVariant),
            [`text-${props.footerTextVariant}`]: Boolean(props.footerTextVariant)
          }
        ]
      }),
      children || [h('div', { domProps: htmlOrText(props.footerHTML, props.footer) })]
    )
  }
}
