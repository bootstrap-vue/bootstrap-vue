import { mount } from '@vue/test-utils'
import { setConfig } from './config-set'
import { copyProps, makePropsConfigurable } from './props'

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
