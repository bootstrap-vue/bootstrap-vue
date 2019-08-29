import { mount } from '@vue/test-utils'
import { BNavForm } from './nav-form'

describe('nav > nav-form', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavForm)

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNavForm, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('form')).toBe(true)
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
