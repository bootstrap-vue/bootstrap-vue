/**
 * SSR safe types
 */

import { hasWindowSupport } from './env'

const w = hasWindowSupport ? window : {}

export const HTMLElement = hasWindowSupport ? w.HTMLElement : class HTMLElement extends Object {}

export const File = hasWindowSupport ? w.File : class File extends Object {}
