import { buildObject, omit, pick } from './object'

describe('utils/object', () => {
  it('pick() works', async () => {
    const obj = { a: 1, b: 2, c: 3, d: null, e: undefined, f: [] }
    const pickFn = value => value === null

    expect(pick(obj, ['a', 'b', 'c'])).toEqual({ a: 1, b: 2, c: 3 })
    expect(pick(obj, Object.keys(obj))).toEqual(obj)
    expect(pick(obj, [])).toEqual({})
    expect(pick(obj, pickFn)).toEqual({ d: null })
  })

  it('omit() works', async () => {
    const obj = { a: 1, b: 2, c: 3, d: null, e: undefined, f: [] }
    const omitFn = value => value === null

    expect(omit(obj, ['a', 'b', 'c'])).toEqual({ d: null, e: undefined, f: [] })
    expect(omit(obj, Object.keys(obj))).toEqual({})
    expect(omit(obj, [])).toEqual(obj)
    expect(omit(obj, omitFn)).toEqual({ a: 1, b: 2, c: 3, e: undefined, f: [] })
  })

  it('buildObject() works', async () => {
    const omitFn = value => value === null

    expect(buildObject([])).toEqual({})
    expect(buildObject([['a', 'b']])).toEqual({ a: 'b' })
    expect(buildObject([['a', 'b'], ['a', 'c']])).toEqual({ a: 'c' })
    expect(buildObject([['a', 'b'], { c: 'd', e: 'f' }])).toEqual({ a: 'b', c: 'd', e: 'f' })
    expect(buildObject([['a', 'b']], true)).toEqual({})
    expect(buildObject([['a', 'b']], false)).toEqual({ a: 'b' })
    expect(buildObject([['a', 'b']], 'foo')).toEqual({})
    expect(buildObject([['a', 'b'], ['c', null], ['d', undefined]])).toEqual({ a: 'b' })
    expect(buildObject([['a', 'b'], ['c', null], ['d', undefined]], false, omitFn)).toEqual({
      a: 'b',
      d: undefined
    })
    expect(buildObject([['a', 'b'], ['c', null, true], ['d', undefined]], false, omitFn)).toEqual({
      a: 'b',
      c: null,
      d: undefined
    })
  })
})
