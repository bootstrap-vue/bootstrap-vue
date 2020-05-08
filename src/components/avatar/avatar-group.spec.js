import { mount } from '@vue/test-utils'
import { waitNT } from '../../../tests/utils'
import { BAvatarGroup } from './avatar-group'

describe('avatar-group', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BAvatarGroup)

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')

    wrapper.destroy()
  })

  it('should render custom root element when prop tag is set', async () => {
    const wrapper = mount(BAvatarGroup, {
      propsData: {
        tag: 'article'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')

    wrapper.destroy()
  })

  it('should render content from default slot', async () => {
    const wrapper = mount(BAvatarGroup, {
      slots: {
        default: '<span>FOOBAR</span>'
      }
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')

    expect(wrapper.text()).toEqual('FOOBAR')
    expect(wrapper.find('span').exists()).toBe(true)

    wrapper.destroy()
  })
})
