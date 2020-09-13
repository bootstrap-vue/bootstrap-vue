import { createLocalVue, mount } from '@vue/test-utils'
import { IconsPlugin } from '../../icons'
import { BSkeletonIcon } from './skeleton-icon'

const localVue = createLocalVue()
localVue.use(IconsPlugin)

describe('skeleton-icon', () => {
  it('root element is DIV and contains SVG', async () => {
    const wrapper = mount(BSkeletonIcon)

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.find('svg').exists()).toBe(true)

    wrapper.destroy()
  })

  it('default animation is `wave`', async () => {
    const wrapper = mount(BSkeletonIcon)

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).toContain('b-skeleton-animate-wave')

    wrapper.destroy()
  })

  it('has class `b-skeleton-animate-fade` when `animation="fade"` is set', async () => {
    const wrapper = mount(BSkeletonIcon, {
      propsData: {
        animation: 'fade'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.classes()).toContain('b-skeleton-animate-fade')

    wrapper.destroy()
  })

  it('`icon` prop works', async () => {
    const wrapper = mount(BSkeletonIcon, {
      localVue,
      propsData: {
        icon: 'heart'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').classes()).toContain('bi-heart')

    wrapper.destroy()
  })

  it('`icon-props` is passed correctly to icon', async () => {
    const wrapper = mount(BSkeletonIcon, {
      localVue,
      propsData: {
        icon: 'heart',
        iconProps: {
          fontScale: 2,
          variant: 'primary'
        }
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').classes()).toContain('text-primary')
    expect(wrapper.find('svg').element.style.fontSize).toBe('200%')

    wrapper.destroy()
  })
})
