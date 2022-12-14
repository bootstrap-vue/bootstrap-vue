import { extend, mergeData } from '../../vue'
import { NAME_IMG } from '../../constants/components'
import {
  PROP_TYPE_ARRAY_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_BOOLEAN_STRING,
  PROP_TYPE_NUMBER_STRING,
  PROP_TYPE_STRING
} from '../../constants/props'
import { concat } from '../../utils/array'
import { identity } from '../../utils/identity'
import { isString } from '../../utils/inspect'
import { toInteger } from '../../utils/number'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { toString } from '../../utils/string'

// --- Constants --

// Blank image with fill template
const BLANK_TEMPLATE =
  '<svg width="%{w}" height="%{h}" ' +
  'xmlns="http://www.w3.org/2000/svg" ' +
  'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">' +
  '<rect width="100%" height="100%" style="fill:%{f};"></rect>' +
  '</svg>'

// --- Helper methods ---

const makeBlankImgSrc = (width, height, color) => {
  const src = encodeURIComponent(
    BLANK_TEMPLATE.replace('%{w}', toString(width))
      .replace('%{h}', toString(height))
      .replace('%{f}', color)
  )
  return `data:image/svg+xml;charset=UTF-8,${src}`
}

// --- Props ---

export const props = makePropsConfigurable(
  {
    alt: makeProp(PROP_TYPE_STRING),
    blank: makeProp(PROP_TYPE_BOOLEAN, false),
    blankColor: makeProp(PROP_TYPE_STRING, 'transparent'),
    block: makeProp(PROP_TYPE_BOOLEAN, false),
    center: makeProp(PROP_TYPE_BOOLEAN, false),
    fluid: makeProp(PROP_TYPE_BOOLEAN, false),
    // Gives fluid images class `w-100` to make them grow to fit container
    fluidGrow: makeProp(PROP_TYPE_BOOLEAN, false),
    height: makeProp(PROP_TYPE_NUMBER_STRING),
    left: makeProp(PROP_TYPE_BOOLEAN, false),
    right: makeProp(PROP_TYPE_BOOLEAN, false),
    // Possible values:
    //   `false`: no rounding of corners
    //   `true`: slightly rounded corners
    //   'top': top corners rounded
    //   'right': right corners rounded
    //   'bottom': bottom corners rounded
    //   'left': left corners rounded
    //   'circle': circle/oval
    //   '0': force rounding off
    rounded: makeProp(PROP_TYPE_BOOLEAN_STRING, false),
    sizes: makeProp(PROP_TYPE_ARRAY_STRING),
    src: makeProp(PROP_TYPE_STRING),
    srcset: makeProp(PROP_TYPE_ARRAY_STRING),
    thumbnail: makeProp(PROP_TYPE_BOOLEAN, false),
    width: makeProp(PROP_TYPE_NUMBER_STRING)
  },
  NAME_IMG
)

// --- Main component ---

// @vue/component
export const BImg = /*#__PURE__*/ extend({
  name: NAME_IMG,
  functional: true,
  props,
  render(h, { props, data }) {
    let { alt, src, block, fluidGrow, rounded } = props
    let width = toInteger(props.width) || null
    let height = toInteger(props.height) || null
    let align = null
    let srcset = concat(props.srcset)
      .filter(identity)
      .join(',')
    let sizes = concat(props.sizes)
      .filter(identity)
      .join(',')

    if (props.blank) {
      if (!height && width) {
        height = width
      } else if (!width && height) {
        width = height
      }
      if (!width && !height) {
        width = 1
        height = 1
      }
      // Make a blank SVG image
      src = makeBlankImgSrc(width, height, props.blankColor || 'transparent')
      // Disable srcset and sizes
      srcset = null
      sizes = null
    }
    if (props.left) {
      align = 'float-left'
    } else if (props.right) {
      align = 'float-right'
    } else if (props.center) {
      align = 'mx-auto'
      block = true
    }

    return h(
      'img',
      mergeData(data, {
        attrs: {
          src,
          alt,
          width: width ? toString(width) : null,
          height: height ? toString(height) : null,
          srcset: srcset || null,
          sizes: sizes || null
        },
        class: {
          'img-thumbnail': props.thumbnail,
          'img-fluid': props.fluid || fluidGrow,
          'w-100': fluidGrow,
          rounded: rounded === '' || rounded === true,
          [`rounded-${rounded}`]: isString(rounded) && rounded !== '',
          [align]: align,
          'd-block': block
        }
      })
    )
  }
})
