import InputGroupText from './input-group.text'
export { mount } from '@vue/test-utils'

describe('input-group-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(InputGroupText)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length()).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('has custom root element when prop tag set', async () => {
    const wrapper = mount(InputGroupText, {
      propsData: {
        tag: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length()).toBe(1)
    expect(wrapper.text()).toBe('')
  })

  it('renders content of default slot', async () => {
    const wrapper = mount(InputGroupText, {
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('input-group-text')
    expect(wrapper.classes().length()).toBe(1)
    expect(wrapper.text()).toBe('foobar')
  })
})
