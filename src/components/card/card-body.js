import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import prefixPropName from '../../utils/prefix-prop-name'
import copyProps from '../../utils/copy-props'
import pluckProps from '../../utils/pluck-props'
import cardMixin from '../../mixins/card'
import { BCardTitle, props as titleProps } from './card-title'
import { BCardSubTitle, props as subTitleProps } from './card-sub-title'

export const props = {
  // Import common card props and prefix them with `body-`
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'body')),
  bodyClass: {
    type: [String, Object, Array],
    default: null
  },
  ...titleProps,
  ...subTitleProps,
  overlay: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BCardBody = /*#__PURE__*/ Vue.extend({
  name: 'BCardBody',
  functional: true,
  props,
  render(h, { props, data, children }) {
    let cardTitle = h()
    let cardSubTitle = h()
    const cardContent = children || [h()]

    if (props.title) {
      cardTitle = h(BCardTitle, { props: pluckProps(titleProps, props) })
    }

    if (props.subTitle) {
      cardSubTitle = h(BCardSubTitle, {
        props: pluckProps(subTitleProps, props),
        class: ['mb-2']
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
            [`border-${props.bodyBorderVariant}`]: Boolean(props.bodyBorderVariant),
            [`text-${props.bodyTextVariant}`]: Boolean(props.bodyTextVariant)
          },
          props.bodyClass || {}
        ]
      }),
      [cardTitle, cardSubTitle, ...cardContent]
    )
  }
})
