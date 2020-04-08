// Localization utilities
import { arrayIncludes } from './array'
import { toString } from './string'

// Languages that are RTL
const RTL_LANGS = [
  'ar',
  'az',
  'ckb',
  'fa',
  'he',
  'ks',
  'lrc',
  'mzn',
  'ps',
  'sd',
  'te',
  'ug',
  'ur',
  'yi'
].map(locale => locale.toLowerCase())

// Precompile RegExpr
const RX_STRIP_MODS = /-u-.+/

// Returns true if the locale is RTL
export const isLocaleRTL = locale => {
  // Determines if the locale is RTL (only single locale supported)
  const parts = toString(locale)
    .toLowerCase()
    .replace(RX_STRIP_MODS, '')
    .split('-')
  const locale1 = parts.slice(0, 2).join('-')
  const locale2 = parts[0]
  return arrayIncludes(RTL_LANGS, locale1) || arrayIncludes(RTL_LANGS, locale2)
}
