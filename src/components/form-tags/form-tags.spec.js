import { mount } from '@vue/test-utils'
// import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormTags } from './form-tags'

describe('form-tags', () => {
  it('has div as root element', async () => {
    const wrapper = mount(BFormTagd)
    expect(wrapper.is('div')).toBe(true)

    wrapper.destroy()
  })
})
