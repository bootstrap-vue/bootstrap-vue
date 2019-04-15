import { mount } from '@vue/test-utils'
import BFormInvalidFeedback from './form-invalid-feedback'

describe('form-invalid-feedback', () => {
  it('default should have tag div', async () => {
    const feedback = mount(BFormInvalidFeedback)
    expect(feedback.is('div')).toBe(true)
  })

  it('default should contain base class', async () => {
    const feedback = mount(BFormInvalidFeedback)
    expect(feedback.classes()).toContain('invalid-feedback')
  })

  it('default should not have class d-block', async () => {
    const feedback = mount(BFormInvalidFeedback)
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('default should not have class invalid-tooltip', async () => {
    const feedback = mount(BFormInvalidFeedback)
    expect(feedback.classes()).not.toContain('invalid-tooltip')
  })

  it('default should not have id', async () => {
    const feedback = mount(BFormInvalidFeedback)
    expect(feedback.attributes('id')).not.toBeDefined()
  })

  it('default should have user supplied id', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          id: 'foobar'
        }
      }
    })
    expect(feedback.attributes('id')).toBe('foobar')
  })

  it('should have tag small when tag=small', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tag: 'small'
        }
      }
    })
    expect(feedback.is('small')).toBe(true)
  })

  it('should contain class d-block when force-show is set', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is false', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: false
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is "invalid"', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: 'invalid'
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should not contain class d-block when state is true', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: true
        }
      }
    })
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('should not contain class d-block when state is "valid"', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: 'valid'
        }
      }
    })
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('should contain class d-block when force-show is true and state is true', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true,
          state: true
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class invalid-tooltip when tooltip is set', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })
    expect(feedback.classes()).toContain('invalid-tooltip')
  })

  it('should not contain class invalid-feedback when tooltip is set', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })
    expect(feedback.classes()).not.toContain('invalid-feedback')
  })

  it('should have children in the default slot when supplied', async () => {
    const feedback = mount(BFormInvalidFeedback, {
      context: {
        children: ['foo', '<span>bar</span>']
      }
    })
    expect(feedback.text()).toContain('foo')
    expect(feedback.text()).toContain('bar')
  })
})
