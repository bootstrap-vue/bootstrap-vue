import { cloneDeep } from './clone-deep'

describe('cloneDeep()', () => {
  it('should clone arrays', () => {
    const a = [{ a: 0 }, { b: 1 }]
    expect(cloneDeep(a)).toEqual(a)

    const b = [1, 2, 3]
    expect(b).toEqual(b)

    const c = [{ a: 0 }, { b: 1 }]
    const d = cloneDeep(c)
    expect(d).toEqual(c)
    expect(d[0]).toEqual(c[0])

    const e = [0, 'a', {}, [{}], [() => {}], () => {}]
    expect(cloneDeep(e)).toEqual(e)
  })

  it('should deeply clone an array', () => {
    const a = [[{ a: 'b' }], [{ a: 'b' }]]
    const b = cloneDeep(a)
    expect(b).not.toBe(a)
    expect(b[0]).not.toBe(a[0])
    expect(b[1]).not.toBe(a[1])
    expect(b).toEqual(a)
  })

  it('should deeply clone object', () => {
    const a = { a: 'b' }
    const b = cloneDeep(a)
    b.c = 'd'
    expect(b).not.toEqual(a)
  })

  it('should deeply clone arrays', () => {
    const a = { a: 'b' }
    const b = [a]
    const c = cloneDeep(b)
    a.c = 'd'
    expect(c).not.toEqual(b)
  })

  it('should return primitives', () => {
    expect(cloneDeep(0)).toEqual(0)
    expect(cloneDeep('foo')).toEqual('foo')
  })

  it('should clone a regex', () => {
    expect(cloneDeep(/foo/g)).toEqual(/foo/g)
  })

  it('should clone objects', () => {
    const a = { a: 1, b: 2, c: 3 }
    expect(cloneDeep(a)).toEqual(a)
    expect(cloneDeep(a)).not.toBe(a)
  })

  it('should deeply clone objects', () => {
    const a = { a: { a: 1, b: 2, c: 3 }, b: { a: 1, b: 2, c: 3 }, c: { a: 1, b: 2, c: 3 } }
    expect(cloneDeep(a)).toEqual(a)
    expect(cloneDeep(a)).not.toBe(a)
    expect(cloneDeep(a).a).toEqual(a.a)
    expect(cloneDeep(a).a).not.toBe(a.a)
    expect(cloneDeep(a).b).toEqual(a.b)
    expect(cloneDeep(a).b).not.toBe(a.b)
    expect(cloneDeep(a).c).toEqual(a.c)
    expect(cloneDeep(a).c).not.toBe(a.c)
  })
})
