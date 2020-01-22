import { mount } from '@vue/test-utils'
import { BButtonClose } from './button-close'

describe('button-close', () => {
  it('has root element "button"', async () => {
    const wrapper = mount(BButtonClose)
    expect(wrapper.is('button')).toBe(true)
  })

  it('has class "close"', async () => {
    const wrapper = mount(BButtonClose)
    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has attribute type="button"', async () => {
    const wrapper = mount(BButtonClose)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('does not have attribute "disabled" by default', async () => {
    const wrapper = mount(BButtonClose)
    expect(wrapper.attributes('disabled')).not.toBeDefined()
  })

  it('has attribute "disabled" when prop "disabled" is set', async () => {
    const wrapper = mount(BButtonClose, {
      context: {
        props: { disabled: true }
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('has attribute aria-label="Close" by default', async () => {
    const wrapper = mount(BButtonClose)
    expect(wrapper.attributes('aria-label')).toBe('Close')
  })

  it('has custom attribute "aria-label" when prop "aria-label" set', async () => {
    const wrapper = mount(BButtonClose, {
      context: {
        props: { ariaLabel: 'foobar' }
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('foobar')
  })

  it('has text variant class when "variant" prop set', async () => {
    const wrapper = mount(BButtonClose, {
      context: {
        props: { textVariant: 'primary' }
      }
    })
    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)
  })

  it('should have default content', async () => {
    const wrapper = mount(BButtonClose)
    // '&times;' gets converted to '×'
    expect(wrapper.text()).toContain('×')
  })

  it('should have custom content from "content" prop', async () => {
    const wrapper = mount(BButtonClose, {
      context: {
        props: { content: 'Close' }
      }
    })
    expect(wrapper.text()).toContain('Close')
  })

  it('should have custom content from default slot', async () => {
    const wrapper = mount(BButtonClose, {
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
    const wrapper = mount(BButtonClose, {
      context: {
        on: { click: spy1 }
      },
      slots: {
        default: '<i>some <span>text</span></i>'
      }
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')

    expect(spy1).toHaveBeenCalled()
    expect(spy1.mock.calls.length).toBe(1)
    expect(event).toBeInstanceOf(MouseEvent)

    // Works when clicking on an inner element
    const span = wrapper.find('span')
    expect(span).toBeDefined()
    span.trigger('click')

    expect(spy1.mock.calls.length).toBe(2)
  })

  it('should not emit "click" event when disabled and clicked', async () => {
    const spy1 = jest.fn()
    const wrapper = mount(BButtonClose, {
      context: {
        props: {
          disabled: true
        },
        on: { click: spy1 }
      },
      slots: {
        default: '<i>some <span>text</span></i>'
      }
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')

    expect(spy1).not.toHaveBeenCalled()

    // For some reason, JSDOM emits a click on button when clicking inner element
    // Although testing in docs, this click is not emitted when disabled
    // Appears to be a bug in JSDOM
    //
    // // Does not emit click on inner element clicks
    // const span = wrapper.find('span')
    // expect(span).toBeDefined()
    // span.trigger('click')
    //
    // expect(spy1).not.toHaveBeenCalled()
  })

  it('handles multiple click listeners', async () => {
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const wrapper = mount(BButtonClose, {
      context: {
        on: { click: [spy1, spy2] }
      }
    })

    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    btn.trigger('click')

    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy1.mock.calls.length).toBe(1)
    expect(spy2.mock.calls.length).toBe(1)
  })
})
