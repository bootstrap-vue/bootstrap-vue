import Vue, { mergeData } from '../../vue'
import { NAME_CARD } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { SLOT_NAME_DEFAULT, SLOT_NAME_FOOTER, SLOT_NAME_HEADER } from '../../constants/slot-names'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { copyProps, pluckProps, prefixPropName, unprefixPropName } from '../../utils/props'
import { props as cardProps } from '../../mixins/card'
import { BCardBody, props as bodyProps } from './card-body'
import { BCardHeader, props as headerProps } from './card-header'
import { BCardFooter, props as footerProps } from './card-footer'
import { BCardImg, props as imgProps } from './card-img'

// --- Props ---

const cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'))
cardImgProps.imgSrc.required = false

export const props = makePropsConfigurable(
  {
    ...bodyProps,
    ...headerProps,
    ...footerProps,
    ...cardImgProps,
    ...cardProps,
    align: {
      type: String
      // default: null
    },
    noBody: {
      type: Boolean,
      default: false
    }
  },
  NAME_CARD
)

// --- Main component ---
// @vue/component
export const BCard = /*#__PURE__*/ Vue.extend({
  name: NAME_CARD,
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const {
      imgSrc,
      imgLeft,
      imgRight,
      imgStart,
      imgEnd,
      imgBottom,
      header,
      headerHtml,
      footer,
      footerHtml,
      align,
      textVariant,
      bgVariant,
      borderVariant
    } = props
    const $scopedSlots = scopedSlots || {}
    const $slots = slots()
    const slotScope = {}

    let $imgFirst = h()
    let $imgLast = h()
    if (imgSrc) {
      const $img = h(BCardImg, {
        props: pluckProps(cardImgProps, props, unprefixPropName.bind(null, 'img'))
      })

      if (imgBottom) {
        $imgLast = $img
      } else {
        $imgFirst = $img
      }
    }

    let $header = h()
    const hasHeaderSlot = hasNormalizedSlot(SLOT_NAME_HEADER, $scopedSlots, $slots)
    if (hasHeaderSlot || header || headerHtml) {
      $header = h(
        BCardHeader,
        {
          props: pluckProps(headerProps, props),
          domProps: hasHeaderSlot ? {} : htmlOrText(headerHtml, header)
        },
        normalizeSlot(SLOT_NAME_HEADER, slotScope, $scopedSlots, $slots)
      )
    }

    let $content = normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots)

    // Wrap content in `<card-body>` when `noBody` prop set
    if (!props.noBody) {
      $content = h(BCardBody, { props: pluckProps(bodyProps, props) }, $content)

      // When the `overlap` prop is set we need to wrap the `<b-card-img>` and `<b-card-body>`
      // into a relative positioned wrapper to don't distract a potential header or footer
      if (props.overlay && imgSrc) {
        $content = h('div', { staticClass: 'position-relative' }, [$imgFirst, $content, $imgLast])
        // Reset image variables since they are already in the wrapper
        $imgFirst = h()
        $imgLast = h()
      }
    }

    let $footer = h()
    const hasFooterSlot = hasNormalizedSlot(SLOT_NAME_FOOTER, $scopedSlots, $slots)
    if (hasFooterSlot || footer || footerHtml) {
      $footer = h(
        BCardFooter,
        {
          props: pluckProps(footerProps, props),
          domProps: hasHeaderSlot ? {} : htmlOrText(footerHtml, footer)
        },
        normalizeSlot(SLOT_NAME_FOOTER, slotScope, $scopedSlots, $slots)
      )
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'card',
        class: {
          'flex-row': imgLeft || imgStart,
          'flex-row-reverse': (imgRight || imgEnd) && !(imgLeft || imgStart),
          [`text-${align}`]: align,
          [`bg-${bgVariant}`]: bgVariant,
          [`border-${borderVariant}`]: borderVariant,
          [`text-${textVariant}`]: textVariant
        }
      }),
      [$imgFirst, $header, $content, $footer, $imgLast]
    )
  }
})
