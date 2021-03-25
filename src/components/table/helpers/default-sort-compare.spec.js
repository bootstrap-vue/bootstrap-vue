import { defaultSortCompare } from './default-sort-compare'

describe('table/helpers/default-sort-compare', () => {
  it('sorts numbers correctly', async () => {
    const options = { sortBy: 'a' }
    expect(defaultSortCompare({ a: 1 }, { a: 2 }, options)).toBe(-1)
    expect(defaultSortCompare({ a: 2 }, { a: 1 }, options)).toBe(1)
    expect(defaultSortCompare({ a: 1 }, { a: 1 }, options)).toBe(0)
    expect(defaultSortCompare({ a: -1 }, { a: 1 }, options)).toBe(-1)
    expect(defaultSortCompare({ a: 1 }, { a: -1 }, options)).toBe(1)
    expect(defaultSortCompare({ a: 0 }, { a: 0 }, options)).toBe(0)
    expect(defaultSortCompare({ a: 1.234 }, { a: 1.567 }, options)).toBe(-1)
    expect(defaultSortCompare({ a: 1.561 }, { a: 1.234 }, options)).toBe(1)
  })

  it('sorts dates correctly', async () => {
    const date1 = { a: new Date(2020, 1, 1) }
    const date2 = { a: new Date(1999, 11, 31) }
    const date3 = { a: new Date(1999, 1, 1) }
    const date4 = { a: new Date(1999, 1, 1, 12, 12, 12, 12) }
    const options = { sortBy: 'a' }

    expect(defaultSortCompare(date1, date2, options)).toBe(1)
    expect(defaultSortCompare(date1, date1, options)).toBe(0)
    expect(defaultSortCompare(date2, date1, options)).toBe(-1)
    expect(defaultSortCompare(date2, date3, options)).toBe(1)
    expect(defaultSortCompare(date3, date2, options)).toBe(-1)
    expect(defaultSortCompare(date3, date4, options)).toBe(-1)
    expect(defaultSortCompare(date4, date3, options)).toBe(1)
    expect(defaultSortCompare(date4, date4, options)).toBe(0)
  })

  it('sorts date strings correctly', async () => {
    const date1 = { a: new Date(2020, 1, 1).toISOString() }
    const date2 = { a: new Date(1999, 11, 31).toISOString() }
    const date3 = { a: new Date(1999, 1, 1).toISOString() }
    const date4 = { a: new Date(1999, 1, 1, 12, 12, 12, 12).toISOString() }
    const options = { sortBy: 'a' }

    expect(defaultSortCompare(date1, date2, options)).toBe(1)
    expect(defaultSortCompare(date1, date1, options)).toBe(0)
    expect(defaultSortCompare(date2, date1, options)).toBe(-1)
    expect(defaultSortCompare(date2, date3, options)).toBe(1)
    expect(defaultSortCompare(date3, date2, options)).toBe(-1)
    expect(defaultSortCompare(date3, date4, options)).toBe(-1)
    expect(defaultSortCompare(date4, date3, options)).toBe(1)
    expect(defaultSortCompare(date4, date4, options)).toBe(0)
  })

  it('sorts strings correctly', async () => {
    const options = { sortBy: 'a' }

    // Note: string comparisons are locale based
    expect(defaultSortCompare({ a: 'a' }, { a: 'b' }, options)).toBe(-1)
    expect(defaultSortCompare({ a: 'b' }, { a: 'a' }, options)).toBe(1)
    expect(defaultSortCompare({ a: 'a' }, { a: 'a' }, options)).toBe(0)
    expect(defaultSortCompare({ a: 'a' }, { a: 'aaa' }, options)).toBe(-1)
    expect(defaultSortCompare({ a: 'aaa' }, { a: 'a' }, options)).toBe(1)
  })

  it('sorts by nested key correctly', async () => {
    const options = { sortBy: 'a.b' }

    // Note: string comparisons are locale based
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'b' } }, options)).toBe(-1)
    expect(defaultSortCompare({ a: { b: 'b' } }, { a: { b: 'a' } }, options)).toBe(1)
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'a' } }, options)).toBe(0)
    expect(defaultSortCompare({ a: { b: 'a' } }, { a: { b: 'aaa' } }, options)).toBe(-1)
  })

  it('sorts using provided formatter correctly', async () => {
    const formatter = value => {
      // Reverse the string
      return value
        .split('')
        .reverse()
        .join('')
    }

    expect(defaultSortCompare({ a: 'ab' }, { a: 'b' }, { sortBy: 'a' })).toBe(-1)
    expect(defaultSortCompare({ a: 'ab' }, { a: 'b' }, { sortBy: 'a', formatter })).toBe(1)
  })

  it('sorts nulls always last when sor-null-lasst is set', async () => {
    const x = { a: 'ab' }
    const y = { a: null }
    const z = {}
    const w = { a: '' }
    const options = { sortBy: 'a', localeOptions: { numeric: true } }
    const optionsNullLast = { ...options, nullLast: true }

    // Without nullLast set (false)
    expect(defaultSortCompare(x, y, options)).toBe(1)
    expect(defaultSortCompare(y, x, options)).toBe(-1)
    expect(defaultSortCompare(x, z, options)).toBe(1)
    expect(defaultSortCompare(z, x, options)).toBe(-1)
    expect(defaultSortCompare(y, z, options)).toBe(0)
    expect(defaultSortCompare(z, y, options)).toBe(0)
    expect(defaultSortCompare(x, w, options)).toBe(1)
    expect(defaultSortCompare(w, x, options)).toBe(-1)

    // With nullLast set
    expect(defaultSortCompare(x, y, optionsNullLast)).toBe(-1)
    expect(defaultSortCompare(y, x, optionsNullLast)).toBe(1)
    expect(defaultSortCompare(x, z, optionsNullLast)).toBe(-1)
    expect(defaultSortCompare(z, x, optionsNullLast)).toBe(1)
    expect(defaultSortCompare(y, z, optionsNullLast)).toBe(0)
    expect(defaultSortCompare(z, y, optionsNullLast)).toBe(0)
    expect(defaultSortCompare(x, w, optionsNullLast)).toBe(-1)
    expect(defaultSortCompare(w, x, optionsNullLast)).toBe(1)
  })
})
