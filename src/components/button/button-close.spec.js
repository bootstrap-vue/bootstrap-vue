import ButtonClose from './button-close'
import { mount } from '@vue/test-utils'

describe('button-close', () => {
  it('has root element "button"', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.is('button')).toBe(true)
  })

  it('has class close', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has attribute type=button', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('does not have attribute disabled by default', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.attributes('disabled')).not.toBeDefined()
  })

  it('has attribute disabled when prop disabled is set', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        props: { disabled: true }
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('has attribute aria-label=Close by default', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.attributes('aria-label')).toBe('Close')
  })

  it('has custom attribute aria-label=Close when prop aria-label set', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        props: { ariaLabel: 'foobar' }
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('foobar')
  })

  it('has variant class when variant prop set', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        props: { textVariant: 'primary' }
      }
    })
    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)
  })

  it('should have default content', async () => {
    const wrapper = mount(ButtonClose)
    // '&times;' gets converted to '×'
    expect(wrapper.text()).toContain('×')
  })

  it('should have custom content from default slot', async () => {
    const wrapper = mount(ButtonClose, {
      slots: {
        default: '<i>foobar</i>'
      }
    })
    expect(wrapper.text()).toContain('foobar')
  })

  it('should emit "click" event when clicked', async () => {
    let event = null
    const spy1 = jest.fn(e => {
      event = e
    })
    const wrapper = mount(ButtonClose, {
      context: {
        data: {
          on: { click: spy1 }
        }
      },
      slots: {
        default: '<i>some <span>text</span></i>'
      }
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    btn.element.click()

    expect(spy1).toHaveBeenCalled()
    expect(spy1.mock.calls.length).toBe(1)
    expect(event).toBeInstanceOf(MouseEvent)

    // Workes when clicking on an inner element
    const span = wrapper.find('span')
    expect(span).toBeDefined()
    span.element.click()

    expect(spy1.mock.calls.length).toBe(2)
  })

  it('should not emit "click" event when disabled and clicked', async () => {
    const spy1 = jest.fn()
    const wrapper = mount(ButtonClose, {
      context: {
        props: {
          disabled: true
        },
        data: {
          on: { click: spy1 }
        }
      },
      slots: {
        default: '<i>some <span>text</span></i>'
      }
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    btn.element.click()

    expect(spy1).not.toHaveBeenCalled()

    // Does not emit click on inner element clicks
    const span = wrapper.find('span')
    expect(span).toBeDefined()
    span.element.click()

    expect(spy1).not.toHaveBeenCalled()
  })
})
