// Date utility functions
import identity from './identity'
import { concat } from './array'
import { isDate, isString } from './inspect'
import { toInteger } from './number'

// Create or clone a date (new date(...) shortcut)
export const createDate = (...args) => new Date(...args)

// Parse a date sting, or date object, into a date object (with no time information)
export const parseYMD = date => {
  if (isString(date) && /^\d+-\d+-\d+$/.test(date.trim())) {
    const [year, month, day] = date.split('-')
    return createDate(toInteger(year), toInteger(month) - 1, toInteger(day))
  } else if (isDate(date)) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return createDate(year, month, day)
  }
  return null
}

// Format a date object as YYYY-MM-DD format
export const formatYMD = date => {
  date = parseYMD(date)
  if (date) {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }
  return null
}

// Given a locale (or locales), resolve the browser available locale
export const resolveLocale = (locales, calendar = 'gregory') => /* istanbul ignore next */ {
  locales = concat(locales).filter(identity)
  const fmt = new Intl.DateTimeFormat(locales, { calendar: calendar })
  return fmt.resolvedOptions().locale
}

// Create a Intl.DateTimeFormat formatter function
export const createDateFormatter = (locale, options) => /* istanbul ignore next */ {
  const dtf = new Intl.DateTimeFormat(locale, options)
  return dtf.format
}

// Determine if two dates are the same date (ignoring time portion)
export const datesEqual = (date1, date2) => {
  // Returns true of the date portion of two date objects are equal
  // (we don't compare the time portion)
  return formatYMD(date1) === formatYMD(date2)
}

// --- Date "math" for calendar component mainly ---

export const lastDateOfMonth = date => {
  date = createDate(date)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  return date
}

export const firstDateOfMonth = date => {
  date = createDate(date)
  date.setDate(1)
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
  if (date.getMonth() === month) {
    date.setDate(0)
  }
  return date
}
