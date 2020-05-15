import {
  isArray,
  isBoolean,
  isDate,
  isEmptyString,
  isEvent,
  isFunction,
  isNull,
  isNumber,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRegExp,
  isString,
  isUndefined,
  isUndefinedOrNull,
  isUndefinedOrNullOrEmpty,
  toRawType,
  toRawTypeLC,
  toType
} from './inspect'

describe('utils/inspect', () => {
  it('toType() works', async () => {
    expect(toType(123)).toEqual('number')
    expect(toType('123')).toEqual('string')
    expect(toType(true)).toEqual('boolean')
    expect(toType({})).toEqual('object')
    expect(toType([])).toEqual('object')
    expect(toType(/abc/)).toEqual('object')
    expect(toType(() => {})).toEqual('function')
    expect(toType(Date)).toEqual('function')
    expect(toType(new Date())).toEqual('object')
    expect(toType(undefined)).toEqual('undefined')
    expect(toType(null)).toEqual('object')
  })

  it('toRawType() works', async () => {
    expect(toRawType(123)).toEqual('Number')
    expect(toRawType('123')).toEqual('String')
    expect(toRawType(true)).toEqual('Boolean')
    expect(toRawType({})).toEqual('Object')
    expect(toRawType([])).toEqual('Array')
    expect(toRawType(/abc/)).toEqual('RegExp')
    expect(toRawType(() => {})).toEqual('Function')
    expect(toRawType(Date)).toEqual('Function')
    expect(toRawType(new Date())).toEqual('Date')
    expect(toRawType(undefined)).toEqual('Undefined')
    expect(toRawType(null)).toEqual('Null')
  })

  it('toRawTypeLC() works', async () => {
    expect(toRawTypeLC(123)).toEqual('number')
    expect(toRawTypeLC('123')).toEqual('string')
    expect(toRawTypeLC(true)).toEqual('boolean')
    expect(toRawTypeLC({})).toEqual('object')
    expect(toRawTypeLC([])).toEqual('array')
    expect(toRawTypeLC(/abc/)).toEqual('regexp')
    expect(toRawTypeLC(() => {})).toEqual('function')
    expect(toRawTypeLC(Date)).toEqual('function')
    expect(toRawTypeLC(new Date())).toEqual('date')
    expect(toRawTypeLC(undefined)).toEqual('undefined')
    expect(toRawTypeLC(null)).toEqual('null')
  })

  it('isUndefined() works', async () => {
    expect(isUndefined(123)).toEqual(false)
    expect(isUndefined('123')).toEqual(false)
    expect(isUndefined(true)).toEqual(false)
    expect(isUndefined({})).toEqual(false)
    expect(isUndefined([])).toEqual(false)
    expect(isUndefined(/abc/)).toEqual(false)
    expect(isUndefined(() => {})).toEqual(false)
    expect(isUndefined(Date)).toEqual(false)
    expect(isUndefined(new Date())).toEqual(false)
    expect(isUndefined(undefined)).toEqual(true)
    expect(isUndefined(null)).toEqual(false)
  })

  it('isNull() works', async () => {
    expect(isNull(123)).toEqual(false)
    expect(isNull('123')).toEqual(false)
    expect(isNull(true)).toEqual(false)
    expect(isNull({})).toEqual(false)
    expect(isNull([])).toEqual(false)
    expect(isNull(/abc/)).toEqual(false)
    expect(isNull(() => {})).toEqual(false)
    expect(isNull(Date)).toEqual(false)
    expect(isNull(new Date())).toEqual(false)
    expect(isNull(undefined)).toEqual(false)
    expect(isNull(null)).toEqual(true)
  })

  it('isEmptyString() works', async () => {
    expect(isEmptyString(123)).toEqual(false)
    expect(isEmptyString('123')).toEqual(false)
    expect(isEmptyString('')).toEqual(true)
    expect(isEmptyString(' ')).toEqual(false)
    expect(isEmptyString(true)).toEqual(false)
    expect(isEmptyString({})).toEqual(false)
    expect(isEmptyString([])).toEqual(false)
    expect(isEmptyString(/abc/)).toEqual(false)
    expect(isEmptyString(() => {})).toEqual(false)
    expect(isEmptyString(Date)).toEqual(false)
    expect(isEmptyString(new Date())).toEqual(false)
    expect(isEmptyString(undefined)).toEqual(false)
    expect(isEmptyString(null)).toEqual(false)
  })

  it('isUndefinedOrNull() works', async () => {
    expect(isUndefinedOrNull(123)).toEqual(false)
    expect(isUndefinedOrNull('123')).toEqual(false)
    expect(isUndefinedOrNull(true)).toEqual(false)
    expect(isUndefinedOrNull({})).toEqual(false)
    expect(isUndefinedOrNull([])).toEqual(false)
    expect(isUndefinedOrNull(/abc/)).toEqual(false)
    expect(isUndefinedOrNull(() => {})).toEqual(false)
    expect(isUndefinedOrNull(Date)).toEqual(false)
    expect(isUndefinedOrNull(new Date())).toEqual(false)
    expect(isUndefinedOrNull(undefined)).toEqual(true)
    expect(isUndefinedOrNull(null)).toEqual(true)
  })

  it('isUndefinedOrNullOrEmpty() works', async () => {
    expect(isUndefinedOrNullOrEmpty(123)).toEqual(false)
    expect(isUndefinedOrNullOrEmpty('123')).toEqual(false)
    expect(isEmptyString('')).toEqual(true)
    expect(isEmptyString(' ')).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(true)).toEqual(false)
    expect(isUndefinedOrNullOrEmpty({})).toEqual(false)
    expect(isUndefinedOrNullOrEmpty([])).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(/abc/)).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(() => {})).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(Date)).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(new Date())).toEqual(false)
    expect(isUndefinedOrNullOrEmpty(undefined)).toEqual(true)
    expect(isUndefinedOrNullOrEmpty(null)).toEqual(true)
  })

  it('isFunction() works', async () => {
    expect(isFunction(123)).toEqual(false)
    expect(isFunction('123')).toEqual(false)
    expect(isFunction(true)).toEqual(false)
    expect(isFunction({})).toEqual(false)
    expect(isFunction([])).toEqual(false)
    expect(isFunction(/abc/)).toEqual(false)
    expect(isFunction(() => {})).toEqual(true)
    expect(isFunction(Date)).toEqual(true)
    expect(isFunction(new Date())).toEqual(false)
    expect(isFunction(undefined)).toEqual(false)
    expect(isFunction(null)).toEqual(false)
  })

  it('isBoolean() works', async () => {
    expect(isBoolean(123)).toEqual(false)
    expect(isBoolean('123')).toEqual(false)
    expect(isBoolean(true)).toEqual(true)
    expect(isBoolean({})).toEqual(false)
    expect(isBoolean([])).toEqual(false)
    expect(isBoolean(/abc/)).toEqual(false)
    expect(isBoolean(() => {})).toEqual(false)
    expect(isBoolean(Date)).toEqual(false)
    expect(isBoolean(new Date())).toEqual(false)
    expect(isBoolean(undefined)).toEqual(false)
    expect(isBoolean(null)).toEqual(false)
  })

  it('isString() works', async () => {
    expect(isString(123)).toEqual(false)
    expect(isString('123')).toEqual(true)
    expect(isString(true)).toEqual(false)
    expect(isString({})).toEqual(false)
    expect(isString([])).toEqual(false)
    expect(isString(/abc/)).toEqual(false)
    expect(isString(() => {})).toEqual(false)
    expect(isString(Date)).toEqual(false)
    expect(isString(new Date())).toEqual(false)
    expect(isString(undefined)).toEqual(false)
    expect(isString(null)).toEqual(false)
  })

  it('isNumber() works', async () => {
    expect(isNumber(123)).toEqual(true)
    expect(isNumber('123')).toEqual(false)
    expect(isNumber(true)).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber([])).toEqual(false)
    expect(isNumber(/abc/)).toEqual(false)
    expect(isNumber(() => {})).toEqual(false)
    expect(isNumber(Date)).toEqual(false)
    expect(isNumber(new Date())).toEqual(false)
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
  })

  it('isNumeric() works', async () => {
    expect(isNumeric(0)).toBe(true)
    expect(isNumeric('0')).toBe(true)
    expect(isNumeric(1)).toBe(true)
    expect(isNumeric('1')).toBe(true)
    expect(isNumeric(1e5)).toBe(true)
    expect(isNumeric('1e5')).toBe(true)
    expect(isNumeric('256 foobar')).toBe(true)
    expect(isNumeric('foo 256bar')).toBe(false)
    expect(isNumeric({})).toBe(false)
    expect(isNumeric([])).toBe(false)
    expect(isNumeric(new Date())).toBe(false)
    expect(isNumeric(null)).toBe(false)
    expect(isNumeric(undefined)).toBe(false)
  })

  it('isPrimitive() works', async () => {
    expect(isPrimitive(123)).toEqual(true)
    expect(isPrimitive('123')).toEqual(true)
    expect(isPrimitive(true)).toEqual(true)
    expect(isPrimitive({})).toEqual(false)
    expect(isPrimitive([])).toEqual(false)
    expect(isPrimitive(/abc/)).toEqual(false)
    expect(isPrimitive(() => {})).toEqual(false)
    expect(isPrimitive(Date)).toEqual(false)
    expect(isPrimitive(new Date())).toEqual(false)
    expect(isPrimitive(undefined)).toEqual(false)
    expect(isPrimitive(null)).toEqual(false)
  })

  it('isArray() works', async () => {
    expect(isArray(123)).toEqual(false)
    expect(isArray('123')).toEqual(false)
    expect(isArray(true)).toEqual(false)
    expect(isArray({})).toEqual(false)
    expect(isArray([])).toEqual(true)
    expect(isArray(/abc/)).toEqual(false)
    expect(isArray(() => {})).toEqual(false)
    expect(isArray(Date)).toEqual(false)
    expect(isArray(new Date())).toEqual(false)
    expect(isArray(undefined)).toEqual(false)
    expect(isArray(null)).toEqual(false)
  })

  it('isObject() works', async () => {
    expect(isObject(123)).toEqual(false)
    expect(isObject('123')).toEqual(false)
    expect(isObject(true)).toEqual(false)
    expect(isObject({})).toEqual(true)
    expect(isObject([])).toEqual(true)
    expect(isObject(/abc/)).toEqual(true)
    expect(isObject(() => {})).toEqual(false)
    expect(isObject(Date)).toEqual(false)
    expect(isObject(new Date())).toEqual(true)
    expect(isObject(undefined)).toEqual(false)
    expect(isObject(null)).toEqual(false)
  })

  it('isPlainObject() works', async () => {
    expect(isPlainObject(123)).toEqual(false)
    expect(isPlainObject('123')).toEqual(false)
    expect(isPlainObject(true)).toEqual(false)
    expect(isPlainObject({})).toEqual(true)
    expect(isPlainObject([])).toEqual(false)
    expect(isPlainObject(/abc/)).toEqual(false)
    expect(isPlainObject(() => {})).toEqual(false)
    expect(isPlainObject(Date)).toEqual(false)
    expect(isPlainObject(new Date())).toEqual(false)
    expect(isPlainObject(undefined)).toEqual(false)
    expect(isPlainObject(null)).toEqual(false)
  })

  it('isDate() works', async () => {
    expect(isDate(123)).toEqual(false)
    expect(isDate('123')).toEqual(false)
    expect(isDate(true)).toEqual(false)
    expect(isDate({})).toEqual(false)
    expect(isDate([])).toEqual(false)
    expect(isDate(/abc/)).toEqual(false)
    expect(isDate(() => {})).toEqual(false)
    expect(isDate(Date)).toEqual(false)
    expect(isDate(new Date())).toEqual(true)
    expect(isDate(undefined)).toEqual(false)
    expect(isDate(null)).toEqual(false)
  })

  it('isEvent() works', async () => {
    expect(isEvent(123)).toEqual(false)
    expect(isEvent('123')).toEqual(false)
    expect(isEvent(true)).toEqual(false)
    expect(isEvent({})).toEqual(false)
    expect(isEvent([])).toEqual(false)
    expect(isEvent(/abc/)).toEqual(false)
    expect(isEvent(() => {})).toEqual(false)
    expect(isEvent(Date)).toEqual(false)
    expect(isEvent(new Date())).toEqual(false)
    expect(isEvent(Event)).toEqual(false)
    expect(isEvent(new Event('click'))).toEqual(true)
    expect(isEvent(undefined)).toEqual(false)
    expect(isEvent(null)).toEqual(false)
  })

  it('isRegExp() works', async () => {
    expect(isRegExp(123)).toEqual(false)
    expect(isRegExp('123')).toEqual(false)
    expect(isRegExp(true)).toEqual(false)
    expect(isRegExp({})).toEqual(false)
    expect(isRegExp([])).toEqual(false)
    expect(isRegExp(/abc/)).toEqual(true)
    expect(isRegExp(() => {})).toEqual(false)
    expect(isRegExp(Date)).toEqual(false)
    expect(isRegExp(new Date())).toEqual(false)
    expect(isRegExp(undefined)).toEqual(false)
    expect(isRegExp(null)).toEqual(false)
  })

  it('isPromise() works', async () => {
    expect(isPromise(123)).toEqual(false)
    expect(isPromise('123')).toEqual(false)
    expect(isPromise(true)).toEqual(false)
    expect(isPromise({})).toEqual(false)
    expect(isPromise([])).toEqual(false)
    expect(isPromise(/abc/)).toEqual(false)
    expect(isPromise(() => {})).toEqual(false)
    expect(isPromise(Date)).toEqual(false)
    expect(isPromise(new Date())).toEqual(false)
    expect(isPromise(undefined)).toEqual(false)
    expect(isPromise(null)).toEqual(false)
    expect(isPromise({ then() {}, catch() {} })).toEqual(true)
  })
})
