import {
  setConfig,
  resetConfig,
  getConfig,
  getDefaults,
  getConfigValue,
  getComponentConfig,
  getBreakpoints,
  getBreakpointsUp,
  getBreakpointsDown
} from './config'
import looseEqual from './loose-equal'
import { createLocalVue } from '@vue/test-utils'
import BootstrapVue from '../../src'
import AlertPlugin from '../../src/components/alert'
import BVConfigPlugin from '../../src/bv-config'

describe('utils/config', () => {
  afterEach(() => {
    resetConfig()
  })

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

  it('getConfig() return current empty user config', async () => {
    expect(getConfig()).toEqual({})
  })

  it('setConfig() works', async () => {
    const testConfig = {
      BAlert: { variant: 'danger' }
    }
    const testBreakpoints = {
      breakpoints: ['aa', 'bb', 'cc', 'dd', 'ee']
    }

    const defaults = getDefaults()

    expect(getConfig()).toEqual({})

    // Try a conponent config
    setConfig(testConfig)
    expect(getConfig()).toEqual(testConfig)
    expect(getConfig()).not.toBe(testConfig)
    expect(getComponentConfig('BAlert')).toEqual(testConfig.BAlert)
    expect(getComponentConfig('BAlert', 'variant')).toEqual('danger')

    // Try breakpoint config (should merge)
    setConfig(testBreakpoints)
    expect(getBreakpoints()).toEqual(testBreakpoints.breakpoints)
    expect(getBreakpoints()).not.toBe(testBreakpoints.breakpoints)
    expect(getConfigValue('breakpoints')).toEqual(testBreakpoints.breakpoints)
    // should leave previous config
    expect(getComponentConfig('BAlert', 'variant')).toEqual('danger')
    // Should merge config
    expect(getConfig()).toEqual({ ...testConfig, ...testBreakpoints })

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
    expect(getComponentConfig('BAlert', 'variant')).toEqual('info')
    expect(getComponentConfig('BAlert', 'variant')).toEqual(defaults.BAlert.variant)
    expect(getBreakpoints()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
  })

  it('config via Vue.use(BootstrapVue) works', async () => {
    const testConfig = {
      BAlert: { variant: 'foobar' }
    }
    const localVue = createLocalVue()

    expect(getConfig()).toEqual({})

    localVue.use(BootstrapVue, testConfig)
    expect(getConfig()).toEqual(testConfig)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('config via Vue.use(ComponentPlugin) works', async () => {
    const testConfig = {
      BAlert: { variant: 'foobar' }
    }
    const localVue = createLocalVue()

    expect(getConfig()).toEqual({})

    localVue.use(AlertPlugin, testConfig)
    expect(getConfig()).toEqual(testConfig)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('config via Vue.use(BVConfig) works', async () => {
    const testConfig = {
      BAlert: { variant: 'foobar' }
    }
    const localVue = createLocalVue()

    expect(getConfig()).toEqual({})

    localVue.use(BVConfigPlugin, testConfig)
    expect(getConfig()).toEqual(testConfig)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })
})
