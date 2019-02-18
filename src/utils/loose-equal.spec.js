import looseEqual from './loose-equal'

describe('looseEqual', async () => {
  it('compares booleans correctly', async () => {
    expect(looseEqual(true, true)).toBe(true)
    expect(looseEqual(false, false)).toBe(true)
    expect(looseEqual(true, false)).toBe(false)
    expect(looseEqual(true, true)).toBe(true)
    expect(looseEqual(true, 1)).toBe(false)
    expect(looseEqual(false, 0)).toBe(false)
  })

  it('compares strings correctly', async () => {
    const text = 'Lorem ipsum'
    const number = 1
    const bool = true

    expect(looseEqual(text, text)).toBe(true)
    expect(looseEqual(text, text.slice(0, -1))).toBe(false)
    expect(looseEqual(String(number), number)).toBe(false)
    expect(looseEqual(String(bool), bool)).toBe(false)
  })

  it('compares numbers correctly', async () => {
    const number = 100
    const decimal = 2.5
    const multiplier = 1.0000001

    expect(looseEqual(number, number)).toBe(true)
    expect(looseEqual(number, number - 1)).toBe(false)
    expect(looseEqual(decimal, decimal)).toBe(true)
    expect(looseEqual(decimal, decimal * multiplier)).toBe(false)
    expect(looseEqual(number, number * multiplier)).toBe(false)
    expect(looseEqual(multiplier, multiplier)).toBe(true)
  })

  it('compares dates correctly', async () => {
    const date1 = new Date(2019, 1, 2, 3, 4, 5, 6)
    const date2 = new Date(2019, 1, 2, 3, 4, 5, 6)
    const date3 = new Date(2019, 1, 2, 3, 4, 5, 7)
    const date4 = new Date(2219, 1, 2, 3, 4, 5, 6)

    // Identical date object references
    expect(looseEqual(date1, date1)).toBe(true)
    // Different date references with identical values
    expect(looseEqual(date1, date2)).toBe(true)
    // Dates with slightly different time (ms)
    expect(looseEqual(date1, date3)).toBe(false)
    // Dates with different year
    expect(looseEqual(date1, date4)).toBe(false)
  })

  it('compares arrays correctly', async () => {
    const arr1 = [1, 2, 3, 4]
    const arr2 = [1, 2, 3, '4']
    const arr3 = [1, 2, 3, 4, 5]
    const arr4 = [1, 2, 3, 4, { a: 5 }]

    // Identical array references
    expect(looseEqual(arr1, arr1)).toBe(true)
    // Different array references with identical values
    expect(looseEqual(arr1, arr1.slice())).toBe(true)
    expect(looseEqual(arr4, arr4.slice())).toBe(true)
    // Array with one value different
    expect(looseEqual(arr1, arr2)).toBe(false)
    expect(looseEqual(arr3, arr4)).toBe(false)
    // Arrays with different lengths
    expect(looseEqual(arr1, arr3)).toBe(false)
    // Arrays with values in different order
    expect(looseEqual(arr1, arr1.slice().reverse())).toBe(false)
  })

  it('compares objects correctly', async () => {
    const obj1 = { foo: 'bar' }
    const obj2 = { foo: 'bar1' }
    const obj3 = { a: 1, b: 2, c: 3 }
    const obj4 = { b: 2, c: 3, a: 1 }
    const obj5 = { ...obj4, z: 999 }
    const nestedObj1 = { ...obj1, bar: [{ ...obj1 }, { ...obj1 }] }
    const nestedObj2 = { ...obj1, bar: [{ ...obj1 }, { ...obj2 }] }

    // Identical object references
    expect(looseEqual(obj1, obj1)).toBe(true)
    // Two objects with identical keys/values
    expect(looseEqual(obj1, { ...obj1 })).toBe(true)
    // Different key values
    expect(looseEqual(obj1, obj2)).toBe(false)
    // Keys in different orders
    expect(looseEqual(obj3, obj4)).toBe(true)
    // One object has additional key
    expect(looseEqual(obj4, obj5)).toBe(false)
    // Identical object references with nested array
    expect(looseEqual(nestedObj1, nestedObj1)).toBe(true)
    // Identical object definitions with nested array
    expect(looseEqual(nestedObj1, { ...nestedObj1 })).toBe(true)
    // Object definitions with nested array (which has different order)
    expect(looseEqual(nestedObj1, nestedObj2)).toBe(false)
  })
})
