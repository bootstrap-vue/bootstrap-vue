import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import prefixPropName from '../../utils/prefix-prop-name'
import unPrefixPropName from '../../utils/unprefix-prop-name'
import copyProps from '../../utils/copy-props'
import pluckProps from '../../utils/pluck-props'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import cardMixin from '../../mixins/card'
import { BCardBody, props as bodyProps } from './card-body'
import { BCardHeader, props as headerProps } from './card-header'
import { BCardFooter, props as footerProps } from './card-footer'
import { BCardImg, props as imgProps } from './card-img'

const cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'))
cardImgProps.imgSrc.required = false

export const props = {
  ...bodyProps,
  ...headerProps,
  ...footerProps,
  ...cardImgProps,
  ...copyProps(cardMixin.props),
  align: {
    type: String
    // default: null
  },
  noBody: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export const BCard = /*#__PURE__*/ Vue.extend({
  name: 'BCard',
  functional: true,
  props,
  render(h, { props, data, slots, scopedSlots }) {
    const $slots = slots()
    // Vue < 2.6.x may return undefined for scopedSlots
    const $scopedSlots = scopedSlots || {}

    // Create placeholder elements for each section
    let imgFirst = h()
    let header = h()
    let content = h()
    let footer = h()
    let imgLast = h()

    if (props.imgSrc) {
      const img = h(BCardImg, {
        props: pluckProps(cardImgProps, props, unPrefixPropName.bind(null, 'img'))
      })
      if (props.imgBottom) {
        imgLast = img
      } else {
        imgFirst = img
      }
    }

    if (props.header || props.headerHtml || hasNormalizedSlot('header', $scopedSlots, $slots)) {
      header = h(
        BCardHeader,
        { props: pluckProps(headerProps, props) },
        normalizeSlot('header', {}, $scopedSlots, $slots)
      )
    }

    content = normalizeSlot('default', {}, $scopedSlots, $slots) || []
    if (!props.noBody) {
      // Wrap content in card-body
      content = [h(BCardBody, { props: pluckProps(bodyProps, props) }, [...content])]
    }

    if (props.footer || props.footerHtml || hasNormalizedSlot('footer', $scopedSlots, $slots)) {
      footer = h(
        BCardFooter,
        {
          props: pluckProps(footerProps, props)
        },
        normalizeSlot('footer', {}, $scopedSlots, $slots)
      )
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'card',
        class: {
          'flex-row': props.imgLeft || props.imgStart,
          'flex-row-reverse':
            (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart),
          [`text-${props.align}`]: props.align,
          [`bg-${props.bgVariant}`]: props.bgVariant,
          [`border-${props.borderVariant}`]: props.borderVariant,
          [`text-${props.textVariant}`]: props.textVariant
        }
      }),
      [imgFirst, header, ...content, footer, imgLast]
    )
  }
})
