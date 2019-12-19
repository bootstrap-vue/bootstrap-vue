import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import identity from '../../utils/identity'
import { kebabCase, pascalCase, trim } from '../../utils/string'
import { toFloat } from '../../utils/number'

// Common icon props
export const commonIconProps = {
  variant: {
    type: String
  },
  fontScale: {
    type: [Number, String]
  },
  flipH: {
    type: Boolean,
    default: false
  },
  flipV: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: [Number, String],
    default: 0
  }
}

// Shared base component to reduce bundle size
// @vue/component
const BVIconBase = {
  name: 'BVIconBase',
  functional: true,
  props: {
    content: {
      type: String
    },
    ...commonIconProps
  },
  render(h, { data, props }) {
    const fontScale = (toFloat(props.fontScale) || 1)
    const angle = toFloat(props.scale) || 0
    const transforms = [
      props.flipH || props.flipV ? `scale(${props.flipH ? -1 : 1}, ${ props.flipV ? -1 : 1})` : null,
      angle ? `rotate(${angle}, 0, 0)` : null
    ]
    return h(
      'svg',
      mergeData(
        {
          staticClass: 'bi',
          class: { [`text-${props.variant}`]: !!props.variant },
          attrs: {
            width: '1em',
            height: '1em',
            viewBox: '0 0 20 20',
            focusable: 'false',
            role: 'img',
            alt: 'icon'
          },
          style: {
            fontSize: scale === 1 ? null : scale * 100,
            transform: transforms.filter(identity).join(' '),
          }
        },
        // Merge in user supplied data
        data,
        // These cannot be overridden by users
        {
          attrs: { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor' },
          domProps: { innerHTML: props.content || '' }
        }
      )
    )
  }
}

/**
 * Icon component generator function
 *
 * @param {string} icon name (minus the leading `BIcon`)
 * @param {string} raw innerHTML for SVG
 * @return {VueComponent}
 */
export const makeIcon = (name, content) => {
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  const iconName = `BIcon${pascalCase(name)}`
  const iconNameClass = `bi-${kebabCase(name)}`
  const svgContent = trim(content || '')
  // Return the icon component definition
  return Vue.extend({
    name: iconName,
    functional: true,
    props: { ...commonIconProps },
    render(h, { data, props }) {
      return h(
        BVIconBase,
        mergeData(data, {
          staticClass: iconNameClass,
          props: { ...props, content: svgContent }
        })
      )
    }
  })
}
