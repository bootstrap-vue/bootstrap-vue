import normalizeFields from './normalize-fields'

describe('table/helpers/normalize-fields', () => {
  it('uses first row of items when fields are not defined and items passed', async () => {
    const fields = normalizeFields(null, [
     { foo: 1, bar: { a: 2 }, 'foo bar': 3, 'baz_bar': 4 },
     { foo: 1, bar: { a: 2 }, 'foo bar': 3, baz: 5 },
    ])
    expect(fields).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar' },
      { key: 'foo bar', label: 'Foo Bar' },
      { key: 'baz_bar', label: 'Baz Bar' }
    ])
  })

  it('returns and empty array when no fields or items passed', async () => {
    expect(normalizeFields(undefined, undefined)).toEqual([])
    expect(normalizeFields(null, null)).toEqual([])
    expect(normalizeFields([], undefined)).toEqual([])
    expect(normalizeFields(undefined, [])).toEqual([])
    expect(normalizeFields([], [])).toEqual([])
    expect(normalizeFields({}, [])).toEqual([])
  })

  it('handles simple array as fields', async () => {
    const arr1 = ['foo', 'bar', 'foo_bar']
    expect(normalizeFields(arr1, [])).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar' },
      { key: 'foo_bar', label: 'Foo Bar' }
    ])
  })
})
