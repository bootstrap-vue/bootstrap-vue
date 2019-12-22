import { toBoolean } from './boolean'

describe('utils/boolean', () => {
  it('toBoolean works', async () => {
    expect(toBoolean(true)).toBe(true)
    expect(toBoolean(false)).toBe(false)
    expect(toBoolean('')).toBe(false)
    expect(toBoolean(0)).toBe(false)
    expect(toBoolean(1)).toBe(true)
    expect(toBoolean(1000)).toBe(true)
    expect(toBoolean(null)).toBe(false)
    expect(toBoolean(undefined)).toBe(false)
    expect(toBoolean(NaN)).toBe(false)
    // eslint-disable-next-line no-void
    expect(toBoolean(void 0)).toBe(false)
    expect(toBoolean('0')).toBe(true)
    expect(toBoolean([])).toBe(true)
    expect(toBoolean({})).toBe(true)
    expect(toBoolean(() => {})).toBe(true)
  })
})
