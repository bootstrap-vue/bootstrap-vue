import get from './get'

describe('get', async () => {
  it('handles invalid values gracefully', async () => {
    expect(get(null, '')).toBe(null)
    expect(get({}, null)).toBe(null)
    expect(get({}, '')).toBe(null)
    expect(get({}, 'a')).toBe(null)
    expect(get({}, [])).toBe(null)
    expect(get({ a: 'b' }, 'b')).toBe(null)
    expect(get({ a: { c: 'd' } }, 'a.d')).toBe(null)
  })

  it('returns expected default value', async () => {
    expect(get(null, '')).toBe(null)
    expect(get({}, null, undefined)).toBe(null)
    expect(get({}, '', true)).toBe(true)
    expect(get({}, 'a', '')).toBe('')
    expect(get({}, [], 0)).toBe(0)
    expect(get({ a: 'b' }, 'b', {})).toEqual({})
    expect(get({ a: { c: 'd' } }, 'a.d', [])).toEqual([])
  })

  it('returns expected value', async () => {
    const obj1 = { a: 'b' }
    const obj2 = { a: { b: { c: { d: 'e' } } } }
    const obj3 = { a: [{ b: 'c' }] }
    const obj4 = { a: [[{ b: 'c' }], [{ d: { e: ['f'] } }]] }

    expect(get(obj1, 'a')).toBe('b')
    expect(get(obj1, ['a'])).toBe('b')
    expect(get(obj2, 'a.b.c.d')).toBe('e')
    expect(get(obj2, ['a', 'b', 'c', 'd'])).toBe('e')
    expect(get(obj3, 'a[0].b')).toBe('c')
    expect(get(obj3, ['a', 0, 'b'])).toBe('c')
    expect(get(obj4, 'a[1][0].d.e[0]')).toBe('f')
    expect(get(obj4, ['a', 1, 0, 'd', 'e', 0])).toBe('f')
    expect(get(obj4, ['a[1]', 0, 'd', 'e[0]'])).toBe('f')
  })
})
