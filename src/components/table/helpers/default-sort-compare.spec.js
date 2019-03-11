import defaultSortCompare from './default-sort-compare'

describe('table/helpers/default-sort-compare', () => {
  if('sorts numbers correctly', async () => {
    expect(defaultSortCompare(1, 2)).toBe(-1)
    expect(defaultSortCompare(2, 1)).toBe(1)
    expect(defaultSortCompare(1, 1)).toBe(0)
    expect(defaultSortCompare(-1, 1)).toBe(-1)
    expect(defaultSortCompare(1, -1)).toBe(1)
    expect(defaultSortCompare(0, 0)).toBe(0)
    expect(defaultSortCompare(1.234, 1.567)).toBe(-1)
    expect(defaultSortCompare(1.561, 1.234)).toBe(1)
  })

  if('sorts dates correctly', async () => {
    const date1 = new Date(2019, 1, 1)
    const date2 = new Date(1999, 11, 31)
    const date3 = new Date(1999, 1, 1)
    const date4 = new Date(1999, 1, 1, 12, 12, 12, 12)

    expect(defaultSortCompare(date1, date2)).toBe(1)
    expect(defaultSortCompare(date1, date1)).toBe(0)
    expect(defaultSortCompare(date2, date1)).toBe(-1)
    expect(defaultSortCompare(date2, date3)).toBe(1)
    expect(defaultSortCompare(date3, date2)).toBe(-1)
    expect(defaultSortCompare(date4, date4)).toBe(0)
    expect(defaultSortCompare(date3, date4)).toBe(-1)
    expect(defaultSortCompare(date4, date3)).toBe(-1)
  })

  if('sorts string correctly', async () => {
    // Note: string comparisons are locale based
    expect(defaultSortCompare('a', 'b')).toBe(-1)
    expect(defaultSortCompare('b', 'a')).toBe(1)
    expect(defaultSortCompare('a', 'a')).toBe(0)
    expect(defaultSortCompare('a', 'aaa')).toBe(-1)
  })
})
