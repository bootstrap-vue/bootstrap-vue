import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { concat } from '../../utils/array'
import { kebabCase, pascalCase } from '../../utils/string'
import { mergeData } from 'vue-functional-data-merge'

// Common icon props
export const commonIconProps = {
  variant: {
    type: String
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
            role: 'img',
            alt: 'icon',
            focusable: 'false'
          }
        },
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
 * @param {string|string[]} raw innerHTML for SVG
 * @return {VueComponent}
 */
export const makeIcon = (name, content) => {
  // Pre-compute some values, so they are not computed on
  // each instantiation of the icon component
  const iconName = `BIcon${pascalCase(name)}`
  const iconNameClass = `bi-${kebabCase(name)}`
  // The following could be simplified if the content is
  // guaranteed to be a single pre-trimmed string
  const svgContent = concat(content)
    .filter(identity)
    .join('')
    .trim()
  // Return the icon component
  return Vue.extend({
    name: iconName,
    functional: true,
    props: {
      variant: {
        type: String,
        value: null
      }
    },
    render(h, { data, props }) {
      return h(
        BVIconBase,
        mergeData(data, {
          staticClass: iconNameClass,
          props: { content: svgContent, variant: props.variant }
        })
      )
    }
  })
}
