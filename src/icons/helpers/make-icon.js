import Vue from '../../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import identity from '../../utils/identity'
import { kebabCase, pascalCase, trim } from '../../utils/string'
import { toFloat } from '../../utils/number'

// Common icon props (should be cloned/spread before using)
export const commonIconProps = {
  variant: {
    type: String,
    default: null
  },
  fontScale: {
    type: [Number, String],
    default: 1
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  flipH: {
    type: Boolean,
    default: false
  },
  flipV: {
    type: Boolean,
    default: false
  },
  shiftH: {
    type: [Number, String],
    default: 0
  },
  shiftV: {
    type: [Number, String],
    default: 0
  }
}

// Base attributes needed on all icons
const baseAttrs = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 20 20',
  focusable: 'false',
  role: 'img',
  alt: 'icon'
}

// Shared private base component to reduce bundle/runtime size
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
    const fontScale = toFloat(props.fontScale) || 1
    const scale = toFloat(props.scale) || 1
    const rotate = toFloat(props.rotate) || 0
    const shiftH = toFloat(props.shiftH) || 0
    const shiftV = toFloat(props.shiftV) || 0
    const flipH = props.flipH
    const flipV = props.flipV
    // Compute the transforms. Note that order is important
    // CSS transforms are applied in order from right to left
    // and we want flipping to occur before rotation, and
    // shifting is applied last
    const transforms = [
      shiftH ? `translateX(${(100 * shiftH) / 16}%)` : null,
      shiftV ? `translateY(${(-100 * shiftV) / 16}%)` : null,
      rotate ? `rotate(${rotate}deg)` : null,
      flipH || flipV || scale !== 1
        ? `scale(${(flipH ? -1 : 1) * scale}, ${(flipV ? -1 : 1) * scale})`
        : null
    ].filter(identity)

    // We wrap the content in a `<g>` for handling the transforms
    const $inner = h('g', {
      style: {
        transform: transforms.join(' ') || null,
        transformOrigin: transforms.length > 0 ? 'center' : null
      },
      domProps: { innerHTML: props.content || '' }
    })

    return h(
      'svg',
      mergeData(
        {
          class: { [`text-${props.variant}`]: !!props.variant },
          attrs: baseAttrs,
          style: { fontSize: fontScale === 1 ? null : `${fontScale * 100}%` }
        },
        // Merge in user supplied data
        data,
        // These cannot be overridden by users
        {
          staticClass: 'b-icon bi',
          attrs: { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor' }
        }
      ),
      [$inner]
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
        mergeData(data, { staticClass: iconNameClass, props: { ...props, content: svgContent } })
      )
    }
  })
}
