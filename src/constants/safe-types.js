import { HAS_WINDOW_SUPPORT, WINDOW } from './env'

/* istanbul ignore next */
export const Element = HAS_WINDOW_SUPPORT ? WINDOW.Element : class Element extends Object {}

/* istanbul ignore next */
export const HTMLElement = HAS_WINDOW_SUPPORT
  ? WINDOW.HTMLElement
  : class HTMLElement extends Element {}

/* istanbul ignore next */
export const SVGElement = HAS_WINDOW_SUPPORT
  ? WINDOW.SVGElement
  : class SVGElement extends Element {}

/* istanbul ignore next */
export const File = HAS_WINDOW_SUPPORT ? WINDOW.File : class File extends Object {}
