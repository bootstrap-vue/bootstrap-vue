import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import prefixPropName from '../../utils/prefix-prop-name'
import unPrefixPropName from '../../utils/unprefix-prop-name'
import copyProps from '../../utils/copy-props'
import pluckProps from '../../utils/pluck-props'
import cardMixin from '../../mixins/card-mixin'
import BCardBody, { props as bodyProps } from './card-body'
import BCardHeader, { props as headerProps } from './card-header'
import BCardFooter, { props as footerProps } from './card-footer'
import BCardImg, { props as imgProps } from './card-img'

const cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'))
cardImgProps.imgSrc.required = false

export const props = {
  ...bodyProps,
  ...headerProps,
  ...footerProps,
  ...cardImgProps,
  ...copyProps(cardMixin.props),
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  }
}

// @vue/component
export default Vue.extend({
  name: 'BCard',
  functional: true,
  props,
  render(h, { props, data, slots }) {
    const $slots = slots()

    // Create placeholder elements for each section
    let imgFirst = h(false)
    let header = h(false)
    let content = h(false)
    let footer = h(false)
    let imgLast = h(false)

    if (props.imgSrc) {
      let img = h(BCardImg, {
        props: pluckProps(cardImgProps, props, unPrefixPropName.bind(null, 'img'))
      })
      if (props.imgBottom) {
        imgLast = img
      } else {
        imgFirst = img
      }
    }

    if (props.header || $slots.header) {
      header = h(BCardHeader, { props: pluckProps(headerProps, props) }, $slots.header)
    }

    if (props.noBody) {
      content = $slots.default || []
    } else {
      // Wrap content in card-body
      content = [h(BCardBody, { props: pluckProps(bodyProps, props) }, $slots.default)]
    }

    if (props.footer || $slots.footer) {
      footer = h(
        BCardFooter,
        {
          props: pluckProps(footerProps, props)
        },
        $slots.footer
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
          [`text-${props.align}`]: Boolean(props.align),
          [`bg-${props.bgVariant}`]: Boolean(props.bgVariant),
          [`border-${props.borderVariant}`]: Boolean(props.borderVariant),
          [`text-${props.textVariant}`]: Boolean(props.textVariant)
        }
      }),
      [imgFirst, header, ...content, footer, imgLast]
    )
  }
})
