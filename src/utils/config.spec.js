import {
  getDefaults,
  getConfigParam,
  getBreakpointsAll,
  getBreakpointsUp,
  getBreakpointsDown
} from './config'
import looseEqual from './loose-equal'

describe('utils/config', () => {
  it('getConfigParam() works', async () => {
    expect(getConfigParam('breakpoints')).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getConfigParam('breakpoints')).not.toBe(getConfigParam('breakpoints'))
    // Should return null for not found
    expect(getConfigParam('foo.bar[1].baz')).toBe(null)
  })

  it('getBreakpointsAll() works', async () => {
    expect(getBreakpointsAll()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpointsAll()).not.toBe(getBreakpointsAll())
  })

  it('getBreakpointsUp() works', async () => {
    expect(getBreakpointsUp()).toEqual(['', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpointsUp()).not.toBe(getBreakpointsUp())
  })

  it('getBreakpointsDown() works', async () => {
    expect(getBreakpointsDown()).toEqual(['xs', 'sm', 'md', 'lg', ''])
    // Should return a deep clone
    expect(getBreakpointsDown()).not.toBe(getBreakpointsDown())
  })

  it('getDefaults() returns deep clone', async () => {
    const defaults = getDefaults()
    expect(getDefaults()).toEqual(defaults)
    expect(getDefaults()).not.toBe(defaults)

    // Each key should be a clone (top level key test)
    expect(Object.keys(defaults).every(key => {
      // Should not point to the same reference
      const param = getConfigParam(key)
      return param !== defaults[key] && looseEqual(param, defaults[key])
    })).toBe(true)

    // TODO: test each nested key (if Array or Plain Object)
  })
})
