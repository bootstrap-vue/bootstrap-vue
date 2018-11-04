import { mergeData } from 'vue-functional-data-merge'
import prefixPropName from '../../utils/prefix-prop-name'
import copyProps from '../../utils/copyProps'
import { assign } from '../../utils/object'
import stripScripts from '../../utils/strip-scripts'
import cardMixin from '../../mixins/card-mixin'

export const props = assign(
  {},
  // Import common card props and prefix them with `body-`
  copyProps(cardMixin.props, prefixPropName.bind(null, 'body')),
  {
    bodyClass: {
      type: [String, Object, Array],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    titleTag: {
      type: String,
      default: 'h4'
    },
    subTitle: {
      type: String,
      default: null
    },
    subTitleTag: {
      type: String,
      default: 'h6'
    },
    overlay: {
      type: Boolean,
      default: false
    }
  }
)

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    let cardTitle = h(false)
    let cardSubTitle = h(false)
    let cardContent = children || [ h(false) ]

    if (props.title) {
      cardTitle = h(props.titleTag, {
        staticClass: 'card-title',
        domProps: { innerHTML: stripScripts(props.title) }
      })
    }

    if (props.subTitle) {
      cardSubTitle = h(props.subTitleTag, {
        staticClass: 'card-subtitle mb-2 text-muted',
        domProps: { innerHTML: stripScripts(props.subTitle) }
      })
    }

    return h(
      props.bodyTag,
      mergeData(data, {
        staticClass: 'card-body',
        class: [
          {
            'card-img-overlay': props.overlay,
            [`bg-${props.bodyBgVariant}`]: Boolean(props.bodyBgVariant),
            [`border-${props.bodyBorderVariant}`]: Boolean(
              props.bodyBorderVariant
            ),
            [`text-${props.bodyTextVariant}`]: Boolean(props.bodyTextVariant)
          },
          props.bodyClass || {}
        ]
      }),
      [ cardTitle, cardSubTitle, ...cardContent ]
    )
  }
}
