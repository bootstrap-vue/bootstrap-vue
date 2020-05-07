import { mount } from '@vue/test-utils'
import { BInputGroupPrepend } from './input-group-prepend'

describe('input-group > input-group-prepend', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BInputGroupPrepend)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders custom root element when tag prop is set', async () => {
    const wrapper = mount(BInputGroupPrepend, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders content of default slot', async () => {
    const wrapper = mount(BInputGroupPrepend, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('renders child input-group-text when prop is-text set', async () => {
    const wrapper = mount(BInputGroupPrepend, {
      propsData: {
        isText: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-text').length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > .input-group-text').length).toBe(1)
    expect(wrapper.text()).toEqual('')

    wrapper.destroy()
  })

  it('renders default slot inside child input-group-text when prop is-text set', async () => {
    const wrapper = mount(BInputGroupPrepend, {
      propsData: {
        isText: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-text').length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.find('.input-group-text').text()).toEqual('foobar')

    wrapper.destroy()
  })
})
