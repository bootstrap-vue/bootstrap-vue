import { mergeData } from 'vue-functional-data-merge'

import prefixPropName from '../../utils/prefix-prop-name'
import unPrefixPropName from '../../utils/unprefix-prop-name'
import copyProps from '../../utils/copyProps'
import pluckProps from '../../utils/pluck-props'
import { assign } from '../../utils/object'
import cardMixin from '../../mixins/card-mixin'
import CardBody, { props as bodyProps } from './card-body'
import CardHeader, { props as headerProps } from './card-header'
import CardFooter, { props as footerProps } from './card-footer'
import CardImg, { props as imgProps } from './card-img'

const cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'))
cardImgProps.imgSrc.required = false

export const props = assign(
  {},
  bodyProps,
  headerProps,
  footerProps,
  cardImgProps,
  copyProps(cardMixin.props),
  {
    align: {
      type: String,
      default: null
    },
    noBody: {
      type: Boolean,
      default: false
    }
  }
)

export default {
  functional: true,
  props,
  render (h, { props, data, slots }) {
    // The order of the conditionals matter.
    // We are building the component markup in order.
    let childNodes = []
    const $slots = slots()
    let img = props.imgSrc
      ? h(CardImg, {
        props: pluckProps(
          cardImgProps,
          props,
          unPrefixPropName.bind(null, 'img')
        )
      })
      : null

    if (img) {
      // Above the header placement.
      if (props.imgTop || !props.imgBottom) {
        childNodes.push(img)
      }
    }
    if (props.header || $slots.header) {
      childNodes.push(
        h(CardHeader, { props: pluckProps(headerProps, props) }, $slots.header)
      )
    }
    if (props.noBody) {
      childNodes.push($slots.default)
    } else {
      childNodes.push(
        h(CardBody, { props: pluckProps(bodyProps, props) }, $slots.default)
      )
    }
    if (props.footer || $slots.footer) {
      childNodes.push(
        h(CardFooter, { props: pluckProps(footerProps, props) }, $slots.footer)
      )
    }
    if (img && props.imgBottom) {
      // Below the footer placement.
      childNodes.push(img)
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'card',
        class: {
          [`text-${props.align}`]: Boolean(props.align),
          [`bg-${props.bgVariant}`]: Boolean(props.bgVariant),
          [`border-${props.borderVariant}`]: Boolean(props.borderVariant),
          [`text-${props.textVariant}`]: Boolean(props.textVariant)
        }
      }),
      childNodes
    )
  }
}
