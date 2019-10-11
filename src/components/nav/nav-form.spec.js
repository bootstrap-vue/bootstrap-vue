import { mount } from '@vue/test-utils'
import { BNavForm } from './nav-form'

describe('nav > nav-form', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavForm)

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)

    const $form = wrapper.find('form')
    expect($form.exists()).toBe(true)
    expect($form.classes()).toContain('form-inline')
    expect($form.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNavForm, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)

    const $form = wrapper.find('form')
    expect($form.exists()).toBe(true)
    expect($form.classes()).toContain('form-inline')
    expect($form.text()).toEqual('foobar')
  })

  it('applies ID to form when prop ID is set', async () => {
    const wrapper = mount(BNavForm, {
      propsData: {
        id: 'baz'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)

    const $form = wrapper.find('form')
    expect($form.exists()).toBe(true)
    expect($form.classes()).toContain('form-inline')
    expect($form.text()).toEqual('foobar')
    expect($form.attributes('id')).toEqual('baz')
  })

  it('listeners are bound to form element', async () => {
    const onSubmit = jest.fn()
    const wrapper = mount(BNavForm, {
      propsData: {
        id: 'baz'
      },
      listeners: {
        submit: onSubmit
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)

    const $form = wrapper.find('form')
    expect($form.exists()).toBe(true)
    expect($form.classes()).toContain('form-inline')
    expect($form.text()).toEqual('foobar')

    expect(onSubmit).not.toHaveBeenCalled()

    $form.trigger('submit')
    expect(onSubmit).toHaveBeenCalled()
  })
})
