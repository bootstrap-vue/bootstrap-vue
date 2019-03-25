import {
  getDefaults,
  getConfigValue,
  getComponentConfig,
  getBreakpoints,
  getBreakpointsUp,
  getBreakpointsDown
} from './config'
import looseEqual from './loose-equal'

describe('utils/config', () => {
  it('getConfigValue() works', async () => {
    expect(getConfigValue('breakpoints')).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getConfigValue('breakpoints')).not.toBe(getConfigValue('breakpoints'))
    // Should return null for not found
    expect(getConfigValue('foo.bar[1].baz')).toBe(null)
  })

  it('getComponentConfig() works', async () => {
    // Specific component config key
    expect(getComponentConfig('BAlert', 'variant')).toEqual('info')
    // Component's full config
    expect(getComponentConfig('BAlert')).toEqual(getDefaults().BAlert)
    // Should return a deep clone for full config
    expect(getComponentConfig('BAlert')).not.toBe(getDefaults().BAlert)
    // Should return empty object for not found component
    expect(getComponentConfig('foobar')).toEqual({})
    // Should return null for not found component key
    expect(getComponentConfig('BAlert', 'foobar')).toBe(null)
  })

  it('getBreakpoints() works', async () => {
    expect(getBreakpoints()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpoints()).not.toBe(getBreakpoints())
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

    expect(Object.keys(defaults).length).toBeGreaterThan(1)
    expect(getDefaults()).toEqual(defaults)
    expect(getDefaults()).not.toBe(defaults)

    // Each key should be a clone (top level key test)
    expect(
      Object.keys(defaults).every(key => {
        // Should not point to the same reference
        const param = getConfigValue(key)
        return param !== defaults[key] && looseEqual(param, defaults[key])
      })
    ).toBe(true)

    // TODO: Test each nested key (if Array or plain Object)
  })
})
