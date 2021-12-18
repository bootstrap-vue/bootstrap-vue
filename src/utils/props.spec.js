import { mount } from '@vue/test-utils'
import { setConfig } from './config-set'
import { copyProps, makeProp, makePropsConfigurable } from './props'

describe('utils/props', () => {
  it('copyProps() works with array props', async () => {
    const props = ['a', 'b', 'c']

    expect(copyProps(props)).toEqual(props)
    // Should be a new array reference
    expect(copyProps(props)).not.toBe(props)
  })

  it('copyProps() works with object props', async () => {
    const props = {
      a: { type: String, default: 'foobar' },
      b: { type: [Object, Array], default: null },
      c: 'c'
    }

    expect(copyProps(props)).toEqual(props)
    // Should be a new object reference
    expect(copyProps(props)).not.toBe(props)
    // Properties should be new object references
    expect(copyProps(props).a).not.toBe(props.a)
    expect(copyProps(props).a).toEqual(props.a)
    expect(copyProps(props).b).not.toBe(props.b)
    expect(copyProps(props).b).toEqual(props.b)
    // Except for primatives
    expect(copyProps(props).c).toBe(props.c)
    expect(copyProps(props).c).toEqual(props.c)
  })

  it('makeProp() works', async () => {
    expect(makeProp()).toEqual({})
    expect(makeProp(undefined)).toEqual({})
    expect(makeProp(null)).toEqual({})
    expect(makeProp('')).toEqual({})

    expect(makeProp(Array)).toEqual({ type: Array })
    expect(makeProp(Boolean)).toEqual({ type: Boolean })
    expect(makeProp(Function)).toEqual({ type: Function })
    expect(makeProp(Number)).toEqual({ type: Number })
    expect(makeProp(Object)).toEqual({ type: Object })
    expect(makeProp(String)).toEqual({ type: String })

    expect(makeProp(Array, null)).toEqual({ type: Array, default: null })
    expect(makeProp(Boolean, false)).toEqual({ type: Boolean, default: false })
    expect(makeProp(Function, null)).toEqual({ type: Function, default: null })
    expect(makeProp(Number, 0)).toEqual({ type: Number, default: 0 })
    expect(makeProp(Object, null)).toEqual({ type: Object, default: null })
    expect(makeProp(String, '')).toEqual({ type: String, default: '' })

    expect(typeof makeProp(Array, []).default).toEqual('function')
    expect(makeProp(Array, []).default()).toEqual([])

    const fn = () => {}
    expect(typeof makeProp(Function, fn).default).toEqual('function')
    expect(makeProp(Function, fn).default).toEqual(fn)

    expect(typeof makeProp(Object, {}).default).toEqual('function')
    expect(makeProp(Object, {}).default()).toEqual({})

    expect(makeProp(Array, undefined, true)).toEqual({ type: Array, required: true })
    expect(makeProp(Boolean, undefined, true)).toEqual({ type: Boolean, required: true })
    expect(makeProp(Function, undefined, true)).toEqual({ type: Function, required: true })
    expect(makeProp(Number, undefined, true)).toEqual({ type: Number, required: true })
    expect(makeProp(Object, undefined, true)).toEqual({ type: Object, required: true })
    expect(makeProp(String, undefined, true)).toEqual({ type: String, required: true })

    const validator = value => !!value
    expect(makeProp(String, '', undefined)).toEqual({ type: String, default: '' })
    expect(makeProp(String, '', validator)).toEqual({ type: String, default: '', validator })
    expect(makeProp(String, undefined, validator)).toEqual({ type: String, validator })
    expect(makeProp(String, '', true, validator)).toEqual({
      type: String,
      required: true,
      validator
    })
  })

  it('makePropsConfigurable() works', async () => {
    const NAME = 'MyComponent'
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
