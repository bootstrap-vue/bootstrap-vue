import { mount } from '@vue/test-utils'
import { BAvatarGroup } from './avatar-group'
import { waitNT } from '../../../tests/utils'

describe('avatar-group', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BAvatarGroup)
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')

    wrapper.destroy()
  })
})
