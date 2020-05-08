import { mount } from '@vue/test-utils'
import { BFormInvalidFeedback } from './form-invalid-feedback'

describe('form-invalid-feedback', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.destroy()
  })

  it('default should contain base class', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).toContain('invalid-feedback')

    wrapper.destroy()
  })

  it('default should not have class d-block', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.destroy()
  })

  it('default should not have class invalid-tooltip', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('invalid-tooltip')

    wrapper.destroy()
  })

  it('default should not have id', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.attributes('id')).not.toBeDefined()

    wrapper.destroy()
  })

  it('default should have user supplied id', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          id: 'foobar'
        }
      }
    })

    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.destroy()
  })

  it('should have tag small when tag=small', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tag: 'small'
        }
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')

    wrapper.destroy()
  })

  it('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true
        }
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.destroy()
  })

  it('should contain class d-block when state is false', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: false
        }
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.destroy()
  })

  it('should not contain class d-block when state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: true
        }
      }
    })

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.destroy()
  })

  it('should contain class d-block when force-show is true and state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true,
          state: true
        }
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.destroy()
  })

  it('should contain class invalid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })

    expect(wrapper.classes()).toContain('invalid-tooltip')

    wrapper.destroy()
  })

  it('should not contain class invalid-feedback when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })

    expect(wrapper.classes()).not.toContain('invalid-feedback')

    wrapper.destroy()
  })

  it('should have children in the default slot when supplied', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        children: ['foo', '<span>bar</span>']
      }
    })

    expect(wrapper.text()).toContain('foo')
    expect(wrapper.text()).toContain('bar')

    wrapper.destroy()
  })
})
