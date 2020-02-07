// Date utility functions
import identity from './identity'
import { concat } from './array'
import { isDate, isString } from './inspect'
import { toInteger } from './number'

// --- Constants ---

const RX_DATE = /^\d+-\d+-\d+$/

// --- Date utility methods ---

// Create or clone a date (`new Date(...)` shortcut)
export const createDate = (...args) => new Date(...args)

// Parse a date sting, or Date object, into a Date object (with no time information)
export const parseYMD = date => {
  if (isString(date) && RX_DATE.test(date.trim())) {
    const [year, month, day] = date.split('-').map(toInteger)
    return createDate(year, month - 1, day)
  } else if (isDate(date)) {
    return createDate(date.getFullYear(), date.getMonth(), date.getDate())
  }
  return null
}

// Format a date object as `YYYY-MM-DD` format
export const formatYMD = date => {
  date = parseYMD(date)
  if (!date) {
    return null
  }
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}

// Given a locale (or locales), resolve the browser available locale
export const resolveLocale = (locales, calendar = 'gregory') => /* istanbul ignore next */ {
  locales = concat(locales).filter(identity)
  const fmt = new Intl.DateTimeFormat(locales, { calendar: calendar })
  return fmt.resolvedOptions().locale
}

// Create a `Intl.DateTimeFormat` formatter function
export const createDateFormatter = (locale, options) => /* istanbul ignore next */ {
  const dtf = new Intl.DateTimeFormat(locale, options)
  return dtf.format
}

// Determine if two dates are the same date (ignoring time portion)
export const datesEqual = (date1, date2) => {
  // Returns true of the date portion of two date objects are equal
  // We don't compare the time portion
  return formatYMD(date1) === formatYMD(date2)
}

// --- Date "math" utility methods (for BCalendar component mainly) ---

export const firstDateOfMonth = date => {
  date = createDate(date)
  date.setDate(1)
  return date
}

export const lastDateOfMonth = date => {
  date = createDate(date)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  return date
}

export const oneMonthAgo = date => {
  date = createDate(date)
  const month = date.getMonth()
  date.setMonth(month - 1)
  if (date.getMonth() === month) {
    date.setDate(0)
  }
  return date
}

export const oneMonthAhead = date => {
  date = createDate(date)
  const month = date.getMonth()
  date.setMonth(month + 1)
  if (date.getMonth() === (month + 2) % 12) {
    date.setDate(0)
  }
  return date
}

export const oneYearAgo = date => {
  date = createDate(date)
  const month = date.getMonth()
  date.setMonth(month - 12)
  if (date.getMonth() !== month) {
    date.setDate(0)
  }
  return date
}

export const oneYearAhead = date => {
  date = createDate(date)
  const month = date.getMonth()
  date.setMonth(month + 12)
  if (date.getMonth() !== month) {
    date.setDate(0)
  }
  return date
}
