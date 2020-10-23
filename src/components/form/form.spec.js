import { mount } from '@vue/test-utils'
import { BForm } from './form'

describe('form', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BForm)

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BForm, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  it('has class form-inline when prop inline set', async () => {
    const wrapper = mount(BForm, {
      props: {
        inline: true
      }
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has class was-validation when prop validated set', async () => {
    const wrapper = mount(BForm, {
      props: {
        validated: true
      }
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes()).toContain('was-validated')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has user supplied id', async () => {
    const wrapper = mount(BForm, {
      props: {
        id: 'foo'
      }
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.attributes('novalidate')).not.toBeDefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  it('has attribute novalidate when prop novalidate set', async () => {
    const wrapper = mount(BForm, {
      props: {
        novalidate: true
      }
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).not.toBeDefined()
    expect(wrapper.attributes('novalidate')).toBeDefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })
})
