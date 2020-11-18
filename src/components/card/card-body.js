import { defineComponent, h, mergeData } from '../../vue'
import { NAME_CARD_BODY } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { copyProps, pluckProps, prefixPropName } from '../../utils/props'
import { props as cardProps } from '../../mixins/card'
import { BCardTitle, props as titleProps } from './card-title'
import { BCardSubTitle, props as subTitleProps } from './card-sub-title'

// --- Props ---

export const props = makePropsConfigurable(
  {
    // Import common card props and prefix them with `body-`
    ...copyProps(cardProps, prefixPropName.bind(null, 'body')),
    bodyClass: {
      type: [String, Object, Array]
      // default: null
    },
    ...titleProps,
    ...subTitleProps,
    overlay: {
      type: Boolean,
      default: false
    }
  },
  NAME_CARD_BODY
)

// --- Main component ---

// @vue/component
export const BCardBody = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_BODY,
  functional: true,
  props,
  render(_, { props, data, children }) {
    const { bodyBgVariant, bodyBorderVariant, bodyTextVariant } = props

    let $title = h()
    if (props.title) {
      $title = h(BCardTitle, { props: pluckProps(titleProps, props) })
    }

    let $subTitle = h()
    if (props.subTitle) {
      $subTitle = h(BCardSubTitle, {
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
            [`bg-${bodyBgVariant}`]: !!bodyBgVariant,
            [`border-${bodyBorderVariant}`]: !!bodyBorderVariant,
            [`text-${bodyTextVariant}`]: !!bodyTextVariant
          },
          props.bodyClass
        ]
      }),
      [$title, $subTitle, children]
    )
  }
})
