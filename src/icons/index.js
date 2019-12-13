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

// We export this object mainly for the docs for generating the icon "table"
// It is also used in the IconsPlugin export at the bottom of this file
// Populated as Icon components are defined
export const iconComponents = {}

// --- Generic Icon Component for ease of use ---

// Pre-compiled RegExpr

const RX_ICON_PREFIX = /^BIcon/

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
    const icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '')
    if (!icon) {
      return h()
    }
    const componentName = `BIcon${icon}`
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

export const BIconArrowDownLeft = /*#__PURE__*/ makeIcon('ArrowDownLeft', [
  '<path fill-rule="evenodd" d="M5 9.5a.5.5 0 01.5.5v4.5H10a.5.5 0 010 1H5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowDownLeft = BIconArrowDownLeft

export const BIconArrowDownRight = /*#__PURE__*/ makeIcon('ArrowDownRight', [
  '<path fill-rule="evenodd" d="M14 9.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H9a.5.5 0 010-1h4.5V10a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.646 5.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowDownRight = BIconArrowDownRight

export const BIconArrowDown = /*#__PURE__*/ makeIcon('ArrowDown', [
  '<path fill-rule="evenodd" d="M6.646 11.646a.5.5 0 01.708 0L10 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M10 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowDown = BIconArrowDown

export const BIconArrowLeftRight = /*#__PURE__*/ makeIcon('ArrowLeftRight', [
  '<path fill-rule="evenodd" d="M12.146 9.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 13l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4 13a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 13zm3.854-9.354a.5.5 0 010 .708L5.207 7l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.5 7a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowLeftRight = BIconArrowLeftRight

export const BIconArrowLeft = /*#__PURE__*/ makeIcon('ArrowLeft', [
  '<path fill-rule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowLeft = BIconArrowLeft

export const BIconArrowRepeat = /*#__PURE__*/ makeIcon('ArrowRepeat', [
  '<path fill-rule="evenodd" d="M4 9.5a.5.5 0 00-.5.5 6.5 6.5 0 0012.13 3.25.5.5 0 00-.866-.5A5.5 5.5 0 014.5 10a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.354 9.146a.5.5 0 00-.708 0l-2 2a.5.5 0 00.708.708L4 10.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zM15.947 10.5a.5.5 0 00.5-.5 6.5 6.5 0 00-12.13-3.25.5.5 0 10.866.5A5.5 5.5 0 0115.448 10a.5.5 0 00.5.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M18.354 8.146a.5.5 0 00-.708 0L16 9.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowRepeat = BIconArrowRepeat

export const BIconArrowRight = /*#__PURE__*/ makeIcon('ArrowRight', [
  '<path fill-rule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowRight = BIconArrowRight

export const BIconArrowUpDown = /*#__PURE__*/ makeIcon('ArrowUpDown', [
  '<path fill-rule="evenodd" d="M13 5.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M12.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L13 5.707l-2.646 2.647a.5.5 0 01-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L7 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M7 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowUpDown = BIconArrowUpDown

export const BIconArrowUpLeft = /*#__PURE__*/ makeIcon('ArrowUpLeft', [
  '<path fill-rule="evenodd" d="M4.5 6a.5.5 0 01.5-.5h5a.5.5 0 010 1H5.5V11a.5.5 0 01-1 0V6z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.646 5.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowUpLeft = BIconArrowUpLeft

export const BIconArrowUpRight = /*#__PURE__*/ makeIcon('ArrowUpRight', [
  '<path fill-rule="evenodd" d="M8.5 6a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6.5H9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowUpRight = BIconArrowUpRight

export const BIconArrowUp = /*#__PURE__*/ makeIcon('ArrowUp', [
  '<path fill-rule="evenodd" d="M10 5.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M9.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L10 5.707 7.354 8.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowUp = BIconArrowUp

export const BIconArrowsContract = /*#__PURE__*/ makeIcon('ArrowsContract', [
  '<path fill-rule="evenodd" d="M11.5 4.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M16.354 3.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm-7.5 7.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.036 11.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V12h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowsContract = BIconArrowsContract

export const BIconArrowsExpand = /*#__PURE__*/ makeIcon('ArrowsExpand', [
  '<path fill-rule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowsExpand = BIconArrowsExpand

export const BIconArrowsFullscreen = /*#__PURE__*/ makeIcon('ArrowsFullscreen', [
  '<path fill-rule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5zm4.5 7.5a.5.5 0 00-.5.5v3.5H12a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M11.146 11.11a.5.5 0 000 .708l4.5 4.5a.5.5 0 00.708-.707l-4.5-4.5a.5.5 0 00-.708 0zM3.682 3.646a.5.5 0 000 .708l4.5 4.5a.5.5 0 10.707-.708l-4.5-4.5a.5.5 0 00-.707 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M8.5 4a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v4a.5.5 0 001 0V4.5H8a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconArrowsFullscreen = BIconArrowsFullscreen

export const BIconAt = /*#__PURE__*/ makeIcon('At', [
  '<path fill-rule="evenodd" d="M15.106 9.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V7.206h-1.032v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907s-.601 1.914-1.538 1.914c-.895 0-1.442-.725-1.442-1.914z" clip-rule="evenodd"/>'
])
iconComponents.BIconAt = BIconAt

export const BIconBarChartFill = /*#__PURE__*/ makeIcon('BarChartFill', [
  '<rect width="4" height="5" x="3" y="12" rx="1"/>',
  '<rect width="4" height="9" x="8" y="8" rx="1"/>',
  '<rect width="4" height="14" x="13" y="3" rx="1"/>'
])
iconComponents.BIconBarChartFill = BIconBarChartFill

export const BIconBarChart = /*#__PURE__*/ makeIcon('BarChart', [
  '<path fill-rule="evenodd" d="M6 13H4v3h2v-3zm5-4H9v7h2V9zm5-5h-2v12h2V4zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM8 9a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H9a1 1 0 01-1-1V9zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3z" clip-rule="evenodd"/>'
])
iconComponents.BIconBarChart = BIconBarChart

export const BIconBatteryFull = /*#__PURE__*/ makeIcon('BatteryFull', [
  '<path fill-rule="evenodd" d="M14 7H4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1zM4 6a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H4z" clip-rule="evenodd"/>',
  '<path d="M4 8h10v4H4V8zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'
])
iconComponents.BIconBatteryFull = BIconBatteryFull

export const BIconBattery = /*#__PURE__*/ makeIcon('Battery', [
  '<path fill-rule="evenodd" d="M14 7H4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1zM4 6a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H4z" clip-rule="evenodd"/>',
  '<path d="M16.5 11.5a1.5 1.5 0 000-3v3z"/>'
])
iconComponents.BIconBattery = BIconBattery

export const BIconBellFill = /*#__PURE__*/ makeIcon('BellFill', [
  '<path d="M10 18a2 2 0 002-2H8a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 005 8c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>'
])
iconComponents.BIconBellFill = BIconBellFill

export const BIconBell = /*#__PURE__*/ makeIcon('Bell', [
  '<path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z"/>',
  '<path fill-rule="evenodd" d="M10 3.918l-.797.161A4.002 4.002 0 006 8c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C14.134 10.197 14 8.628 14 8a4.002 4.002 0 00-3.203-3.92L10 3.917zM16.22 14c.223.447.482.801.78 1H3c.299-.199.557-.553.78-1C4.68 12.2 5 8.88 5 8c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0115 8c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>'
])
iconComponents.BIconBell = BIconBell

export const BIconBlockquoteLeft = /*#__PURE__*/ makeIcon('BlockquoteLeft', [
  '<path fill-rule="evenodd" d="M4 5.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm5 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>',
  '<path d="M5.5 8c-.768.176-1.5.855-1.5 1.799 0 .633.316 1.078.814 1.078.498 0 .774-.445.774-.961-.48-.035-.826-.334-.826-.768 0-.445.363-.773.838-.908L5.5 8zm2.238 0c-.767.176-1.5.855-1.5 1.799 0 .633.317 1.078.815 1.078.498 0 .773-.445.773-.961-.474-.035-.82-.334-.82-.768 0-.445.357-.773.832-.908l-.1-.24z"/>'
])
iconComponents.BIconBlockquoteLeft = BIconBlockquoteLeft

export const BIconBlockquoteRight = /*#__PURE__*/ makeIcon('BlockquoteRight', [
  '<path fill-rule="evenodd" d="M4 5.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>',
  '<path d="M14.338 8c.768.176 1.5.855 1.5 1.799 0 .633-.316 1.078-.815 1.078-.498 0-.773-.445-.773-.961.48-.035.826-.334.826-.768 0-.445-.363-.773-.838-.908l.1-.24zM12.1 8c.767.176 1.5.855 1.5 1.799 0 .633-.317 1.078-.815 1.078-.498 0-.773-.445-.773-.961.474-.035.82-.334.82-.768 0-.445-.357-.773-.832-.908l.1-.24z"/>'
])
iconComponents.BIconBlockquoteRight = BIconBlockquoteRight

export const BIconBookmarkFill = /*#__PURE__*/ makeIcon('BookmarkFill', [
  '<path fill-rule="evenodd" d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V5z" clip-rule="evenodd"/>'
])
iconComponents.BIconBookmarkFill = BIconBookmarkFill

export const BIconBookmark = /*#__PURE__*/ makeIcon('Bookmark', [
  '<path fill-rule="evenodd" d="M10 14l5 3V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V5a1 1 0 00-1-1H7a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>'
])
iconComponents.BIconBookmark = BIconBookmark

export const BIconBootstrapFill = /*#__PURE__*/ makeIcon('BootstrapFill', [
  '<path fill-rule="evenodd" d="M6.002 2a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V6a4 4 0 00-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.543-2.11H7.063V14zm1.313-4.875V6.658h1.78c.974 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H8.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H8.375v2.725z" clip-rule="evenodd"/>'
])
iconComponents.BIconBootstrapFill = BIconBootstrapFill

export const BIconBootstrapReboot = /*#__PURE__*/ makeIcon('BootstrapReboot', [
  '<path fill-rule="evenodd" d="M3.161 10a6.84 6.84 0 106.842-6.84.58.58 0 110-1.16 8 8 0 11-6.556 3.412l-.663-.577a.58.58 0 01.227-.997l2.52-.69a.58.58 0 01.728.633l-.332 2.592a.58.58 0 01-.956.364l-.643-.56A6.812 6.812 0 003.16 10zm5.228-.079V7.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.505 1.324-1.386 1.324h-1.6zm0 3.75v-2.828h1.57l1.498 2.828h1.314l-1.646-3.006c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H7.248v7.352h1.141z" clip-rule="evenodd"/>'
])
iconComponents.BIconBootstrapReboot = BIconBootstrapReboot

export const BIconBootstrap = /*#__PURE__*/ makeIcon('Bootstrap', [
  '<path fill-rule="evenodd" d="M6.002 2h8a4 4 0 014 4v8a4 4 0 01-4 4h-8a4 4 0 01-4-4V6a4 4 0 014-4zm0 1.5a2.5 2.5 0 00-2.5 2.5v8a2.5 2.5 0 002.5 2.5h8a2.5 2.5 0 002.5-2.5V6a2.5 2.5 0 00-2.5-2.5h-8zM7.062 14h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.543-2.11H7.063V14zm1.313-4.875V6.658h1.78c.974 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H8.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H8.375v2.725z" clip-rule="evenodd"/>'
])
iconComponents.BIconBootstrap = BIconBootstrap

export const BIconBoxArrowBottomLeft = /*#__PURE__*/ makeIcon('BoxArrowBottomLeft', [
  '<path fill-rule="evenodd" d="M15 3.5A1.5 1.5 0 0116.5 5v8a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H7a.5.5 0 00-.5.5v4a.5.5 0 01-1 0V5A1.5 1.5 0 017 3.5h8zm-11 7a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 000-1H4.5V11a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M3.646 16.354a.5.5 0 00.708 0l8-8a.5.5 0 00-.708-.708l-8 8a.5.5 0 000 .708z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowBottomLeft = BIconBoxArrowBottomLeft

export const BIconBoxArrowBottomRight = /*#__PURE__*/ makeIcon('BoxArrowBottomRight', [
  '<path fill-rule="evenodd" d="M5 3.5A1.5 1.5 0 003.5 5v8A1.5 1.5 0 005 14.5h4a.5.5 0 000-1H5a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v4a.5.5 0 001 0V5A1.5 1.5 0 0013 3.5H5zm11 7a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-5a.5.5 0 010-1h4.5V11a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M16.354 16.354a.5.5 0 01-.708 0l-8-8a.5.5 0 11.708-.708l8 8a.5.5 0 010 .708z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowBottomRight = BIconBoxArrowBottomRight

export const BIconBoxArrowDown = /*#__PURE__*/ makeIcon('BoxArrowDown', [
  '<path fill-rule="evenodd" d="M6.646 13.646a.5.5 0 01.708 0L10 16.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M10 6.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.5 4A1.5 1.5 0 016 2.5h8A1.5 1.5 0 0115.5 4v7a1.5 1.5 0 01-1.5 1.5h-1.5a.5.5 0 010-1H14a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h1.5a.5.5 0 010 1H6A1.5 1.5 0 014.5 11V4z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowDown = BIconBoxArrowDown

export const BIconBoxArrowLeft = /*#__PURE__*/ makeIcon('BoxArrowLeft', [
  '<path fill-rule="evenodd" d="M6.354 13.354a.5.5 0 000-.708L3.707 10l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M13.5 10a.5.5 0 00-.5-.5H4a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M16 15.5a1.5 1.5 0 001.5-1.5V6A1.5 1.5 0 0016 4.5H9A1.5 1.5 0 007.5 6v1.5a.5.5 0 001 0V6a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V14A1.5 1.5 0 009 15.5h7z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowLeft = BIconBoxArrowLeft

export const BIconBoxArrowRight = /*#__PURE__*/ makeIcon('BoxArrowRight', [
  '<path fill-rule="evenodd" d="M13.646 13.354a.5.5 0 010-.708L16.293 10l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M6.5 10a.5.5 0 01.5-.5h9a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4 15.5A1.5 1.5 0 012.5 14V6A1.5 1.5 0 014 4.5h7A1.5 1.5 0 0112.5 6v1.5a.5.5 0 01-1 0V6a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V14a1.5 1.5 0 01-1.5 1.5H4z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowRight = BIconBoxArrowRight

export const BIconBoxArrowUpLeft = /*#__PURE__*/ makeIcon('BoxArrowUpLeft', [
  '<path fill-rule="evenodd" d="M16.5 15a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 15v-4a.5.5 0 011 0v4a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V7a.5.5 0 00-.5-.5h-4a.5.5 0 010-1h4A1.5 1.5 0 0116.5 7v8zm-7-11a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v5a.5.5 0 001 0V4.5H9a.5.5 0 00.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowUpLeft = BIconBoxArrowUpLeft

export const BIconBoxArrowUpRight = /*#__PURE__*/ makeIcon('BoxArrowUpRight', [
  '<path fill-rule="evenodd" d="M3.5 15A1.5 1.5 0 005 16.5h8a1.5 1.5 0 001.5-1.5v-4a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h4a.5.5 0 000-1H5A1.5 1.5 0 003.5 7v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4.5H11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M16.354 3.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowUpRight = BIconBoxArrowUpRight

export const BIconBoxArrowUp = /*#__PURE__*/ makeIcon('BoxArrowUp', [
  '<path fill-rule="evenodd" d="M6.646 6.354a.5.5 0 00.708 0L10 3.707l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M10 13.5a.5.5 0 00.5-.5V4a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M4.5 16A1.5 1.5 0 006 17.5h8a1.5 1.5 0 001.5-1.5V9A1.5 1.5 0 0014 7.5h-1.5a.5.5 0 000 1H14a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V9a.5.5 0 01.5-.5h1.5a.5.5 0 000-1H6A1.5 1.5 0 004.5 9v7z" clip-rule="evenodd"/>'
])
iconComponents.BIconBoxArrowUp = BIconBoxArrowUp

export const BIconBrightnessFillHigh = /*#__PURE__*/ makeIcon(
  'BrightnessFillHigh',
  '<circle cx="10" cy="10" r="4"/><path fill-rule="evenodd" d="M10 2a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 0110 2zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM5 10a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L5.05 15.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM6.464 6.464a.5.5 0 01-.707 0L4.343 5.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'
)
iconComponents.BIconBrightnessFillHigh = BIconBrightnessFillHigh

export const BIconBrightnessFillLow = /*#__PURE__*/ makeIcon(
  'BrightnessFillLow',
  '<circle cx="10" cy="10" r="4"/><circle cx="10" cy="4.5" r=".5"/><circle cx="10" cy="15.5" r=".5"/><circle cx="15.5" cy="10" r=".5" transform="rotate(90 15.5 10)"/><circle cx="4.5" cy="10" r=".5" transform="rotate(90 4.5 10)"/><circle cx="13.889" cy="6.111" r=".5" transform="rotate(45 13.89 6.11)"/><circle cx="6.111" cy="13.889" r=".5" transform="rotate(45 6.11 13.89)"/><circle cx="13.889" cy="13.889" r=".5" transform="rotate(135 13.89 13.89)"/><circle cx="6.111" cy="6.111" r=".5" transform="rotate(135 6.11 6.11)"/>'
)
iconComponents.BIconBrightnessFillLow = BIconBrightnessFillLow

export const BIconBrightnessHigh = /*#__PURE__*/ makeIcon(
  'BrightnessHigh',
  '<path fill-rule="evenodd" d="M10 13a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8zm0-12a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 0110 2zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM5 10a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L5.05 15.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM6.464 6.464a.5.5 0 01-.707 0L4.343 5.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'
)
iconComponents.BIconBrightnessHigh = BIconBrightnessHigh

export const BIconBrightnessLow = /*#__PURE__*/ makeIcon(
  'BrightnessLow',
  '<path fill-rule="evenodd" d="M10 13a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><circle cx="10" cy="4.5" r=".5"/><circle cx="10" cy="15.5" r=".5"/><circle cx="15.5" cy="10" r=".5" transform="rotate(90 15.5 10)"/><circle cx="4.5" cy="10" r=".5" transform="rotate(90 4.5 10)"/><circle cx="13.889" cy="6.111" r=".5" transform="rotate(45 13.89 6.11)"/><circle cx="6.111" cy="13.889" r=".5" transform="rotate(45 6.11 13.89)"/><circle cx="13.889" cy="13.889" r=".5" transform="rotate(135 13.89 13.89)"/><circle cx="6.111" cy="6.111" r=".5" transform="rotate(135 6.11 6.11)"/>'
)
iconComponents.BIconBrightnessLow = BIconBrightnessLow

export const BIconBullseye = /*#__PURE__*/ makeIcon(
  'Bullseye',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 13a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><path d="M11.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>'
)
iconComponents.BIconBullseye = BIconBullseye

export const BIconCalendar = /*#__PURE__*/ makeIcon(
  'Calendar',
  '<path fill-rule="evenodd" d="M16 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM3 5.857C3 5.384 3.448 5 4 5h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H4c-.552 0-1-.384-1-.857V5.857z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.5 9a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconCalendar = BIconCalendar

export const BIconCamera = /*#__PURE__*/ makeIcon(
  'Camera',
  '<path d="M11 7c-1.657 0-4 1.343-4 3a4 4 0 014-4v1z"/><path fill-rule="evenodd" d="M16.333 5h-2.015A5.97 5.97 0 0011 4a5.972 5.972 0 00-3.318 1H3.667C2.747 5 2 5.746 2 6.667v6.666C2 14.253 2.746 15 3.667 15h4.015c.95.632 2.091 1 3.318 1a5.973 5.973 0 003.318-1h2.015c.92 0 1.667-.746 1.667-1.667V6.667C18 5.747 17.254 5 16.333 5zM3.5 7a.5.5 0 100-1 .5.5 0 000 1zm7.5 8a5 5 0 100-10 5 5 0 000 10z" clip-rule="evenodd"/><path d="M4 5a1 1 0 011-1h1a1 1 0 010 2H5a1 1 0 01-1-1z"/>'
)
iconComponents.BIconCamera = BIconCamera

export const BIconCameraVideo = /*#__PURE__*/ makeIcon(
  'CameraVideo',
  '<path fill-rule="evenodd" d="M4.667 5.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V6.667c0-.645-.522-1.167-1.167-1.167H4.667zM2.5 6.667C2.5 5.47 3.47 4.5 4.667 4.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H4.667A2.167 2.167 0 012.5 13.333V6.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.25 7.65l2.768-1.605a.318.318 0 01.482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V6.308c0-1.033-1.125-1.626-1.984-1.128L12.75 6.785l.502.865z" clip-rule="evenodd"/>'
)
iconComponents.BIconCameraVideo = BIconCameraVideo

export const BIconCameraVideoFill = /*#__PURE__*/ makeIcon(
  'CameraVideoFill',
  '<path d="M4.667 5h6.666C12.253 5 13 5.746 13 6.667v6.666c0 .92-.746 1.667-1.667 1.667H4.667C3.747 15 3 14.254 3 13.333V6.667C3 5.747 3.746 5 4.667 5z"/><path d="M9.404 10.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V6.308c0-.63-.692-1.01-1.233-.696L9.404 9.304a.802.802 0 000 1.393z"/>'
)
iconComponents.BIconCameraVideoFill = BIconCameraVideoFill

export const BIconChat = /*#__PURE__*/ makeIcon(
  'Chat',
  '<path fill-rule="evenodd" d="M8.207 13.293L7.5 14a5.5 5.5 0 110-11h5a5.5 5.5 0 110 11s-1.807 2.169-4.193 2.818C7.887 16.933 7.449 17 7 17c.291-.389.488-.74.617-1.052C8.149 14.649 7.5 14 7.5 14c.707-.707.708-.707.708-.706h.001l.002.003.004.004.01.01a1.184 1.184 0 01.074.084c.039.047.085.108.134.183.097.15.206.36.284.626.114.386.154.855.047 1.394.717-.313 1.37-.765 1.895-1.201a10.266 10.266 0 001.013-.969l.05-.056.01-.012m0 0A1 1 0 0112.5 13a4.5 4.5 0 100-9h-5a4.5 4.5 0 000 9 1 1 0 01.707.293" clip-rule="evenodd"/>'
)
iconComponents.BIconChat = BIconChat

export const BIconChatFill = /*#__PURE__*/ makeIcon(
  'ChatFill',
  '<path fill-rule="evenodd" d="M7.5 14s.65.65.117 1.948A4.821 4.821 0 017 17c.449 0 .887-.067 1.307-.181C10.692 16.169 12.5 14 12.5 14a5.5 5.5 0 100-11h-5a5.5 5.5 0 100 11z" clip-rule="evenodd"/>'
)
iconComponents.BIconChatFill = BIconChatFill

export const BIconCheck = /*#__PURE__*/ makeIcon(
  'Check',
  '<path fill-rule="evenodd" d="M15.854 5.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L8.5 12.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconCheck = BIconCheck

export const BIconCheckBox = /*#__PURE__*/ makeIcon(
  'CheckBox',
  '<path fill-rule="evenodd" d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.5 15A1.5 1.5 0 005 16.5h10a1.5 1.5 0 001.5-1.5v-5a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h8a.5.5 0 000-1H5A1.5 1.5 0 003.5 5v10z" clip-rule="evenodd"/>'
)
iconComponents.BIconCheckBox = BIconCheckBox

export const BIconCheckCircle = /*#__PURE__*/ makeIcon(
  'CheckCircle',
  '<path fill-rule="evenodd" d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconCheckCircle = BIconCheckCircle

// export const BIcon = /*#__PURE__*/ makeIcon('', [
// ])
// iconComponents.BIcon = BIcon

export const BIconUnlockFill = /*#__PURE__*/ makeIcon(
  'UnlockFill',
  '<path d="M2.5 10a2 2 0 012-2h7a2 2 0 012 2v5a2 2 0 01-2 2h-7a2 2 0 01-2-2v-5z"/><path fill-rule="evenodd" d="M10.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"/>'
)
iconComponents.BIconUnlockFill = BIconUnlockFill

export const BIconUnlock = /*#__PURE__*/ makeIcon(
  'Unlock',
  '<path fill-rule="evenodd" d="M11.655 9H4.333c-.264 0-.398.068-.471.121a.73.73 0 00-.224.296 1.626 1.626 0 00-.138.59V15c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 00.436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 00.224-.296 1.627 1.627 0 00.138-.59V10c0-.342-.076-.531-.14-.635a.658.658 0 00-.255-.237 1.123 1.123 0 00-.45-.128zm.012-1H4.333C2.5 8 2.5 10 2.5 10v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2v-5c0-2-1.833-2-1.833-2zM10.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"/>'
)
iconComponents.BIconUnlock = BIconUnlock

export const BIconVolumeDown = /*#__PURE__*/ makeIcon(
  'VolumeDown',
  '<path fill-rule="evenodd" d="M11.717 5.55A.5.5 0 0112 6v8a.5.5 0 01-.812.39L8.825 12.5H6.5A.5.5 0 016 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM11 7.04L9.312 8.39A.5.5 0 019 8.5H7v3h2a.5.5 0 01.312.11L11 12.96V7.04zm1.584.237a138.303 138.303 0 00.832-.554l.002.002.003.005.01.016a4.871 4.871 0 01.16.264c.1.175.233.425.366.724.262.59.543 1.415.543 2.266 0 .85-.28 1.675-.543 2.266a8.14 8.14 0 01-.526.988l-.01.016-.003.005-.001.001s-.001.001-.417-.276a119.43 119.43 0 00-.416-.277v-.002l.007-.01a7.121 7.121 0 00.452-.852c.238-.534.457-1.21.457-1.859 0-.65-.22-1.325-.457-1.86a7.122 7.122 0 00-.452-.852l-.006-.01h-.001z" clip-rule="evenodd"/>'
)
iconComponents.BIconVolumeDown = BIconVolumeDown

export const BIconVolumeMute = /*#__PURE__*/ makeIcon(
  'VolumeMute',
  '<path fill-rule="evenodd" d="M9.717 5.55A.5.5 0 0110 6v8a.5.5 0 01-.812.39L6.825 12.5H4.5A.5.5 0 014 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM9 7.04L7.312 8.39A.5.5 0 017 8.5H5v3h2a.5.5 0 01.312.11L9 12.96V7.04zm6.854.606a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.146 7.646a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconVolumeMute = BIconVolumeMute

export const BIconVolumeUp = /*#__PURE__*/ makeIcon(
  'VolumeUp',
  '<path fill-rule="evenodd" d="M8.717 5.55A.5.5 0 019 6v8a.5.5 0 01-.812.39L5.825 12.5H3.5A.5.5 0 013 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM8 7.04L6.312 8.39A.5.5 0 016 8.5H4v3h2a.5.5 0 01.312.11L8 12.96V7.04zm5.642-1.69L14 5l.358-.35.001.002.002.002.006.007.021.022a6.623 6.623 0 01.317.374c.2.254.465.623.73 1.089.527.93 1.065 2.265 1.065 3.854 0 1.59-.538 2.925-1.065 3.854a8.77 8.77 0 01-.73 1.09 6.69 6.69 0 01-.317.373l-.02.022-.007.007-.002.002S14.357 15.35 14 15l-.358-.35.002-.001.013-.014.055-.06c.049-.055.12-.14.208-.25.175-.222.41-.55.645-.965.473-.832.935-1.996.935-3.36 0-1.363-.462-2.528-.935-3.36a7.773 7.773 0 00-.645-.965 5.653 5.653 0 00-.263-.31l-.013-.014-.002-.002zm-2.03.965L12 6l.388-.315.002.003.005.005.016.02.053.07a8.772 8.772 0 01.73 1.18C13.59 7.73 14 8.812 14 10s-.411 2.27-.805 3.037a8.764 8.764 0 01-.73 1.18l-.054.07-.016.02-.005.005-.001.002v.001L12 14l-.388-.315.002-.002.01-.012a4.002 4.002 0 00.197-.274 7.79 7.79 0 00.484-.817c.356-.693.695-1.612.695-2.58s-.339-1.887-.695-2.58a7.794 7.794 0 00-.64-1.036 3.419 3.419 0 00-.042-.055l-.01-.012-.001-.002zm-2.028.962L10 7l.416-.277.002.002.003.005.01.016a4.871 4.871 0 01.16.264c.1.175.233.425.366.724.262.59.543 1.415.543 2.266 0 .85-.28 1.675-.543 2.266a8.158 8.158 0 01-.526.988l-.01.016-.003.005-.001.001s-.001.001-.417-.276l-.416-.277v-.002l.007-.01.027-.043a7.133 7.133 0 00.425-.81c.238-.533.457-1.209.457-1.858 0-.65-.22-1.325-.457-1.86a7.134 7.134 0 00-.452-.852l-.006-.01h-.001z" clip-rule="evenodd"/>'
)
iconComponents.BIconVolumeUp = BIconVolumeUp

export const BIconWatch = /*#__PURE__*/ makeIcon('Watch', [
  '<path fill-rule="evenodd" d="M6 16.333v-1.86A5.985 5.985 0 014 10c0-1.777.772-3.374 2-4.472V3.667C6 2.747 6.746 2 7.667 2h4.666C13.253 2 14 2.746 14 3.667v1.86A5.985 5.985 0 0116 10a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H7.667C6.747 18 6 17.254 6 16.333zM15 10a5 5 0 10-10 0 5 5 0 0010 0z" clip-rule="evenodd"/>',
  '<rect width="1" height="2" x="15.5" y="9" rx=".5"/>',
  '<path fill-rule="evenodd" d="M10 6.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H8a.5.5 0 010-1h1.5V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconWatch = BIconWatch

export const BIconWifi = /*#__PURE__*/ makeIcon('Wifi', [
  '<path fill-rule="evenodd" d="M8.858 13.858A1.991 1.991 0 0110 13.5c.425 0 .818.132 1.142.358L10 15l-1.142-1.142z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M9.731 14.024l.269.269.269-.269a1.506 1.506 0 00-.538 0zm-1.159-.576A2.49 2.49 0 0110 13c.53 0 1.023.165 1.428.448a.5.5 0 01.068.763l-1.143 1.143a.5.5 0 01-.707 0L8.504 14.21a.5.5 0 01.354-.853v.5l-.286-.41zM10 11.5a4.478 4.478 0 00-2.7.9.5.5 0 01-.6-.8c.919-.69 2.062-1.1 3.3-1.1s2.381.41 3.3 1.1a.5.5 0 01-.6.8 4.478 4.478 0 00-2.7-.9zm0-3c-1.833 0-3.51.657-4.814 1.748a.5.5 0 11-.642-.766A8.468 8.468 0 0110 7.5c2.076 0 3.98.745 5.456 1.982a.5.5 0 01-.642.766A7.468 7.468 0 0010 8.5z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M10 5.5c-2.657 0-5.082.986-6.932 2.613a.5.5 0 11-.66-.75A11.458 11.458 0 0110 4.5c2.91 0 5.567 1.08 7.592 2.862a.5.5 0 11-.66.751A10.458 10.458 0 0010 5.5z" clip-rule="evenodd"/>'
])
iconComponents.BIconWifi = BIconWifi

export const BIconXCircleFill = /*#__PURE__*/ makeIcon('XCircleFill', [
  '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.354 6.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconXCircleFill = BIconXCircleFill

export const BIconXCircle = /*#__PURE__*/ makeIcon('XCircle', [
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M12.646 13.354l-6-6 .708-.708 6 6-.708.708z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M7.354 13.354l6-6-.708-.708-6 6 .708.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconXCircle = BIconXCircle

export const BIconXOctagonFill = /*#__PURE__*/ makeIcon('XOctagonFill', [
  '<path fill-rule="evenodd" d="M13.46 2.146A.5.5 0 0013.107 2H6.893a.5.5 0 00-.353.146L2.146 6.54A.5.5 0 002 6.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V6.893a.5.5 0 00-.146-.353L13.46 2.146zm-6.106 4.5L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconXOctagonFill = BIconXOctagonFill

export const BIconXOctagon = /*#__PURE__*/ makeIcon('XOctagon', [
  '<path fill-rule="evenodd" d="M6.54 2.146A.5.5 0 016.893 2h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146zM7.1 3L3 7.1v5.8L7.1 17h5.8l4.1-4.1V7.1L12.9 3H7.1z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M9.293 10L6.646 7.354l.708-.708L10 9.293l2.646-2.647.708.708L10.707 10l2.647 2.646-.707.708L10 10.707l-2.646 2.647-.708-.707L9.293 10z" clip-rule="evenodd"/>'
])
iconComponents.BIconXOctagon = BIconXOctagon

export const BIconXSquareFill = /*#__PURE__*/ makeIcon('XSquareFill', [
  '<path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.354 4.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
])
iconComponents.BIconXSquareFill = BIconXSquareFill

export const BIconXSquare = /*#__PURE__*/ makeIcon('XSquare', [
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M9.293 10L6.646 7.354l.708-.708L10 9.293l2.646-2.647.708.708L10.707 10l2.647 2.646-.708.708L10 10.707l-2.646 2.647-.708-.707L9.293 10z" clip-rule="evenodd"/>'
])
iconComponents.BIconXSquare = BIconXSquare

export const BIconX = /*#__PURE__*/ makeIcon('X', [
  '<path fill-rule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>',
  '<path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
])
iconComponents.BIconX = BIconX

// TODO:
//   Add remaining icons
//   Preferably automate creation with node script

// --- Array of icon names (PascalCase) for use in docs ---

export const iconNames = Object.keys(iconComponents).filter(n => n !== 'BIcon')

// --- Main plugin export --

export const IconsPlugin = /*#__PURE__*/ pluginFactory({ components: iconComponents })
