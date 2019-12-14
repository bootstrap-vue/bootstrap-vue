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
import { makeIcon, commonIconProps } from './helpers/make-icon'
import { pluginFactory } from '../utils/plugins'
import { pascalCase, trim } from '../utils/string'
// We export this object mainly for the docs for generating the icon "table"
// It is also used in the IconsPlugin export at the bottom of this file
// Populated as Icon components are defined
export const iconComponents = {}

// --- Generic Icon Component for ease of use ---

// Pre-compiled RegExpr

const RX_ICON_PREFIX = /^BIcon/

// Empty icon (BootstrapVue custom icon)
export const BIconBlank = /*#__PURE__*/ makeIcon('Blank', '')
iconComponents.BIconBlank = BIconBlank

// Requires individual icon components to be installed
export const BIcon = /*#__PURE__*/ Vue.extend({
  name: 'BIcon',
  functional: true,
  componets: { BIconBlank },
  props: {
    icon: {
      type: String,
      default: null
    },
    ...commonIconProps
  },
  render(h, { data, props }) {
    const icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '')
    const component = icon ? `BIcon${icon}` : BIconBlank
    // TODO:
    //   Could check Vue.options.components[componentName]
    //   To see if the icon is registered/valid
    //   Could also use <component :is="componentName"> instead
    return h(component, mergeData(data, { props: { ...props, icon: null } }))
  }
})
iconComponents.BIcon = BIcon

// --- Individual Icon components ---

// Source SVG Files can be found at:
// https://github.com/twbs/icons/tree/master/icons
// TODO:
//   Create a utility script to auto-generate/update this file
//   As there are over 200 icons in the Bootstrap-icons library

export const BIconAlertCircleFill = /*#__PURE__*/ makeIcon(
  'AlertCircleFill',
  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8.998 3a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
)
iconComponents.BIconAlertCircleFill = BIconAlertCircleFill

export const BIconAlertCircle = /*#__PURE__*/ makeIcon(
  'AlertCircle',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/><path d="M9.002 13a1 1 0 112 0 1 1 0 01-2 0zM9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
)
iconComponents.BIconAlertCircle = BIconAlertCircle

export const BIconAlertOctagonFill = /*#__PURE__*/ makeIcon(
  'AlertOctagonFill',
  '<path fill-rule="evenodd" d="M13.107 2a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146A.5.5 0 016.893 2h6.214zM9.002 13a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
)
iconComponents.BIconAlertOctagonFill = BIconAlertOctagonFill

export const BIconAlertOctagon = /*#__PURE__*/ makeIcon(
  'AlertOctagon',
  '<path fill-rule="evenodd" d="M6.54 2.146A.5.5 0 016.893 2h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146zM7.1 3L3 7.1v5.8L7.1 17h5.8l4.1-4.1V7.1L12.9 3H7.1z" clip-rule="evenodd"/><rect width="2" height="2" x="9.002" y="12" rx="1"/><path d="M9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
)
iconComponents.BIconAlertOctagon = BIconAlertOctagon

export const BIconAlertSquareFill = /*#__PURE__*/ makeIcon(
  'AlertOctagonSquareFill',
  '<path fill-rule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm7.002 9a1 1 0 112 0 1 1 0 01-2 0zM10 6a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 6z" clip-rule="evenodd"/>'
)
iconComponents.BIconAlertSquareFill = BIconAlertSquareFill

export const BIconAlertSquare = /*#__PURE__*/ makeIcon(
  'AlertOctagonSquare',
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/><rect width="2" height="2" x="9.002" y="12" rx="1"/><path d="M9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>'
)
iconComponents.BIconAlertSquare = BIconAlertSquare

export const BIconAlertTriangleFill = /*#__PURE__*/ makeIcon(
  'AlertTriangleFill',
  '<path fill-rule="evenodd" d="M9.022 3.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H3.144c-.889 0-1.437-.99-.98-1.767L9.022 3.566zM9.002 14a1 1 0 112 0 1 1 0 01-2 0zM10 7a.905.905 0 00-.9.995l.35 3.507a.553.553 0 001.1 0l.35-3.507A.905.905 0 0010 7z" clip-rule="evenodd"/>'
)
iconComponents.BIconAlertTriangleFill = BIconAlertTriangleFill

export const BIconAlertTriangle = /*#__PURE__*/ makeIcon(
  'AlertTriangleFill',
  '<path fill-rule="evenodd" d="M9.938 4.016a.146.146 0 00-.054.057L3.027 15.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L10.12 4.073a.146.146 0 00-.054-.057.13.13 0 00-.063-.016.13.13 0 00-.064.016zm1.043-.45a1.13 1.13 0 00-1.96 0L2.166 15.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L10.982 3.566z" clip-rule="evenodd"/><rect width="2" height="2" x="9.002" y="13" rx="1"/><path d="M9.1 7.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 7.995z"/>'
)
iconComponents.BIconAlertTriangle = BIconAlertTriangle

export const BIconArchive = /*#__PURE__*/ makeIcon(
  'Archive',
  '<path fill-rule="evenodd" d="M4 7v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V7h1v7.5c0 1.345-1.021 2.5-2.357 2.5H5.357C4.021 17 3 15.845 3 14.5V7h1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 9.5A.5.5 0 018 9h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5zM17 4H3v2h14V4zM3 3a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'
)
iconComponents.BIconArchive = BIconArchive

export const BIconArchiveFill = /*#__PURE__*/ makeIcon(
  'ArchiveFill',
  '<path fill-rule="evenodd" d="M14.643 17C15.979 17 17 15.845 17 14.5V7H3v7.5C3 15.845 4.021 17 5.357 17h9.286zM8 9a.5.5 0 000 1h4a.5.5 0 000-1H8zM3 3a1 1 0 00-1 1v1.5a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'
)
iconComponents.BIconArchiveFill = BIconArchiveFill

export const BIconArrowClockwise = /*#__PURE__*/ makeIcon(
  'ArrowClockwise',
  '<path fill-rule="evenodd" d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63l-.5.865A5.472 5.472 0 0010 4.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.646 1.646a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L12.793 4.5l-2.147-2.146a.5.5 0 010-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowClockwise = BIconArrowClockwise

export const BIconArrowCounterclockwise = /*#__PURE__*/ makeIcon(
  'ArrowCounterclockwise',
  '<path fill-rule="evenodd" d="M10 4.5A5.5 5.5 0 114.5 10a.5.5 0 00-1 0 6.5 6.5 0 103.25-5.63l.5.865A5.472 5.472 0 0110 4.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.354 1.646a.5.5 0 00-.708 0l-2.5 2.5a.5.5 0 000 .708l2.5 2.5a.5.5 0 10.708-.708L7.207 4.5l2.147-2.146a.5.5 0 000-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowCounterclockwise = BIconArrowCounterclockwise

export const BIconArrowDownLeft = /*#__PURE__*/ makeIcon(
  'ArrowDownLeft',
  '<path fill-rule="evenodd" d="M5 9.5a.5.5 0 01.5.5v4.5H10a.5.5 0 010 1H5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowDownLeft = BIconArrowDownLeft

export const BIconArrowDownRight = /*#__PURE__*/ makeIcon(
  'ArrowDownRight',
  '<path fill-rule="evenodd" d="M14 9.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H9a.5.5 0 010-1h4.5V10a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 5.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowDownRight = BIconArrowDownRight

export const BIconArrowDown = /*#__PURE__*/ makeIcon(
  'ArrowDown',
  '<path fill-rule="evenodd" d="M6.646 11.646a.5.5 0 01.708 0L10 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowDown = BIconArrowDown

export const BIconArrowLeftRight = /*#__PURE__*/ makeIcon(
  'ArrowLeftRight',
  '<path fill-rule="evenodd" d="M12.146 9.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 13l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 13a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 13zm3.854-9.354a.5.5 0 010 .708L5.207 7l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 7a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowLeftRight = BIconArrowLeftRight

export const BIconArrowLeft = /*#__PURE__*/ makeIcon(
  'ArrowLeft',
  '<path fill-rule="evenodd" d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowLeft = BIconArrowLeft

export const BIconArrowRepeat = /*#__PURE__*/ makeIcon(
  'ArrowRepeat',
  '<path fill-rule="evenodd" d="M4 9.5a.5.5 0 00-.5.5 6.5 6.5 0 0012.13 3.25.5.5 0 00-.866-.5A5.5 5.5 0 014.5 10a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.354 9.146a.5.5 0 00-.708 0l-2 2a.5.5 0 00.708.708L4 10.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zM15.947 10.5a.5.5 0 00.5-.5 6.5 6.5 0 00-12.13-3.25.5.5 0 10.866.5A5.5 5.5 0 0115.448 10a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.354 8.146a.5.5 0 00-.708 0L16 9.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowRepeat = BIconArrowRepeat

export const BIconArrowRight = /*#__PURE__*/ makeIcon(
  'ArrowRight',
  '<path fill-rule="evenodd" d="M12.146 6.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 10l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 10a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 10z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowRight = BIconArrowRight

export const BIconArrowUpDown = /*#__PURE__*/ makeIcon(
  'ArrowUpDown',
  '<path fill-rule="evenodd" d="M13 5.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L13 5.707l-2.646 2.647a.5.5 0 01-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L7 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowUpDown = BIconArrowUpDown

export const BIconArrowUpLeft = /*#__PURE__*/ makeIcon(
  'ArrowUpLeft',
  '<path fill-rule="evenodd" d="M4.5 6a.5.5 0 01.5-.5h5a.5.5 0 010 1H5.5V11a.5.5 0 01-1 0V6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 5.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowUpLeft = BIconArrowUpLeft

export const BIconArrowUpRight = /*#__PURE__*/ makeIcon(
  'ArrowUpRight',
  '<path fill-rule="evenodd" d="M8.5 6a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6.5H9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowUpRight = BIconArrowUpRight

export const BIconArrowUp = /*#__PURE__*/ makeIcon(
  'ArrowUp',
  '<path fill-rule="evenodd" d="M10 5.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L10 5.707 7.354 8.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowUp = BIconArrowUp

export const BIconArrowsContract = /*#__PURE__*/ makeIcon(
  'ArrowsContract',
  '<path fill-rule="evenodd" d="M11.5 4.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.354 3.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm-7.5 7.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.036 11.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V12h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowsContract = BIconArrowsContract

export const BIconArrowsExpand = /*#__PURE__*/ makeIcon(
  'ArrowsExpand',
  '<path fill-rule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowsExpand = BIconArrowsExpand

export const BIconArrowsFullscreen = /*#__PURE__*/ makeIcon(
  'ArrowsFullscreen',
  '<path fill-rule="evenodd" d="M4 11.5a.5.5 0 01.5.5v3.5H8a.5.5 0 010 1H4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.854 11.11a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.707l4.5-4.5a.5.5 0 01.708 0zm7.464-7.464a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.707-.708l4.5-4.5a.5.5 0 01.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.5H12a.5.5 0 01-.5-.5zm4.5 7.5a.5.5 0 00-.5.5v3.5H12a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.146 11.11a.5.5 0 000 .708l4.5 4.5a.5.5 0 00.708-.707l-4.5-4.5a.5.5 0 00-.708 0zM3.682 3.646a.5.5 0 000 .708l4.5 4.5a.5.5 0 10.707-.708l-4.5-4.5a.5.5 0 00-.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.5 4a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v4a.5.5 0 001 0V4.5H8a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconArrowsFullscreen = BIconArrowsFullscreen

export const BIconAt = /*#__PURE__*/ makeIcon(
  'At',
  '<path fill-rule="evenodd" d="M15.106 9.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V7.206h-1.032v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907s-.601 1.914-1.538 1.914c-.895 0-1.442-.725-1.442-1.914z" clip-rule="evenodd"/>'
)
iconComponents.BIconAt = BIconAt

export const BIconBarChartFill = /*#__PURE__*/ makeIcon(
  'BarChartFill',
  '<rect width="4" height="5" x="3" y="12" rx="1"/><rect width="4" height="9" x="8" y="8" rx="1"/><rect width="4" height="14" x="13" y="3" rx="1"/>'
)
iconComponents.BIconBarChartFill = BIconBarChartFill

export const BIconBarChart = /*#__PURE__*/ makeIcon(
  'BarChart',
  '<path fill-rule="evenodd" d="M6 13H4v3h2v-3zm5-4H9v7h2V9zm5-5h-2v12h2V4zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM8 9a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H9a1 1 0 01-1-1V9zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3z" clip-rule="evenodd"/>'
)
iconComponents.BIconBarChart = BIconBarChart

export const BIconBatteryFull = /*#__PURE__*/ makeIcon(
  'BatteryFull',
  '<path fill-rule="evenodd" d="M14 7H4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1zM4 6a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path d="M4 8h10v4H4V8zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'
)
iconComponents.BIconBatteryFull = BIconBatteryFull

export const BIconBattery = /*#__PURE__*/ makeIcon(
  'Battery',
  '<path fill-rule="evenodd" d="M14 7H4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1zM4 6a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path d="M16.5 11.5a1.5 1.5 0 000-3v3z"/>'
)
iconComponents.BIconBattery = BIconBattery

export const BIconBellFill = /*#__PURE__*/ makeIcon(
  'BellFill',
  '<path d="M10 18a2 2 0 002-2H8a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 005 8c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>'
)
iconComponents.BIconBellFill = BIconBellFill

export const BIconBell = /*#__PURE__*/ makeIcon(
  'Bell',
  '<path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z"/><path fill-rule="evenodd" d="M10 3.918l-.797.161A4.002 4.002 0 006 8c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C14.134 10.197 14 8.628 14 8a4.002 4.002 0 00-3.203-3.92L10 3.917zM16.22 14c.223.447.482.801.78 1H3c.299-.199.557-.553.78-1C4.68 12.2 5 8.88 5 8c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0115 8c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>'
)
iconComponents.BIconBell = BIconBell

export const BIconBlockquoteLeft = /*#__PURE__*/ makeIcon(
  'BlockquoteLeft',
  '<path fill-rule="evenodd" d="M4 5.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm5 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M5.5 8c-.768.176-1.5.855-1.5 1.799 0 .633.316 1.078.814 1.078.498 0 .774-.445.774-.961-.48-.035-.826-.334-.826-.768 0-.445.363-.773.838-.908L5.5 8zm2.238 0c-.767.176-1.5.855-1.5 1.799 0 .633.317 1.078.815 1.078.498 0 .773-.445.773-.961-.474-.035-.82-.334-.82-.768 0-.445.357-.773.832-.908l-.1-.24z"/>'
)
iconComponents.BIconBlockquoteLeft = BIconBlockquoteLeft

export const BIconBlockquoteRight = /*#__PURE__*/ makeIcon(
  'BlockquoteRight',
  '<path fill-rule="evenodd" d="M4 5.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M14.338 8c.768.176 1.5.855 1.5 1.799 0 .633-.316 1.078-.815 1.078-.498 0-.773-.445-.773-.961.48-.035.826-.334.826-.768 0-.445-.363-.773-.838-.908l.1-.24zM12.1 8c.767.176 1.5.855 1.5 1.799 0 .633-.317 1.078-.815 1.078-.498 0-.773-.445-.773-.961.474-.035.82-.334.82-.768 0-.445-.357-.773-.832-.908l.1-.24z"/>'
)
iconComponents.BIconBlockquoteRight = BIconBlockquoteRight

export const BIconBookmarkFill = /*#__PURE__*/ makeIcon(
  'BookmarkFill',
  '<path fill-rule="evenodd" d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V5z" clip-rule="evenodd"/>'
)
iconComponents.BIconBookmarkFill = BIconBookmarkFill

export const BIconBookmark = /*#__PURE__*/ makeIcon(
  'Bookmark',
  '<path fill-rule="evenodd" d="M10 14l5 3V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V5a1 1 0 00-1-1H7a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>'
)
iconComponents.BIconBookmark = BIconBookmark

export const BIconBootstrapFill = /*#__PURE__*/ makeIcon(
  'BootstrapFill',
  '<path fill-rule="evenodd" d="M6.002 2a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V6a4 4 0 00-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.543-2.11H7.063V14zm1.313-4.875V6.658h1.78c.974 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H8.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H8.375v2.725z" clip-rule="evenodd"/>'
)
iconComponents.BIconBootstrapFill = BIconBootstrapFill

export const BIconBootstrapReboot = /*#__PURE__*/ makeIcon(
  'BootstrapReboot',
  '<path fill-rule="evenodd" d="M3.161 10a6.84 6.84 0 106.842-6.84.58.58 0 110-1.16 8 8 0 11-6.556 3.412l-.663-.577a.58.58 0 01.227-.997l2.52-.69a.58.58 0 01.728.633l-.332 2.592a.58.58 0 01-.956.364l-.643-.56A6.812 6.812 0 003.16 10zm5.228-.079V7.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.505 1.324-1.386 1.324h-1.6zm0 3.75v-2.828h1.57l1.498 2.828h1.314l-1.646-3.006c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H7.248v7.352h1.141z" clip-rule="evenodd"/>'
)
iconComponents.BIconBootstrapReboot = BIconBootstrapReboot

export const BIconBootstrap = /*#__PURE__*/ makeIcon(
  'Bootstrap',
  '<path fill-rule="evenodd" d="M6.002 2h8a4 4 0 014 4v8a4 4 0 01-4 4h-8a4 4 0 01-4-4V6a4 4 0 014-4zm0 1.5a2.5 2.5 0 00-2.5 2.5v8a2.5 2.5 0 002.5 2.5h8a2.5 2.5 0 002.5-2.5V6a2.5 2.5 0 00-2.5-2.5h-8zM7.062 14h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.543-2.11H7.063V14zm1.313-4.875V6.658h1.78c.974 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H8.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H8.375v2.725z" clip-rule="evenodd"/>'
)
iconComponents.BIconBootstrap = BIconBootstrap

export const BIconBoxArrowBottomLeft = /*#__PURE__*/ makeIcon(
  'BoxArrowBottomLeft',
  '<path fill-rule="evenodd" d="M15 3.5A1.5 1.5 0 0116.5 5v8a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H7a.5.5 0 00-.5.5v4a.5.5 0 01-1 0V5A1.5 1.5 0 017 3.5h8zm-11 7a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 000-1H4.5V11a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.646 16.354a.5.5 0 00.708 0l8-8a.5.5 0 00-.708-.708l-8 8a.5.5 0 000 .708z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowBottomLeft = BIconBoxArrowBottomLeft

export const BIconBoxArrowBottomRight = /*#__PURE__*/ makeIcon(
  'BoxArrowBottomRight',
  '<path fill-rule="evenodd" d="M5 3.5A1.5 1.5 0 003.5 5v8A1.5 1.5 0 005 14.5h4a.5.5 0 000-1H5a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v4a.5.5 0 001 0V5A1.5 1.5 0 0013 3.5H5zm11 7a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-5a.5.5 0 010-1h4.5V11a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.354 16.354a.5.5 0 01-.708 0l-8-8a.5.5 0 11.708-.708l8 8a.5.5 0 010 .708z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowBottomRight = BIconBoxArrowBottomRight

export const BIconBoxArrowDown = /*#__PURE__*/ makeIcon(
  'BoxArrowDown',
  '<path fill-rule="evenodd" d="M6.646 13.646a.5.5 0 01.708 0L10 16.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 6.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 4A1.5 1.5 0 016 2.5h8A1.5 1.5 0 0115.5 4v7a1.5 1.5 0 01-1.5 1.5h-1.5a.5.5 0 010-1H14a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h1.5a.5.5 0 010 1H6A1.5 1.5 0 014.5 11V4z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowDown = BIconBoxArrowDown

export const BIconBoxArrowLeft = /*#__PURE__*/ makeIcon(
  'BoxArrowLeft',
  '<path fill-rule="evenodd" d="M6.354 13.354a.5.5 0 000-.708L3.707 10l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 00-.5-.5H4a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16 15.5a1.5 1.5 0 001.5-1.5V6A1.5 1.5 0 0016 4.5H9A1.5 1.5 0 007.5 6v1.5a.5.5 0 001 0V6a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V14A1.5 1.5 0 009 15.5h7z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowLeft = BIconBoxArrowLeft

export const BIconBoxArrowRight = /*#__PURE__*/ makeIcon(
  'BoxArrowRight',
  '<path fill-rule="evenodd" d="M13.646 13.354a.5.5 0 010-.708L16.293 10l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 10a.5.5 0 01.5-.5h9a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 15.5A1.5 1.5 0 012.5 14V6A1.5 1.5 0 014 4.5h7A1.5 1.5 0 0112.5 6v1.5a.5.5 0 01-1 0V6a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V14a1.5 1.5 0 01-1.5 1.5H4z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowRight = BIconBoxArrowRight

export const BIconBoxArrowUpLeft = /*#__PURE__*/ makeIcon(
  'BoxArrowUpLeft',
  '<path fill-rule="evenodd" d="M16.5 15a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 15v-4a.5.5 0 011 0v4a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V7a.5.5 0 00-.5-.5h-4a.5.5 0 010-1h4A1.5 1.5 0 0116.5 7v8zm-7-11a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v5a.5.5 0 001 0V4.5H9a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowUpLeft = BIconBoxArrowUpLeft

export const BIconBoxArrowUpRight = /*#__PURE__*/ makeIcon(
  'BoxArrowUpRight',
  '<path fill-rule="evenodd" d="M3.5 15A1.5 1.5 0 005 16.5h8a1.5 1.5 0 001.5-1.5v-4a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h4a.5.5 0 000-1H5A1.5 1.5 0 003.5 7v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4.5H11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.354 3.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconBoxArrowUpRight = BIconBoxArrowUpRight

export const BIconBoxArrowUp = /*#__PURE__*/ makeIcon(
  'BoxArrowUp',
  '<path fill-rule="evenodd" d="M6.646 6.354a.5.5 0 00.708 0L10 3.707l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 13.5a.5.5 0 00.5-.5V4a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 16A1.5 1.5 0 006 17.5h8a1.5 1.5 0 001.5-1.5V9A1.5 1.5 0 0014 7.5h-1.5a.5.5 0 000 1H14a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V9a.5.5 0 01.5-.5h1.5a.5.5 0 000-1H6A1.5 1.5 0 004.5 9v7z" clip-rule="evenodd"/>'
)
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

export const BIconChevronCompactDown = /*#__PURE__*/ makeIcon(
  'ChevronCompactDown',
  '<path fill-rule="evenodd" d="M3.553 8.776a.5.5 0 01.67-.223L10 11.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronCompactDown = BIconChevronCompactDown

export const BIconChevronCompactLeft = /*#__PURE__*/ makeIcon(
  'ChevronCompactLeft',
  '<path fill-rule="evenodd" d="M11.224 3.553a.5.5 0 01.223.67L8.56 10l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronCompactLeft = BIconChevronCompactLeft

export const BIconChevronCompactRight = /*#__PURE__*/ makeIcon(
  'ChevronCompactRight',
  '<path fill-rule="evenodd" d="M8.776 3.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L11.44 10 8.553 4.224a.5.5 0 01.223-.671z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronCompactRight = BIconChevronCompactRight

export const BIconChevronCompactUp = /*#__PURE__*/ makeIcon(
  'ChevronCompactUp',
  '<path fill-rule="evenodd" d="M9.776 7.553a.5.5 0 01.448 0l6 3a.5.5 0 11-.448.894L10 8.56l-5.776 2.888a.5.5 0 11-.448-.894l6-3z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronCompactUp = BIconChevronCompactUp

export const BIconChevronDown = /*#__PURE__*/ makeIcon(
  'ChevronDown',
  '<path fill-rule="evenodd" d="M3.646 6.646a.5.5 0 01.708 0L10 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronDown = BIconChevronDown

export const BIconChevronLeft = /*#__PURE__*/ makeIcon(
  'ChevronLeft',
  '<path fill-rule="evenodd" d="M13.354 3.646a.5.5 0 010 .708L7.707 10l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronLeft = BIconChevronLeft

export const BIconChevronRight = /*#__PURE__*/ makeIcon(
  'ChevronRight',
  '<path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronRight = BIconChevronRight

export const BIconChevronUp = /*#__PURE__*/ makeIcon(
  'ChevronUp',
  '<path fill-rule="evenodd" d="M9.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L10 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>'
)
iconComponents.BIconChevronUp = BIconChevronUp

export const BIconCircle = /*#__PURE__*/ makeIcon(
  'Circle',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/>'
)
iconComponents.BIconCircle = BIconCircle

export const BIconCircleFill = /*#__PURE__*/ makeIcon(
  'CircleFill',
  '<circle cx="10" cy="10" r="8"/>'
)
iconComponents.BIconCircleFill = BIconCircleFill

export const BIconCircleSlash = /*#__PURE__*/ makeIcon(
  'CircleSlash',
  '<path fill-rule="evenodd" d="M1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0zM10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm4.72 12.927L4.608 5.315l.707-.707L15.427 14.72l-.707.707z" clip-rule="evenodd"/>'
)
iconComponents.BIconCircleSlash = BIconCircleSlash

export const BIconClock = /*#__PURE__*/ makeIcon(
  'Clock',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm8-7a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 4a.5.5 0 01.5.5V10a.5.5 0 01-.5.5H5.5a.5.5 0 010-1h4v-5A.5.5 0 0110 4z" clip-rule="evenodd"/>'
)
iconComponents.BIconClock = BIconClock

export const BIconClockFill = /*#__PURE__*/ makeIcon(
  'ClockFill',
  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM5.5 9.5h4v-5a.5.5 0 011 0V10a.5.5 0 01-.5.5H5.5a.5.5 0 010-1z" clip-rule="evenodd"/>'
)
iconComponents.BIconClockFill = BIconClockFill

export const BIconCloud = /*#__PURE__*/ makeIcon(
  'Cloud',
  '<path fill-rule="evenodd" d="M6.887 9.2l-.964-.165A2.5 2.5 0 105.5 14h10a1.5 1.5 0 00.237-2.982l-1.038-.164.216-1.028a4 4 0 10-7.843-1.587l-.185.96zm9.084.341a5 5 0 00-9.88-1.492A3.5 3.5 0 105.5 15h9.999a2.5 2.5 0 00.394-4.968c.033-.16.06-.324.077-.49z" clip-rule="evenodd"/>'
)
iconComponents.BIconCloud = BIconCloud

export const BIconCloudFill = /*#__PURE__*/ makeIcon(
  'CloudFill',
  '<path fill-rule="evenodd" d="M5.5 15a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.5 2.5 0 0115.5 15h-10z" clip-rule="evenodd"/>'
)
iconComponents.BIconCloudFill = BIconCloudFill

export const BIconCode = /*#__PURE__*/ makeIcon(
  'Code',
  '<path fill-rule="evenodd" d="M7.854 6.146a.5.5 0 010 .708L4.707 10l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm4.292 0a.5.5 0 000 .708L15.293 10l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconCode = BIconCode

export const BIconCodeSlash = /*#__PURE__*/ makeIcon(
  'CodeSlash',
  '<path fill-rule="evenodd" d="M6.854 6.146a.5.5 0 010 .708L3.707 10l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L16.293 10l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 11-.955-.294l4-13a.5.5 0 01.625-.33z" clip-rule="evenodd"/>'
)
iconComponents.BIconCodeSlash = BIconCodeSlash

export const BIconCommand = /*#__PURE__*/ makeIcon(
  'Command',
  '<path fill-rule="evenodd" d="M3.5 5A1.5 1.5 0 005 6.5h1.5V5a1.5 1.5 0 10-3 0zm4 2.5V5A2.5 2.5 0 105 7.5h2.5zm9-2.5A1.5 1.5 0 0115 6.5h-1.5V5a1.5 1.5 0 013 0zm-4 2.5V5A2.5 2.5 0 1115 7.5h-2.5zm-9 7.5A1.5 1.5 0 015 13.5h1.5V15a1.5 1.5 0 01-3 0zm4-2.5V15A2.5 2.5 0 115 12.5h2.5zm9 2.5a1.5 1.5 0 00-1.5-1.5h-1.5V15a1.5 1.5 0 003 0zm-4-2.5V15a2.5 2.5 0 102.5-2.5h-2.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.5 7.5h-5v5h5v-5zm-6-1v7h7v-7h-7z" clip-rule="evenodd"/>'
)
iconComponents.BIconCommand = BIconCommand

export const BIconCompass = /*#__PURE__*/ makeIcon(
  'Compass',
  '<path fill-rule="evenodd" d="M10 17.016a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0 1a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" clip-rule="evenodd"/><rect width="4" height="2" x="8" y="2" rx="1"/><path d="M8.94 9.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z"/>'
)
iconComponents.BIconCompass = BIconCompass

export const BIconCreditCard = /*#__PURE__*/ makeIcon(
  'CreditCard',
  '<path fill-rule="evenodd" d="M16 5H4a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1zM4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clip-rule="evenodd"/><rect width="3" height="3" x="4" y="11" rx="1"/><path d="M3 7h14v2H3z"/>'
)
iconComponents.BIconCreditCard = BIconCreditCard

export const BIconCursor = /*#__PURE__*/ makeIcon(
  'Cursor',
  '<path fill-rule="evenodd" d="M16.081 4.182a.5.5 0 01.104.557l-5.657 12.727a.5.5 0 01-.917-.006L7.57 12.694l-4.766-2.042a.5.5 0 01-.006-.917L15.525 4.08a.5.5 0 01.556.103zM4.25 10.184l3.897 1.67a.5.5 0 01.262.263l1.67 3.897L14.743 5.52 4.25 10.184z" clip-rule="evenodd"/>'
)
iconComponents.BIconCursor = BIconCursor

export const BIconCursorFill = /*#__PURE__*/ makeIcon(
  'CursorFill',
  '<path fill-rule="evenodd" d="M16.081 4.182a.5.5 0 01.104.557l-5.657 12.727a.5.5 0 01-.917-.006L7.57 12.694l-4.766-2.042a.5.5 0 01-.006-.917L15.525 4.08a.5.5 0 01.556.103z" clip-rule="evenodd"/>'
)
iconComponents.BIconCursorFill = BIconCursorFill

export const BIconDash = /*#__PURE__*/ makeIcon(
  'Dash',
  '<path fill-rule="evenodd" d="M5.5 10a.5.5 0 01.5-.5h8a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconDash = BIconDash

export const BIconDisplay = /*#__PURE__*/ makeIcon(
  'Display',
  '<path d="M7.75 15.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H13a.5.5 0 010 1H7a.5.5 0 010-1h.75z"/><path fill-rule="evenodd" d="M15.991 5H4c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 003 6.01V12c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L4.01 13H16c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L17 11.99V6c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0015.99 5zM16 4H4C2 4 2 6 2 6v6c0 2 2 2 2 2h12c2 0 2-2 2-2V6c0-2-2-2-2-2z" clip-rule="evenodd"/>'
)
iconComponents.BIconDisplay = BIconDisplay

export const BIconDocument = /*#__PURE__*/ makeIcon(
  'Document',
  '<path fill-rule="evenodd" d="M6 3h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6z" clip-rule="evenodd"/>'
)
iconComponents.BIconDocument = BIconDocument

export const BIconDocumentCode = /*#__PURE__*/ makeIcon(
  'DocumentCode',
  '<path fill-rule="evenodd" d="M6 3h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.646 7.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L12.293 10l-1.647-1.646a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L7.707 10l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconDocumentCode = BIconDocumentCode

export const BIconDocumentDiff = /*#__PURE__*/ makeIcon(
  'DocumentDiff',
  '<path fill-rule="evenodd" d="M6 3h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 13a.5.5 0 01.5-.5h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5zM10 6.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 9a.5.5 0 01.5-.5h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconDocumentDiff = BIconDocumentDiff

export const BIconDocumentRichtext = /*#__PURE__*/ makeIcon(
  'DocumentRichtext',
  '<path fill-rule="evenodd" d="M6 3h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 14a.5.5 0 01.5-.5h3a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm1.639-3.958l1.33.886 1.854-1.855a.25.25 0 01.289-.047L13.5 8v1.75a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-.5s1.54-1.274 1.639-1.208zM8.25 7a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconDocumentRichtext = BIconDocumentRichtext

export const BIconDocumentText = /*#__PURE__*/ makeIcon(
  'DocumentText',
  '<path fill-rule="evenodd" d="M6 3h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 14a.5.5 0 01.5-.5h3a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h6a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconDocumentText = BIconDocumentText

export const BIconDocuments = /*#__PURE__*/ makeIcon(
  'Documents',
  '<path fill-rule="evenodd" d="M5 4h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H5z" clip-rule="evenodd"/><path d="M7 2h8a2 2 0 012 2v10a2 2 0 01-2 2v-1a1 1 0 001-1V4a1 1 0 00-1-1H7a1 1 0 00-1 1H5a2 2 0 012-2z"/>'
)
iconComponents.BIconDocuments = BIconDocuments

export const BIconDocumentsAlt = /*#__PURE__*/ makeIcon(
  'DocumentsAlt',
  '<path fill-rule="evenodd" d="M5 3h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H5z" clip-rule="evenodd"/><path d="M15 6V5a2 2 0 012 2v6a2 2 0 01-2 2v-1a1 1 0 001-1V7a1 1 0 00-1-1z"/>'
)
iconComponents.BIconDocumentsAlt = BIconDocumentsAlt

export const BIconDot = /*#__PURE__*/ makeIcon(
  'Dot',
  '<path fill-rule="evenodd" d="M10 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'
)
iconComponents.BIconDot = BIconDot

export const BIconEnvelope = /*#__PURE__*/ makeIcon(
  'Envelope',
  '<path fill-rule="evenodd" d="M16 5H4a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1zM4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.071 6.243a.5.5 0 01.686-.172L10 10.417l7.243-4.346a.5.5 0 11.514.858L10 11.583 2.243 6.93a.5.5 0 01-.172-.686z" clip-rule="evenodd"/>'
)
iconComponents.BIconEnvelope = BIconEnvelope

export const BIconFilter = /*#__PURE__*/ makeIcon(
  'Filter',
  '<path fill-rule="evenodd" d="M7.5 13a.5.5 0 01.5-.5h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h8a.5.5 0 010 1H6a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h12a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconFilter = BIconFilter

export const BIconFlag = /*#__PURE__*/ makeIcon(
  'Flag',
  '<path fill-rule="evenodd" d="M5.5 3a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.762 4.558C6.735 3.909 7.348 3.5 8.5 3.5c.653 0 1.139.325 1.495.562l.032.022c.392.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.718 2.718 0 0111 11.5c-.653 0-1.139-.325-1.495-.563l-.032-.021c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 11-.515-.858C6.735 9.909 7.348 9.5 8.5 9.5c.653 0 1.139.325 1.495.563l.032.021c.392.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.456-.204 1-.43 1.64-.512V4.543c-.433.074-.83.234-1.234.414l-.159.07c-.22.1-.453.205-.678.287A2.72 2.72 0 0111 5.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 01-.554-.832l.04-.026z" clip-rule="evenodd"/>'
)
iconComponents.BIconFlag = BIconFlag

export const BIconFlagFill = /*#__PURE__*/ makeIcon(
  'FlagFill',
  '<path fill-rule="evenodd" d="M5.5 3a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.762 4.558C6.735 3.909 7.348 3.5 8.5 3.5c.653 0 1.139.325 1.495.562l.032.022c.392.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.718 2.718 0 0111 11.5c-.653 0-1.139-.325-1.495-.563l-.032-.021c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 015.5 11V5a.5.5 0 01.223-.416l.04-.026z" clip-rule="evenodd"/>'
)
iconComponents.BIconFlagFill = BIconFlagFill

export const BIconFolder = /*#__PURE__*/ makeIcon(
  'Folder',
  '<path d="M11.828 6a3 3 0 01-2.12-.879l-.83-.828A1 1 0 008.173 4H4.5a1 1 0 00-1 .981L3.546 6h-1L2.5 5a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 0011.828 5v1z"/><path fill-rule="evenodd" d="M15.81 6H4.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0015.81 6zM4.19 5a2 2 0 00-1.992 2.181l.637 7A2 2 0 004.826 16h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0015.81 5H4.19z" clip-rule="evenodd"/>'
)
iconComponents.BIconFolder = BIconFolder

export const BIconFolderFill = /*#__PURE__*/ makeIcon(
  'FolderFill',
  '<path fill-rule="evenodd" d="M11.828 5h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0115.174 16H4.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L2.5 5a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 0011.828 5zm-8.322.12C3.72 5.042 3.95 5 4.19 5h5.396l-.707-.707A1 1 0 008.172 4H4.5a1 1 0 00-1 .981l.006.139z" clip-rule="evenodd"/>'
)
iconComponents.BIconFolderFill = BIconFolderFill

export const BIconFolderSymlink = /*#__PURE__*/ makeIcon(
  'FolderSymlink',
  '<path d="M11.828 6a3 3 0 01-2.12-.879l-.83-.828A1 1 0 008.173 4H4.5a1 1 0 00-1 .981L3.546 6h-1L2.5 5a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 0011.828 5v1z"/><path fill-rule="evenodd" d="M15.81 6H4.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0015.81 6zM4.19 5a2 2 0 00-1.992 2.181l.637 7A2 2 0 004.826 16h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0015.81 5H4.19z" clip-rule="evenodd"/><path d="M10.616 12.24l3.182-1.969a.442.442 0 000-.742l-3.182-1.97c-.27-.166-.616.036-.616.372V8.7c-.857 0-3.429 0-4 4.8 1.429-2.7 4-2.4 4-2.4v.769c0 .336.346.538.616.371z"/>'
)
iconComponents.BIconFolderSymlink = BIconFolderSymlink

export const BIconFolderSymlinkFill = /*#__PURE__*/ makeIcon(
  'FolderSymlinkFill',
  '<path fill-rule="evenodd" d="M15.81 5h-3.982a2 2 0 01-1.414-.586l-.828-.828A2 2 0 008.172 3H4.5a2 2 0 00-2 2l.04.87a1.99 1.99 0 00-.342 1.311l.637 7A2 2 0 004.826 16h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0015.81 5zM4.19 5c-.24 0-.47.042-.684.12L3.5 4.98a1 1 0 011-.98h3.672a1 1 0 01.707.293L9.586 5H4.19zm9.608 5.271l-3.182 1.97c-.27.166-.616-.036-.616-.372V11.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z" clip-rule="evenodd"/>'
)
iconComponents.BIconFolderSymlinkFill = BIconFolderSymlinkFill

export const BIconForward = /*#__PURE__*/ makeIcon(
  'Forward',
  '<path fill-rule="evenodd" d="M11.502 7.513a.144.144 0 00-.202.134V8.65a.5.5 0 01-.5.5H4.5v2.9h6.3a.5.5 0 01.5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.522.522 0 01.042-.028.147.147 0 000-.252.523.523 0 01-.042-.028l-3.984-2.933zm-1.202.134a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.503H4a.5.5 0 01-.5-.5v-3.9a.5.5 0 01.5-.5h6.3v-.503z" clip-rule="evenodd"/>'
)
iconComponents.BIconForward = BIconForward

export const BIconGear = /*#__PURE__*/ makeIcon(
  'Gear',
  '<path fill-rule="evenodd" d="M8.505 2.93A.5.5 0 019 2.5h2a.5.5 0 01.495.43l.266 1.858c.234.079.46.173.68.282l1.502-1.127a.5.5 0 01.653.047l1.414 1.414a.5.5 0 01.047.653L14.93 7.56c.109.218.203.445.282.68l1.859.265A.5.5 0 0117.5 9v2a.5.5 0 01-.43.495l-1.858.266c-.079.234-.173.46-.282.68l1.127 1.502a.5.5 0 01-.047.653l-1.414 1.414a.5.5 0 01-.653.047L12.44 14.93a5.484 5.484 0 01-.68.282l-.265 1.859A.5.5 0 0111 17.5H9a.5.5 0 01-.495-.43l-.266-1.858a5.485 5.485 0 01-.68-.282l-1.502 1.127a.5.5 0 01-.653-.047L3.99 14.596a.5.5 0 01-.047-.653L5.07 12.44a5.467 5.467 0 01-.282-.68l-1.859-.265A.5.5 0 012.5 11V9a.5.5 0 01.43-.495l1.858-.266c.079-.234.173-.46.282-.68L3.943 6.058a.5.5 0 01.047-.653L5.404 3.99a.5.5 0 01.653-.047L7.56 5.07c.218-.109.445-.203.68-.282l.265-1.859zm5.834 9.556l-.433-.25c.188-.328.337-.682.438-1.056a.5.5 0 01.412-.364l1.744-.25V9.434l-1.744-.25a.5.5 0 01-.412-.364 4.472 4.472 0 00-.438-1.057.5.5 0 01.033-.549l1.058-1.41-.801-.8-1.41 1.057a.5.5 0 01-.55.033 4.47 4.47 0 00-1.056-.438.5.5 0 01-.364-.412l-.25-1.744H9.434l-.25 1.744a.5.5 0 01-.364.412 4.47 4.47 0 00-1.057.438.5.5 0 01-.549-.033l-1.41-1.058-.8.801 1.057 1.41a.5.5 0 01.033.55 4.47 4.47 0 00-.438 1.056.5.5 0 01-.412.364l-1.744.25v1.132l1.744.25a.5.5 0 01.412.364c.101.374.25.728.438 1.057a.5.5 0 01-.033.549l-1.058 1.41.801.8 1.41-1.057a.5.5 0 01.55-.033c.328.188.682.337 1.056.438a.5.5 0 01.364.412l.25 1.744h1.132l.25-1.744a.5.5 0 01.364-.412 4.49 4.49 0 001.057-.438.5.5 0 01.549.033l1.41 1.058.8-.801-1.057-1.41.4-.3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 10a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM10 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd"/>'
)
iconComponents.BIconGear = BIconGear

export const BIconGearFill = /*#__PURE__*/ makeIcon(
  'GearFill',
  '<path fill-rule="evenodd" d="M14.34 12.486l1.317 1.757-1.414 1.414-1.757-1.318c-.365.21-.76.375-1.176.487L11 17H9l-.31-2.174a4.969 4.969 0 01-1.176-.487l-1.757 1.318-1.414-1.414 1.318-1.757a4.968 4.968 0 01-.487-1.176L3 11V9l2.173-.31a4.97 4.97 0 01.488-1.176L4.343 5.757l1.414-1.414 1.757 1.318a4.97 4.97 0 011.176-.487L9 3h2l.31 2.173c.416.113.81.278 1.176.488l1.757-1.318 1.414 1.414-1.318 1.757c.21.365.375.76.487 1.176L17 9v2l-2.174.31c-.112.416-.277.81-.487 1.176zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/><path d="M15.657 14.243l.353.353a.5.5 0 00.047-.653l-.4.3zm-1.414 1.414l-.3.4a.5.5 0 00.653-.047l-.353-.353zm-1.757-1.318l.3-.4a.5.5 0 00-.55-.033l.25.433zm-1.176.487l-.13-.482a.5.5 0 00-.364.412l.494.07zM11 17v.5a.5.5 0 00.495-.43L11 17zm-2 0l-.495.07A.5.5 0 009 17.5V17zm-.31-2.174l.494-.07a.5.5 0 00-.364-.412l-.13.482zm-1.176-.487l.25-.433a.5.5 0 00-.55.033l.3.4zm-1.757 1.318l-.353.353a.5.5 0 00.653.047l-.3-.4zm-1.414-1.414l-.4-.3a.5.5 0 00.047.653l.353-.353zm1.318-1.757l.4.3a.5.5 0 00.033-.55l-.433.25zm-.487-1.176l.482-.13a.5.5 0 00-.412-.364l-.07.494zM3 11h-.5a.5.5 0 00.43.495L3 11zm0-2l-.07-.495A.5.5 0 002.5 9H3zm2.173-.31l.071.494a.5.5 0 00.412-.364l-.482-.13zm.488-1.176l.433.25a.5.5 0 00-.033-.55l-.4.3zM4.343 5.757l-.353-.353a.5.5 0 00-.047.653l.4-.3zm1.414-1.414l.3-.4a.5.5 0 00-.653.047l.353.353zm1.757 1.318l-.3.4a.5.5 0 00.55.033l-.25-.433zm1.176-.487l.13.482a.5.5 0 00.364-.412l-.494-.07zM9 3v-.5a.5.5 0 00-.495.43L9 3zm2 0l.495-.07A.5.5 0 0011 2.5V3zm.31 2.173l-.495.071a.5.5 0 00.365.412l.13-.482zm1.176.488l-.25.433a.5.5 0 00.55-.033l-.3-.4zm1.757-1.318l.353-.353a.5.5 0 00-.653-.047l.3.4zm1.414 1.414l.4.3a.5.5 0 00-.047-.653l-.353.353zm-1.318 1.757l-.4-.3a.5.5 0 00-.033.55l.433-.25zm.487 1.176l-.482.13a.5.5 0 00.412.364l.07-.494zM17 9h.5a.5.5 0 00-.43-.495L17 9zm0 2l.07.495A.5.5 0 0017.5 11H17zm-2.174.31l-.07-.495a.5.5 0 00-.412.365l.482.13zm-.887 1.476l1.318 1.757.8-.6-1.318-1.757-.8.6zm1.364 1.103l-1.414 1.414.707.707 1.414-1.414-.707-.707zm-.76 1.368l-1.757-1.318-.6.8 1.757 1.318.6-.8zm-2.306-1.351a4.472 4.472 0 01-1.057.438l.261.965a5.47 5.47 0 001.294-.536l-.498-.867zm-1.421.85l-.311 2.173.99.142.31-2.174-.99-.141zM11 16.5H9v1h2v-1zm-1.505.43l-.31-2.174-.99.141.31 2.174.99-.142zm-.675-2.586a4.472 4.472 0 01-1.057-.438l-.498.867a5.5 5.5 0 001.294.536l.261-.965zm-1.606-.405l-1.757 1.318.6.8 1.757-1.318-.6-.8zm-1.103 1.364L4.697 13.89l-.707.707 1.414 1.414.707-.707zm-1.368-.76l1.318-1.757-.8-.6-1.318 1.757.8.6zm1.351-2.306a4.47 4.47 0 01-.438-1.057l-.965.261c.124.458.305.892.536 1.294l.867-.498zm-.85-1.421l-2.173-.311-.142.99 2.174.31.141-.99zM3.5 11V9h-1v2h1zm-.43-1.505l2.174-.31-.141-.99-2.174.31.142.99zm2.586-.675a4.47 4.47 0 01.438-1.057l-.867-.498a5.47 5.47 0 00-.536 1.294l.965.261zm.405-1.606L4.743 5.457l-.8.6 1.318 1.757.8-.6zM4.697 6.111L6.11 4.697l-.707-.707L3.99 5.404l.707.707zm.76-1.368l1.757 1.318.6-.8-1.757-1.318-.6.8zm2.306 1.351a4.47 4.47 0 011.057-.438l-.261-.965a5.47 5.47 0 00-1.294.536l.498.867zm1.421-.85l.311-2.173-.99-.142-.31 2.174.99.141zM9 3.5h2v-1H9v1zm1.505-.43l.31 2.174.99-.141-.31-2.174-.99.142zm.675 2.586c.374.101.728.25 1.057.438l.498-.867a5.47 5.47 0 00-1.294-.536l-.261.965zm1.606.405l1.757-1.318-.6-.8-1.757 1.318.6.8zm1.103-1.364l1.414 1.414.707-.707-1.414-1.414-.707.707zm1.368.76l-1.318 1.757.8.6 1.318-1.757-.8-.6zm-1.351 2.306c.188.329.337.683.438 1.057l.965-.261a5.47 5.47 0 00-.536-1.294l-.867.498zm.85 1.421l2.173.311.142-.99-2.174-.31-.141.99zM16.5 9v2h1V9h-1zm.43 1.505l-2.174.31.141.99 2.174-.31-.142-.99zm-2.586.675a4.49 4.49 0 01-.438 1.057l.867.498a5.47 5.47 0 00.536-1.294l-.965-.261zM10 13.5a3.5 3.5 0 003.5-3.5h-1a2.5 2.5 0 01-2.5 2.5v1zm3.5-3.5A3.5 3.5 0 0010 6.5v1a2.5 2.5 0 012.5 2.5h1zM10 6.5A3.5 3.5 0 006.5 10h1A2.5 2.5 0 0110 7.5v-1zM6.5 10a3.5 3.5 0 003.5 3.5v-1A2.5 2.5 0 017.5 10h-1z"/>'
)
iconComponents.BIconGearFill = BIconGearFill

export const BIconGraphDown = /*#__PURE__*/ makeIcon(
  'GraphDown',
  '<path d="M2 2h1v16H2V2zm1 15h15v1H3v-1z"/><path fill-rule="evenodd" d="M16.39 11.041l-4.349-5.436L9 8.646 5.354 5l-.708.707L9 10.061l2.959-2.959 3.65 4.564.781-.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12 11.854a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v3.5h-3.5a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconGraphDown = BIconGraphDown

export const BIconGraphUp = /*#__PURE__*/ makeIcon(
  'GraphUp',
  '<path d="M2 2h1v16H2V2zm1 15h15v1H3v-1z"/><path fill-rule="evenodd" d="M16.39 6.312l-4.349 5.437L9 8.707l-3.646 3.647-.708-.708L9 7.293l2.959 2.958 3.65-4.563.781.624z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12 5.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V6h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconGraphUp = BIconGraphUp

export const BIconGrid = /*#__PURE__*/ makeIcon(
  'Grid',
  '<path fill-rule="evenodd" d="M9.5 4.5a1 1 0 00-1-1h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4zm-1 7h-4v4h4v-4zm7 0h-4v4h4v-4zm0-7h-4v4h4v-4zm-7 0h-4v4h4v-4zm2 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4zm-6 6a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4zm7 0a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4z" clip-rule="evenodd"/>'
)
iconComponents.BIconGrid = BIconGrid

export const BIconGridFill = /*#__PURE__*/ makeIcon(
  'GridFill',
  '<rect width="6" height="6" x="3.5" y="10.5" rx="1"/><rect width="6" height="6" x="10.5" y="10.5" rx="1"/><rect width="6" height="6" x="10.5" y="3.5" rx="1"/><rect width="6" height="6" x="3.5" y="3.5" rx="1"/>'
)
iconComponents.BIconGridFill = BIconGridFill

export const BIconHeart = /*#__PURE__*/ makeIcon(
  'Heart',
  '<path fill-rule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clip-rule="evenodd"/>'
)
iconComponents.BIconHeart = BIconHeart

export const BIconHeartFill = /*#__PURE__*/ makeIcon(
  'HeartFill',
  '<path fill-rule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clip-rule="evenodd"/>'
)
iconComponents.BIconHeartFill = BIconHeartFill

export const BIconHouse = /*#__PURE__*/ makeIcon(
  'House',
  '<path fill-rule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconHouse = BIconHouse

export const BIconHouseFill = /*#__PURE__*/ makeIcon(
  'HouseFill',
  '<path d="M8.5 12.995V16.5a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V13c0-.25-.25-.5-.5-.5H9c-.25 0-.5.25-.5.495z"/><path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconHouseFill = BIconHouseFill

export const BIconImage = /*#__PURE__*/ makeIcon(
  'Image',
  '<path fill-rule="evenodd" d="M16.002 4h-12a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1zm-12-1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-12z" clip-rule="evenodd"/><path d="M12.648 9.646a.5.5 0 01.577-.093l3.777 1.947V16h-14v-2l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M6.502 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'
)
iconComponents.BIconImage = BIconImage

export const BIconImageFill = /*#__PURE__*/ makeIcon(
  'ImageFill',
  '<path fill-rule="evenodd" d="M2.002 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-12a2 2 0 01-2-2V5zm1 9l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71a.5.5 0 01.577-.094l3.777 1.947V15a1 1 0 01-1 1h-12a1 1 0 01-1-1v-1zm5-6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconImageFill = BIconImageFill

export const BIconInbox = /*#__PURE__*/ makeIcon(
  'Inbox',
  '<path fill-rule="evenodd" d="M5.81 6.063A1.5 1.5 0 016.98 5.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 11-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H6.98a.5.5 0 00-.39.188l-3.7 4.624a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.125 10.67a.5.5 0 01.375-.17H8a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H3.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H12.45a2.5 2.5 0 01-4.9 0H3.066z" clip-rule="evenodd"/>'
)
iconComponents.BIconInbox = BIconInbox

export const BIconInboxFill = /*#__PURE__*/ makeIcon(
  'InboxFill',
  '<path fill-rule="evenodd" d="M5.81 6.063A1.5 1.5 0 016.98 5.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 11-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H6.98a.5.5 0 00-.39.188l-3.7 4.624a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.125 10.67a.5.5 0 01.375-.17h5a.5.5 0 01.5.5c0 .828.625 2 2 2s2-1.172 2-2a.5.5 0 01.5-.5h5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H3.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393z" clip-rule="evenodd"/>'
)
iconComponents.BIconInboxFill = BIconInboxFill

export const BIconInfo = /*#__PURE__*/ makeIcon(
  'Info',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm8-7a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/><path d="M10.93 8.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705z"/><circle cx="10" cy="6.5" r="1"/>'
)
iconComponents.BIconInfo = BIconInfo

export const BIconInfoFill = /*#__PURE__*/ makeIcon(
  'InfoFill',
  '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705zM10 7.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconInfoFill = BIconInfoFill

export const BIconInfoSquare = /*#__PURE__*/ makeIcon(
  'InfoSquare',
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path d="M10.93 8.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705z"/><circle cx="10" cy="6.5" r="1"/>'
)
iconComponents.BIconInfoSquare = BIconInfoSquare

export const BIconInfoSquareFill = /*#__PURE__*/ makeIcon(
  'InfoSquareFill',
  '<path fill-rule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705zM10 7.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconInfoSquareFill = BIconInfoSquareFill

export const BIconJustify = /*#__PURE__*/ makeIcon(
  'Justify',
  '<path fill-rule="evenodd" d="M4 14.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconJustify = BIconJustify

export const BIconJustifyLeft = /*#__PURE__*/ makeIcon(
  'JustifyLeft',
  '<path fill-rule="evenodd" d="M4 14.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconJustifyLeft = BIconJustifyLeft

export const BIconJustifyRight = /*#__PURE__*/ makeIcon(
  'JustifyRight',
  '<path fill-rule="evenodd" d="M8 14.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconJustifyRight = BIconJustifyRight

export const BIconKanban = /*#__PURE__*/ makeIcon(
  'Kanban',
  '<path fill-rule="evenodd" d="M15.5 3h-11a1 1 0 00-1 1v12a1 1 0 001 1h11a1 1 0 001-1V4a1 1 0 00-1-1zm-11-1a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2h-11z" clip-rule="evenodd"/><rect width="3" height="5" x="8.5" y="4" rx="1"/><rect width="3" height="9" x="4.5" y="4" rx="1"/><rect width="3" height="12" x="12.5" y="4" rx="1"/>'
)
iconComponents.BIconKanban = BIconKanban

export const BIconKanbanFill = /*#__PURE__*/ makeIcon(
  'KanbanFill',
  '<path fill-rule="evenodd" d="M4.5 2a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2h-11zm5 2a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1zm-5 1a1 1 0 011-1h1a1 1 0 011 1v7a1 1 0 01-1 1h-1a1 1 0 01-1-1V5zm9-1a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" clip-rule="evenodd"/>'
)
iconComponents.BIconKanbanFill = BIconKanbanFill

export const BIconLaptop = /*#__PURE__*/ makeIcon(
  'Laptop',
  '<path fill-rule="evenodd" d="M15.5 4h-11a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5zm-11-1A1.5 1.5 0 003 4.5v7A1.5 1.5 0 004.5 13h11a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0015.5 3h-11z" clip-rule="evenodd"/><path d="M2.81 13.758A1 1 0 013.78 13h12.44a1 1 0 01.97.758l.5 2A1 1 0 0116.72 17H3.28a1 1 0 01-.97-1.242l.5-2z"/>'
)
iconComponents.BIconLaptop = BIconLaptop

export const BIconList = /*#__PURE__*/ makeIcon(
  'List',
  '<path fill-rule="evenodd" d="M4.5 13.5A.5.5 0 015 13h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 9h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 5h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconList = BIconList

export const BIconListCheck = /*#__PURE__*/ makeIcon(
  'ListCheck',
  '<path fill-rule="evenodd" d="M7 13.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM5.854 4.146a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L4 5.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L4 9.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconListCheck = BIconListCheck

export const BIconListOl = /*#__PURE__*/ makeIcon(
  'ListOl',
  '<path fill-rule="evenodd" d="M7 13.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M3.713 13.865v-.474H4c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 01-.492.594v.033a.615.615 0 01.569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V11H3.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 00-.342.338v.041zM4.564 7h-.635V4.924h-.031l-.598.42v-.567l.629-.443h.635V7z"/>'
)
iconComponents.BIconListOl = BIconListOl

export const BIconListTask = /*#__PURE__*/ makeIcon(
  'ListTask',
  '<path fill-rule="evenodd" d="M4 4.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H4zM5 5H4v1h1V5z" clip-rule="evenodd"/><path d="M7 5.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM7.5 9a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 4a.5.5 0 000 1h9a.5.5 0 000-1h-9z"/><path fill-rule="evenodd" d="M3.5 9a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V9zM4 9h1v1H4V9zm0 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H4zm1 .5H4v1h1v-1z" clip-rule="evenodd"/>'
)
iconComponents.BIconListTask = BIconListTask

export const BIconListUl = /*#__PURE__*/ makeIcon(
  'ListUl',
  '<path fill-rule="evenodd" d="M7 13.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconListUl = BIconListUl

export const BIconLock = /*#__PURE__*/ makeIcon(
  'Lock',
  '<path fill-rule="evenodd" d="M13.655 9H6.333c-.264 0-.398.068-.471.121a.73.73 0 00-.224.296 1.626 1.626 0 00-.138.59V15c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 00.436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 00.224-.296 1.627 1.627 0 00.138-.59V10c0-.342-.076-.531-.14-.635a.658.658 0 00-.255-.237 1.123 1.123 0 00-.45-.128zm.012-1H6.333C4.5 8 4.5 10 4.5 10v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2v-5c0-2-1.833-2-1.833-2zM6.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"/>'
)
iconComponents.BIconLock = BIconLock

export const BIconLockFill = /*#__PURE__*/ makeIcon(
  'LockFill',
  '<rect width="11" height="9" x="4.5" y="8" rx="2"/><path fill-rule="evenodd" d="M6.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"/>'
)
iconComponents.BIconLockFill = BIconLockFill

export const BIconMusicPlayer = /*#__PURE__*/ makeIcon(
  'MusicPlayer',
  '<path fill-rule="evenodd" d="M14 3H6a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zM6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 5H7v3h6V5zM7 4a1 1 0 00-1 1v3a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H7zm3 11a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="10" cy="13" r="1"/>'
)
iconComponents.BIconMusicPlayer = BIconMusicPlayer

export const BIconMusicPlayerFill = /*#__PURE__*/ makeIcon(
  'MusicPlayerFill',
  '<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 1a1 1 0 011-1h6a1 1 0 011 1v2.5a1 1 0 01-1 1H7a1 1 0 01-1-1V5zm7 8a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="10" cy="13" r="1"/>'
)
iconComponents.BIconMusicPlayerFill = BIconMusicPlayerFill

export const BIconOption = /*#__PURE__*/ makeIcon(
  'Option',
  '<path fill-rule="evenodd" d="M2.5 4.5A.5.5 0 013 4h4a.5.5 0 01.439.26L13.297 15H17a.5.5 0 010 1h-4a.5.5 0 01-.439-.26L6.703 5H3a.5.5 0 01-.5-.5zm10 0A.5.5 0 0113 4h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconOption = BIconOption

export const BIconPause = /*#__PURE__*/ makeIcon(
  'Pause',
  '<path fill-rule="evenodd" d="M8 5.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v8a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconPause = BIconPause

export const BIconPeople = /*#__PURE__*/ makeIcon(
  'People',
  '<path fill-rule="evenodd" d="M17 16s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002zM9.022 15h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C15.688 12.629 14.718 12 13 12c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002zM13 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm-7.064 4.28a5.873 5.873 0 00-1.23-.247A7.334 7.334 0 007 11c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 017 15c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM6.92 12c-1.668.02-2.615.64-3.16 1.276C3.163 13.97 3 14.739 3 15h3c0-1.045.323-2.086.92-3zM3.5 7.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clip-rule="evenodd"/>'
)
iconComponents.BIconPeople = BIconPeople

export const BIconPeopleFill = /*#__PURE__*/ makeIcon(
  'PeopleFill',
  '<path fill-rule="evenodd" d="M9 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H9zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 017 15c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 007 11c-4 0-5 3-5 4s1 1 1 1h4.216zM6.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'
)
iconComponents.BIconPeopleFill = BIconPeopleFill

export const BIconPerson = /*#__PURE__*/ makeIcon(
  'Person',
  '<path fill-rule="evenodd" d="M15 16s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002zM5.022 15h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C13.516 12.68 12.289 12 10 12c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002zM10 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconPerson = BIconPerson

export const BIconPersonFill = /*#__PURE__*/ makeIcon(
  'PersonFill',
  '<path fill-rule="evenodd" d="M5 16s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H5zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'
)
iconComponents.BIconPersonFill = BIconPersonFill

export const BIconPhone = /*#__PURE__*/ makeIcon(
  'Phone',
  '<path fill-rule="evenodd" d="M13 3H7a1 1 0 00-1 1v11a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM7 2a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconPhone = BIconPhone

export const BIconPhoneLandscape = /*#__PURE__*/ makeIcon(
  'PhoneLandscape',
  '<path fill-rule="evenodd" d="M3.5 6.5v6a1 1 0 001 1h11a1 1 0 001-1v-6a1 1 0 00-1-1h-11a1 1 0 00-1 1zm-1 6a2 2 0 002 2h11a2 2 0 002-2v-6a2 2 0 00-2-2h-11a2 2 0 00-2 2v6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.5 9.5a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconPhoneLandscape = BIconPhoneLandscape

export const BIconPlay = /*#__PURE__*/ makeIcon(
  'Play',
  '<path fill-rule="evenodd" d="M12.804 10L7 6.633v6.734L12.804 10zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C6.713 14.69 6 14.345 6 13.692V6.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'
)
iconComponents.BIconPlay = BIconPlay

export const BIconPlayFill = /*#__PURE__*/ makeIcon(
  'PlayFill',
  '<path d="M13.596 10.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V6.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'
)
iconComponents.BIconPlayFill = BIconPlayFill

export const BIconPlus = /*#__PURE__*/ makeIcon(
  'Plus',
  '<path fill-rule="evenodd" d="M10 5.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H6a.5.5 0 010-1h3.5V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 10a.5.5 0 01.5-.5h4a.5.5 0 010 1h-3.5V14a.5.5 0 01-1 0v-4z" clip-rule="evenodd"/>'
)
iconComponents.BIconPlus = BIconPlus

export const BIconPower = /*#__PURE__*/ makeIcon(
  'Power',
  '<path fill-rule="evenodd" d="M7.578 6.437a5 5 0 104.922.044l.5-.865a6 6 0 11-5.908-.053l.486.874z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 10V3h1v7h-1z" clip-rule="evenodd"/>'
)
iconComponents.BIconPower = BIconPower

export const BIconQuestion = /*#__PURE__*/ makeIcon(
  'Question',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm8-7a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/><path d="M7.25 8.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'
)
iconComponents.BIconQuestion = BIconQuestion

export const BIconQuestionFill = /*#__PURE__*/ makeIcon(
  'QuestionFill',
  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.57 8.033H7.25C7.22 6.147 8.68 5.5 10.006 5.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H9.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'
)
iconComponents.BIconQuestionFill = BIconQuestionFill

export const BIconQuestionSquare = /*#__PURE__*/ makeIcon(
  'QuestionSquare',
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path d="M7.25 8.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'
)
iconComponents.BIconQuestionSquare = BIconQuestionSquare

export const BIconQuestionSquareFill = /*#__PURE__*/ makeIcon(
  'QuestionSquareFill',
  '<path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm4.57 6.033H7.25C7.22 6.147 8.68 5.5 10.006 5.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H9.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'
)
iconComponents.BIconQuestionSquareFill = BIconQuestionSquareFill

export const BIconReply = /*#__PURE__*/ makeIcon(
  'Reply',
  '<path fill-rule="evenodd" d="M11.502 7.013a.144.144 0 00-.202.134V8.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876 1.02-.983 2.185-1.516 3.205-1.799a8.745 8.745 0 011.921-.306 7.468 7.468 0 01.798.008h.013l.005.001h.001l-.048.498.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.522.522 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028l-3.984-2.933zM10.3 12.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/>'
)
iconComponents.BIconReply = BIconReply

export const BIconReplyFill = /*#__PURE__*/ makeIcon(
  'ReplyFill',
  '<path d="M11.079 13.9l4.568-3.281a.719.719 0 000-1.238L11.079 6.1A.716.716 0 0010 6.719V8c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/>'
)
iconComponents.BIconReplyFill = BIconReplyFill

export const BIconReplyAll = /*#__PURE__*/ makeIcon(
  'ReplyAll',
  '<path fill-rule="evenodd" d="M10.002 7.013a.144.144 0 00-.202.134V8.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876 1.02-.983 2.185-1.516 3.205-1.799a8.745 8.745 0 011.921-.306 7.47 7.47 0 01.798.008h.013l.005.001h.001L9.3 11.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.522.522 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028l-3.984-2.933zM8.8 12.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.868 6.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 11-.593-.805l4.012-2.954a.523.523 0 01.042-.028.147.147 0 000-.252.512.512 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'
)
iconComponents.BIconReplyAll = BIconReplyAll

export const BIconReplyAllFill = /*#__PURE__*/ makeIcon(
  'ReplyAllFill',
  '<path d="M10.079 13.9l4.568-3.281a.719.719 0 000-1.238L10.079 6.1A.716.716 0 009 6.719V8c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/><path fill-rule="evenodd" d="M12.868 6.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 11-.593-.805l4.012-2.954a.523.523 0 01.042-.028.147.147 0 000-.252.512.512 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'
)
iconComponents.BIconReplyAllFill = BIconReplyAllFill

export const BIconSearch = /*#__PURE__*/ makeIcon(
  'Search',
  '<path fill-rule="evenodd" d="M12.442 12.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM15 8.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconSearch = BIconSearch

export const BIconSkipBackward = /*#__PURE__*/ makeIcon(
  'SkipBackward',
  '<path fill-rule="evenodd" d="M2.5 5.5A.5.5 0 013 6v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L10.5 10.752v2.94c0 .653-.713.998-1.233.696L3 10.752V14a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm7 1.133L3.696 10 9.5 13.367V6.633zm7.5 0L11.196 10 17 13.367V6.633z" clip-rule="evenodd"/>'
)
iconComponents.BIconSkipBackward = BIconSkipBackward

export const BIconSkipBackwardFill = /*#__PURE__*/ makeIcon(
  'SkipBackwardFill',
  '<path stroke="currentColor" stroke-linecap="round" d="M14 6v8"/><path d="M13.596 10.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V6.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'
)
iconComponents.BIconSkipBackwardFill = BIconSkipBackwardFill

export const BIconSkipEnd = /*#__PURE__*/ makeIcon(
  'SkipEnd',
  '<path fill-rule="evenodd" d="M14 5.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.804 10L7 6.633v6.734L12.804 10zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C6.713 14.69 6 14.345 6 13.692V6.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'
)
iconComponents.BIconSkipEnd = BIconSkipEnd

export const BIconSkipEndFill = /*#__PURE__*/ makeIcon(
  'SkipEndFill',
  '<path stroke="currentColor" stroke-linecap="round" d="M2.5 6v8"/><path d="M2.904 10.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V6.308c0-.63-.693-1.01-1.233-.696L2.904 9.304a.802.802 0 000 1.393z"/><path d="M10.404 10.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V6.308c0-.63-.692-1.01-1.233-.696l-6.363 3.692a.802.802 0 000 1.393z"/>'
)
iconComponents.BIconSkipEndFill = BIconSkipEndFill

export const BIconSkipForward = /*#__PURE__*/ makeIcon(
  'SkipForward',
  '<path fill-rule="evenodd" d="M17.5 5.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-3.248l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C2.713 14.69 2 14.345 2 13.692V6.308c0-.653.713-.998 1.233-.696L9.5 9.248v-2.94c0-.653.713-.998 1.233-.696L17 9.248V6a.5.5 0 01.5-.5zM3 6.633v6.734L8.804 10 3 6.633zm7.5 0v6.734L16.304 10 10.5 6.633z" clip-rule="evenodd"/>'
)
iconComponents.BIconSkipForward = BIconSkipForward

export const BIconSkipForwardFill = /*#__PURE__*/ makeIcon(
  'SkipForwardFill',
  '<path stroke="currentColor" stroke-linecap="round" d="M17.5 6v8"/><path d="M9.596 10.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V6.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/><path d="M17.096 10.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V6.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'
)
iconComponents.BIconSkipForwardFill = BIconSkipForwardFill

export const BIconSkipStart = /*#__PURE__*/ makeIcon(
  'SkipStart',
  '<path fill-rule="evenodd" d="M6.5 5.5A.5.5 0 006 6v8a.5.5 0 001 0V6a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.696 10L13.5 6.633v6.734L7.696 10zm-.792-.696a.802.802 0 000 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V6.308c0-.653-.713-.998-1.233-.696L6.904 9.304z" clip-rule="evenodd"/>'
)
iconComponents.BIconSkipStart = BIconSkipStart

export const BIconSkipStartFill = /*#__PURE__*/ makeIcon(
  'SkipStartFill',
  '<path stroke="currentColor" stroke-linecap="round" d="M6.5 6v8"/><path d="M6.903 10.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V6.308c0-.63-.692-1.01-1.232-.696L6.903 9.304a.802.802 0 000 1.393z"/>'
)
iconComponents.BIconSkipStartFill = BIconSkipStartFill

export const BIconSquare = /*#__PURE__*/ makeIcon(
  'Square',
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/>'
)
iconComponents.BIconSquare = BIconSquare

export const BIconSquareFill = /*#__PURE__*/ makeIcon(
  'SquareFill',
  '<rect width="16" height="16" x="2" y="2" rx="2"/>'
)
iconComponents.BIconSquareFill = BIconSquareFill

export const BIconStar = /*#__PURE__*/ makeIcon(
  'Star',
  '<path fill-rule="evenodd" d="M4.866 16.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696-2.184-4.327a.513.513 0 00-.927 0L7.354 7.12l-4.898.696c-.441.062-.612.636-.282.95l3.522 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L3.71 8.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658c.08.157.226.264.393.288l4.053.575-2.907 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconStar = BIconStar

export const BIconStarFill = /*#__PURE__*/ makeIcon(
  'StarFill',
  '<path d="M5.612 17.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.16-.888.282-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L10 15.187l-4.389 2.256z"/>'
)
iconComponents.BIconStarFill = BIconStarFill

export const BIconStarHalf = /*#__PURE__*/ makeIcon(
  'StarHalf',
  '<path fill-rule="evenodd" d="M7.354 7.119l2.184-4.327A.516.516 0 0110 2.5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0118 8.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L10 15.187l-4.389 2.256a.52.52 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73-3.522-3.356a.55.55 0 01-.172-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM10 14.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.907-2.77-4.053-.576a.525.525 0 01-.393-.288l-1.847-3.658-.001.003v9.8z" clip-rule="evenodd"/>'
)
iconComponents.BIconStarHalf = BIconStarHalf

export const BIconStop = /*#__PURE__*/ makeIcon(
  'Stop',
  '<path fill-rule="evenodd" d="M5.5 7A1.5 1.5 0 017 5.5h6A1.5 1.5 0 0114.5 7v6a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 13V7zM7 6.5a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V7a.5.5 0 00-.5-.5H7z" clip-rule="evenodd"/>'
)
iconComponents.BIconStop = BIconStop

export const BIconStopFill = /*#__PURE__*/ makeIcon(
  'StopFill',
  '<path d="M7 5.5h6A1.5 1.5 0 0114.5 7v6a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 13V7A1.5 1.5 0 017 5.5z"/>'
)
iconComponents.BIconStopFill = BIconStopFill

export const BIconTablet = /*#__PURE__*/ makeIcon(
  'Tablet',
  '<path fill-rule="evenodd" d="M14 3.5H6a1 1 0 00-1 1v11a1 1 0 001 1h8a1 1 0 001-1v-11a1 1 0 00-1-1zm-8-1a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2v-11a2 2 0 00-2-2H6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 15.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'
)
iconComponents.BIconTablet = BIconTablet

export const BIconTabletLandscape = /*#__PURE__*/ makeIcon(
  'TabletLandscape',
  '<path fill-rule="evenodd" d="M3.5 6v8a1 1 0 001 1h11a1 1 0 001-1V6a1 1 0 00-1-1h-11a1 1 0 00-1 1zm-1 8a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2h-11a2 2 0 00-2 2v8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.5 10a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconTabletLandscape = BIconTabletLandscape

export const BIconTag = /*#__PURE__*/ makeIcon(
  'Tag',
  '<path fill-rule="evenodd" d="M2.5 4A1.5 1.5 0 014 2.5h4.586a1.5 1.5 0 011.06.44l7 7a1.5 1.5 0 010 2.12l-4.585 4.586a1.5 1.5 0 01-2.122 0l-7-7a1.5 1.5 0 01-.439-1.06V4zM4 3.5a.5.5 0 00-.5.5v4.586a.5.5 0 00.146.353l7 7a.5.5 0 00.708 0l4.585-4.585a.5.5 0 000-.708l-7-7a.5.5 0 00-.353-.146H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 6.5a2 2 0 114 0 2 2 0 01-4 0zm2-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'
)
iconComponents.BIconTag = BIconTag

export const BIconTagFill = /*#__PURE__*/ makeIcon(
  'TagFill',
  '<path fill-rule="evenodd" d="M4 3a1 1 0 00-1 1v4.586a1 1 0 00.293.707l7 7a1 1 0 001.414 0l4.586-4.586a1 1 0 000-1.414l-7-7A1 1 0 008.586 3H4zm4 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconTagFill = BIconTagFill

// export const BIcon = /*#__PURE__*/ makeIcon(
//   '',
//   ''
// )
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

export const BIconWatch = /*#__PURE__*/ makeIcon(
  'Watch',
  '<path fill-rule="evenodd" d="M6 16.333v-1.86A5.985 5.985 0 014 10c0-1.777.772-3.374 2-4.472V3.667C6 2.747 6.746 2 7.667 2h4.666C13.253 2 14 2.746 14 3.667v1.86A5.985 5.985 0 0116 10a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H7.667C6.747 18 6 17.254 6 16.333zM15 10a5 5 0 10-10 0 5 5 0 0010 0z" clip-rule="evenodd"/><rect width="1" height="2" x="15.5" y="9" rx=".5"/><path fill-rule="evenodd" d="M10 6.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H8a.5.5 0 010-1h1.5V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconWatch = BIconWatch

export const BIconWifi = /*#__PURE__*/ makeIcon(
  'Wifi',
  '<path fill-rule="evenodd" d="M8.858 13.858A1.991 1.991 0 0110 13.5c.425 0 .818.132 1.142.358L10 15l-1.142-1.142z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.731 14.024l.269.269.269-.269a1.506 1.506 0 00-.538 0zm-1.159-.576A2.49 2.49 0 0110 13c.53 0 1.023.165 1.428.448a.5.5 0 01.068.763l-1.143 1.143a.5.5 0 01-.707 0L8.504 14.21a.5.5 0 01.354-.853v.5l-.286-.41zM10 11.5a4.478 4.478 0 00-2.7.9.5.5 0 01-.6-.8c.919-.69 2.062-1.1 3.3-1.1s2.381.41 3.3 1.1a.5.5 0 01-.6.8 4.478 4.478 0 00-2.7-.9zm0-3c-1.833 0-3.51.657-4.814 1.748a.5.5 0 11-.642-.766A8.468 8.468 0 0110 7.5c2.076 0 3.98.745 5.456 1.982a.5.5 0 01-.642.766A7.468 7.468 0 0010 8.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 5.5c-2.657 0-5.082.986-6.932 2.613a.5.5 0 11-.66-.75A11.458 11.458 0 0110 4.5c2.91 0 5.567 1.08 7.592 2.862a.5.5 0 11-.66.751A10.458 10.458 0 0010 5.5z" clip-rule="evenodd"/>'
)
iconComponents.BIconWifi = BIconWifi

export const BIconXCircleFill = /*#__PURE__*/ makeIcon(
  'XCircleFill',
  '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.354 6.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconXCircleFill = BIconXCircleFill

export const BIconXCircle = /*#__PURE__*/ makeIcon(
  'XCircle',
  '<path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.646 13.354l-6-6 .708-.708 6 6-.708.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.354 13.354l6-6-.708-.708-6 6 .708.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconXCircle = BIconXCircle

export const BIconXOctagonFill = /*#__PURE__*/ makeIcon(
  'XOctagonFill',
  '<path fill-rule="evenodd" d="M13.46 2.146A.5.5 0 0013.107 2H6.893a.5.5 0 00-.353.146L2.146 6.54A.5.5 0 002 6.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V6.893a.5.5 0 00-.146-.353L13.46 2.146zm-6.106 4.5L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconXOctagonFill = BIconXOctagonFill

export const BIconXOctagon = /*#__PURE__*/ makeIcon(
  'XOctagon',
  '<path fill-rule="evenodd" d="M6.54 2.146A.5.5 0 016.893 2h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H6.893a.5.5 0 01-.353-.146L2.146 13.46A.5.5 0 012 13.107V6.893a.5.5 0 01.146-.353L6.54 2.146zM7.1 3L3 7.1v5.8L7.1 17h5.8l4.1-4.1V7.1L12.9 3H7.1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.293 10L6.646 7.354l.708-.708L10 9.293l2.646-2.647.708.708L10.707 10l2.647 2.646-.707.708L10 10.707l-2.646 2.647-.708-.707L9.293 10z" clip-rule="evenodd"/>'
)
iconComponents.BIconXOctagon = BIconXOctagon

export const BIconXSquareFill = /*#__PURE__*/ makeIcon(
  'XSquareFill',
  '<path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.354 4.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"/>'
)
iconComponents.BIconXSquareFill = BIconXSquareFill

export const BIconXSquare = /*#__PURE__*/ makeIcon(
  'XSquare',
  '<path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.293 10L6.646 7.354l.708-.708L10 9.293l2.646-2.647.708.708L10.707 10l2.647 2.646-.708.708L10 10.707l-2.646 2.647-.708-.707L9.293 10z" clip-rule="evenodd"/>'
)
iconComponents.BIconXSquare = BIconXSquare

export const BIconX = /*#__PURE__*/ makeIcon(
  'X',
  '<path fill-rule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'
)
iconComponents.BIconX = BIconX

// --- Array of icon names (PascalCase) for use in docs ---
// This could be in a meta.json file or similar (if auto generated)

export const iconNames = Object.keys(iconComponents).filter(n => n !== 'BIcon')

// --- Main plugin export --

export const IconsPlugin = /*#__PURE__*/ pluginFactory({ components: iconComponents })
