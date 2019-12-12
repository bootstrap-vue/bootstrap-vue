import Vue from '../../utils/vue'
import identity from '../../utils/identity'
import { concat } from '../../utils/array'
import { trim } from '../../utils/string'
import { mergeData } from 'vue-functional-data-merge'

// TODO:
//   Move the following methods to utils/string

// Converts a kebab-case or camelCase string to PascalCase
const unKebabRE = /-(\w)/g
const pascalCase = str => {
  str = str.replace(unKebabRE, (_, c) => (c ? c.toUpperCase() : ''))
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Converts PascalCase or camelCase to kebab-case
const hyphenateRE = /\B([A-Z])/g
export const kebabCase = str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

// Icon component generator function
// @name: (string) icon name (minus the leading `BIcon`)
// @content: (String|Arrya<string>) raw inner HTML for SVG
// returns VueComponent
const makeIcon = (name, content = '') => {
  content = concat(content).filter(identity).join('').trim()
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
      return h('svg', mergeData(
        {
          staticClass: iconClass,
          class: { [`text-${props.variant}`]: !!props.variant },
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg'
            width: '1em',
            height: '1em',
            viewBox: '0 0 20 20',
            fill: 'currentColor'
            role: 'img',
            alt: 'icon',
            focusable: 'false'
          }
        },
        data,
        { domProps: { innerHTML: content } }
      ))
    }
  })
}
