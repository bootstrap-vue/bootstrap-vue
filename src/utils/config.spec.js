import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from '../../src'
import { AlertPlugin } from '../../src/components/alert'
import { BVConfigPlugin } from '../../src/bv-config'
import { setConfig, resetConfig } from './config-set'
import {
  getBreakpoints,
  getBreakpointsDown,
  getBreakpointsUp,
  getComponentConfig,
  getConfig,
  getConfigValue,
  makePropsConfigurable
} from './config'

describe('utils/config', () => {
  afterEach(() => {
    resetConfig()
  })

  it('getConfig() works', async () => {
    expect(getConfig()).toEqual({})
  })

  it('setConfig() works', async () => {
    const config = {
      BAlert: { variant: 'danger' }
    }
    const breakpointsConfig = {
      breakpoints: ['aa', 'bb', 'cc', 'dd', 'ee']
    }
    expect(getConfig()).toEqual({})

    // Try a component config
    setConfig(config)
    expect(getConfig()).toEqual(config)
    expect(getConfig()).not.toBe(config)
    expect(getComponentConfig('BAlert')).toEqual(config.BAlert)
    expect(getComponentConfig('BAlert')).not.toBe(config.BAlert)
    expect(getComponentConfig('BAlert', 'variant')).toEqual('danger')

    // Try breakpoint config (should merge)
    setConfig(breakpointsConfig)
    expect(getBreakpoints()).toEqual(breakpointsConfig.breakpoints)
    expect(getBreakpoints()).not.toBe(breakpointsConfig.breakpoints)
    expect(getConfigValue('breakpoints')).toEqual(breakpointsConfig.breakpoints)
    // should leave previous config
    expect(getComponentConfig('BAlert', 'variant')).toEqual('danger')
    // Should merge config
    expect(getConfig()).toEqual({ ...config, ...breakpointsConfig })

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('config via Vue.use(BootstrapVue) works', async () => {
    const localVue = createLocalVue()
    const config = {
      BAlert: { variant: 'foobar' }
    }

    expect(getConfig()).toEqual({})

    localVue.use(BootstrapVue, config)
    expect(getConfig()).toEqual(config)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('config via Vue.use(ComponentPlugin) works', async () => {
    const localVue = createLocalVue()
    const config = {
      BAlert: { variant: 'foobar' }
    }

    expect(getConfig()).toEqual({})

    localVue.use(AlertPlugin, config)
    expect(getConfig()).toEqual(config)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('config via Vue.use(BVConfig) works', async () => {
    const localVue = createLocalVue()
    const config = {
      BAlert: { variant: 'foobar' }
    }

    expect(getConfig()).toEqual({})

    localVue.use(BVConfigPlugin, config)
    expect(getConfig()).toEqual(config)

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  it('getConfigValue() works', async () => {
    const config = {
      formControls: { size: 'sm' }
    }
    setConfig(config)

    expect(getConfigValue('formControls')).toEqual(config.formControls)
    // Should return a deep clone
    expect(getConfigValue('formControls')).not.toBe(config.formControls)
    // Shape of returned value should be the same each call
    expect(getConfigValue('formControls')).toEqual(getConfigValue('formControls'))
    // Should return undefined for not found
    expect(getConfigValue('foo.bar[1].baz')).not.toBeDefined()
  })

  it('getComponentConfig() works', async () => {
    const config = {
      BAlert: { variant: 'info' }
    }
    setConfig(config)

    // Specific component config key
    expect(getComponentConfig('BAlert', 'variant')).toEqual('info')
    // Component's full config
    expect(getComponentConfig('BAlert')).toEqual(config.BAlert)
    // Should return a deep clone for full config
    expect(getComponentConfig('BAlert')).not.toBe(config.BAlert)
    // Should return empty object for not found component
    expect(getComponentConfig('foobar')).toEqual({})
    // Should return undefined for not found component key
    expect(getComponentConfig('BAlert', 'foobar')).not.toBeDefined()
  })

  it('getBreakpoints() works', async () => {
    const breakpointsConfig = {
      breakpoints: ['aa', 'bb', 'cc', 'dd', 'ee']
    }

    expect(getBreakpoints()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpoints()).not.toBe(getBreakpoints())

    // Set new breakpoints
    setConfig(breakpointsConfig)
    expect(getBreakpoints()).toEqual(breakpointsConfig.breakpoints)
    // Should return a deep clone
    expect(getBreakpoints()).not.toBe(getBreakpoints())
    expect(getBreakpoints()).not.toBe(breakpointsConfig.breakpoints)
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

  it('makePropsConfigurable() works', async () => {
    const NAME = 'Component'
    const props = {
      text: {
        type: String,
        default: 'foo'
      }
    }
    const config = {
      [NAME]: { text: 'bar' }
    }
    const ConfigurableComponent = {
      name: NAME,
      props: makePropsConfigurable(props, NAME),
      render(h) {
        return h('div', this.text)
      }
    }

    setConfig(config)

    const wrapper = mount(ConfigurableComponent)

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.text()).toBe('bar')

    await wrapper.setProps({ text: 'baz' })
    expect(wrapper.text()).toBe('baz')
  })
})
