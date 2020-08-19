import { mount } from '@vue/test-utils'
import { BSkeletonWrapper } from './skeleton-wrapper'

describe('skeleton-wrapper', () => {
  it('`loading` slot renders when `loading` prop is true', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      propsData: {
        loading: true
      },
      slots: {
        loading: '<span>Loading state</span>'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-skeleton-wrapper')

    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Loading state')
    wrapper.destroy()
  })

  it('`default` slot renders when `loading` prop is false', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      propsData: {
        loading: false
      },
      slots: {
        default: '<button>Action</button>'
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Action')
  })

  it('root element has correct aria attributes in loading state', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      propsData: {
        loading: true
      }
    })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('role')).toBe('alert')
  })
})
