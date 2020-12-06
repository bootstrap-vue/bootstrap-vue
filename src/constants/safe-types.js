import { HAS_WINDOW_SUPPORT, WINDOW } from './env'

const Element = HAS_WINDOW_SUPPORT ? WINDOW.Element : class Element extends Object {}

export const HTMLElement = HAS_WINDOW_SUPPORT
  ? WINDOW.HTMLElement
  : class HTMLElement extends Element {}

export const SVGElement = HAS_WINDOW_SUPPORT
  ? WINDOW.SVGElement
  : class SVGElement extends Element {}

export const File = HAS_WINDOW_SUPPORT ? WINDOW.File : class File extends Object {}
