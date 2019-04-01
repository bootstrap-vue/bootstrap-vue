import FormText from './form-text'
import { mount } from '@vue/test-utils'

describe('form > form-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(FormText)

    expect(wrapper.is('small')).toBe(true)
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
  })
})
