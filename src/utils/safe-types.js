/**
 * SSR safe types
 */

import { hasWindowSupport } from './env'

const w = hasWindowSupport ? window : {}

export const Element = hasWindowSupport ? w.Element : class Element extends Object {}

export const HTMLElement = hasWindowSupport ? w.HTMLElement : class HTMLElement extends Element {}

export const SVGElement = hasWindowSupport ? w.SVGElement : class SVGElement extends Element {}

export const File = hasWindowSupport ? w.File : class File extends Object {}
