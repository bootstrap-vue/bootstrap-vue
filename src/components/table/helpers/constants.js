// Constants used by table helpers

// Object of item keys that should be ignored for headers and stringification and filter events
export const IGNORED_FIELD_KEYS = {
  _rowVariant: true,
  _cellVariants: true,
  _showDetails: true
}

// Filter CSS Selector for click/dblclick/etc events
// If any of these selectors match the clicked element, we ignore the event
export const EVENT_FILTER = [
  'a',
  'a *', // include content inside links
  'button',
  'button *', // include content inside buttons
  'input:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'textarea:not(.disabled):not([disabled])',
  '[role="link"]',
  '[role="link"] *',
  '[role="button"]',
  '[role="button"] *',
  '[tabindex]:not(.disabled):not([disabled])'
].join(',')
