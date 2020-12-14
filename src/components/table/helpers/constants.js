// Constants used by table helpers

export const FIELD_KEY_CELL_VARIANT = '_cellVariants'
export const FIELD_KEY_ROW_VARIANT = '_rowVariant'
export const FIELD_KEY_SHOW_DETAILS = '_showDetails'

// Object of item keys that should be ignored for headers and
// stringification and filter events
export const IGNORED_FIELD_KEYS = [
  FIELD_KEY_CELL_VARIANT,
  FIELD_KEY_ROW_VARIANT,
  FIELD_KEY_SHOW_DETAILS
].reduce((result, key) => ({ ...result, [key]: true }), {})

// Filter CSS selector for click/dblclick/etc. events
// If any of these selectors match the clicked element, we ignore the event
export const EVENT_FILTER = [
  'a',
  'a *', // Include content inside links
  'button',
  'button *', // Include content inside buttons
  'input:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'textarea:not(.disabled):not([disabled])',
  '[role="link"]',
  '[role="link"] *',
  '[role="button"]',
  '[role="button"] *',
  '[tabindex]:not(.disabled):not([disabled])'
].join(',')
