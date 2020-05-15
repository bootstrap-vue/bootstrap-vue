import {
  CLASS_NAME_BACKGROUND,
  CLASS_NAME_BORDER,
  CLASS_NAME_CARD_BODY,
  CLASS_NAME_CARD_IMG,
  CLASS_NAME_MARGIN_BOTTOM_2,
  CLASS_NAME_TEXT
} from '../../constants/class-names'
import { NAME_CARD_BODY } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { copyProps, pluckProps, prefixPropName } from '../../utils/props'
import { suffixClass } from '../../utils/string'
import cardMixin from '../../mixins/card'
import { BCardTitle, props as titleProps } from './card-title'
import { BCardSubTitle, props as subTitleProps } from './card-sub-title'

// --- Props ---
export const props = {
  // Import common card props and prefix them with `body-`
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'body')),
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
}

// --- Main component ---
// @vue/component
export const BCardBody = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD_BODY,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { bodyBgVariant, bodyBorderVariant, bodyTextVariant } = props

    let $cardTitle = h()
    if (props.title) {
      $cardTitle = h(BCardTitle, { props: pluckProps(titleProps, props) })
    }

    let $cardSubTitle = h()
    if (props.subTitle) {
      $cardSubTitle = h(BCardSubTitle, {
        props: pluckProps(subTitleProps, props),
        class: CLASS_NAME_MARGIN_BOTTOM_2
      })
    }

    return h(
      props.bodyTag,
      mergeData(data, {
        staticClass: CLASS_NAME_CARD_BODY,
        class: [
          props.bodyClass,
          {
            [suffixClass(CLASS_NAME_CARD_IMG, 'overlay')]: props.overlay,
            [`${CLASS_NAME_BACKGROUND}-${bodyBgVariant}`]: bodyBgVariant,
            [`${CLASS_NAME_BORDER}-${bodyBorderVariant}`]: bodyBorderVariant,
            [`${CLASS_NAME_TEXT}-${bodyTextVariant}`]: bodyTextVariant
          }
        ]
      }),
      [$cardTitle, $cardSubTitle, children]
    )
  }
})
