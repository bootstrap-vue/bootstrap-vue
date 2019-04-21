import { mount } from '@vue/test-utils'
import BFormValidFeedback from './form-valid-feedback'

describe('form-valid-feedback', () => {
  it('default should have tag div', async () => {
    const feedback = mount(BFormValidFeedback)
    expect(feedback.is('div')).toBe(true)
  })

  it('default should contain base class', async () => {
    const feedback = mount(BFormValidFeedback)
    expect(feedback.classes()).toContain('valid-feedback')
  })

  it('default should not have class d-block', async () => {
    const feedback = mount(BFormValidFeedback)
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('default should not have class valid-tooltip', async () => {
    const feedback = mount(BFormValidFeedback)
    expect(feedback.classes()).not.toContain('valid-tooltip')
  })

  it('default should not have id', async () => {
    const feedback = mount(BFormValidFeedback)
    expect(feedback.attributes('id')).not.toBeDefined()
  })

  it('default should have user supplied id', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          id: 'foobar'
        }
      }
    })
    expect(feedback.attributes('id')).toBe('foobar')
  })

  it('should have tag small when tag=small', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          tag: 'small'
        }
      }
    })
    expect(feedback.is('small')).toBe(true)
  })

  it('should contain class d-block when force-show is set', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          forceShow: true
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is true', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          state: true
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is "valid"', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          state: 'valid'
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should not contain class d-block when state is false', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          state: false
        }
      }
    })
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('should not contain class d-block when state is "invalid"', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          state: 'invalid'
        }
      }
    })
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('should contain class d-block when force-show is true and state is false', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          forceShow: true,
          state: false
        }
      }
    })
    expect(feedback.classes()).toContain('d-block')
  })

  it('should contain class valid-tooltip when tooltip is set', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })
    expect(feedback.classes()).toContain('valid-tooltip')
  })

  it('should not contain class alid-feedback when tooltip is set', async () => {
    const feedback = mount(BFormValidFeedback, {
      context: {
        props: {
          tooltip: true
        }
      }
    })
    expect(feedback.classes()).not.toContain('valid-feedback')
  })
})
