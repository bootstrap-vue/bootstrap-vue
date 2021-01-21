import { normalizeFields } from './normalize-fields'

describe('table/helpers/normalize-fields', () => {
  it('uses first row of items when fields are not defined and items passed', async () => {
    const fields = normalizeFields(null, [
      { foo: 1, bar: { a: 2 }, 'foo bar': 3, baz_bar: 4 },
      { foo: 1, bar: { a: 2 }, 'foo bar': 3, baz: 5 }
    ])
    expect(fields).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar' },
      { key: 'foo bar', label: 'Foo Bar' },
      { key: 'baz_bar', label: 'Baz Bar' }
    ])
  })

  it('ignores special fields in items when fields are not defined and items passed', async () => {
    const fields = normalizeFields(null, [
      {
        foo: 1,
        bar: 2,
        _showDetails: true,
        _rowVariant: 'primary',
        _cellVariants: ['primary', 'secondary', 'info'],
        baz: 3
      }
    ])
    expect(fields).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar' },
      { key: 'baz', label: 'Baz' }
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

  it('handles mixed array format', async () => {
    const arr1 = ['foo', { bar: { label: 'Bar Label' } }, { baz: 'Baz Label' }]

    expect(normalizeFields(arr1, [])).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar Label' },
      { key: 'baz', label: 'Baz Label' }
    ])
  })

  it('handles formatter shortcut', async () => {
    const formatter = value => value
    const arr1 = [{ foo: formatter }]

    expect(normalizeFields(arr1, [])).toEqual([{ key: 'foo', label: 'Foo', formatter }])
  })

  it('handles when "key: false" shortcut', async () => {
    const arr1 = [{ foo: false }, { bar: 'BAR' }]

    // Should filter out when key uses false shortcut
    expect(normalizeFields(arr1, [])).toEqual([{ key: 'bar', label: 'BAR' }])
  })

  it('removes duplicate fields (preserving the first found)', async () => {
    const arr1 = ['foo', 'bar', 'foo', 'foo_bar']
    const arr2 = [{ key: 'foo', label: 'Fiz' }, 'bar', 'foo', 'foo_bar']

    expect(normalizeFields(arr1, [])).toEqual([
      { key: 'foo', label: 'Foo' },
      { key: 'bar', label: 'Bar' },
      { key: 'foo_bar', label: 'Foo Bar' }
    ])

    expect(normalizeFields(arr2, [])).toEqual([
      { key: 'foo', label: 'Fiz' },
      { key: 'bar', label: 'Bar' },
      { key: 'foo_bar', label: 'Foo Bar' }
    ])
  })
})
