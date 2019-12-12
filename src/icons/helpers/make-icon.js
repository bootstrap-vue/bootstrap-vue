import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { concat } from '../../utils/array'
import { kebabCase, pascalCase } from '../../utils/string'
import { mergeData } from 'vue-functional-data-merge'

/**
 * Icon component generator function
 *
 * @param {string} icon name (minus the leading `BIcon`)
 * @param {string|string[]} raw innerHTML for SVG
 * @return {VueComponent}
 */
export const makeIcon = (name, content) => {
  const svgContent = concat(content)
    .filter(identity)
    .join('')
    .trim()
  // The following is needed if we import the raw SVGs from
  // bootstrap-icons/icons/*.svg and do not strip the <svg> root element
  // content = content.replace(/<svg[^>]+>/, '').replace(/<\/svg>/, '')

  // Pre-compute some values, so they are not computed on
  // each instantiation of the icon component
  const iconName = `BIcon${pascalCase(name)}`
  const iconClass = `bi bi-${kebabCase(name)}`
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
      const componentData = mergeData(
        {
          staticClass: iconClass,
          class: { [`text-${props.variant}`]: !!props.variant },
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '1em',
            height: '1em',
            viewBox: '0 0 20 20',
            fill: 'currentColor',
            role: 'img',
            alt: 'icon',
            focusable: 'false'
          }
        },
        data,
        { domProps: { innerHTML: svgContent } }
      )
      return h('svg', componentData)
    }
  })
}
