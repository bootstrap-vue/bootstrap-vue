import FormRow from './form-row'
import { mount } from '@vue/test-utils'

// This component is also fully tested under the layout tests

describe('form > form-row', () => {
  it('works', () => {
    const wrapper = mount(FormRow)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
  })
})
