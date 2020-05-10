import { CLASS_NAME_EMBED } from '../../constants/class-names'
import { NAME_EMBED, NAME_IMG, NAME_IMG_LAZY } from '../../constants/components'
import Vue, { mergeData } from '../../utils/vue'
import { arrayIncludes } from '../../utils/array'
import { kebabCase, suffixClass } from '../../utils/string'

// --- Constants ---
const ALLOWED_COMPONENTS = [NAME_IMG, NAME_IMG_LAZY]
const ALLOWED_TYPES = [
  'embed',
  'iframe',
  'img',
  'object',
  'video',
  ...ALLOWED_COMPONENTS.map(name => kebabCase(name))
]

// --- Props ---
export const props = {
  type: {
    type: String,
    default: 'iframe',
    validator: value => arrayIncludes(ALLOWED_TYPES, value)
  },
  tag: {
    type: String,
    default: 'div'
  },
  aspect: {
    type: String,
    default: '16by9'
  }
}

// --- Main component ---
// @vue/component
export const BEmbed = /*#__PURE__*/ Vue.extend({
  name: NAME_EMBED,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      props.tag,
      {
        staticClass: CLASS_NAME_EMBED,
        class: { [suffixClass(CLASS_NAME_EMBED, props.aspect)]: props.aspect },
        ref: data.ref
      },
      [
        h(
          props.type,
          mergeData(data, { staticClass: suffixClass(CLASS_NAME_EMBED, 'item') }),
          children
        )
      ]
    )
  }
})
