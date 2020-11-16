import { mount } from '@vue/test-utils'
import { BSkeletonWrapper } from './skeleton-wrapper'

describe('skeleton-wrapper', () => {
  it('`loading` slot renders when `loading` prop is true', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      props: {
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
    wrapper.unmount()
  })

  it('`default` slot renders when `loading` prop is false', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      props: {
        loading: false
      },
      slots: {
        default: '<button>Action</button>'
      }
    })

    const $button = wrapper.find('button')
    expect($button.exists()).toBe(true)
    expect($button.text()).toBe('Action')
  })

  it('root element has correct aria attributes in loading state', async () => {
    const wrapper = mount(BSkeletonWrapper, {
      props: {
        loading: true
      }
    })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('role')).toBe('alert')
  })
})
