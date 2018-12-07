import Group from './form-checkbox-group'
// import Input from './form-checkbox'
import { mount } from '@vue/test-utils'

describe('form-checkbox-group', async () => {
  /* Structure, class and attributes tests */

  it('default has structure <div></div>', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('div')).toBe(true)
    const children = wrapper.element.children
    expect(children.length).toEqual(0)
  })

  it('default has no classes on wrapper', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.classes().length).toEqual(0)
  })

  it('default has auto ID set', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
  })

  it('default has tabindex set to -1', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe(-1)
  })

  it('default does not have aria-required set', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.attributes('aria-required')).not.toBeDefined()
  })

  it('default does not have aria-invalid set', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default has attribute role=group', async () => {
    const wrapper = mount(Group, {
      propsData: {
      },
      slots: {
      }
    })
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
  })
})
