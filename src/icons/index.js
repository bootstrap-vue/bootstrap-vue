// All Icon Components
//
// We do not use individual icon component files, to get around
// the re-export of re-exports issue with Webpack v4
// To make it simple for exporting all icons in src/index.js
//
// TODO:
//   Create a utility script to auto-generate/update this file
//   As there are over 200 icons in the Bootstrap-icons library
//
import Vue from '../utils/vue'
import { mergeData } from 'vue-functional-data-merge'
import { makeIcon } from './helpers/make-icon'
import { pluginFactory } from '../utils/plugins'
import { pascalCase, trim } from '../utils/string'

// We export this object mainly for the docs
// for generating the icon "table"
// it is also used in the IconsPlugin export
export const iconComponents = {}

// --- Generic Icon Component for ease of use ---

// Requires individual icon components to be installed
export const BIcon = /*#__PURE__*/ Vue.extend({
  name: 'BIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    }
  },
  render(h, { data, props }) {
    const icon = pascalCase(trim(props.icon || ''))
    if (!icon) {
      return h()
    }
    const componentName = `BIcon${icon.replace(/^BIcon/, '')}`
    // TODO:
    //   Could check Vue.options.components[componentName]
    //   To see if the icon is registered/valid
    //   Could also use <component :is="componentName"> instead
    return h(componentName, mergeData(data, { props: { variant: props.variant } }))
  }
})
iconComponents.BIcon = BIcon

// --- Individual Icon components ---

// Source SVG Files can be found at:
// https://github.com/twbs/icons/tree/master/icons
// TODO:
//   Create a utility script to auto-generate/update this file
//   As there are over 200 icons in the Bootstrap-icons library

export const BIconAlertCircleFill = /*#__PURE__*/ makeIcon('AlertCircleFill', [
  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8.998 3a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
])
iconComponents.BIconAlertCircleFill = BIconAlertCircleFill

export const BIconAlertCircle = /*#__PURE__*/ makeIcon('AlertCircle', [
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/>',
  '<path d="M9.002 13a1 1 0 112 0 1 1 0 01-2 0zM9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
])
iconComponents.BIconAlertCircle = BIconAlertCircle

export const BIconAlertOctagonFill = /*#__PURE__*/ makeIcon('AlertOctagonFill', [
  '<path fill-rule="evenodd" d="M13.107 2a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146A.5.5 0 016.893 2h6.214zM9.002 13a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
])
iconComponents.BIconAlertOctagonFill = BIconAlertOctagonFill

export const BIconAlertOctagon = /*#__PURE__*/ makeIcon('AlertOctagon', [
  '<path fill-rule="evenodd" d="M6.54 2.146A.5.5 0 016.893 2h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146zM7.1 3L3 7.1v5.8L7.1 17h5.8l4.1-4.1V7.1L12.9 3H7.1z" clip-rule="evenodd"/>',
  '<rect width="2" height="2" x="9.002" y="12" rx="1"/>',
  '<path d="M9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
])
iconComponents.BIconAlertOctagon = BIconAlertOctagon

export const BIconAlertSquareFill = /*#__PURE__*/ makeIcon('AlertOctagonSquareFill', [
  '<path fill-rule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm7.002 9a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
])
iconComponents.BIconAlertSquareFill = BIconAlertSquareFill

export const BIconAlertSquare = /*#__PURE__*/ makeIcon('AlertOctagonSquare', [
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/>',
  '<rect width="2" height="2" x="9.002" y="12" rx="1"/>',
  '<path d="M9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
])
iconComponents.BIconAlertSquare = BIconAlertSquare

export const BIconAlertTriangleFill = /*#__PURE__*/ makeIcon('AlertTriangleFill', [
  '<path fill-rule="evenodd" d="M9.022 3.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H3.144c-.889 0-1.437-.99-.98-1.767L9.022 3.566zM9.002 14a1 1 0 112 0 1 1 0 01-2 0zM10 7a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 7z" clip-rule="evenodd"/>'
])
iconComponents.BIconAlertTriangleFill = BIconAlertTriangleFill

export const BIconAlertTriangle = /*#__PURE__*/ makeIcon('AlertTriangleFill', [
  '<path fill-rule="evenodd" d="M9.938 4.016a.146.146 0 00-.054.057L3.027 15.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L10.12 4.073a.146.146 0 00-.054-.057.13.13 0 00-.063-.016.13.13 0 00-.064.016zm1.043-.45a1.13 1.13 0 00-1.96 0L2.166 15.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L10.982 3.566z" clip-rule="evenodd"/>',
  '<rect width="2" height="2" x="9.002" y="13" rx="1"/>',
  '<path d="M9.1 7.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 7.995z"/>'
])
iconComponents.BIconAlertTriangle = BIconAlertTriangle

export const BIconArchiveFill = /*#__PURE__*/ makeIcon('ArchiveFill', [
  '<path fill-rule="evenodd" d="M14.643 17C15.979 17 17 15.845 17 14.5V7H3v7.5C3 15.845 4.021 17 5.357 17h9.286zM8 9a.5.5 0 000 1h4a.5.5 0 000-1H8zM3 3a1 1 0 00-1 1v1.5a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'
])
iconComponents.BIconArchiveFill = BIconArchiveFill

export const BIconArchive = /*#__PURE__*/ makeIcon('Archive', [
  '<path fill-rule="evenodd" d="M4 7v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V7h1v7.5c0 1.345-1.021 2.5-2.357 2.5H5.357C4.021 17 3 15.845 3 14.5V7h1z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M7.5 9.5A.5.5 0 018 9h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5zM17 4H3v2h14V4zM3 3a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'
])
iconComponents.BIconArchive = BIconArchive

export const BIconArrowClockwise = /*#__PURE__*/ makeIcon('ArrowClockwise', [
  '<path fill-rule="evenodd" d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63l-.5.865A5.472 5.472 0 0010 4.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M10.646 1.646a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L12.793 4.5l-2.147-2.146a.5.5 0 010-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowClockwise = BIconArrowClockwise

export const BIconArrowCounterclockwise = /*#__PURE__*/ makeIcon('ArrowCounterclockwise', [
  '<path fill-rule="evenodd" d="M10 4.5A5.5 5.5 0 114.5 10a.5.5 0 00-1 0 6.5 6.5 0 103.25-5.63l.5.865A5.472 5.472 0 0110 4.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M9.354 1.646a.5.5 0 00-.708 0l-2.5 2.5a.5.5 0 000 .708l2.5 2.5a.5.5 0 10.708-.708L7.207 4.5l2.147-2.146a.5.5 0 000-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowCounterclockwise = BIconArrowCounterclockwise

// TODO:
//   Add remaining icons

// --- Main plugin export --

export const IconsPlugin = /*#__PURE__*/ pluginFactory({ components: iconComponents })
