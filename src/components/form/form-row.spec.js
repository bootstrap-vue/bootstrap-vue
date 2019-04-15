import { mount } from '@vue/test-utils'
import BFormRow from './form-row'

// This component is also fully tested under the layout tests

describe('form > form-row', () => {
  it('works', () => {
    const wrapper = mount(BFormRow)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('form-row')
  })
})
