import { stringifyObjectValues } from './stringify-object-values'

describe('stringifyObjectValues()', () => {
  it('handles `null` and `undefined`', async () => {
    expect(stringifyObjectValues(null)).toBe('')
    expect(stringifyObjectValues(undefined)).toBe('')
    expect(stringifyObjectValues()).toBe('')
  })

  it('returns strings as-is', async () => {
    expect(stringifyObjectValues('foo')).toBe('foo')
    expect(stringifyObjectValues('123')).toBe('123')
    expect(stringifyObjectValues('  bar  ')).toBe('  bar  ')
  })

  it('converts numbers to string', async () => {
    expect(stringifyObjectValues(0)).toBe('0')
    expect(stringifyObjectValues(1)).toBe('1')
    expect(stringifyObjectValues(-1)).toBe('-1')
  })

  it('converts dates to native string format', async () => {
    const date1 = new Date(2020, 1, 1)
    const date2 = new Date(2030, 1, 1)
    const date3 = new Date(1970, 1, 1)

    expect(stringifyObjectValues(date1)).toBe(date1.toString())
    expect(stringifyObjectValues(date2)).toBe(date2.toString())
    expect(stringifyObjectValues(date3)).toBe(date3.toString())
  })

  it('converts array values to a string', async () => {
    expect(stringifyObjectValues([])).toBe('')
    expect(stringifyObjectValues([1, 'foo'])).toBe('1 foo')
    expect(stringifyObjectValues([undefined, null])).toBe('')
  })

  it('converts object values to a string', async () => {
    expect(stringifyObjectValues({})).toBe('')
    expect(stringifyObjectValues({ a: 1, b: 'foo' })).toBe('1 foo')
    expect(stringifyObjectValues({ a: null, b: undefined })).toBe('')
    expect(stringifyObjectValues({ a: [undefined, null, { b: 1 }] })).toBe('1')
    expect(
      stringifyObjectValues({ b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' })
    ).toBe('one 3 2 zzz 10 12 11')
  })
})
