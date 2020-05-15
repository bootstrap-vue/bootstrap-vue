export const RX_ARRAY_NOTATION = /\[(\d+)]/g

// Aspect
export const RX_ASPECT = /^\d+(\.\d*)?[/:]\d+(\.\d*)?$/
export const RX_ASPECT_SEPARATOR = /[/:]/

// Loose YYYY-MM-DD matching, ignores any appended time inforation
// Matches '1999-12-20', '1999-1-1', '1999-01-20T22:51:49.118Z', '1999-01-02 13:00:00'
export const RX_DATE = /^\d+-\d\d?-\d\d?(?:\s|T|$)/

// Used to split off the date parts of the YYYY-MM-DD string
export const RX_DATE_SPLIT = /-|\s|T/

export const RX_NUMBER = /^[0-9]*\.?[0-9]+$/
export const RX_SPACES = /[\s\uFEFF\xA0]+/g
