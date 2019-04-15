/**
 * SSR safe types
 */

import { hasWindowSupport } from './env'

const w = hasWindowSupport ? window : {}

export const HTMLElement = w.HTMLElement || Object
