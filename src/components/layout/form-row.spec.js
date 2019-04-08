import BFormRow from './form-row'
import { mount } from '@vue/test-utils'

describe('layout > form-row', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormRow)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('custom root element when prop tag set', async () => {
    const wrapper = mount(BFormRow, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BFormRow, {
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
