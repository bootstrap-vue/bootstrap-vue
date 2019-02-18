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

  it('compares objects correctly', async () => {
    const obj1 = { foo: 'bar' }
    const obj2 = { foo: 'bar1' }
    const nestedObj1 = { ...obj1, bar: [{ ...obj1 }, { ...obj1 }] }
    const nestedObj2 = { ...obj1, bar: [{ ...obj1 }, { ...obj2 }] }
    expect(looseEqual(obj1, obj1)).toBe(true)
    expect(looseEqual(obj1, { ...obj1 })).toBe(false)
    expect(looseEqual(obj1, obj2)).toBe(false)
    expect(looseEqual(nestedObj1, nestedObj1)).toBe(true)
    expect(looseEqual(nestedObj1, { ...nestedObj1 })).toBe(false)
    expect(looseEqual(nestedObj1, nestedObj2)).toBe(false)
  })
})
