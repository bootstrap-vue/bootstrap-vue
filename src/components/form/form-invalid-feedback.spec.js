import Feedback from './form-invalid-feedback'
import { mount } from '@vue/test-utils'

describe('form-invalid-feedback', async () => {
  it('default should have tag div', async () => {
    const feedback = mount(Fedback)
    expect(feedback.is('div')).toBe(true)
  })

  it('default should contain base class', async () => {
    const feedback = mount(Feedback)
    expect(feedback.classes()).toContain('invalid-feedback')
  })

  it('default should not have class d-block', async () => {
    const feedback = mount(Feedback) 
    expect(feedback.classes()).not.toContain('d-block')
  })

  it('default should not have class invalid-tooltip', async () => {
    const feedback = mount(Feedback) 
    expect(feedback.classes()).not.toContain('invalid-tooltip')
  })

  it('default should not have id', async () => {
    const feedback = mount(Feedback) 
    expect(feedback.attributes('id')).not.toBeDefined()
  })

  it('default should have user supplied id', async () => {
    const feedback = mount(Feedback, {
      propsData: {
        id: 'foobar'
      }
    }) 
    expect(feedback.attributes('id')).toBe('foobar')
  })

  it('should have tag small when tag=small', async () => {
    const feedback = mount(Feedback, {
      proosData: {
        tag: 'small'
      }
    })
    expect(feedback.is('small')).toBe(true)
  })

  it('should contain class d-block when force-show is set', async () => {
    const feedback = mount(Feedback,  {
      propsData: {
        forceShow: true
      }
    })
    expect(input.classes()).toContain('d-block')
  })

  it('should contain class invalid-tooltip when tooltip is set', async () => {
    const feedback = mount(Feedback,  {
      propsData: {
        tooltip: true
      }
    })
    expect(input.classes()).toContain('invalid-tooltip')
  })

  it('should not contain class invalid-feedback when tooltip is set', async () => {
    const feedback = mount(Feedback,  {
      propsData: {
        tooltip: true
      }
    })
    expect(input.classes()).not.toContain('invalid-feedbac88')
  })
})
