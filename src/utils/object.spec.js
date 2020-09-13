import { pick, omit, mergeDeep } from './object'

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

  it('mergeDeep() works', async () => {
    const A = {
      a: {
        loc: 'Earth',
        title: 'Hello World',
        type: 'Planet',
        deeper: {
          map: new Map([['a', 'AAA'], ['b', 'BBB']]),
          mapId: 15473
        }
      }
    }
    const B = {
      a: {
        type: 'Star',
        deeper: {
          mapId: 9999,
          alt_map: new Map([['x', 'XXXX'], ['y', 'YYYY']])
        }
      }
    }

    const C = mergeDeep(A, B)
    const D = mergeDeep({ a: 1 }, { b: { c: { d: { e: 12345 } } } })
    const E = mergeDeep({ b: { c: 'hallo' } }, { b: { c: { d: { e: 12345 } } } })
    const F = mergeDeep(
      { b: { c: { d: { e: 12345 } }, d: 'dag', f: 'one' } },
      { b: { c: 'hallo', e: 'ok', f: 'two' } }
    )

    expect(C.a.type).toEqual('Star')
    expect(C.a.deeper.alt_map.get('x')).toEqual('XXXX')
    expect(C.a.deeper.map.get('b')).toEqual('BBB')
    expect(D.a).toEqual(1)
    expect(D.b.c.d.e).toEqual(12345)
    expect(E.b.c.d.e).toEqual(12345)
    expect(F.b.c).toEqual('hallo')
    expect(F.b.d).toEqual('dag')
    expect(F.b.e).toEqual('ok')
    expect(F.b.f).toEqual('two')
  })
})
