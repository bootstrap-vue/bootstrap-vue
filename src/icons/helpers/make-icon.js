import Vue, { mergeData } from '../../vue'
import { kebabCase, pascalCase, trim } from '../../utils/string'
import { commonIconProps, BVIconBase } from './icon-base'

/**
 * Icon component generator function
 *
 * @param {string} icon name (minus the leading `BIcon`)
 * @param {string} raw `innerHTML` for SVG
 * @return {VueComponent}
 */
export const makeIcon = (name, content) => {
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  const kebabName = kebabCase(name)
  const iconName = `BIcon${pascalCase(name)}`
  const iconNameClass = `bi-${kebabName}`
  const iconTitle = kebabName.replace(/-/g, ' ')
  const svgContent = trim(content || '')
  // Return the icon component definition
  return /*#__PURE__*/ Vue.extend({
    name: iconName,
    functional: true,
    props: {
      ...commonIconProps,
      stacked: {
        type: Boolean,
        default: false
      }
    },
    render(h, { data, props }) {
      return h(
        BVIconBase,
        mergeData(
          // Defaults
          {
            props: { title: iconTitle },
            attrs: { 'aria-label': iconTitle }
          },
          // User data
          data,
          // Required data
          {
            staticClass: iconNameClass,
            props: { ...props, content: svgContent }
          }
        )
      )
    }
  })
}
