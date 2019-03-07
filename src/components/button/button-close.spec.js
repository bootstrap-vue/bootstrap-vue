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
        props: { variant: 'primary' }
      }
    })
    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)
  })

  it('should have default content', async () => {
    const wrapper = mount(ButtonClose)
    expect(wrapper.element.innerHTML).toContain('&times;')
  })

  it('should have custom content from default slot', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        slots: {
          default: 'foobar'
        }
      }
    })
    expect(wrapper.text()).toContain('foobar')
  })

  it('should emit "click" event when clicked', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        slots: {
          default: 'some <span>text</span>'
        }
      }
    })

    expect(wrapper.emitted('click')).not.toBeDefined()

    const btn = wrapper.find('button')
    btn.trigger('click')

    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('click').length).toBe(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent)

    const span = wrapper.find('span')
    expect(span).toBeDefined()
    span.trigger('click')

    expect(wrapper.emitted('click').length).toBe(2)
    expect(wrapper.emitted('click')[1][0]).toBeInstanceOf(MouseEvent)
  })

  it('should not emit "click" event when disabled and clicked', async () => {
    const wrapper = mount(ButtonClose, {
      context: {
        props: {
          disabled: true
        },
        slots: {
          default: 'some <span>text</span>'
        }
      }
    })

    expect(wrapper.emitted('click')).not.toBeDefined()

    const btn = wrapper.find('button')
    btn.trigger('click')

    expect(wrapper.emitted('click')).not.toBeDefined()

    const span = wrapper.find('span')
    expect(span).toBeDefined()
    span.trigger('click')

    expect(wrapper.emitted('click')).not.toBeDefined()
  })
})
