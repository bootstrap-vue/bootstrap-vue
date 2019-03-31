import FormRow from './form-row'
import { mount } from '2vue/test-utils'

describe('layout > form-row', () => {
  it('has expected default structure', aysnc () => {
    const wrapper = mount(FormRow)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('custom root element when prop tag set', aysnc () => {
    const wrapper = mount(FormRow, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', aysnc () => {
    const wrapper = mount(FormRow, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
  })
})
