import InputGroupPrepend from './input-group-prepend'
import { mount } from '@vue/test-utils'

describe('input-group-prepend', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(InputGroupPrepend)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when tag prop is set', async () => {
    const wrapper = mount(InputGroupPrepend, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > *').length).toBe(0)
    expect(wrapper.text()).toEqual('')
  })

  it('renders content of default slot', async () => {
    const wrapper = mount(InputGroupPrepend, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('renders child input-group-text when prop is-text set', async () => {
    const wrapper = mount(InputGroupPrepend, {
      propsData: {
        isText: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-text').length).toBe(1)
    expect(wrapper.findAll('.input-group-prepend > .input-group-text').length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot inside child input-group-text when prop is-text set', async () => {
    const wrapper = mount(InputGroupPrepend, {
      propsData: {
        isText: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-prepend')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.input-group-text').length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.find('.input-group-text').text()).toEqual('foobar')
  })
})
