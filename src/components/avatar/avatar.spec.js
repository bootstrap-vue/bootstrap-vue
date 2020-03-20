import { mount } from '@vue/test-utils'
import { BAvatar } from './avatar'

describe('avatar', () => {
  it('should have base classes', async () => {
    const wrapper = mount(BAvatar)
    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('b-avatar')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).not.toBeDefined()
    expect(wrapper.attributes('type')).not.toBeDefined()
  })
})
