import sanitizeRow from './sanitize-row'

describe('table/helpers/sanitize-row', () => {
  it('it works', async () => {
    const row = { a: 1, b: { c: 2 }, d: '3' }
    const fieldsObj1 = {
      a: { key: 'a' },
      b: { key: 'b', formatter: (val, key, row) => String(val.c), filterByFormatted: true },
      d: { key: 'd' }
    }
    const fieldsObj2 = {
      a: { key: 'a' },
      b: { key: 'b', filterByFormatted: (val, key, row) => String(val.c) + 'z' },
      d: { key: 'd', filterByFormatted: (val, key, row) => parseInt(val) }
    }

    expect(sanitizeRow(row, [], [])).toEqual({ a: 1, b: { c: 2 }, d: '3' })
    expect(sanitizeRow(row)).toEqual({ a: 1, b: { c: 2 }, d: '3' })
    expect(sanitizeRow(row, ['a'], [])).toEqual({ b: { c: 2 }, d: '3' })
    expect(sanitizeRow(row, ['a'])).toEqual({ b: { c: 2 }, d: '3' })
    expect(sanitizeRow(row, ['a', 'd'], [])).toEqual({ b: { c: 2 } })
    expect(sanitizeRow(row, [], ['a'])).toEqual({ a: 1 })
    expect(sanitizeRow(row, [], ['a', 'd'])).toEqual({ a: 1, d: '3' })
    expect(sanitizeRow(row, ['a'], ['a', 'd'])).toEqual({ d: '3' })
    expect(sanitizeRow(row, [], [], fieldsObj1)).toEqual({ a: 1, b: '2', d: '3' })
    expect(sanitizeRow(row, [], [], fieldsObj2)).toEqual({ a: 1, b: '2z', d: 3 })
    expect(sanitizeRow(row, ['a'], [], fieldsObj1)).toEqual({ b: '2', d: '3' })
    expect(sanitizeRow(row, ['a'], [], fieldsObj2)).toEqual({ b: '2z', d: 3 })
    expect(sanitizeRow(row, ['b'], [], fieldsObj1)).toEqual({ a: 1, d: '3' })
    expect(sanitizeRow(row, ['b'], [], fieldsObj2)).toEqual({ a: 1, d: 3 })
    expect(sanitizeRow(row, ['z'], [])).toEqual({ a: 1, b: { c: 2 }, d: '3' })
    expect(sanitizeRow(row, ['z'], [], fieldsObj1)).toEqual({ a: 1, b: '2', d: '3' })
    expect(sanitizeRow(row, ['z'], [], fieldsObj2)).toEqual({ a: 1, b: '2x', d: 3 })
   expect(sanitizeRow(row, [], ['z'])).toEqual({})

    // Sanity check to make sure original row object has not been mutated
    expect(row).toEqual({ a: 1, b: { c: 2 }, d: '3' })
  })
})
