import { mergeData, prefixPropName, copyProps } from '../../utils'
import { assign } from '../../utils/object'
import { cardMixin } from '../../mixins'

export const props = assign({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'header')), {
  header: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Object, Array],
    default: null
  }
})

export default {
  functional: true,
  props,
  render (h, { props, data, slots }) {
    return h(
      props.headerTag,
      mergeData(data, {
        staticClass: 'card-header',
        class: [
          props.headerClass,
          {
            [`bg-${props.headerBgVariant}`]: Boolean(props.headerBgVariant),
            [`border-${props.headerBorderVariant}`]: Boolean(props.headerBorderVariant),
            [`text-${props.headerTextVariant}`]: Boolean(props.headerTextVariant)
          }
        ]
      }),
      slots().default || [h('div', { domProps: { innerHTML: props.header } })]
    )
  }
}
