import defaultSortCompare from './default-sort-compare'

describe('table/helpers/default-sort-compare', () => {
  it('sorts numbers correctly', async () => {
    expect(defaultSortCompare({ a: 1 }, { a: 2 }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 2 }, { a: 1 }, 'a')).toBe(1)
    expect(defaultSortCompare({ a: 1 }, { a: 1 }, 'a')).toBe(0)
    expect(defaultSortCompare({ a: -1 }, { a: 1 }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 1 }, { a: -1 }, 'a')).toBe(1)
    expect(defaultSortCompare({ a: 0 }, { a: 0 }, 'a')).toBe(0)
    expect(defaultSortCompare({ a: 1.234 }, { a: 1.567 }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 1.561 }, { a: 1.234 }, 'a')).toBe(1)
  })

  it('sorts dates correctly', async () => {
    const date1 = { a: new Date(2020, 1, 1) }
    const date2 = { a: new Date(1999, 11, 31) }
    const date3 = { a: new Date(1999, 1, 1) }
    const date4 = { a: new Date(1999, 1, 1, 12, 12, 12, 12) }

    expect(defaultSortCompare(date1, date2, 'a')).toBe(1)
    expect(defaultSortCompare(date1, date1, 'a')).toBe(0)
    expect(defaultSortCompare(date2, date1, 'a')).toBe(-1)
    expect(defaultSortCompare(date2, date3, 'a')).toBe(1)
    expect(defaultSortCompare(date3, date2, 'a')).toBe(-1)
    expect(defaultSortCompare(date3, date4, 'a')).toBe(-1)
    expect(defaultSortCompare(date4, date3, 'a')).toBe(1)
    expect(defaultSortCompare(date4, date4, 'a')).toBe(0)
  })

  it('sorts strings correctly', async () => {
    // Note: string comparisons are locale based
    expect(defaultSortCompare({ a: 'a' }, { a: 'b' }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 'b' }, { a: 'a' }, 'a')).toBe(1)
    expect(defaultSortCompare({ a: 'a' }, { a: 'a' }, 'a')).toBe(0)
    expect(defaultSortCompare({ a: 'a' }, { a: 'aaa' }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 'aaa' }, { a: 'a' }, 'a')).toBe(1)
  })

  it('sorts by nested key correctly', async () => {
    // Note: string comparisons are locale based
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'b' } }, 'a.b')).toBe(-1)
    expect(defaultSortCompare({ a: { b: 'b' } }, { a: { b: 'a' } }, 'a.b')).toBe(1)
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'a' } }, 'a.b')).toBe(0)
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'aaa' } }, 'a.b')).toBe(-1)
  })

  it('sorts using provided formatter correctly', async () => {
    const formatter = val => {
      // Reverse the string
      return val
        .split('')
        .reverse()
        .join('')
    }
    expect(defaultSortCompare({ a: 'ab' }, { a: 'b' }, 'a')).toBe(-1)
    expect(defaultSortCompare({ a: 'ab' }, { a: 'b' }, 'a', false, formatter)).toBe(1)
  })

  it('sorts nulls always last when sor-null-lasst is set', async () => {
    const x = { a: 'ab' }
    const y = { a: null }
    const z = {}
    const w = { a: '' }
    const u = undefined

    // Without nullLast set (false)
    expect(defaultSortCompare(x, y, 'a', u, u, { numeric: true }, u, false)).toBe(1)
    expect(defaultSortCompare(y, x, 'a', u, u, { numeric: true }, u, false)).toBe(-1)
    expect(defaultSortCompare(x, z, 'a', u, u, { numeric: true }, u, false)).toBe(1)
    expect(defaultSortCompare(z, x, 'a', u, u, { numeric: true }, u, false)).toBe(-1)
    expect(defaultSortCompare(y, z, 'a', u, u, { numeric: true }, u, false)).toBe(0)
    expect(defaultSortCompare(z, y, 'a', u, u, { numeric: true }, u, false)).toBe(0)
    expect(defaultSortCompare(x, w, 'a', u, u, { numeric: true }, u, false)).toBe(1)
    expect(defaultSortCompare(w, x, 'a', u, u, { numeric: true }, u, false)).toBe(-1)
    // With nullLast set
    expect(defaultSortCompare(x, y, 'a', u, u, { numeric: true }, u, true)).toBe(-1)
    expect(defaultSortCompare(y, x, 'a', u, u, { numeric: true }, u, true)).toBe(1)
    expect(defaultSortCompare(x, z, 'a', u, u, { numeric: true }, u, true)).toBe(-1)
    expect(defaultSortCompare(z, x, 'a', u, u, { numeric: true }, u, true)).toBe(1)
    expect(defaultSortCompare(y, z, 'a', u, u, { numeric: true }, u, true)).toBe(0)
    expect(defaultSortCompare(z, y, 'a', u, u, { numeric: true }, u, true)).toBe(0)
    expect(defaultSortCompare(x, w, 'a', u, u, { numeric: true }, u, true)).toBe(-1)
    expect(defaultSortCompare(w, x, 'a', u, u, { numeric: true }, u, true)).toBe(1)
  })
})
