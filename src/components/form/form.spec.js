import { mount } from '@vue/test-utils'
import { BForm } from './form'

describe('form', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BForm)

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BForm, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('foobar')
  })

  it('has class form-inline when prop inline set', async () => {
    const wrapper = mount(BForm, {
      propsData: {
        inline: true
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
  })

  it('has class was-validation when prop validated set', async () => {
    const wrapper = mount(BForm, {
      propsData: {
        validated: true
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes()).toContain('was-validated')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
  })

  it('has user supplied id', async () => {
    const wrapper = mount(BForm, {
      propsData: {
        id: 'foo'
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')
  })

  it('has attribute novalidate when prop novalidate set', async () => {
    const wrapper = mount(BForm, {
      propsData: {
        novalidate: true
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).toBeDefined()
    expect(wrapper.text()).toEqual('')
  })
})
