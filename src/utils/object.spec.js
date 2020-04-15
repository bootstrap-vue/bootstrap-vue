import { pick, omit } from './object'

describe('utils/object', () => {
  it('pick() works', async () => {
    const obj = { a: 1, b: 2, c: 3, d: null, e: [] }

    expect(pick(obj, ['a', 'b', 'c'])).toEqual({ a: 1, b: 2, c: 3 })
    expect(pick(obj, Object.keys(obj))).toEqual(obj)
    expect(pick(obj, [])).toEqual({})
  })

  it('omit() works', async () => {
    const obj = { a: 1, b: 2, c: 3, d: null, e: [] }

    expect(omit(obj, ['a', 'b', 'c'])).toEqual({ d: null, e: [] })
    expect(omit(obj, Object.keys(obj))).toEqual({})
    expect(omit(obj, [])).toEqual(obj)
  })
})
