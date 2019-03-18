import get from './get'

describe('get', () => {
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

  it('handles when field name has dot', async () => {
    // https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
    const obj1 = {
      'a.b': 'foo',
      a: { b: 'fiz' },
      c: 'bar',
      d: { e: 'baz' },
      f: { 'g.h': 'faz' },
      'i.j.k': 'fuz'
    }
    const obj2 = {
      a: { b: 'fiz' },
      c: 'bar',
      d: { e: 'baz' }
    }

    expect(get(obj1, 'a.b')).toBe('foo')
    expect(get(obj1, 'c')).toBe('bar')
    expect(get(obj1, 'd.e')).toBe('baz')
    expect(get(obj1, 'f.g.h', 'zzz')).toBe('zzz')
    expect(get(obj1, 'f.g.h')).toBe(null)
    expect(get(obj1, 'f.g', 'zzz')).toBe('zzz')
    expect(get(obj1, 'f.g')).toBe(null)
    expect(get(obj1, 'i.j.k')).toBe('fuz')
    expect(get(obj1, 'i.j', 'zzz')).toBe('zzz')
    expect(get(obj1, 'i.j')).toBe(null)

    expect(get({ a: 'b' }, '...', true)).toBe(true)
    expect(get({ a: 'b' }, '...')).toBe(null)

    expect(get(obj2, 'a.b')).toBe('fiz')
    expect(get(obj2, 'c')).toBe('bar')
    expect(get(obj2, 'd.e')).toBe('baz')
  })

  it('handles when field value is not array or object', async () => {
    // https://github.com/bootstrap-vue/bootstrap-vue/issues/2807
    const obj1 = {
      a: { b: 'c' },
      b: [{ c: 'd' }],
      c: { d: { e: 'f' } },
      d: [{ e: [{ f: 'g' }] }]
    }
    const obj2 = {
      a: null,
      b: undefined,
      c: 0,
      d: [null]
    }

    expect(get(obj1, 'a.b')).toBe('c')
    expect(get(obj2, 'a.b')).toBe(null)
    expect(get(obj1, 'b[0].c')).toBe('d')
    expect(get(obj2, 'b[0].c')).toBe(null)
    expect(get(obj1, 'c.d.e')).toBe('f')
    expect(get(obj2, 'c.d.e')).toBe(null)
    expect(get(obj1, 'd[0].e[0].f')).toBe('g')
    expect(get(obj2, 'd[0].e[0].f')).toBe(null)
  })
})
