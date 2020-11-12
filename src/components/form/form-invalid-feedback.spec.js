import { mount } from '@vue/test-utils'
import { BFormInvalidFeedback } from './form-invalid-feedback'

describe('form-invalid-feedback', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  it('default should contain base class', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).toContain('invalid-feedback')

    wrapper.unmount()
  })

  it('default should not have class d-block', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  it('default should not have class invalid-tooltip', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('invalid-tooltip')

    wrapper.unmount()
  })

  it('default should not have id', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.attributes('id')).toBeUndefined()

    wrapper.unmount()
  })

  it('default should have user supplied id', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        id: 'foobar'
      }
    })

    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.unmount()
  })

  it('should have tag small when tag=small', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        tag: 'small'
      }
    })

    expect(wrapper.element.tagName).toBe('SMALL')

    wrapper.unmount()
  })

  it('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        forceShow: true
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  it('should contain class d-block when state is false', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        state: false
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  it('should not contain class d-block when state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        state: true
      }
    })

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  it('should contain class d-block when force-show is true and state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        forceShow: true,
        state: true
      }
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  it('should contain class invalid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        tooltip: true
      }
    })

    expect(wrapper.classes()).toContain('invalid-tooltip')

    wrapper.unmount()
  })

  it('should not contain class invalid-feedback when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      props: {
        tooltip: true
      }
    })

    expect(wrapper.classes()).not.toContain('invalid-feedback')

    wrapper.unmount()
  })

  it('should have children in the default slot when supplied', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      slots: {
        default: ['foo', '<span>bar</span>']
      }
    })

    expect(wrapper.text()).toContain('foo')
    expect(wrapper.text()).toContain('bar')

    wrapper.unmount()
  })
})
